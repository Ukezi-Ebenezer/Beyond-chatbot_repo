import { RegistrationFormData } from '../types';
import { googleSignIn, getAccessToken, SCOPES } from './googleAuth';

export const SPREADSHEET_ID_STORAGE_KEY = 'beyond_chatbots_auto_spreadsheet_id';
export const SPREADSHEET_URL_STORAGE_KEY = 'beyond_chatbots_auto_spreadsheet_url';
export const SPREADSHEET_NAME_STORAGE_KEY = 'beyond_chatbots_auto_spreadsheet_name';

// Default / fallback spreadsheet ID provided by user
export const DEFAULT_SPREADSHEET_ID = '1t3c04HfMfj3tXV1x2LhHv0kInLZ_nXcntf6c5nMtGMk';
export const DEFAULT_SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${DEFAULT_SPREADSHEET_ID}/edit`;

export function getTargetSpreadsheetId(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(SPREADSHEET_ID_STORAGE_KEY);
    if (saved && saved.trim()) return saved.trim();
  }
  return DEFAULT_SPREADSHEET_ID;
}

export function getTargetSpreadsheetUrl(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(SPREADSHEET_URL_STORAGE_KEY);
    if (saved && saved.trim()) return saved.trim();
  }
  return DEFAULT_SPREADSHEET_URL;
}

export function getTargetSpreadsheetName(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(SPREADSHEET_NAME_STORAGE_KEY);
    if (saved && saved.trim()) return saved.trim();
  }
  return 'AI Founders Africa - Webinar Registrations';
}

export function saveTargetSpreadsheet(id: string, url: string, title?: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SPREADSHEET_ID_STORAGE_KEY, id);
    localStorage.setItem(SPREADSHEET_URL_STORAGE_KEY, url);
    if (title) localStorage.setItem(SPREADSHEET_NAME_STORAGE_KEY, title);
  }
}

/**
 * Ensures valid Google Access Token via Firebase Google Auth popup if not cached in memory.
 */
export async function obtainValidAccessToken(): Promise<string> {
  let token = await getAccessToken();
  if (!token) {
    const res = await googleSignIn();
    if (!res || !res.accessToken) {
      throw new Error('Google authorization was cancelled or failed.');
    }
    token = res.accessToken;
  }
  return token;
}

/**
 * Creates a brand new Google Spreadsheet in the user's Google Drive with styled headers.
 */
export async function createWebinarSpreadsheet(token?: string): Promise<{ id: string; url: string; title: string }> {
  const accessToken = token || (await obtainValidAccessToken());
  const title = `AI Founders Africa - Webinar Attendees (${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })})`;

  // 1. Create Spreadsheet with initial formatted headers
  const createResponse = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: title,
      },
      sheets: [
        {
          properties: {
            title: 'Attendees',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'Timestamp' } },
                    { userEnteredValue: { stringValue: 'Full Name' } },
                    { userEnteredValue: { stringValue: 'Email Address' } },
                    { userEnteredValue: { stringValue: 'Category of Business' } },
                    { userEnteredValue: { stringValue: 'Phone Number' } },
                    { userEnteredValue: { stringValue: 'Problems to Solve with AI' } },
                    { userEnteredValue: { stringValue: 'Work Setup' } },
                    { userEnteredValue: { stringValue: 'Nationality' } },
                    { userEnteredValue: { stringValue: 'Expectations for Webinar' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  });

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    throw new Error(`Google Sheets API Error (${createResponse.status}): ${errorText}`);
  }

  const sheetData = await createResponse.json();
  const spreadsheetId = sheetData.spreadsheetId;
  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // 2. Apply Header Styling & Column Width Formatting
  try {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 9,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.11, green: 0.31, blue: 0.85 }, // #1d4ed8
                  textFormat: {
                    foregroundColor: { red: 1, green: 1, blue: 1 },
                    bold: true,
                    fontSize: 11,
                  },
                  horizontalAlignment: 'LEFT',
                  verticalAlignment: 'MIDDLE',
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)',
            },
          },
          {
            updateDimensionProperties: {
              range: {
                sheetId: 0,
                dimension: 'ROWS',
                startIndex: 0,
                endIndex: 1,
              },
              properties: {
                pixelSize: 42,
              },
              fields: 'pixelSize',
            },
          },
        ],
      }),
    });
  } catch (styleErr) {
    console.warn('Could not apply extended styling to sheet:', styleErr);
  }

  // Store in LocalStorage
  saveTargetSpreadsheet(spreadsheetId, spreadsheetUrl, title);

  return {
    id: spreadsheetId,
    url: spreadsheetUrl,
    title: title,
  };
}

/**
 * Appends a new attendee row to the specified Google Sheet via Google Sheets REST API.
 */
export async function appendRegistrationViaApi(
  spreadsheetId: string,
  data: RegistrationFormData,
  accessToken: string
): Promise<boolean> {
  const timestamp = new Date().toLocaleString('en-GB', { 
    timeZone: 'Africa/Lagos',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }) + ' (WAT)';

  const rowValues = [
    timestamp,
    data.name || '',
    data.email || '',
    data.businessCategory || '',
    data.phoneNumber || '',
    data.problemsToSolve || '',
    data.workSetup || '',
    data.nationality || '',
    data.expectations || '',
  ];

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range: 'A1',
        majorDimension: 'ROWS',
        values: [rowValues],
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error('Failed to append row via Google Sheets API:', err);
    return false;
  }

  return true;
}
