import fs from 'fs';
import path from 'path';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  ipAddress?: string;
}

const DB_FILE = path.join(process.cwd(), 'data', 'contacts.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read all contacts from database
export function getAllContacts(): ContactSubmission[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(DB_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts:', error);
    return [];
  }
}

// Save a new contact submission
export function saveContact(contact: Omit<ContactSubmission, 'id' | 'timestamp'>): ContactSubmission {
  try {
    ensureDataDir();
    const contacts = getAllContacts();
    
    const newContact: ContactSubmission = {
      ...contact,
      id: generateId(),
      timestamp: new Date().toISOString(),
    };
    
    contacts.push(newContact);
    fs.writeFileSync(DB_FILE, JSON.stringify(contacts, null, 2));
    
    return newContact;
  } catch (error) {
    console.error('Error saving contact:', error);
    throw error;
  }
}

// Generate unique ID
function generateId(): string {
  return `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get contacts by date range
export function getContactsByDateRange(startDate: Date, endDate: Date): ContactSubmission[] {
  const contacts = getAllContacts();
  return contacts.filter(contact => {
    const contactDate = new Date(contact.timestamp);
    return contactDate >= startDate && contactDate <= endDate;
  });
}

// Get recent contacts
export function getRecentContacts(limit: number = 10): ContactSubmission[] {
  const contacts = getAllContacts();
  return contacts
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

// Export contacts to CSV
export function exportToCSV(): string {
  const contacts = getAllContacts();
  if (contacts.length === 0) {
    return 'No contacts to export';
  }
  
  const headers = ['ID', 'Name', 'Email', 'Subject', 'Message', 'Timestamp'];
  const rows = contacts.map(contact => [
    contact.id,
    contact.name,
    contact.email,
    contact.subject,
    contact.message.replace(/\n/g, ' '),
    contact.timestamp,
  ]);
  
  const csv = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');
  
  return csv;
}
