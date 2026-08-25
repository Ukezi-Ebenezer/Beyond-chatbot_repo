import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Download, 
  Send, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  Play
} from 'lucide-react';
import { 
  TARGET_SPREADSHEET_URL, 
  TARGET_SPREADSHEET_ID, 
  getActiveWebappUrl, 
  setActiveWebappUrl, 
  getAppsScriptCode, 
  getStoredRegistrations, 
  exportRegistrationsCSV 
} from '../config/sheets';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({ isOpen, onClose }) => {
  const [webappUrl, setWebappUrlState] = useState('');
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');
  const [recordsCount, setRecordsCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setWebappUrlState(getActiveWebappUrl());
      setRecordsCount(getStoredRegistrations().length);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const scriptCode = getAppsScriptCode();

  const handleCopyScript = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleCopySheetUrl = () => {
    navigator.clipboard.writeText(TARGET_SPREADSHEET_URL);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveWebappUrl(webappUrl);
    setSaveStatus('Endpoint URL saved successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleTestConnection = async () => {
    if (!webappUrl) {
      setTestStatus('error');
      setTestMessage('Please enter your deployed Google Apps Script Web App URL first.');
      return;
    }

    setTestStatus('testing');
    setTestMessage('Sending test row to your Google Sheet...');

    try {
      await fetch(webappUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: 'Test Attendee (AI Founders Africa)',
          email: 'test@aifoundersafrica.com',
          businessCategory: 'Tech & Software Services',
          phoneNumber: '+234 800 000 0000',
          problemsToSolve: 'Testing live automated sync to Google Sheets',
          workSetup: 'With a Team',
          nationality: 'Nigeria',
          expectations: 'Verify Google Sheets automated row appending',
          submittedAt: new Date().toISOString(),
          spreadsheetId: TARGET_SPREADSHEET_ID,
        }),
        mode: 'no-cors',
      });

      setTestStatus('success');
      setTestMessage('Test row sent! Check your Google Sheet to verify the new row.');
    } catch (err) {
      setTestStatus('error');
      setTestMessage('Failed to reach the Web App endpoint. Check URL and deployment permissions.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" id="google-sheets-modal">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#081e4b]/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl my-auto z-10 bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0c2457] to-[#1e40af] text-white p-6 sm:p-7 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-inner">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold font-display">Google Sheets Integration</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                  Ready
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-200 mt-0.5">
                Automatically append every "Register Now" submission to your sheet row by row
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700">
          
          {/* Target Sheet Card */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Target Google Sheet
                </span>
                <div className="text-sm font-semibold text-slate-900 break-all font-mono">
                  Spreadsheet ID: {TARGET_SPREADSHEET_ID}
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={TARGET_SPREADSHEET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-bold shadow transition-all cursor-pointer"
                >
                  <span>Open Sheet</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleCopySheetUrl}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy Sheet URL"
                >
                  {copiedUrl ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick 1-Minute Setup Guide */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              1-Minute Setup: How to Enable Live Row-by-Row Appending
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col justify-between">
                <div>
                  <span className="inline-block w-6 h-6 rounded-full bg-[#2563eb] text-white font-bold text-center leading-6 mb-2">1</span>
                  <p className="font-semibold text-slate-900 mb-1">Open Apps Script</p>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    In your Google Sheet, click <strong>Extensions</strong> &rarr; <strong>Apps Script</strong>.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col justify-between">
                <div>
                  <span className="inline-block w-6 h-6 rounded-full bg-[#2563eb] text-white font-bold text-center leading-6 mb-2">2</span>
                  <p className="font-semibold text-slate-900 mb-1">Paste Code & Deploy</p>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Paste the script below. Click <strong>Deploy</strong> &rarr; <strong>New deployment</strong> &rarr; Type: <strong>Web app</strong> (Access: <em>Anyone</em>).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col justify-between">
                <div>
                  <span className="inline-block w-6 h-6 rounded-full bg-[#2563eb] text-white font-bold text-center leading-6 mb-2">3</span>
                  <p className="font-semibold text-slate-900 mb-1">Paste Web App URL</p>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Copy your Web App URL and paste it in the box below to activate live sync!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Web App URL Configuration Input */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 space-y-3">
            <form onSubmit={handleSaveUrl} className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Google Apps Script Web App URL (Optional / Recommended)
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  value={webappUrl}
                  onChange={(e) => setWebappUrlState(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-bold shadow transition-all cursor-pointer"
                  >
                    Save URL
                  </button>
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={testStatus === 'testing'}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Test Sync</span>
                  </button>
                </div>
              </div>

              {saveStatus && (
                <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                  <Check className="w-4 h-4" /> {saveStatus}
                </p>
              )}

              {testMessage && (
                <div className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                  testStatus === 'success' 
                    ? 'bg-emerald-100/80 text-emerald-800 border border-emerald-200' 
                    : testStatus === 'error'
                    ? 'bg-red-100/80 text-red-800 border border-red-200'
                    : 'bg-blue-100/80 text-blue-800 border border-blue-200'
                }`}>
                  {testStatus === 'success' && <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                  {testStatus === 'error' && <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />}
                  {testStatus === 'testing' && <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0" />}
                  <span>{testMessage}</span>
                </div>
              )}
            </form>
          </div>

          {/* Apps Script Code snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Google Apps Script Code (Ready to Copy)
              </span>
              <button
                type="button"
                onClick={handleCopyScript}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copiedScript ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-600" />
                    <span>Copy Script Code</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto max-h-52 border border-slate-800 leading-relaxed">
                <code>{scriptCode}</code>
              </pre>
            </div>
          </div>

          {/* Backup Storage & Export */}
          <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              <strong className="text-slate-700">{recordsCount}</strong> attendee registration{recordsCount === 1 ? '' : 's'} recorded in secure local backup.
            </div>

            <button
              type="button"
              onClick={exportRegistrationsCSV}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer border border-slate-300"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Export Submissions (.CSV)</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Zero-leak submission &bull; Protected Google Sheets pipeline
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
