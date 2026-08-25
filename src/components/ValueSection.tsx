import React from 'react';
import { Workflow, Cpu, Rocket, ArrowRight } from 'lucide-react';

export const ValueSection: React.FC = () => {
  const valueCards = [
    {
      id: "card-ai-workflows",
      title: "AI-Powered Workflows",
      description: "Learn how AI can become part of repeatable business processes instead of being used only as a chatbot.",
      icon: Workflow,
      color: "from-blue-600 to-cyan-600",
      lightBg: "bg-blue-50/80 border-blue-100 text-blue-600",
      accent: "text-blue-700",
      takeaway: "Integrate LLMs directly into lead capture, client communication, and operations."
    },
    {
      id: "card-smarter-operations",
      title: "Smarter Business Operations",
      description: "Discover ways intelligent workflows can reduce repetitive work and improve how businesses operate.",
      icon: Cpu,
      color: "from-cyan-600 to-teal-600",
      lightBg: "bg-sky-50/80 border-sky-100 text-sky-600",
      accent: "text-sky-700",
      takeaway: "Eliminate manual data entry, automate triage, and speed up turnaround times."
    },
    {
      id: "card-future-of-work",
      title: "The Future of Work",
      description: "Understand how AI automation is changing the way SMEs, founders, teams, and professionals work.",
      icon: Rocket,
      color: "from-indigo-600 to-blue-600",
      lightBg: "bg-indigo-50/80 border-indigo-100 text-indigo-600",
      accent: "text-indigo-700",
      takeaway: "Empower lean African teams to operate with the agility and output of enterprise organizations."
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-white/70 backdrop-blur-md border-y border-blue-100/60" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-[#1d4ed8] text-xs font-bold uppercase tracking-wider mb-3">
            Core Philosophy
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#081e4b] tracking-tight mb-4">
            AI Beyond the Regular Chatbot
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Most businesses only use AI to generate quick answers or chat in isolated windows. 
            This session is about moving from simply asking AI questions to embedding AI deeply into your day-to-day business operations as autonomous, intelligent workflows.
          </p>
        </div>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {valueCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                id={card.id}
                className="group relative bg-white rounded-3xl p-6 sm:p-8 border border-blue-100/80 shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Subtle top gradient accent */}
                <div className={`absolute top-0 left-6 right-6 h-1 rounded-t-full bg-gradient-to-r ${card.color} opacity-80 group-hover:opacity-100 transition-opacity`} />

                <div>
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${card.lightBg} border flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#081e4b] mb-3 leading-snug">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Practical Takeaway Pill */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Key Takeaway</div>
                  <div className="text-xs sm:text-sm font-bold text-[#1e3a8a] flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-[#2563eb] flex-shrink-0" />
                    <span>{card.takeaway}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
