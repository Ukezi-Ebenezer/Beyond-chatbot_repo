import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Calendar, Clock, Video } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-blue-100 py-12 text-slate-600" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-100 text-center md:text-left">
          
          {/* Logo and Brand Summary */}
          <div className="flex flex-col items-center md:items-start">
            <BrandLogo size="md" showBadge={true} />
            
            <div className="mt-4">
              <div className="font-display font-extrabold text-base text-[#081e4b] tracking-tight">
                BEYOND CHATBOTS
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Turn your business processes into intelligent Workflows
              </div>
            </div>
          </div>

          {/* Session Timing Pill */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700 bg-blue-50/80 px-5 py-3 rounded-2xl border border-blue-150">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#2563eb]" />
              <span>28 August 2026</span>
            </div>
            <span className="hidden sm:inline text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0284c7]" />
              <span>8:30 PM – 10:00 PM</span>
            </div>
            <span className="hidden sm:inline text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <Video className="w-4 h-4 text-[#4338ca]" />
              <span>Online Session</span>
            </div>
          </div>

        </div>

        {/* Integration Bar & Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© 2026 AI Founders Africa. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
            <a href="#what-you-will-learn" className="hover:text-slate-900 transition-colors">Curriculum</a>
            <a href="#who-should-attend" className="hover:text-slate-900 transition-colors">Audience</a>
            <a href="#register" className="hover:text-slate-900 transition-colors">Register</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
