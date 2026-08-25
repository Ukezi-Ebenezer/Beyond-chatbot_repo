import React, { useState } from 'react';
import { CheckCircle2, Calendar, Clock, Video, Download, Share2, Sparkles, Check } from 'lucide-react';
import { RegistrationFormData } from '../types';

interface SuccessMessageProps {
  formData: RegistrationFormData;
  onReset: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ formData, onReset }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const eventDetails = {
    title: "BEYOND CHATBOTS: Turn Your Business Processes into Intelligent Workflows",
    description: `AI Founders Africa — "Beyond Chatbots" Webinar\n\nTurn your business processes into intelligent Workflows. Discover how AI-powered workflows can transform operations for African businesses and SMEs.\n\n📅 Date: Friday, 28 August 2026\n⏰ Time: 8:30 PM – 10:00 PM (WAT / GMT+1)\n📍 Location: Online Session\n\nHost: AI Founders Africa\nTheme: Build with AI. Solve African Problems. Grow Smarter.`,
    location: "Online Session (Live Webinar)",
    startTime: "20260828T193000Z", // 8:30 PM WAT (UTC+1) = 19:30 UTC
    endTime: "20260828T210000Z",   // 10:00 PM WAT (UTC+1) = 21:00 UTC
  };

  const generateGoogleCalendarUrl = () => {
    const text = encodeURIComponent(eventDetails.title);
    const dates = `${eventDetails.startTime}/${eventDetails.endTime}`;
    const details = encodeURIComponent(eventDetails.description);
    const location = encodeURIComponent(eventDetails.location);
    const ctz = encodeURIComponent("Africa/Lagos");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}&ctz=${ctz}`;
  };

  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AI Founders Africa//Beyond Chatbots Webinar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'SUMMARY:BEYOND CHATBOTS — AI Founders Africa Webinar',
      'DESCRIPTION:Turn your business processes into intelligent Workflows. Discover how AI-powered workflows help businesses move beyond chatbots.',
      'LOCATION:Online Session',
      'DTSTART:20260828T193000Z',
      'DTEND:20260828T210000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'beyond-chatbots-webinar.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'BEYOND CHATBOTS Webinar',
        text: 'Join me at the Beyond Chatbots webinar by AI Founders Africa on August 28, 2026!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-blue-200 shadow-xl max-w-2xl mx-auto text-center animate-in fade-in zoom-in-95 duration-300" id="registration-success-container">
      
      {/* Animated Checkmark Circle */}
      <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-25" />
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>
      </div>

      {/* Required Success Headlines */}
      <h3 className="font-display font-black text-3xl sm:text-4xl text-[#081e4b] mb-2 tracking-tight">
        You're Officially Registered!
      </h3>
      
      <p className="text-base sm:text-lg text-slate-700 max-w-lg mx-auto mb-8 leading-relaxed">
        You're all set for <span className="font-bold text-[#1d4ed8]">Beyond Chatbots</span>. We look forward to having you with us{formData.name ? `, ${formData.name}` : ''}.
      </p>

      {/* Event Details Reminder Pill */}
      <div className="bg-blue-50/90 rounded-2xl p-5 border border-blue-200/80 mb-8 text-left">
        <div className="text-xs font-bold text-[#1d4ed8] uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#2563eb]" />
          <span>Confirmed Webinar Details</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-semibold text-slate-500">Date</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">28 August 2026</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-semibold text-slate-500">Time</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">8:30 PM – 10:00 PM</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Video className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-semibold text-slate-500">Format</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">Online Session</div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-blue-200/60 text-xs text-slate-600">
          A calendar invitation and direct session link will also be sent to <strong className="text-slate-900">{formData.email}</strong>.
        </div>
      </div>

      {/* Calendar & Share Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-6">
        <a
          href={generateGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-sm font-bold shadow-md shadow-blue-500/20 active:scale-98 transition-all"
        >
          <Calendar className="w-4 h-4 text-cyan-200" />
          <span>Add to Google Calendar</span>
        </a>

        <button
          onClick={handleDownloadICS}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-sm font-semibold shadow-xs active:scale-98 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-600" />
          <span>Download .iCal File</span>
        </button>

        <button
          onClick={handleShare}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1d4ed8] text-sm font-semibold border border-blue-200/80 active:scale-98 transition-all cursor-pointer"
        >
          {copiedLink ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span>Invite a Teammate</span>
            </>
          )}
        </button>
      </div>

      <button
        onClick={onReset}
        className="text-xs text-slate-500 hover:text-slate-800 underline transition-colors cursor-pointer"
      >
        Register another attendee
      </button>

    </div>
  );
};
