import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { saveContact } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter for sending email
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_APP_PASSWORD, // Gmail App Password
      },
    });

    // Email to you (notification)
    const mailToYou = {
      from: process.env.EMAIL_USER,
      to: 'kathurkaran077@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #d946ef 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">New Contact Form Submission</h2>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
              <h3 style="color: #0ea5e9; margin: 0 0 10px 0;">Contact Details</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0ea5e9;">${email}</a></p>
              <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div>
              <h3 style="color: #0ea5e9; margin: 0 0 10px 0;">Message</h3>
              <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0; text-align: center;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Auto-reply email to sender
    const mailToSender = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Karan Kathur',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #d946ef 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">Thank You for Reaching Out!</h2>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p style="font-size: 16px; color: #333; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
            
            <p style="color: #666; line-height: 1.6;">
              Thank you for contacting me! I've received your message regarding <strong>"${subject}"</strong> and will get back to you as soon as possible.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
              <h3 style="color: #0ea5e9; margin: 0 0 10px 0; font-size: 14px;">Your Message:</h3>
              <p style="color: #666; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              I typically respond within 24-48 hours. In the meantime, feel free to check out my portfolio and recent projects.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://karankathur.dev" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #d946ef 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Visit My Portfolio
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0;">
              <p style="color: #666; margin: 5px 0;"><strong>Karan Kathur</strong></p>
              <p style="color: #666; margin: 5px 0;">Full-Stack Web & App Developer</p>
              <p style="color: #666; margin: 5px 0;">
                📧 <a href="mailto:kathurkaran077@gmail.com" style="color: #0ea5e9;">kathurkaran077@gmail.com</a>
              </p>
              <p style="color: #666; margin: 5px 0;">
                📱 <a href="tel:+916352454180" style="color: #0ea5e9;">+91 6352 454 180</a>
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailToYou);
    await transporter.sendMail(mailToSender);

    // Save to database
    const savedContact = saveContact({
      name,
      email,
      subject,
      message,
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
    });

    console.log('Contact saved to database:', savedContact.id);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
