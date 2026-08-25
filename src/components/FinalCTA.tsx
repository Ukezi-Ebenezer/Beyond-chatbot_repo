import React from 'react';
import { Sparkles, ArrowRight, Calendar, Clock, Video } from 'lucide-react';

interface FinalCTAProps {
  onRegisterClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onRegisterClick }) => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="final-cta-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Callout Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0c2457] via-[#12367d] to-[#1e40af] text-white p-8 sm:p-12 md:p-16 border border-blue-400/30 shadow-2xl overflow-hidden text-center">
          
          {/* Subtle Ambient Glowing Rings */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-blue-500/25 blur-3xl" />

          {/* Foreground Content */}
          <div className="relative z-10 max-w-3xl mx-auto">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md mb-6">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Limited Virtual Seats Available</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-4 leading-tight">
              Ready to Go Beyond Chatbots?
            </h2>

            <p className="text-base sm:text-xl text-blue-100/90 leading-relaxed mb-8 max-w-2xl mx-auto">
              Discover what intelligent AI workflows can do for your business.
            </p>

            {/* Event Time Reminders */}
            <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-blue-200 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/15 mb-8">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-cyan-300" /> 28 August 2026
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-cyan-300" /> 8:30 PM – 10:00 PM
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Video className="w-4 h-4 text-cyan-300" /> Online Session
              </span>
            </div>

            {/* Primary Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onRegisterClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white hover:bg-slate-100 text-[#0c2457] text-lg font-black shadow-xl hover:shadow-2xl hover:scale-105 active:scale-98 transition-all cursor-pointer"
                id="final-cta-register-button"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-5 h-5 text-[#2563eb]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
