import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { sendSongReadyEmail } from '@/lib/resend'

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  // Auth check — must be logged-in admin
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { orderId } = await params
  const serviceClient = getServiceClient()

  // Fetch current order
  const { data: order, error: fetchError } = await serviceClient
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (!order || fetchError) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  const formData = await req.formData()
  const status = (formData.get('status') as string) ?? order.status
  const adminNotes = (formData.get('admin_notes') as string) ?? null
  const mp3File = formData.get('mp3') as File | null

  let mp3StoragePath: string | null = order.mp3_storage_path

  // Upload MP3 if provided
  if (mp3File && mp3File.size > 0) {
    const arrayBuffer = await mp3File.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const fileName = mp3File.name.replace(/[^a-z0-9._-]/gi, '_')
    const storagePath = `${orderId}/${fileName}`

    const { error: uploadError } = await serviceClient.storage
      .from('songs')
      .upload(storagePath, buffer, {
        contentType: 'audio/mpeg',
        upsert: true,
      })

    if (uploadError) {
      console.error('[complete] storage upload error', uploadError)
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
    }

    mp3StoragePath = storagePath
  }

  // Update order
  const { error: updateError } = await serviceClient
    .from('orders')
    .update({
      status,
      admin_notes: adminNotes,
      mp3_storage_path: mp3StoragePath,
      updated_at: new Date().toISOString(),
    })
    .eq('id', orderId)

  if (updateError) {
    console.error('[complete] update error', updateError)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }

  // Send "song ready" email when status is completed
  if (status === 'completed' && mp3StoragePath) {
    sendSongReadyEmail({
      to: order.customer_email,
      songTitle: order.song_title,
      downloadToken: order.download_token,
    }).catch((err) => console.error('[complete] email error', err))
  }

  return NextResponse.json({ success: true })
}
