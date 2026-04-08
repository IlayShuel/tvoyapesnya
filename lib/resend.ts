import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

function getFrom() { return process.env.FROM_EMAIL ?? 'noreply@example.com' }
function getAppUrl() { return process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000' }
function getOwnerEmail() { return process.env.OWNER_EMAIL ?? '' }

type EmailResult = { success: true } | { success: false; error: unknown }

function getPackageName(amountCents: number): { ru: string; en: string } {
  if (amountCents >= 4900) return { ru: 'Премиум ($49)', en: 'Premium ($49)' }
  return { ru: 'Стандарт ($29)', en: 'Standard ($29)' }
}

export async function sendOrderConfirmationEmail({
  to,
  songTitle,
  genre,
  mood,
  amountPaidCents,
}: {
  to: string
  songTitle: string
  genre: string
  mood: string[]
  amountPaidCents?: number
}): Promise<EmailResult> {
  const pkg = amountPaidCents ? getPackageName(amountPaidCents) : { ru: 'Стандарт', en: 'Standard' }

  try {
    await getResend().emails.send({
      from: getFrom(),
      to,
      subject: `Заказ принят — ${songTitle}`,
      html: `
<!DOCTYPE html>
<html>
<body style="font-family: 'Nunito', -apple-system, sans-serif; background: #FDF6EE; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <tr><td>
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="font-size: 28px; font-weight: 700; margin: 0; color: #E8826A; font-family: Georgia, serif;">🎵 ТвояПесня</h1>
      </div>
      <div style="background: white; border-radius: 20px; padding: 32px; box-shadow: 0 4px 18px rgba(92,61,46,0.07); border: 1px solid rgba(232,130,106,0.1);">
        <h2 style="font-family: Georgia, serif; font-size: 22px; font-weight: 700; color: #3D2314; margin: 0 0 8px 0;">Заказ принят! 🎉</h2>
        <p style="color: #7A5240; margin: 0 0 24px 0; font-size: 15px; line-height: 1.6;">Мы уже приступили к созданию вашей персональной песни. Ожидайте — скоро пришлём её на эту почту.</p>
        <div style="background: #F5EDE4; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #A87860; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">ВАШ ЗАКАЗ</p>
          <p style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700; color: #3D2314; font-family: Georgia, serif;">${songTitle}</p>
          <p style="margin: 0 0 4px 0; color: #7A5240; font-size: 14px;">${genre} · ${mood.join(', ')}</p>
          <p style="margin: 0; color: #A87860; font-size: 13px; font-weight: 600;">Пакет: ${pkg.ru}</p>
        </div>
        <p style="color: #A87860; font-size: 14px; margin: 0; line-height: 1.7;">Ваша песня будет готова в течение <strong>${amountPaidCents && amountPaidCents >= 4900 ? '12 часов' : '24–48 часов'}</strong>. Мы пришлём вам письмо с приватной ссылкой для прослушивания и скачивания.</p>
      </div>
      <p style="text-align: center; color: #A87860; font-size: 12px; margin-top: 24px;">ТвояПесня · Персональные песни · Сделано с ❤️ в Израиле</p>
    </td></tr>
  </table>
</body>
</html>`.trim(),
    })
    return { success: true }
  } catch (error) {
    console.error('[resend] sendOrderConfirmationEmail failed', error)
    return { success: false, error }
  }
}

export async function sendSongReadyEmail({
  to,
  songTitle,
  downloadToken,
}: {
  to: string
  songTitle: string
  downloadToken: string
}): Promise<EmailResult> {
  const downloadUrl = `${getAppUrl()}/download/${downloadToken}`

  try {
    await getResend().emails.send({
      from: getFrom(),
      to,
      subject: `Ваша песня готова — ${songTitle}`,
      html: `
<!DOCTYPE html>
<html>
<body style="font-family: 'Nunito', -apple-system, sans-serif; background: #FDF6EE; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <tr><td>
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="font-size: 28px; font-weight: 700; margin: 0; color: #E8826A; font-family: Georgia, serif;">🎵 ТвояПесня</h1>
      </div>
      <div style="background: white; border-radius: 20px; padding: 32px; box-shadow: 0 4px 18px rgba(92,61,46,0.07); border: 1px solid rgba(232,130,106,0.1); text-align: center;">
        <div style="font-size: 48px; margin-bottom: 16px;">🎶</div>
        <h2 style="font-family: Georgia, serif; font-size: 24px; font-weight: 700; color: #3D2314; margin: 0 0 8px 0;">Ваша песня готова!</h2>
        <p style="color: #7A5240; font-size: 16px; font-weight: 600; margin: 0 0 6px 0; font-family: Georgia, serif; font-style: italic;">${songTitle}</p>
        <p style="color: #A87860; font-size: 14px; margin: 0 0 32px 0; line-height: 1.7;">Нажмите кнопку ниже, чтобы прослушать и скачать вашу персональную песню.</p>
        <a href="${downloadUrl}" style="display: inline-block; background: #E8826A; color: white; text-decoration: none; padding: 14px 36px; border-radius: 50px; font-weight: 700; font-size: 16px; box-shadow: 0 5px 22px rgba(232,130,106,0.4);">🎵 Слушать и скачать</a>
        <p style="color: #A87860; font-size: 12px; margin-top: 20px;">Или перейдите по ссылке: <span style="color: #7A5240;">${downloadUrl}</span></p>
      </div>
      <p style="text-align: center; color: #A87860; font-size: 12px; margin-top: 24px;">ТвояПесня · Персональные песни · Сделано с ❤️ в Израиле</p>
    </td></tr>
  </table>
</body>
</html>`.trim(),
    })
    return { success: true }
  } catch (error) {
    console.error('[resend] sendSongReadyEmail failed', error)
    return { success: false, error }
  }
}

export async function sendNewOrderAlertEmail({
  orderId,
  customerEmail,
  songTitle,
  genre,
  mood,
  lyrics,
  amountPaidCents,
}: {
  orderId: string
  customerEmail: string
  songTitle: string
  genre: string
  mood: string[]
  lyrics: string
  amountPaidCents: number
}): Promise<EmailResult> {
  const ownerEmail = getOwnerEmail()
  if (!ownerEmail) {
    console.warn('[resend] OWNER_EMAIL not set — skipping owner notification')
    return { success: true }
  }

  const pkg = getPackageName(amountPaidCents)
  const adminUrl = `${getAppUrl()}/admin/dashboard/${orderId}`
  const amountFormatted = `$${(amountPaidCents / 100).toFixed(2)}`

  try {
    await getResend().emails.send({
      from: getFrom(),
      to: ownerEmail,
      subject: `🎵 New Order: ${songTitle} — ${pkg.en}`,
      html: `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f4f5; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <tr><td>
      <div style="background: #18181b; border-radius: 12px; padding: 24px 28px; margin-bottom: 16px;">
        <h1 style="font-size: 20px; font-weight: 700; margin: 0; color: #E8826A;">🎵 New Order Received</h1>
        <p style="color: #a1a1aa; margin: 6px 0 0 0; font-size: 14px;">ТвояПесня · Order Alert</p>
      </div>

      <div style="background: white; border-radius: 12px; padding: 28px; margin-bottom: 12px; border: 1px solid #e4e4e7;">
        <h2 style="font-size: 16px; font-weight: 700; color: #18181b; margin: 0 0 20px 0; padding-bottom: 12px; border-bottom: 2px solid #f4f4f5;">Order Details</h2>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f5; width: 38%;">
              <span style="font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Order ID</span>
            </td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f5;">
              <span style="font-size: 13px; color: #3f3f46; font-family: monospace;">${orderId}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f5;">
              <span style="font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Customer Email</span>
            </td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f5;">
              <span style="font-size: 13px; color: #3f3f46;">${customerEmail}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f5;">
              <span style="font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Song Title</span>
            </td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f5;">
              <span style="font-size: 14px; font-weight: 700; color: #18181b;">${songTitle}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f5;">
              <span style="font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Genre</span>
            </td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f5;">
              <span style="font-size: 13px; color: #3f3f46;">${genre}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f5;">
              <span style="font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Mood Tags</span>
            </td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f5;">
              <span style="font-size: 13px; color: #3f3f46;">${mood.join(' · ')}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f5;">
              <span style="font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Package</span>
            </td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4f4f5;">
              <span style="font-size: 13px; font-weight: 700; color: #E8826A;">${pkg.en}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <span style="font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Amount Paid</span>
            </td>
            <td style="padding: 8px 0;">
              <span style="font-size: 14px; font-weight: 700; color: #16a34a;">${amountFormatted}</span>
            </td>
          </tr>
        </table>
      </div>

      <div style="background: white; border-radius: 12px; padding: 28px; margin-bottom: 16px; border: 1px solid #e4e4e7;">
        <h2 style="font-size: 16px; font-weight: 700; color: #18181b; margin: 0 0 12px 0;">Customer Brief / Song Instructions</h2>
        <div style="background: #fafafa; border-left: 3px solid #E8826A; border-radius: 4px; padding: 16px; white-space: pre-wrap; font-size: 14px; color: #3f3f46; line-height: 1.7;">${lyrics.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </div>

      <div style="text-align: center; padding: 8px 0;">
        <a href="${adminUrl}" style="display: inline-block; background: #E8826A; color: white; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 700; font-size: 14px;">Open in Admin Dashboard →</a>
      </div>
    </td></tr>
  </table>
</body>
</html>`.trim(),
    })
    return { success: true }
  } catch (error) {
    console.error('[resend] sendNewOrderAlertEmail failed', error)
    return { success: false, error }
  }
}
