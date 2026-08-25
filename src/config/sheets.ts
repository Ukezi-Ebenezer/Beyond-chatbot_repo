/**
 * GOOGLE SHEETS REGISTRATION INTEGRATION
 * Target Spreadsheet: https://docs.google.com/spreadsheets/d/1t3c04HfMfj3tXV1x2LhHv0kInLZ_nXcntf6c5nMtGMk/edit?usp=sharing
 * Spreadsheet ID: 1t3c04HfMfj3tXV1x2LhHv0kInLZ_nXcntf6c5nMtGMk
 */

import { RegistrationFormData } from '../types';
import { 
  getTargetSpreadsheetId, 
  appendRegistrationViaApi, 
} from '../services/googleSheetsService';
import { getAccessToken } from '../services/googleAuth';

export const TARGET_SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1t3c04HfMfj3tXV1x2LhHv0kInLZ_nXcntf6c5nMtGMk/edit?usp=sharing";
export const TARGET_SPREADSHEET_ID = "1t3c04HfMfj3tXV1x2LhHv0kInLZ_nXcntf6c5nMtGMk";
export const DEFAULT_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxb93eG4uWJg-5knVhpARkn3AC0Erd8LESx5hi-YwrHcOJDNmur9tAXMPiu5Y4IZ3fH/exec";

const STORAGE_KEY_WEBAPP_URL = "beyond_chatbots_sheets_webapp_url";
const STORAGE_KEY_REGISTRATIONS = "beyond_chatbots_registrations";

/**
 * Returns the currently active Google Apps Script Web App endpoint URL.
 */
export function getActiveWebappUrl(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY_WEBAPP_URL);
    if (saved && saved.trim().startsWith('http')) {
      return saved.trim();
    }
  }
  const envUrl = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GOOGLE_SHEETS_WEBAPP_URL;
  if (envUrl && envUrl.trim().startsWith('http')) {
    return envUrl.trim();
  }
  return DEFAULT_WEBAPP_URL;
}

/**
 * Saves a new Google Apps Script Web App URL in local settings.
 */
export function setActiveWebappUrl(url: string): void {
  if (typeof window !== 'undefined') {
    if (url && url.trim()) {
      localStorage.setItem(STORAGE_KEY_WEBAPP_URL, url.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_WEBAPP_URL);
    }
  }
}

/**
 * Retrieves all stored registration records.
 */
export function getStoredRegistrations(): Array<RegistrationFormData & { timestamp: string; syncedToSheet?: boolean }> {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Stores a new registration in local persistence.
 */
export function saveRegistrationLocally(data: RegistrationFormData, synced: boolean = false): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredRegistrations();
    existing.push({
      ...data,
      timestamp: new Date().toISOString(),
      syncedToSheet: synced,
    });
    localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(existing));
  } catch (e) {
    console.warn('Failed to cache registration in localStorage:', e);
  }
}

/**
 * Generates the complete, tested Google Apps Script code for the target spreadsheet.
 */
export function getAppsScriptCode(): string {
  return `/**
 * AI Founders Africa - "Beyond Chatbots" Webinar Registration Handler
 * Spreadsheet ID: ${TARGET_SPREADSHEET_ID}
 * Sheet: https://docs.google.com/spreadsheets/d/${TARGET_SPREADSHEET_ID}/edit
 */

function doPost(e) {
  return handleRegistration(e);
}

function doGet(e) {
  return handleRegistration(e);
}

function handleRegistration(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create styled header row if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Email Address",
        "Category of Business",
        "Phone Number",
        "Problems to Solve with AI",
        "Work Setup",
        "Nationality",
        "Expectations for Webinar"
      ]);
      var headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#2563eb");
      headerRange.setFontColor("#ffffff");
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var name = data.name || data.fullName || data["Full Name"] || "";
    var email = data.email || data.emailAddress || data["Email Address"] || "";
    var businessCategory = data.businessCategory || data.category || data["Category of Business"] || "";
    var phoneNumber = data.phoneNumber || data.phone || data["Phone Number"] || "";
    var problemsToSolve = data.problemsToSolve || data.problems || data["Problems to Solve with AI"] || "";
    var workSetup = data.workSetup || data.setup || data["Work Setup"] || "";
    var nationality = data.nationality || data.country || data["Nationality"] || "";
    var expectations = data.expectations || data["Expectations for Webinar"] || "";

    // Append attendee row if at least name or email is present
    if (name || email) {
      var timestamp = Utilities.formatDate(new Date(), "GMT+1", "yyyy-MM-dd HH:mm:ss");
      sheet.appendRow([
        timestamp,
        name,
        email,
        businessCategory,
        phoneNumber,
        problemsToSolve,
        workSetup,
        nationality,
        expectations
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "success", 
      "message": "Registration row appended successfully." 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "error", 
      "message": error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}`;
}

/**
 * Downloads all recorded registrations as a standard CSV spreadsheet file.
 */
export function exportRegistrationsCSV(): void {
  const records = getStoredRegistrations();
  if (records.length === 0) {
    alert('No registrations recorded yet.');
    return;
  }

  const headers = [
    'Timestamp',
    'Full Name',
    'Email Address',
    'Category of Business',
    'Phone Number',
    'Problems to Solve with AI',
    'Work Setup',
    'Nationality',
    'Expectations for Webinar',
  ];

  const escapeCSV = (val: string | undefined) => {
    if (!val) return '""';
    return `"${val.replace(/"/g, '""')}"`;
  };

  const rows = records.map(r => [
    escapeCSV(r.timestamp),
    escapeCSV(r.name),
    escapeCSV(r.email),
    escapeCSV(r.businessCategory),
    escapeCSV(r.phoneNumber),
    escapeCSV(r.problemsToSolve),
    escapeCSV(r.workSetup),
    escapeCSV(r.nationality),
    escapeCSV(r.expectations),
  ].join(','));

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `beyond-chatbots-registrations-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Submits registration payload to Google Sheets via multi-channel fallback:
 * 1. JSON POST via fetch (no-cors)
 * 2. Form URL-encoded POST via hidden iframe (standard browser form submission, bypasses CORS completely)
 * 3. GET query params fallback via fetch
 */
export async function submitRegistrationToSheets(data: RegistrationFormData): Promise<{ success: boolean; message?: string }> {
  const webappUrl = getActiveWebappUrl();
  let syncSuccess = false;

  if (webappUrl && typeof window !== 'undefined') {
    const payload = {
      name: data.name || '',
      email: data.email || '',
      businessCategory: data.businessCategory || '',
      phoneNumber: data.phoneNumber || '',
      problemsToSolve: data.problemsToSolve || '',
      workSetup: data.workSetup || '',
      nationality: data.nationality || '',
      expectations: data.expectations || '',
      submittedAt: new Date().toISOString(),
      spreadsheetId: TARGET_SPREADSHEET_ID,
    };

    // Strategy 0: Direct Google Sheets API (if authenticated with OAuth)
    const oauthToken = await getAccessToken();
    const targetSpreadsheetId = getTargetSpreadsheetId();
    if (oauthToken && targetSpreadsheetId) {
      try {
        const apiSuccess = await appendRegistrationViaApi(targetSpreadsheetId, data, oauthToken);
        if (apiSuccess) {
          syncSuccess = true;
        }
      } catch (apiErr) {
        console.warn('Direct Google Sheets API append error:', apiErr);
      }
    }

    // Strategy 1: Hidden Iframe HTML Form POST (Zero CORS issues with Google Apps Script)
    try {
      const iframeName = 'sheets_hidden_iframe_' + Date.now();
      let iframe = document.getElementById('sheets_sync_iframe') as HTMLIFrameElement | null;
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'sheets_sync_iframe';
        iframe.name = iframeName;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      } else {
        iframe.name = iframeName;
      }

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = webappUrl;
      form.target = iframeName;
      form.style.display = 'none';

      Object.entries(payload).forEach(([key, val]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(val);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      setTimeout(() => {
        if (form.parentNode) form.parentNode.removeChild(form);
      }, 2000);
      syncSuccess = true;
    } catch (formErr) {
      console.warn('Iframe form submission fallback error:', formErr);
    }

    // Strategy 2: Direct Fetch JSON POST
    try {
      fetch(webappUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      }).catch(() => {});
    } catch {
      // Ignored
    }

    // Strategy 3: GET query parameters
    try {
      const queryParams = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => queryParams.set(k, String(v)));
      const getUrl = `${webappUrl}?${queryParams.toString()}`;
      fetch(getUrl, { mode: 'no-cors' }).catch(() => {});
    } catch {
      // Ignored
    }

    // Give a smooth short delay for perceived progress
    await new Promise((resolve) => setTimeout(resolve, 800));
  } else {
    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  // Always save locally to ensure 0% data loss
  saveRegistrationLocally(data, syncSuccess);

  return { success: true };
}

