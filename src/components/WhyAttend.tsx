import React from 'react';
import { Lightbulb, Clock, Zap, Compass, CheckCircle2 } from 'lucide-react';

export const WhyAttend: React.FC = () => {
  const reasons = [
    {
      title: "Think Beyond Chatbots",
      desc: "Understand how AI can become part of real business processes instead of isolated conversations.",
      icon: Lightbulb,
      badge: "Mindset Shift",
    },
    {
      title: "Save Time",
      desc: "Discover ways to reduce repetitive manual tasks and eliminate friction across your organization.",
      icon: Clock,
      badge: "High Leverage",
    },
    {
      title: "Work Smarter",
      desc: "Learn how intelligent workflows can improve team productivity, output quality, and customer satisfaction.",
      icon: Zap,
      badge: "Proven ROI",
    },
    {
      title: "Prepare for What's Next",
      desc: "Understand how AI is shaping the future of work and position your business at the forefront.",
      icon: Compass,
      badge: "Future-Ready",
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-white/70 backdrop-blur-md border-b border-blue-100" id="why-attend">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-[#1d4ed8] text-xs font-bold uppercase tracking-wider mb-3">
            Transformative Value
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#081e4b] tracking-tight mb-4">
            Why You Should Attend
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            In 90 high-impact minutes, you'll uncover practical frameworks to turn AI from an occasional curiosity into your business's strongest operating engine.
          </p>
        </div>

        {/* 4 Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                id={`why-attend-reason-${index + 1}`}
                className="group relative bg-white rounded-2xl p-7 border border-blue-100 shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/70 flex items-center justify-center text-[#1d4ed8] group-hover:scale-110 group-hover:bg-[#1d4ed8] group-hover:text-white transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-[#2563eb] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-xl text-[#081e4b] mb-2.5 group-hover:text-[#2563eb] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Immediate Actionable Takeaway</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
