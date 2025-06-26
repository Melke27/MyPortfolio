const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS with specific options
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// MongoDB Connection with retry logic
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        // Retry connection after 5 seconds
        setTimeout(connectDB, 5000);
    }
};

connectDB();

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' }
});

const Contact = mongoose.model('Contact', contactSchema);

// Subscriber Schema
const subscriberSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// Import blog routes
const blogRoutes = require('./routes/blogRoutes');

// Email configuration
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS
    }
});

// Routes
app.use('/api', blogRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date() });
});

app.post('/api/contact', async (req, res) => {
    try {
        console.log('Received contact form submission:', req.body);
        const { name, email, subject, message } = req.body;
        // Validate required fields
        if (!name || !email || !message) {
            console.error('Validation Error: Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.error('Validation Error: Invalid email format');
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }
        // Save to database
        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });
        await newContact.save();
        console.log('Contact form saved successfully');
        // Send email notification using Brevo SMTP
        try {
            await transporter.sendMail({
                from: process.env.BREVO_SMTP_USER, // Must match your Brevo SMTP user
                to: 'melkamuwako5@gmail.com', // Your notification email
                subject: `New Contact Form Submission from ${name}`,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `
            });
            console.log('Email notification sent via Brevo SMTP');
        } catch (emailError) {
            console.error('Error sending email via Brevo SMTP:', emailError);
            return res.status(500).json({
                success: false,
                message: 'Failed to send email notification. Please try again later.'
            });
        }
        res.status(201).json({ 
            success: true, 
            message: 'Message sent successfully!' 
        });
    } catch (error) {
        console.error('Error in /api/contact endpoint:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error: Failed to process message.' 
        });
    }
});

// Subscribe to Newsletter
app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            console.error('Validation Error: Email is required for subscription.');
            return res.status(400).json({ success: false, message: 'Email is required.' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.error('Validation Error: Invalid email format for subscription.');
            return res.status(400).json({ success: false, message: 'Invalid email format.' });
        }

        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            console.warn(`Subscription Warning: Email ${email} already subscribed.`);
            return res.status(409).json({ success: false, message: 'You are already subscribed!' });
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        // Send confirmation email if configured
        if (transporter) {
            try {
                await transporter.sendMail({
                    from: process.env.BREVO_SMTP_USER, // Must match your Brevo SMTP user
                    to: email,
                    subject: 'Thank you for subscribing!',
                    html: `
                        <h2>Hello!</h2>
                        <p>Thank you for subscribing to my newsletter. You will receive updates, articles, and resources directly to your inbox.</p>
                        <p>Best regards,<br/>Melkamu Wako</p>
                    `
                });
                console.log('Confirmation email sent to new subscriber:', email);
            } catch (emailError) {
                console.error('Error sending confirmation email:', emailError);
                // Do not fail the subscription if confirmation email fails
            }
        }

        res.status(201).json({ success: true, message: 'Subscription successful!' });
    } catch (error) {
        console.error('Error in /api/subscribe endpoint:', error);
        res.status(500).json({ success: false, message: 'Internal server error: Subscription failed.' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Global server error handler:', err);
    res.status(500).json({
        success: false,
        message: 'An unexpected internal server error occurred.'
    });
});

// Add this route near the top, after app initialization
app.get('/', (req, res) => {
  res.send('Portfolio backend is running!');
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Configured' : 'Not configured');
    console.log('Brevo SMTP configured:', !!transporter);
});