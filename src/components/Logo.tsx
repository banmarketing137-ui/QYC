import React from 'react';

interface LogoProps {
  className?: string;
  projectName?: string;
  subtitle?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  projectName = 'QUẢNG YÊN',
  subtitle = 'CENTRO'
}) => {
  return (
    <div className={`flex items-center gap-2 select-none whitespace-nowrap shrink-0 ${className}`}>
      {/* Wave Icon from the reference image: 3 curved horizontal wave ribbons */}
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-white shrink-0 drop-shadow-sm"
        viewBox="0 0 48 48"
        fill="currentColor"
        aria-label="Quảng Yên Centro Logo Icon"
      >
        <path
          d="M6 14C12 9 18 19 26 14C32 10 38 15 42 12C42 15 36 18 30 16C22 13 16 23 6 17Z"
          fill="currentColor"
        />
        <path
          d="M6 24C12 19 18 29 26 24C32 20 38 25 42 22C42 25 36 28 30 26C22 23 16 33 6 27Z"
          fill="currentColor"
        />
        <path
          d="M6 34C12 29 18 39 26 34C32 30 38 35 42 32C42 35 36 38 30 36C22 33 16 43 6 37Z"
          fill="currentColor"
        />
      </svg>

      {/* Brand Text - strictly 1 line */}
      <div className="flex items-baseline gap-1.5 whitespace-nowrap leading-none">
        <span className="text-white font-extrabold tracking-wider text-sm sm:text-base font-sans whitespace-nowrap">
          {projectName}
        </span>
        <span className="text-[#f1d596] font-black tracking-[0.2em] text-[10px] sm:text-[11px] whitespace-nowrap">
          {subtitle}
        </span>
      </div>
    </div>
  );
};
