import React from 'react';
import { Clock, Scissors, TrendingUp, FolderGit2, Zap, BarChart3, Globe2, CheckCircle2 } from 'lucide-react';

export const AfricaSmeFocus: React.FC = () => {
  const benefits = [
    {
      title: "Save Time",
      desc: "Turn hours of manual operational coordination into automated real-time background tasks.",
      icon: Clock,
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      title: "Reduce Repetitive Work",
      desc: "Delegate routine administrative tasks, form processing, and standard queries to AI workflows.",
      icon: Scissors,
      color: "text-sky-600 bg-sky-50 border-sky-200",
    },
    {
      title: "Improve Productivity",
      desc: "Enable each team member to multiply their daily throughput without burnout.",
      icon: TrendingUp,
      color: "text-cyan-600 bg-cyan-50 border-cyan-200",
    },
    {
      title: "Organize Operations",
      desc: "Structure messy emails, WhatsApp inquiries, and internal handoffs into clean, trackable pipelines.",
      icon: FolderGit2,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
    {
      title: "Automate Workflows",
      desc: "Link disparate software tools into seamless end-to-end chains that run around the clock.",
      icon: Zap,
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      title: "Scale Processes Efficiently",
      desc: "Grow your business capacity 10x without needing proportional headcount expansion.",
      icon: BarChart3,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-[#0b214d] via-[#091b3f] to-[#0b214d] text-white" id="africa-sme-focus">
      
      {/* Background African Network Node Vectors */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <circle cx="200" cy="200" r="180" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="1000" cy="600" r="220" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="8 8" />
          <path d="M200 200L450 350L750 250L1000 600" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="200" cy="200" r="8" fill="#38bdf8" />
          <circle cx="450" cy="350" r="10" fill="#60a5fa" />
          <circle cx="750" cy="250" r="12" fill="#a78bfa" />
          <circle cx="1000" cy="600" r="14" fill="#38bdf8" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>African SME Transformation</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-5">
            AI Is Changing How African Businesses Work
          </h2>
          <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed">
            AI is no longer only about generating text prompts or answering trivia. Across Africa, visionary founders and SMEs are harnessing intelligent workflows to build resilient, agile, and globally competitive companies.
          </p>
        </div>

        {/* 6 Core Impact Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                id={`sme-impact-pillar-${idx + 1}`}
                className="group relative bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/15 hover:border-cyan-400/50 transition-all duration-300 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-cyan-400/30 flex items-center justify-center text-cyan-300 flex-shrink-0 group-hover:scale-110 group-hover:bg-cyan-500/30 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2 group-hover:text-cyan-200 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-blue-100/80 text-xs sm:text-sm leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-blue-900/60 rounded-2xl p-6 border border-blue-400/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white">
                Equip your team with workflows that scale autonomously
              </div>
              <div className="text-xs sm:text-sm text-blue-200">
                Learn practical blueprints designed specifically for African business environments and market realities.
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <span className="inline-block px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-md">
              Live Case Studies Included
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
