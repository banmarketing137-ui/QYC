import React, { useRef, useState } from 'react';
import { ProjectData } from '../types';
import { Compass, ArrowRight, Sparkles, Image as ImageIcon, Upload } from 'lucide-react';

interface HeroSectionProps {
  data: ProjectData;
  onOpen360Tour: () => void;
  onOpenConsultModal: () => void;
  isEditMode: boolean;
  onPickImage: (fieldPath: string, currentUrl: string) => void;
  onEditField: (fieldPath: string, label: string, currentValue: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  onOpen360Tour,
  onOpenConsultModal,
  isEditMode,
  onPickImage,
  onEditField
}) => {
  const { general, intro } = data;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const compressAndApply = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1920;
        const maxHeight = 1080;
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          onEditField('intro.heroImage', 'Ảnh Nền Hero Banner', dataUrl);
        } else {
          onEditField('intro.heroImage', 'Ảnh Nền Hero Banner', e.target?.result as string);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressAndApply(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      compressAndApply(file);
    }
  };

  return (
    <section 
      id="hero-section" 
      className={`relative min-h-[65vh] lg:min-h-[72vh] flex items-center justify-center pt-16 pb-8 overflow-hidden bg-[#0d221a] transition-all ${
        isDraggingOver ? 'ring-4 ring-amber-400 ring-inset' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden native file input for direct 1-click photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Drag & Drop Overlay Indicator */}
      {isDraggingOver && (
        <div className="absolute inset-0 z-30 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center text-amber-300 pointer-events-none animate-fadeIn border-4 border-dashed border-amber-400 m-4 rounded-3xl">
          <Upload className="w-16 h-16 mb-2 animate-bounce" />
          <p className="text-xl font-extrabold uppercase tracking-wide">Thả tệp ảnh vào đây</p>
          <p className="text-sm text-white/80">Ảnh sẽ được tối ưu và thay thế làm Hero Banner ngay lập tức</p>
        </div>
      )}

      {/* Background Image with Dark Emerald Luxury Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={intro.heroImage}
          alt={general.projectName}
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c15] via-[#0d241c]/80 to-[#122e23]/60" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Edit Image Action Controls Overlay */}
      {isEditMode && (
        <div className="absolute top-20 right-4 sm:right-6 z-20 flex flex-wrap items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-xl transition-all cursor-pointer border border-amber-200"
            title="Tải ảnh từ máy tính hoặc điện thoại lên làm Banner"
          >
            <Upload className="w-4 h-4" />
            <span>Tải Ảnh Từ Máy Làm Nền</span>
          </button>
          <button
            onClick={() => onPickImage('intro.heroImage', intro.heroImage)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#132c21]/90 hover:bg-[#1a3a2c] text-white font-bold text-xs shadow-xl transition-all cursor-pointer border border-emerald-600/70 backdrop-blur-md"
            title="Chọn từ thư viện ảnh có sẵn hoặc nhập link URL"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Thư Viện / URL</span>
          </button>
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center text-white flex flex-col items-center">
        {/* Subtle Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold mb-3 backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#f1d596]" />
          <span>{intro.badge}</span>
        </div>

        {/* Project Name */}
        <h1 
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-2 drop-shadow-md cursor-pointer group"
          onClick={() => isEditMode && onEditField('general.projectName', 'Tên Dự Án', general.projectName)}
        >
          <span className="bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
            {general.projectName}
          </span>
          {isEditMode && <span className="ml-2 text-xs text-amber-400 opacity-70 group-hover:opacity-100">(Sửa)</span>}
        </h1>

        {/* Tagline */}
        <p 
          className="text-base sm:text-xl md:text-2xl font-serif-luxury tracking-wide text-[#f1d596] max-w-3xl mb-2 drop-shadow font-medium cursor-pointer group"
          onClick={() => isEditMode && onEditField('general.tagline', 'Khẩu Hiệu / Tagline', general.tagline)}
        >
          {general.tagline}
          {isEditMode && <span className="ml-2 text-xs text-amber-400 opacity-70 group-hover:opacity-100">(Sửa)</span>}
        </p>

        {/* Sub-description */}
        <p 
          className="text-xs sm:text-sm md:text-base text-white/80 max-w-2xl mb-4 leading-relaxed cursor-pointer group"
          onClick={() => isEditMode && onEditField('general.subDescription', 'Mô Tả Phụ', general.subDescription)}
        >
          {general.subDescription}
          {isEditMode && <span className="ml-2 text-xs text-amber-400 opacity-70 group-hover:opacity-100">(Sửa)</span>}
        </p>

        {/* Main Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5">
          {/* Nút nổi bật xem ảnh 360 */}
          <button
            id="hero-btn-360"
            onClick={onOpen360Tour}
            className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-extrabold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-[#d8ae64] via-[#f3d9a6] to-[#caa054] text-[#11271d] shadow-lg hover:shadow-xl hover:scale-102 active:scale-95 transition-all cursor-pointer border border-[#fff2d1]"
          >
            <Compass className="w-4 h-4 animate-spin-slow text-[#11271d]" />
            <span>XEM ẢNH 360° TOÀN CẢNH</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Key Stats Bar */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {intro.stats.map((stat, idx) => (
            <div
              key={stat.id || idx}
              onClick={() => isEditMode && onEditField(`intro.stats.${idx}.value`, `Số liệu ${stat.label}`, stat.value)}
              className="bg-[#0f2a20]/75 hover:bg-[#0f2a20]/90 border border-emerald-700/40 hover:border-amber-400/50 rounded-2xl p-4 sm:p-5 backdrop-blur-md transition-all shadow-lg text-left cursor-pointer group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-[#f1d596] mb-1 font-sans">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-0.5">
                {stat.label}
              </div>
              {stat.subtext && (
                <div className="text-[11px] text-white/60 truncate">
                  {stat.subtext}
                </div>
              )}
              {isEditMode && (
                <div className="mt-1 text-[10px] text-amber-400 font-semibold opacity-60 group-hover:opacity-100">
                  Bấm để sửa số liệu
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Wave Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden leading-none z-10">
        <svg
          className="relative block w-full h-full text-[#faf8f5]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.52,143.53,130.65,221.72,120,256.78,115.2,289.87,83.9,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};
