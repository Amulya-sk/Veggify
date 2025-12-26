const nodemailer = require('nodemailer');


const createTransporter = () => {
 
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.warn('Email credentials not configured. Emails will be logged to console only.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass 
    }
  });
};


const sendNewsletterWelcomeEmail = async (email, name = '') => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@veggify.com',
    to: email,
    subject: 'Welcome to Veggify Newsletter! 🍽️',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌿 Welcome to Veggify Newsletter!</h1>
          </div>
          <div class="content">
            <h2>Hello ${name || 'Food Lover'}! 👋</h2>
            <p><strong>Thank you for subscribing to the Veggify Newsletter!</strong> You're now part of our community of food enthusiasts.</p>
            
            <h3>📬 What You'll Receive:</h3>
            <ul>
              <li>🍳 Weekly recipe collections from around the world</li>
              <li>📚 Cooking tips and techniques for all skill levels</li>
              <li>🎯 Seasonal ingredient guides and meal planning ideas</li>
              <li>👨‍🍳 Expert advice from professional chefs</li>
              <li>🌟 Exclusive content and early access to new features</li>
              <li>🎁 Special offers and community highlights</li>
            </ul>
            
            <p><strong>Get ready for delicious recipes delivered straight to your inbox!</strong></p>
            
            <p>We promise to keep your inbox fresh with quality content and never spam you.</p>
            
            <p>Happy Cooking! 🎉</p>
            <p><strong>The Veggify Team</strong></p>
          </div>
          <div class="footer">
            <p>You're receiving this email because you subscribed to Veggify Newsletter.</p>
            <p>© 2025 Veggify. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  if (!transporter) {
    console.log('📧 [EMAIL SIMULATION] Newsletter Welcome Email:');
    console.log(`To: ${email}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`Name: ${name || 'Not provided'}`);
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Newsletter welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending newsletter email:', error);
    throw error;
  }
};


const sendSignupWelcomeEmail = async (email, username) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@veggify.com',
    to: email,
    subject: 'Welcome to Veggify - Your Culinary Journey Begins! 🎉',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .feature-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #10b981; border-radius: 5px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌿 Welcome to Veggify!</h1>
          </div>
          <div class="content">
            <h2>Welcome aboard, ${username}! 🎊</h2>
            
            <p>Your account has been successfully created! We're excited to have you join the <strong>Veggify</strong> community.</p>
            
            <div class="feature-box">
              <h3>🎯 Your Account is Ready!</h3>
              <p>You can now access all the features of Veggify:</p>
              <ul>
                <li><strong>Browse Recipes:</strong> Discover thousands of delicious recipes from around the world</li>
                <li><strong>Create & Share:</strong> Upload and share your own favorite recipes with the community</li>
                <li><strong>Save Favorites:</strong> Build your personal recipe collection for easy access</li>
                <li><strong>Join Community:</strong> Connect with fellow food lovers and share cooking experiences</li>
                <li><strong>Get Inspired:</strong> Discover new cuisines, techniques, and cooking tips</li>
              </ul>
            </div>
            
            <div class="feature-box">
              <h3>🚀 Getting Started:</h3>
              <ol>
                <li>Log in to your account using your credentials</li>
                <li>Complete your profile to personalize your experience</li>
                <li>Start exploring recipes or create your first recipe</li>
                <li>Save your favorite recipes to your collection</li>
              </ol>
            </div>
            
            <p><strong>Pro Tip:</strong> Whether you're a beginner learning the basics, a home cook perfecting family recipes, or a pro chef sharing expertise - Veggify is designed for all skill levels!</p>
            
            <p>Need help getting started? Feel free to reach out to us at <a href="mailto:support@veggify.com">support@veggify.com</a></p>
            
            <p>Happy Cooking! 🎉</p>
            <p><strong>The Veggify Team</strong></p>
          </div>
          <div class="footer">
            <p>You're receiving this email because you created an account on Veggify.</p>
            <p>© 2025 Veggify. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  if (!transporter) {
    console.log('📧 [EMAIL SIMULATION] Signup Welcome Email:');
    console.log(`To: ${email}`);
    console.log(`Username: ${username}`);
    console.log(`Subject: ${mailOptions.subject}`);
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Signup welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending signup email:', error);
    throw error;
  }
};

module.exports = {
  sendNewsletterWelcomeEmail,
  sendSignupWelcomeEmail
};
