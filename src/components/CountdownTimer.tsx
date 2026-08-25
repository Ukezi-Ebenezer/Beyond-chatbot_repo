import React, { useState, useEffect } from 'react';
import { Timer, Zap, Flame } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

// Webinar scheduled for August 28, 2026 at 8:30 PM West Africa Time (GMT+1 / UTC+1)
const TARGET_DATE = new Date('2026-08-28T20:30:00+01:00').getTime();

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const now = Date.now();
    const difference = TARGET_DATE - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  if (timeLeft.isExpired) {
    return (
      <div 
        id="countdown-timer" 
        className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-sm shadow-xs"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        <span>Webinar is Live Now! Join the session.</span>
      </div>
    );
  }

  const timeUnits = [
    { label: 'DAYS', value: formatNumber(timeLeft.days) },
    { label: 'HOURS', value: formatNumber(timeLeft.hours) },
    { label: 'MINUTES', value: formatNumber(timeLeft.minutes) },
    { label: 'SECONDS', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <div 
      id="countdown-timer"
      className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-blue-100/90 shadow-sm max-w-lg mb-6 transition-all hover:border-blue-200 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2 mb-2.5 px-0.5">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1d4ed8]">
          <Timer className="w-4 h-4 text-[#2563eb]" />
          <span>Webinar Countdown</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold">
          <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span>Fast Filling</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {timeUnits.map((unit, index) => (
          <div 
            key={unit.label} 
            className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl bg-gradient-to-b from-blue-50/70 to-slate-50 border border-blue-100/80 shadow-xs"
          >
            <span className="font-display font-black text-xl sm:text-2xl md:text-3xl text-[#081e4b] tabular-nums leading-none mb-1 tracking-tight">
              {unit.value}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-500">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
