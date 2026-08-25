import React from 'react';

export const NetworkBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10" aria-hidden="true">
      {/* Soft radial ambient glows matching flyer palette */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-blue-300/30 to-cyan-200/20 blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-sky-300/25 via-blue-200/20 to-indigo-200/15 blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-200/30 via-blue-300/20 to-transparent blur-3xl" />

      {/* Top Left Network Constellation (Flyer Style) */}
      <svg className="absolute top-0 left-0 w-80 sm:w-96 md:w-[480px] h-auto opacity-70" viewBox="0 0 500 500" fill="none">
        <path d="M0 40L120 110L220 70L280 180L160 260L60 210L0 40Z" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.45" />
        <path d="M120 110L60 210L140 340L280 180" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.4" />
        <path d="M220 70L360 90L420 200L280 180" stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.35" />
        <path d="M160 260L240 390L340 330L280 180" stroke="#2563eb" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Nodes */}
        <circle cx="120" cy="110" r="14" fill="#2563eb" fillOpacity="0.9" />
        <circle cx="220" cy="70" r="9" fill="#0284c7" />
        <circle cx="280" cy="180" r="16" fill="#1d4ed8" />
        <circle cx="160" cy="260" r="12" fill="#0ea5e9" />
        <circle cx="60" cy="210" r="8" fill="#3b82f6" />
        <circle cx="360" cy="90" r="7" fill="#60a5fa" />
        <circle cx="420" cy="200" r="10" fill="#2563eb" fillOpacity="0.75" />
        <circle cx="140" cy="340" r="9" fill="#0284c7" fillOpacity="0.8" />
        <circle cx="240" cy="390" r="11" fill="#1e40af" />
        <circle cx="340" cy="330" r="8" fill="#38bdf8" />
      </svg>

      {/* Top Right Network Constellation (Flyer Style) */}
      <svg className="absolute top-4 right-0 w-72 sm:w-88 md:w-[420px] h-auto opacity-75" viewBox="0 0 450 450" fill="none">
        <path d="M450 60L340 100L390 220L450 300" stroke="#2563eb" strokeWidth="2" strokeOpacity="0.4" />
        <path d="M340 100L240 160L290 280L390 220" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.35" />
        <path d="M240 160L160 130L200 240L290 280" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.35" />
        <path d="M290 280L360 380L450 300" stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.4" />

        {/* Nodes */}
        <circle cx="340" cy="100" r="13" fill="#1d4ed8" />
        <circle cx="390" cy="220" r="18" fill="#2563eb" />
        <circle cx="240" cy="160" r="10" fill="#0284c7" />
        <circle cx="290" cy="280" r="14" fill="#0ea5e9" />
        <circle cx="160" cy="130" r="7" fill="#60a5fa" />
        <circle cx="200" cy="240" r="8" fill="#3b82f6" />
        <circle cx="360" cy="380" r="11" fill="#1e40af" />
      </svg>

      {/* Subtle geometric dot grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035]" 
        style={{
          backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} 
      />
    </div>
  );
};
