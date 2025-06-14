const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const nodemailer = require('nodemailer');

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '..')));

// Serve static files from the assets directory
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
    console.error('MongoDB connection error:', err);
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
app.use('/api', blogRoutes);

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

        // Email sending temporarily commented out for debugging
        /*
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
        */
        
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

// Get all messages (admin route)
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        console.error('Error in /api/messages endpoint:', error);
        res.status(500).json({ message: 'Internal server error: Error fetching messages.' });
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
            console.warn(`Message with ID ${id} not found for update.`);
            return res.status(404).json({ message: 'Message not found' });
        }
        
        res.json(message);
    } catch (error) {
        console.error('Error in /api/messages/:id endpoint:', error);
        res.status(500).json({ message: 'Internal server error: Error updating message.' });
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

        // Email sending temporarily commented out for debugging
        /*
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
        */

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

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from backend API test endpoint!' });
}); 