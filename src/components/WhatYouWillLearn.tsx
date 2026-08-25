import React from 'react';
import { 
  Bot, 
  Workflow, 
  RefreshCw, 
  TrendingUp, 
  Layers, 
  Briefcase, 
  Sparkles, 
  Globe 
} from 'lucide-react';

export const WhatYouWillLearn: React.FC = () => {
  const topics = [
    {
      number: "01",
      title: "Moving Beyond Traditional Chatbots",
      description: "Why standard chat prompts have limits and how shifting to autonomous workflows unlocks massive leverage.",
      icon: Bot,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      number: "02",
      title: "AI-Powered Business Workflows",
      description: "How to connect AI logic directly into triggers, decision trees, and operational outputs automatically.",
      icon: Workflow,
      color: "bg-sky-50 text-sky-600 border-sky-200",
    },
    {
      number: "03",
      title: "Automating Repetitive Business Processes",
      description: "Identify manual bottleneck tasks in sales, support, reporting, and fulfillment that AI can execute reliably.",
      icon: RefreshCw,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      number: "04",
      title: "Improving Productivity with AI",
      description: "Practical strategies to save hours every day and multiply your team's creative and operational capacity.",
      icon: TrendingUp,
      color: "bg-cyan-50 text-cyan-600 border-cyan-200",
    },
    {
      number: "05",
      title: "Connecting AI Tools with Business Systems",
      description: "Simple integrations bridging AI models (ChatGPT, Claude, Gemini) with email, spreadsheets, and databases.",
      icon: Layers,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      number: "06",
      title: "Practical AI Use Cases for SMEs",
      description: "Real-world examples tailored for African small and medium businesses operating across diverse sectors.",
      icon: Briefcase,
      color: "bg-violet-50 text-violet-600 border-violet-200",
    },
    {
      number: "07",
      title: "Creating Smarter Workflows",
      description: "Step-by-step methods to design workflows that learn, adapt, and handle exceptions without breaking.",
      icon: Sparkles,
      color: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      number: "08",
      title: "Understanding the Future of AI-Powered Work",
      description: "A forward-looking perspective on how African businesses can stay competitive in an AI-accelerated economy.",
      icon: Globe,
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="what-you-will-learn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-[#1d4ed8] text-xs font-bold uppercase tracking-wider mb-3">
            Webinar Curriculum
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#081e4b] tracking-tight mb-4">
            What You'll Explore
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Gain actionable knowledge you can implement immediately. No complicated coding jargon — just practical, real-world AI systems built for business results.
          </p>
        </div>

        {/* 8 Topic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <div
                key={topic.number}
                id={`explore-topic-${index + 1}`}
                className="group relative bg-white/95 rounded-2xl p-6 border border-blue-100 shadow-xs hover:shadow-lg hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Topic Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold text-[#2563eb] tracking-wider px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200/60 font-display">
                      {topic.number}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${topic.color} border flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-[#081e4b] mb-2 leading-snug group-hover:text-[#2563eb] transition-colors">
                    {topic.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-slate-400 group-hover:text-[#2563eb] text-xs font-semibold transition-colors">
                  <span>Interactive module</span>
                  <span className="text-base leading-none group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
