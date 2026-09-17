import React from 'react';

interface SectionHeaderProps {
  badge: string;
  title: string;
  description?: string;
  theme?: 'dark' | 'light';
  align?: 'center' | 'left';
  isEditMode?: boolean;
  onEditBadge?: () => void;
  onEditTitle?: () => void;
  onEditDescription?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  description,
  theme = 'light',
  align = 'center',
  isEditMode = false,
  onEditBadge,
  onEditTitle,
  onEditDescription,
  className = '',
  children
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`${align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-3xl mb-4 sm:mb-5 ${className}`}>
      {/* Luxury Classical Architectural Eyebrow (No button, no icon) */}
      <div 
        className={`flex items-center ${align === 'center' ? 'justify-center' : 'justify-start'} gap-2 sm:gap-3 mb-1 cursor-pointer group`}
        onClick={() => isEditMode && onEditBadge?.()}
      >
        <span 
          className={`h-[1px] w-6 sm:w-10 ${
            isDark 
              ? 'bg-gradient-to-r from-transparent to-[#d4af37]' 
              : 'bg-gradient-to-r from-transparent to-[#b89052]'
          }`} 
        />
        <span 
          className={`text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.24em] font-bold ${
            isDark ? 'text-[#d4af37]' : 'text-[#a37b3f]'
          }`}
        >
          {badge}
        </span>
        {isEditMode && <span className="text-[10px] text-amber-500 font-sans font-bold">✎</span>}
        <span 
          className={`h-[1px] w-6 sm:w-10 ${
            isDark 
              ? 'bg-gradient-to-l from-transparent to-[#d4af37]' 
              : 'bg-gradient-to-l from-transparent to-[#b89052]'
          }`} 
        />
      </div>

      {/* Grand Architectural Serif Heading */}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-serif-luxury leading-[1.2] cursor-pointer group ${
          isDark ? 'text-white' : 'text-[#143325]'
        }`}
        onClick={() => isEditMode && onEditTitle?.()}
      >
        <span>{title}</span>
        {isEditMode && <span className="ml-2 text-xs font-sans text-amber-500 font-bold">(Sửa)</span>}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={`mt-2 text-xs sm:text-sm leading-relaxed cursor-pointer group max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          } ${isDark ? 'text-emerald-100/80 font-light' : 'text-stone-600'}`}
          onClick={() => isEditMode && onEditDescription?.()}
        >
          {description}
          {isEditMode && <span className="ml-2 text-xs font-sans text-amber-500 font-bold">(Sửa)</span>}
        </p>
      )}

      {children}
    </div>
  );
};
