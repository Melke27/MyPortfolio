const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const nodemailer = require('nodemailer');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../melkamu wako protfolio and landing page')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit if cannot connect to database
});

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
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Routes
app.use('/api/blogposts', blogRoutes);

app.post('/api/contact', async (req, res) => {
    try {
        console.log('Received contact form submission:', req.body);
        
        const { name, email, subject, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
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

        // Send email notification
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
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
            console.log('Email notification sent');
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // Don't fail the request if email fails
        }
        
        res.status(201).json({ 
            success: true, 
            message: 'Message sent successfully!' 
        });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error sending message. Please try again.' 
        });
    }
});

// Get all messages (admin route)
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

// Update message status
app.put('/api/messages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const message = await Contact.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: 'Error updating message' });
    }
});

// Subscribe to Newsletter
app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required.' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format.' });
        }

        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(409).json({ success: false, message: 'You are already subscribed!' });
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        // Optional: Send a confirmation email to the subscriber
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
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

        res.status(201).json({ success: true, message: 'Subscription successful!' });
    } catch (error) {
        console.error('Error subscribing:', error);
        res.status(500).json({ success: false, message: 'Subscription failed. Please try again later.' });
    }
});

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../melkamu wako protfolio and landing page/melkamu wako landing page.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 