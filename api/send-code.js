export default async function handler(req, res) {

  const token = process.env.ESKIZ_TOKEN;

  const { phone, code } = req.body;

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

  res.status(200).json(data);
}
