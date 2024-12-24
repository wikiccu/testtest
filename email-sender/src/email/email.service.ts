import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EmailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      attachDataUrls: true,
    });
  }

  async sendEmail(email: string, subject: string, text: string): Promise<void> {
    const emailContent = typeof text === 'object' ? JSON.stringify(text) : text;
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject,
        text: emailContent,
      });

      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
      throw error;
    }
  }
}
