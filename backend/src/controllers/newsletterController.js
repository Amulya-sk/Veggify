const { sendNewsletterWelcomeEmail } = require('../utils/emailService');

// Newsletter subscription handler
exports.subscribe = async (req, res) => {
    try {
        const { email, name } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        // Send welcome email
        try {
            await sendNewsletterWelcomeEmail(email, name);
        } catch (emailError) {
            console.error('Email sending failed, but subscription recorded:', emailError);
            // Continue even if email fails - don't block the subscription
        }

        // Here you could also save the subscription to database
        // const subscription = new Newsletter({ email, name });
        // await subscription.save();

        res.status(200).json({
            message: 'Thank you for subscribing! Check your email for a welcome message.',
            success: true
        });
    } catch (err) {
        console.error('Newsletter subscription error:', err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
