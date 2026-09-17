import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { 
  Compass, 
  PhoneCall, 
  Menu, 
  X, 
  Edit3, 
  Check, 
  Sparkles,
  Layers,
  Settings
} from 'lucide-react';

interface HeaderProps {
  onOpen360Tour: () => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onOpenCms: () => void;
  hotline: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpen360Tour,
  isEditMode,
  onToggleEditMode,
  onOpenCms,
  hotline
}) => {
  const [activeSection, setActiveSection] = useState<string>('gioi-thieu');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Exact menu items from image.png + new SẢN PHẨM section
  const menuItems = [
    { id: 'gioi-thieu', label: 'GIỚI THIỆU' },
    { id: 'san-pham', label: 'SẢN PHẨM' },
    { id: 'vi-tri', label: 'VỊ TRÍ' },
    { id: 'tien-ich', label: 'TIỆN ÍCH' },
    { id: 'tinh-trang-can', label: 'TÌNH TRẠNG CĂN' },
    { id: 'chinh-sach', label: 'CHÍNH SÁCH' },
    { id: 'tien-do', label: 'TIẾN ĐỘ' },
    { id: 'phap-ly', label: 'PHÁP LÝ' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = ['gioi-thieu', 'san-pham', 'vi-tri', 'tien-ich', 'tinh-trang-can', 'hinh-anh', 'chinh-sach', 'tien-do', 'phap-ly'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#122e23]/95 backdrop-blur-md shadow-md shadow-black/20 py-1.5 sm:py-2' 
          : 'bg-[#15382b] py-2 sm:py-2.5 border-b border-emerald-800/50'
      }`}
    >
      <div className="max-w-[1536px] mx-auto px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-2 lg:gap-3">
        {/* Brand Logo strictly 1 line */}
        <button 
          id="header-logo-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="focus:outline-none transition-transform hover:opacity-95 shrink-0 flex items-center"
        >
          <Logo />
        </button>

        {/* Desktop Navigation - Strictly 1 line per item, no line wrapping */}
        <nav className="hidden xl:flex items-center gap-0.5 lg:gap-1 2xl:gap-2 shrink-0" aria-label="Main Navigation">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-2 lg:px-2.5 2xl:px-3 py-1 text-xs lg:text-[12.5px] 2xl:text-[13.5px] font-bold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#f3d9a6] after:content-[""] after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-[#e6be75]'
                    : 'text-white/90 hover:text-white hover:bg-white/5 rounded'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Prominent 360 Button - Strictly 1 line */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Nút ẢNH 360° */}
          <button
            id="btn-360-tour-prominent"
            onClick={onOpen360Tour}
            className="group relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-bold text-xs tracking-wide bg-gradient-to-r from-[#d8ae64] via-[#f1d596] to-[#caa054] text-[#132c21] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer border border-[#ffe8b2] whitespace-nowrap shrink-0"
            title="Xem trải nghiệm thực tế ảo 360 độ toàn cảnh dự án"
          >
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <Compass className="w-3.5 h-3.5 animate-spin-slow text-[#132c21] shrink-0" />
            <span className="font-extrabold uppercase whitespace-nowrap text-xs">ẢNH 360°</span>
          </button>

          {/* CMS Drawer Opener */}
          <button
            id="btn-open-cms-header"
            onClick={onOpenCms}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs font-bold shadow-sm hover:shadow-md border border-emerald-500/50 transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="Mở Bảng Quản Trị CMS (Chỉnh sửa text, đổi ảnh, cài đặt dữ liệu)"
          >
            <Settings className="w-3.5 h-3.5 text-[#f1d596] shrink-0" />
            <span className="whitespace-nowrap font-bold text-xs">QUẢN TRỊ CMS</span>
          </button>

          {/* Edit Mode Quick Toggle */}
          <button
            id="btn-toggle-edit-mode"
            onClick={onToggleEditMode}
            className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              isEditMode
                ? 'bg-amber-400 text-black shadow-md ring-2 ring-amber-300 font-extrabold animate-pulse'
                : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/15'
            }`}
            title={isEditMode ? "Đang bật chế độ chỉnh sửa trực tiếp. Bấm để tắt" : "Bật chế độ chỉnh sửa trực tiếp trên website"}
          >
            {isEditMode ? <Check className="w-3.5 h-3.5 text-black shrink-0" /> : <Edit3 className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
            <span className="whitespace-nowrap">{isEditMode ? "Đang Sửa" : "Sửa Trực Tiếp"}</span>
          </button>

          {/* Hotline Call Button - Strictly 1 line */}
          <a
            id="btn-header-hotline"
            href={`tel:${hotline.replace(/\s+/g, '')}`}
            className="hidden 2xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 transition-colors whitespace-nowrap shrink-0"
            title={`Gọi Hotline: ${hotline}`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#f1d596] shrink-0" />
            <span className="font-bold whitespace-nowrap">{hotline}</span>
          </a>

          {/* Mobile menu button */}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-panel"
          className="xl:hidden bg-[#0e241c] border-t border-emerald-800/60 px-4 py-4 space-y-2 shadow-2xl transition-all"
        >
          {/* Mobile CMS and Edit Mode shortcuts */}
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-emerald-800/60">
            <button
              onClick={() => {
                onOpenCms();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer border border-emerald-400/40"
            >
              <Settings className="w-4 h-4 text-amber-300" />
              <span>Bảng Quản Trị CMS</span>
            </button>
            <button
              onClick={() => {
                onToggleEditMode();
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                isEditMode
                  ? 'bg-amber-400 text-black shadow-md ring-2 ring-amber-300'
                  : 'bg-white/10 text-white border border-white/15'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditMode ? "Tắt Sửa Trực Tiếp" : "Bật Sửa Trực Tiếp"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold tracking-wide transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#d8ae64] text-[#132c21]'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10">
            <a
              href={`tel:${hotline.replace(/\s+/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/10 text-white text-sm font-medium"
            >
              <PhoneCall className="w-4 h-4 text-[#f1d596]" />
              <span>Hotline: {hotline}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
