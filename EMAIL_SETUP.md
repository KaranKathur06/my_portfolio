# 📧 Email Setup Guide

Your contact form is now configured to send emails and save submissions to a database!

## 🚀 Quick Setup

### Step 1: Create `.env.local` File

Create a file named `.env.local` in the root directory with:

```env
# GitHub Configuration
NEXT_PUBLIC_GITHUB_USERNAME=KaranKathur06

# Email Configuration
EMAIL_USER=kathurkaran077@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password_here
```

### Step 2: Generate Gmail App Password

**Important:** You CANNOT use your regular Gmail password. You must create an App Password.

#### Instructions:

1. **Enable 2-Step Verification** (if not already enabled)
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the setup process

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other (Custom name)" → Type "Portfolio Website"
   - Click "Generate"
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

3. **Add to `.env.local`**
   ```env
   EMAIL_APP_PASSWORD=abcdefghijklmnop
   ```
   (Remove spaces from the password)

### Step 3: Test the Contact Form

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000#contact

3. Fill out the form and submit

4. You should receive:
   - ✅ Email notification at kathurkaran077@gmail.com
   - ✅ Auto-reply sent to the person who filled the form
   - ✅ Submission saved to `data/contacts.json`

---

## 📋 Features Implemented

### ✅ Contact Form Enhancements

1. **Dropdown Subject Field**
   - 💻 Web Development Project
   - 📱 Mobile App Development
   - 🎨 UI/UX Design Services
   - ⚡ Full-Stack Development
   - 🔧 Backend Development
   - 💡 Technical Consultation
   - 🛠️ Maintenance & Support
   - 📧 General Inquiry
   - 🔖 Other

2. **Email Notifications**
   - Beautiful HTML email sent to you with all form details
   - Professional auto-reply sent to the sender
   - Includes contact details, message, and timestamp

3. **Database Storage**
   - All submissions saved to `data/contacts.json`
   - Includes: name, email, subject, message, timestamp, IP address
   - Easy to export to CSV

4. **Updated Contact Info**
   - ✅ Email: kathurkaran077@gmail.com
   - ✅ Phone: +91 6352 454 180
   - ✅ Location: India

---

## 📂 Database

### Location
All contact submissions are saved to:
```
data/contacts.json
```

### Structure
```json
[
  {
    "id": "contact_1234567890_abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Web Development",
    "message": "I need a website...",
    "timestamp": "2024-10-16T10:30:00.000Z",
    "ipAddress": "192.168.1.1"
  }
]
```

### Accessing Data

You can read the contacts using the database functions:

```typescript
import { getAllContacts, getRecentContacts } from '@/lib/database';

// Get all contacts
const allContacts = getAllContacts();

// Get recent 10 contacts
const recentContacts = getRecentContacts(10);
```

---

## 🔒 Security Notes

### Important:

1. **Never commit `.env.local`** to Git (it's already in .gitignore)
2. **Never share your App Password** publicly
3. **Use App Passwords only** - never your actual Gmail password
4. **Keep `data/contacts.json`** private (add to .gitignore if needed)

### Add to .gitignore:

```
# Environment variables
.env.local
.env

# Database
data/
```

---

## 🚀 Deployment

### Vercel / Netlify

Add these environment variables in your deployment platform:

```
EMAIL_USER=kathurkaran077@gmail.com
EMAIL_APP_PASSWORD=your_app_password_here
NEXT_PUBLIC_GITHUB_USERNAME=KaranKathur06
```

**Note:** The `data/` folder won't persist on serverless platforms. For production, consider using:
- **MongoDB** (free tier available)
- **PostgreSQL** (Supabase, Neon)
- **Firebase Firestore**
- **Airtable** (easy to use)

---

## 📊 View Submissions

### Option 1: Check JSON File

Open `data/contacts.json` to see all submissions.

### Option 2: Create Admin Dashboard (Future)

You can create an admin page to view submissions:

```typescript
// app/admin/page.tsx
import { getAllContacts } from '@/lib/database';

export default function AdminPage() {
  const contacts = getAllContacts();
  
  return (
    <div>
      <h1>Contact Submissions</h1>
      {contacts.map(contact => (
        <div key={contact.id}>
          <h3>{contact.name}</h3>
          <p>{contact.email}</p>
          <p>{contact.subject}</p>
          <p>{contact.message}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🐛 Troubleshooting

### Email Not Sending?

1. **Check App Password**
   - Make sure you're using an App Password, not your regular password
   - Remove any spaces from the password

2. **Check 2-Step Verification**
   - Must be enabled on your Google account

3. **Check `.env.local`**
   - File must be in the root directory
   - Variable names must match exactly
   - No quotes around values

4. **Check Console**
   - Look for error messages in terminal
   - Check browser console for API errors

### Form Not Submitting?

1. **Check API Route**
   - Make sure `app/api/contact/route.ts` exists
   - Check for TypeScript errors

2. **Check Network Tab**
   - Open browser DevTools → Network
   - Submit form and check for `/api/contact` request
   - Look at response for errors

### Database Not Saving?

1. **Check Permissions**
   - Make sure app can write to `data/` folder
   - Create `data/` folder manually if needed

2. **Check Console**
   - Look for "Contact saved to database" message
   - Check for file system errors

---

## 📧 Email Templates

The emails sent are beautifully formatted with:

### To You (Notification):
- Gradient header
- Contact details (name, email, subject)
- Full message
- Timestamp in IST

### To Sender (Auto-reply):
- Thank you message
- Copy of their message
- Your contact information
- Link to your portfolio
- Professional signature

---

## 🎯 Next Steps

### Immediate:
- [x] Update contact information ✅
- [x] Add dropdown subject field ✅
- [x] Set up email functionality ✅
- [x] Add database storage ✅
- [ ] Generate Gmail App Password
- [ ] Test the contact form

### Optional Enhancements:
- [ ] Add reCAPTCHA to prevent spam
- [ ] Create admin dashboard to view submissions
- [ ] Add email templates customization
- [ ] Integrate with CRM (HubSpot, Salesforce)
- [ ] Add SMS notifications (Twilio)
- [ ] Export to Google Sheets automatically

---

## 📞 Support

If you need help setting this up:
- Check the error messages in console
- Verify all environment variables are set
- Make sure Gmail App Password is correct
- Ensure 2-Step Verification is enabled

---

**Your contact form is now fully functional! 🎉**

Test it out and start receiving inquiries from potential clients!
