import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  ExternalLink, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  Plus
} from 'lucide-react';
import { 
  createWebinarSpreadsheet, 
  getTargetSpreadsheetId, 
  getTargetSpreadsheetUrl,
  getTargetSpreadsheetName
} from '../services/googleSheetsService';
import { googleSignIn } from '../services/googleAuth';

export const AutoGoogleSheetCreator: React.FC = () => {
  const [spreadsheetId, setSpreadsheetId] = useState<string>(getTargetSpreadsheetId());
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string>(getTargetSpreadsheetUrl());
  const [sheetName, setSheetName] = useState<string>(getTargetSpreadsheetName());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    setSpreadsheetId(getTargetSpreadsheetId());
    setSpreadsheetUrl(getTargetSpreadsheetUrl());
    setSheetName(getTargetSpreadsheetName());
  }, []);

  const handleCreateAutoSheet = async () => {
    setIsLoading(true);
    setStatusMessage({ type: 'info', text: 'Opening Google authorization to create your sheet...' });

    try {
      // 1. Trigger Firebase Google Auth popup for Workspace scopes
      const authResult = await googleSignIn();
      if (!authResult || !authResult.accessToken) {
        throw new Error('Google authorization was cancelled or failed.');
      }

      setStatusMessage({ type: 'info', text: 'Creating formatted Google Sheet in your Drive...' });

      // 2. Create the spreadsheet via Google Sheets REST API
      const newSheet = await createWebinarSpreadsheet(authResult.accessToken);
      setSpreadsheetId(newSheet.id);
      setSpreadsheetUrl(newSheet.url);
      setSheetName(newSheet.title);
      
      setStatusMessage({
        type: 'success',
        text: `Created "${newSheet.title}" in your Google Drive! New form submissions will now sync here.`,
      });
    } catch (err: any) {
      console.error('Create sheet error:', err);
      let msg = err.message || 'Unable to create spreadsheet.';
      if (msg.includes('popup-closed-by-user')) {
        msg = 'Authorization window was closed. Click the button again to retry.';
      } else if (msg.includes('popup-blocked')) {
        msg = 'Popup was blocked by browser. Please allow popups for this site and try again.';
      }
      setStatusMessage({
        type: 'error',
        text: msg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/90 to-indigo-50/90 border border-blue-200/80 shadow-xs" id="auto-sheet-integration-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#091e42]">
                Google Sheets Destination
              </h4>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                Live Sync
              </span>
            </div>
            <p className="text-xs text-slate-600 truncate max-w-xs sm:max-w-sm" title={sheetName}>
              {sheetName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={handleCreateAutoSheet}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer disabled:opacity-60"
            id="create-new-sheet-button"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Sheet in My Drive</span>
              </>
            )}
          </button>

          <a
            href={spreadsheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold shadow-2xs transition-colors shrink-0"
            id="view-live-spreadsheet-link"
          >
            <span>Open Sheet</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

      </div>

      {statusMessage && (
        <div className={`mt-3 p-2.5 rounded-xl text-xs flex items-center gap-2 ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
            : statusMessage.type === 'error'
            ? 'bg-red-50 text-red-800 border border-red-200'
            : 'bg-blue-50 text-blue-800 border border-blue-200'
        }`}>
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          ) : statusMessage.type === 'error' ? (
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          ) : (
            <Loader2 className="w-4 h-4 shrink-0 animate-spin text-blue-600" />
          )}
          <span className="leading-snug">{statusMessage.text}</span>
        </div>
      )}
    </div>
  );
};
