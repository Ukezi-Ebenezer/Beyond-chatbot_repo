import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onContinue: () => void;
  attendeeName?: string;
}

export const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/Hc5qS3m6UF9IiBSk0GNpJg?utm_source=chatgpt.com";

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onContinue,
  attendeeName,
}) => {
  const [hasClickedJoin, setHasClickedJoin] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onContinue();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onContinue]);

  if (!isOpen) return null;

  const handleJoinClick = () => {
    setHasClickedJoin(true);
    window.open(WHATSAPP_GROUP_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto"
        id="whatsapp-step-modal-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onContinue();
          }
        }}
      >
        {/* Centered Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg max-h-[92dvh] overflow-y-auto bg-gradient-to-b from-white via-blue-50/30 to-white rounded-3xl border border-blue-200/90 shadow-2xl shadow-blue-950/30 text-center p-5 sm:p-8 my-auto"
          id="whatsapp-step-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-step-title"
        >
          {/* Top Decorative Glowing AI Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#059669]" />
          
          {/* Subtle Ambient Glow Behind Icon */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* WhatsApp / Notification Badge Visual */}
          <div className="relative mx-auto w-14 h-14 sm:w-20 sm:h-20 mb-4 sm:mb-5 flex items-center justify-center">
            {/* Animated Pulse Ring */}
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping pointer-events-none" />
            
            {/* Green WhatsApp Circle */}
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 border border-emerald-300/40">
              <MessageSquare className="w-7 h-7 sm:w-10 sm:h-10 fill-current/20 stroke-[2.2]" />
            </div>

            {/* Notification Badge Floating on Top Corner */}
            <span className="absolute -top-1 -right-1 flex h-5 w-5 sm:h-6 sm:w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 sm:h-6 sm:w-6 bg-amber-500 text-white text-[10px] sm:text-[11px] font-black items-center justify-center shadow-md">
                1
              </span>
            </span>
          </div>

          {/* Step Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Helpful Final Step</span>
          </div>

          {/* Popup Headline */}
          <h3 
            id="whatsapp-step-title" 
            className="font-display font-black text-xl sm:text-3xl text-[#081e4b] tracking-tight mb-2 sm:mb-3"
          >
            One More Step — Don't Miss Out!
          </h3>

          {/* Supporting Message */}
          <p className="text-xs sm:text-base text-slate-700 leading-relaxed max-w-md mx-auto mb-4 sm:mb-6">
            {attendeeName ? `${attendeeName}, your` : 'Your'} registration has been received. To make sure you don't miss important webinar updates, reminders, access details, and announcements, join our official WhatsApp community.
          </p>

          {/* Community Preview / Benefit Chips */}
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-3 sm:p-4 border border-blue-100 shadow-xs mb-5 sm:mb-6 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Direct webinar access link & last-minute updates</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Session materials, live Q&A reminders & AI templates</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Network with other African founders and operators</span>
            </div>
          </div>

          {/* Primary CTA: JOIN THE WHATSAPP GROUP */}
          <div className="space-y-3">
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleJoinClick}
              id="join-whatsapp-primary-btn"
              className="w-full inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-display font-bold text-sm sm:text-lg shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 active:scale-[0.98] transition-all cursor-pointer group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <MessageSquare className="w-5 h-5 fill-white/20" />
              <span className="tracking-wide">JOIN THE WHATSAPP GROUP</span>
              <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Extra Conversion Microcopy */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                We’ll only share webinar-related updates.
              </span>
              <span className="hidden sm:inline">•</span>
              <span>One-click to join</span>
            </div>

            {/* Secondary CTA: I've Joined — Continue */}
            <div className="pt-1">
              <button
                type="button"
                onClick={onContinue}
                id="whatsapp-step-continue-btn"
                className={`w-full inline-flex items-center justify-center gap-2 min-h-[44px] py-2.5 px-5 rounded-xl text-sm font-semibold transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  hasClickedJoin 
                    ? 'bg-blue-50 hover:bg-blue-100 text-[#1d4ed8] border border-blue-200 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <span>I've Joined — Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
