import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY!)

const FROM = process.env.FROM_EMAIL ?? 'noreply@example.com'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export async function sendOrderConfirmationEmail({
  to,
  songTitle,
  genre,
  mood,
}: {
  to: string
  songTitle: string
  genre: string
  mood: string[]
}) {
  await resend.emails.send({
    from: FROM,
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
        <div style="background: #F5EDE4; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #A87860; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">ВАШ ЗАКАЗ</p>
          <p style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700; color: #3D2314; font-family: Georgia, serif;">${songTitle}</p>
          <p style="margin: 0; color: #7A5240; font-size: 14px;">${genre} · ${mood.join(', ')}</p>
        </div>
        <p style="color: #A87860; font-size: 14px; margin: 0; line-height: 1.7;">Ваша песня будет готова в течение <strong>24–48 часов</strong>. Мы пришлём вам письмо с приватной ссылкой для прослушивания и скачивания.</p>
      </div>
      <p style="text-align: center; color: #A87860; font-size: 12px; margin-top: 24px;">ТвояПесня · Персональные песни · Сделано с ❤️ в Израиле</p>
    </td></tr>
  </table>
</body>
</html>`.trim(),
  })
}

export async function sendSongReadyEmail({
  to,
  songTitle,
  downloadToken,
}: {
  to: string
  songTitle: string
  downloadToken: string
}) {
  const downloadUrl = `${APP_URL}/download/${downloadToken}`

  await resend.emails.send({
    from: FROM,
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
}
