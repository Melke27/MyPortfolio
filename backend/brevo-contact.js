const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SibApiV3Sdk = require('@sendinblue/client');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// IMPORTANT: Set your Brevo API key in an environment variable for security
const apiKey = process.env.BREVO_API_KEY || 'YOUR_BREVO_API_KEY'; // Replace with your real API key or set in Render dashboard

app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const client = new SibApiV3Sdk.TransactionalEmailsApi();
  client.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey);

  try {
    await client.sendTransacEmail({
      sender: { email: email, name: name },
      to: [{ email: 'melkamuwako5@gmail.com', name: 'Melkamu Wako' }],
      subject: subject || 'New Contact Form Submission',
      htmlContent: `<p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong><br>${message}</p>`
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Brevo contact server running on port ${PORT}`));
}

module.exports = app; 