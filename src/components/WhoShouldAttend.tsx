import React from 'react';
import { 
  Building2, 
  Lightbulb, 
  Target, 
  Store, 
  UserCheck, 
  Laptop, 
  Cog, 
  Sparkles 
} from 'lucide-react';

export const WhoShouldAttend: React.FC = () => {
  const audience = [
    {
      title: "Business Owners",
      desc: "Looking to modernize their company's core operations with reliable AI.",
      icon: Building2,
      color: "from-blue-600 to-indigo-600",
    },
    {
      title: "Founders",
      desc: "Building startups and wanting to scale faster with lean, AI-backed teams.",
      icon: Lightbulb,
      color: "from-indigo-600 to-violet-600",
    },
    {
      title: "Entrepreneurs",
      desc: "Exploring new venture efficiencies and competitive digital advantages.",
      icon: Target,
      color: "from-cyan-600 to-blue-600",
    },
    {
      title: "SME Owners",
      desc: "Seeking affordable, high-ROI ways to eliminate repetitive manual bottlenecks.",
      icon: Store,
      color: "from-sky-600 to-cyan-600",
    },
    {
      title: "Professionals",
      desc: "Eager to elevate their daily productivity and master intelligent tooling.",
      icon: UserCheck,
      color: "from-blue-700 to-blue-500",
    },
    {
      title: "Freelancers",
      desc: "Aiming to deliver client work 3x faster and manage multiple gigs effortlessly.",
      icon: Laptop,
      color: "from-teal-600 to-cyan-600",
    },
    {
      title: "Operations Teams",
      desc: "Tasked with optimizing standard operating procedures and cross-team workflows.",
      icon: Cog,
      color: "from-indigo-700 to-sky-600",
    },
    {
      title: "AI Automation Enthusiasts",
      desc: "Anyone curious about practical, hands-on automation beyond chat prompts.",
      icon: Sparkles,
      color: "from-blue-600 to-purple-600",
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-white/60 backdrop-blur-sm border-t border-blue-100/70" id="who-should-attend">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-[#1d4ed8] text-xs font-bold uppercase tracking-wider mb-3">
            Target Audience
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#081e4b] tracking-tight mb-4">
            Who Is This Webinar For?
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Whether you lead an established organization, run a fast-growing small business, or manage your own solo practice, this session delivers immediate practical value.
          </p>
        </div>

        {/* 8 Audience Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {audience.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                id={`audience-card-${index + 1}`}
                className="group bg-white rounded-2xl p-6 border border-blue-100 shadow-xs hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-200 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-50 to-sky-100 border border-blue-200/70 flex items-center justify-center text-[#1d4ed8] mb-4 group-hover:scale-110 transition-transform duration-200 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="font-display font-bold text-lg text-[#081e4b] mb-1.5 group-hover:text-[#2563eb] transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
