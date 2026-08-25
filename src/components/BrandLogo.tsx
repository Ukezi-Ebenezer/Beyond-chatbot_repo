import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  variant?: 'horizontal' | 'full' | 'emblem';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  size = 'md',
  showBadge = false,
  variant = 'horizontal'
}) => {
  const sizeMap = {
    sm: { height: 'h-8 sm:h-9', text: 'text-base', sub: 'text-[9px]', pill: 'text-[8px] px-2 py-0.5' },
    md: { height: 'h-10 sm:h-11', text: 'text-lg sm:text-xl', sub: 'text-[10px]', pill: 'text-[9px] px-2.5 py-1' },
    lg: { height: 'h-14 sm:h-16', text: 'text-2xl sm:text-3xl', sub: 'text-xs tracking-[0.35em]', pill: 'text-[11px] px-3.5 py-1.5' },
    xl: { height: 'h-24 sm:h-28', text: 'text-3xl sm:text-4xl', sub: 'text-sm tracking-[0.4em]', pill: 'text-xs px-4 py-2' }
  };

  const current = sizeMap[size];

  // Official Vector AF Emblem matching the uploaded logo
  const Emblem = ({ emblemSize = 'h-10 w-10' }: { emblemSize?: string }) => (
    <div className={`relative ${emblemSize} flex-shrink-0 select-none`}>
      <svg 
        viewBox="0 0 500 500" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full drop-shadow-md"
        aria-label="AI Founders Africa Logo Emblem"
      >
        <defs>
          {/* Gradients matching the uploaded official 3D ribbon logo */}
          <linearGradient id="ribbonLeftA" x1="120" y1="520" x2="380" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#25105a" />
            <stop offset="25%" stopColor="#4c1d95" />
            <stop offset="60%" stopColor="#6366f1" />
            <stop offset="90%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="ribbonCrestFold" x1="330" y1="150" x2="440" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="40%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>

          <linearGradient id="ribbonRightF" x1="350" y1="180" x2="490" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#0284c7" />
            <stop offset="75%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="wingTopGrad" x1="280" y1="210" x2="480" y2="230" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="wingBottomGrad" x1="300" y1="320" x2="440" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          <linearGradient id="africaMapGrad" x1="170" y1="340" x2="260" y2="480" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#2e1065" />
            <stop offset="100%" stopColor="#3b0764" />
          </linearGradient>

          <linearGradient id="foldShadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. AFRICA MAP SILHOUETTE WITH AI CONSTELLATION NODES (Centered in 'A' triangular opening) */}
        <g id="africa-map-motif" className="drop-shadow-sm">
          {/* African continent stylized vector path */}
          <path
            d="M210 340 
               C235 340 250 350 255 365 
               C262 380 258 395 250 405 
               C245 412 252 425 248 438 
               C244 452 238 468 230 482 
               C226 490 220 488 215 478 
               C212 468 206 450 205 435 
               C204 420 188 418 178 408 
               C168 398 172 380 182 372 
               C190 365 192 352 198 344 
               Z"
            fill="url(#africaMapGrad)"
            stroke="#4338ca"
            strokeWidth="1.5"
          />

          {/* AI Constellation network connection lines across Africa */}
          <g stroke="#38bdf8" strokeWidth="1.6" opacity="0.9">
            <line x1="210" y1="355" x2="242" y2="375" />
            <line x1="242" y1="375" x2="238" y2="415" />
            <line x1="210" y1="355" x2="188" y2="385" />
            <line x1="188" y1="385" x2="215" y2="410" />
            <line x1="215" y1="410" x2="238" y2="415" />
            <line x1="215" y1="410" x2="225" y2="455" />
            <line x1="238" y1="415" x2="225" y2="455" />
            <line x1="225" y1="455" x2="222" y2="478" />
            <line x1="242" y1="375" x2="252" y2="400" />
          </g>

          {/* AI Constellation glowing white & cyan nodes */}
          <g fill="#ffffff" filter="url(#glowEffect)">
            <circle cx="210" cy="355" r="3.5" fill="#ffffff" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="242" cy="375" r="3.2" fill="#ffffff" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="252" cy="400" r="2.8" fill="#ffffff" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="188" cy="385" r="3.8" fill="#ffffff" stroke="#38bdf8" strokeWidth="1.2" />
            <circle cx="215" cy="410" r="3.2" fill="#ffffff" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="238" cy="415" r="4.2" fill="#ffffff" stroke="#00f0ff" strokeWidth="1.5" />
            <circle cx="225" cy="455" r="3.2" fill="#ffffff" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="222" cy="478" r="2.8" fill="#ffffff" stroke="#38bdf8" strokeWidth="1" />
          </g>
        </g>

        {/* 2. 'F' LOWER HORIZONTAL WING WITH 3D UNDERSIDE */}
        {/* Dark fold underside */}
        <path
          d="M292 342 C300 370 340 375 390 368 C375 390 320 398 285 378 Z"
          fill="#0c1e3e"
          opacity="0.9"
        />
        {/* Main lower wing */}
        <path
          d="M272 315 H395 C412 315 425 328 420 345 C416 358 402 368 385 368 H290 Z"
          fill="url(#wingBottomGrad)"
        />

        {/* 3. 'A' MAIN LEFT 3D LOOP (Sweeps from bottom-left to top apex) */}
        <path
          d="M110 500 
             C95 470 105 435 130 390 
             L205 255 
             C225 218 248 185 272 165 
             C290 150 310 152 325 168 
             C338 182 335 205 318 230 
             L240 355 
             L165 488 
             C150 515 125 525 110 500 
             Z"
          fill="url(#ribbonLeftA)"
        />

        {/* 4. 'A' TOP CREST FOLD (3D twisting surface) */}
        <path
          d="M272 165 
             C290 150 315 152 332 170 
             C345 184 345 202 335 220 
             L312 258 
             L278 205 
             Z"
          fill="url(#ribbonCrestFold)"
        />

        {/* 5. 'F' TOP SWEEPING WING (Upper aerodynamic fin) */}
        {/* Dark under-wing depth shadow */}
        <path
          d="M295 240 C320 270 380 278 440 262 C415 285 350 292 290 268 Z"
          fill="#08234d"
          opacity="0.95"
        />
        {/* Upper wing main body */}
        <path
          d="M270 215 
             H425 
             C448 215 465 228 460 248 
             C455 264 438 274 418 274 
             H288 
             Z"
          fill="url(#wingTopGrad)"
        />

        {/* 6. RIGHT DESCENDING PILLAR (Completing 'A' and 'F' stem) */}
        <path
          d="M312 215 
             L355 178 
             C370 190 375 208 368 228 
             L275 425 
             C265 448 250 472 238 495 
             C225 520 200 528 188 505 
             C180 488 190 465 202 440 
             L290 255 
             Z"
          fill="url(#ribbonRightF)"
          opacity="0.95"
        />
      </svg>
    </div>
  );

  // 1. EMBLEM ONLY VARIANT
  if (variant === 'emblem') {
    return <Emblem emblemSize={current.height.replace('h-', 'w-').split(' ')[0] + ' ' + current.height.split(' ')[0]} />;
  }

  // 2. FULL STACKED LOCKUP VARIANT (Perfect for Hero / Dedicated Brand Sections / Footer)
  if (variant === 'full') {
    return (
      <div className={`inline-flex flex-col items-center text-center ${className}`} id="ai-founders-brand-logo-full">
        {/* Large Monogram */}
        <Emblem emblemSize="w-20 h-20 sm:w-28 sm:h-28" />

        {/* Brand Name Typography */}
        <div className="mt-3 flex flex-col items-center">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {/* Triangular stylized 'A' + 'I' */}
            <span className="font-display font-black text-2xl sm:text-4xl text-[#0b1a3d] tracking-tight flex items-center">
              <span className="text-[#2563eb]">A</span>I
            </span>
            {/* Cyan vertical accent divider */}
            <span className="w-0.5 sm:w-1 h-5 sm:h-7 bg-gradient-to-b from-[#00d2ff] to-[#0284c7] rounded-full mx-0.5" />
            {/* FOUNDERS */}
            <span className="font-display font-black text-2xl sm:text-4xl text-[#081a42] tracking-tight">
              FOUNDERS
            </span>
          </div>

          {/* AFRICA with flanking accent lines */}
          <div className="w-full flex items-center justify-center gap-2 sm:gap-3 mt-1 sm:mt-1.5">
            <span className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-[#2563eb]/60 to-[#6366f1]" />
            <span className="font-display font-black tracking-[0.35em] sm:tracking-[0.45em] text-xs sm:text-sm text-[#4338ca] uppercase pl-1">
              AFRICA
            </span>
            <span className="h-0.5 flex-1 bg-gradient-to-l from-transparent via-[#2563eb]/60 to-[#6366f1]" />
          </div>
        </div>

        {/* Slogan Pill Badge */}
        {showBadge && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[#4f46e5] via-[#2563eb] to-[#00c6ff] text-white text-[10px] sm:text-xs font-semibold shadow-md shadow-blue-600/20">
            {/* Rocket Icon */}
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-200 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
            <span className="w-px h-3 bg-white/40" />
            <span>Build with AI. Solve African Problems. Grow Smarter.</span>
          </div>
        )}
      </div>
    );
  }

  // 3. HORIZONTAL LOCKUP (Standard for Navbar & compact headers)
  return (
    <div className={`inline-flex flex-col items-start ${className}`} id="ai-founders-brand-logo">
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Official 3D AF Ribbon Emblem */}
        <Emblem emblemSize="w-9 h-9 sm:w-10 sm:h-10" />

        {/* Text Lockup */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1 sm:gap-1.5 leading-none">
            <span className="font-display font-black tracking-tight text-[#081a42] text-base sm:text-lg flex items-center">
              <span className="text-[#2563eb]">A</span>I
            </span>
            <span className="w-0.5 h-3.5 sm:h-4 bg-gradient-to-b from-[#00d2ff] to-[#0284c7] rounded-full" />
            <span className="font-display font-black tracking-tight text-[#081a42] text-base sm:text-lg">
              FOUNDERS
            </span>
          </div>
          <div className="flex items-center justify-between tracking-[0.32em] text-[9px] sm:text-[10px] font-black text-[#4338ca] leading-tight mt-0.5">
            <span>AFRICA</span>
          </div>
        </div>
      </div>

      {/* Optional Slogan Pill */}
      {showBadge && (
        <div className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#4f46e5] via-[#2563eb] to-[#00c6ff] text-white text-[9px] font-medium tracking-normal shadow-xs">
          <svg className="w-2.5 h-2.5 text-cyan-200 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
          <span className="truncate">Build with AI. Solve African Problems. Grow Smarter.</span>
        </div>
      )}
    </div>
  );
};

