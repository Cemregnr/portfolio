# EmailJS Setup Instructions for Contact Form

## Quick Setup Guide

### 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up with cemreegnr9@gmail.com or create new account

### 2. Add Email Service  
1. Click "Email Services" → "Add New Service"
2. Choose "Gmail" 
3. Connect your Gmail account (cemreegnr9@gmail.com)
4. **Copy the Service ID** (looks like: service_abc123)

### 3. Create Email Template
1. Go to "Email Templates" → "Create New Template"
2. Set template content:
```
Subject: New Contact Form Message from {{from_name}}

Hello,

You received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}} 
Message: {{message}}

Best regards,
Your Portfolio Contact Form
```
3. **Copy the Template ID** (looks like: template_abc123)

### 4. Get Public Key
1. Go to "Account" → "General" 
2. **Copy your Public Key** (looks like: abc123def456)

### 5. Update .env.local
Replace the xxx values in .env.local with your actual IDs:
```
NEXT_PUBLIC_SERVICE_ID=service_abc123
NEXT_PUBLIC_TEMPLATE_ID=template_abc123  
NEXT_PUBLIC_PUBLIC_KEY=abc123def456
```

### 6. Restart Server
```
npm run dev
```

### 7. Test Contact Form
- Go to http://localhost:3000/iletisim
- Fill out form and submit
- Check cemreegnr9@gmail.com for email

## Template Variables Used:
- `{{from_name}}` - User's name from form
- `{{from_email}}` - User's email from form  
- `{{message}}` - User's message from form

## Next Steps:
Once configured, emails from contact form will be sent directly to cemreegnr9@gmail.com

All emails will be sent to cemreegnr9@gmail.com automatically.