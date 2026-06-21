export default async function handler(req, res) {
  try {
    const token = process.env.ESKIZ_TOKEN;

    // 🔥 FIX: безопасный парсинг body
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body || {};

    const { phone, code } = body;

    if (!phone || !code) {
      return res.status(400).json({
        error: "phone or code missing"
      });
    }

    const sms = await fetch(
      "https://notify.eskiz.uz/api/message/sms/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mobile_phone: phone,
          message: `Your BEANS verification code: ${code}`,
          from: "4546"
        })
      }
    );

    const data = await sms.json();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
