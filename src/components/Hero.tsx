import React from 'react';
import { Calendar, Clock, Video, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { AIOrbit } from './AIOrbit';
import { CountdownTimer } from './CountdownTimer';

interface HeroProps {
  onRegisterClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  return (
    <section className="relative pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24 overflow-hidden" id="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop 2-column, Mobile stacked layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Core Webinar Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col text-left">
            
            {/* Live Event Indicator Pill */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-blue-100/90 border border-blue-200/80 text-[#1d4ed8] text-xs sm:text-sm font-semibold tracking-wide shadow-xs mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE INTERACTIVE WEBINAR</span>
              <span className="text-blue-300">•</span>
              <span className="font-bold text-[#0f2147]">AI Founders Africa</span>
            </div>

            {/* Main Title matching flyer */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#081e4b] leading-[1.08] mb-3">
              BEYOND CHATBOTS
            </h1>

            {/* Subtitle from flyer */}
            <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#2563eb] leading-snug mb-4">
              Turn your business processes into intelligent Workflows
            </p>

            {/* Supporting Statement */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mb-6">
              Discover how AI-powered workflows can help businesses move beyond basic chatbots, automate repetitive processes, improve productivity, and create smarter ways of working.
            </p>

            {/* Dynamic Countdown Timer */}
            <CountdownTimer />

            {/* Event Info Cards (Flyer Exact Match Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 mb-8">
              
              {/* Date Card */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-blue-100 shadow-sm flex items-center gap-3.5 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-[#1d4ed8] flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</div>
                  <div className="text-base font-extrabold text-[#081e4b] leading-tight">28 August 2026</div>
                </div>
              </div>

              {/* Time Card */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-blue-100 shadow-sm flex items-center gap-3.5 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-200/60 flex items-center justify-center text-[#0284c7] flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</div>
                  <div className="text-base font-extrabold text-[#081e4b] leading-tight">8:30 PM – 10:00 PM</div>
                </div>
              </div>

              {/* Format Card (with Google Meet style icon) */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-blue-100 shadow-sm flex items-center gap-3.5 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200/60 flex items-center justify-center text-[#4338ca] flex-shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Format</div>
                  <div className="text-base font-extrabold text-[#081e4b] leading-tight">Online Session</div>
                </div>
              </div>

            </div>

            {/* Primary Action Button (REGISTER NOW) & Instant Perks */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onRegisterClick}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#0284c7] text-white text-lg font-extrabold shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all cursor-pointer overflow-hidden"
                id="hero-register-button"
              >
                {/* Subtle shine highlight */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
                <Sparkles className="w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform" />
                <span className="tracking-wide">REGISTER NOW</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-600 px-2 py-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Free • Limited Seats • Certificate Available</span>
              </div>
            </div>

          </div>

          {/* Right Column: AI Orbital Visual Component */}
          <div className="lg:col-span-5 flex items-center justify-center pt-4 lg:pt-0">
            <div className="w-full max-w-md mx-auto">
              <AIOrbit />
              <div className="mt-4 text-center">
                <p className="text-xs font-semibold text-slate-500">
                  Orchestrating AI models into connected business automation
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
