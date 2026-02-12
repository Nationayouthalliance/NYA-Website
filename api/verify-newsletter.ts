import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false });
  }

  const { captchaToken, formData } = req.body;

  const secret = process.env.HCAPTCHA_SECRET;

  if (!secret) {
    return res.status(500).json({ success: false });
  }

  try {

    // 1️⃣ Verify captcha
    const captchaVerify = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: captchaToken
      }),
    });

    const captchaData = await captchaVerify.json();

    if (!captchaData.success) {
      return res.status(400).json({ success: false });
    }

    // 2️⃣ Forward to Brevo
    await fetch("https://9fc4f65d.sibforms.com/serve/MUIFAIWCEw388A7bsBPnyxU3MCpzvXyNcuBZYDAw2QMqn3S5V_a9zp8OJFkbZTjjbz1ivEU-_YWabHlL-l7XG_sZZQvjH8PBXLdqpO_KshoYX-Rz8FroYLSUPTL1Ccr-zhtySJsm5gVtiJc6eLtQ5P0Ih01V4Y_gTcetnsHNydUVKthsMx0XUHJqOBgdgXXTiMYUrqiegnqwhMRchA==", {
      method: "POST",
      body: new URLSearchParams(formData),
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ success: false });
  }
}
