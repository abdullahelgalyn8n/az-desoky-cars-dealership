import React from 'react';

interface DesokyLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const DesokyLogo: React.FC<DesokyLogoProps> = ({ variant = 'light', className = '' }) => {
  const mainColor = variant === 'dark' ? '#FFFFFF' : '#0B192C';
  const accentColor = '#DC2626';

  return (
    <span className={`inline-flex items-center gap-1.5 sm:gap-2 select-none whitespace-nowrap shrink-0 ${className}`} dir="ltr">
      <svg
        viewBox="0 0 46 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-7 h-4 sm:w-9 sm:h-5 shrink-0"
      >
        <path d="M0 3H44L41 8H5L0 3Z" fill={mainColor} />
        <path d="M7 11H40L37 16H17V19H35L31 24H12V11H7Z" fill={accentColor} />
      </svg>
      <span
        className="text-xl sm:text-2xl font-black tracking-wider leading-none"
        style={{ color: mainColor, fontFamily: "'Cairo', sans-serif" }}
      >
        DESOKY
      </span>
      <svg
        viewBox="0 0 46 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-7 h-4 sm:w-9 sm:h-5 shrink-0"
      >
        <path d="M2 3H46L41 8H5L2 3Z" fill={mainColor} />
        <path d="M6 11H39L34 16H11V19H31L26 24H6V11Z" fill={accentColor} />
      </svg>
    </span>
  );
};
