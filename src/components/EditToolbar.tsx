import React from 'react';
import { 
  Edit3, 
  Layers, 
  Compass, 
  Save, 
  Check, 
  X, 
  PhoneCall, 
  MessageCircle,
  Download,
  Settings,
  Image as ImageIcon
} from 'lucide-react';

interface EditToolbarProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onOpenCms: () => void;
  onOpen360Tour: () => void;
  onSaveData: () => void;
  onOpenAllImagesManager?: () => void;
  hotline: string;
  zaloNumber: string;
  hasUnsavedChanges?: boolean;
}

export const EditToolbar: React.FC<EditToolbarProps> = ({
  isEditMode,
  onToggleEditMode,
  onOpenCms,
  onOpen360Tour,
  onSaveData,
  onOpenAllImagesManager,
  hotline,
  zaloNumber,
  hasUnsavedChanges = false
}) => {
  return (
    <>
      {/* Floating Customer Support Buttons (Bottom Left) */}
      <div className="fixed bottom-5 left-4 z-40 flex flex-col gap-2.5">
        {/* Zalo Button */}
        <a
          id="floating-zalo-btn"
          href={`https://zalo.me/${zaloNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
          title="Chat tư vấn qua Zalo"
        >
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline text-xs font-bold tracking-wide">Zalo Tư Vấn</span>
        </a>

        {/* Hotline Call Button */}
        <a
          id="floating-hotline-btn"
          href={`tel:${hotline.replace(/\s+/g, '')}`}
          className="group flex items-center gap-2 p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
          title="Gọi hotline tư vấn trực tiếp"
        >
          <PhoneCall className="w-5 h-5 text-[#f1d596] animate-pulse group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline text-xs font-bold tracking-wide">{hotline}</span>
        </a>
      </div>

      {/* Floating 360 Tour & CMS Quick Buttons (Bottom Right) */}
      <div className="fixed bottom-5 right-4 z-40 flex items-center gap-2">
        {/* When Edit Mode is active, show full toolbar */}
        {isEditMode ? (
          <div 
            id="floating-edit-toolbar"
            className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#0e241c]/95 backdrop-blur-md border border-amber-400/80 shadow-2xl text-white animate-fadeIn"
          >
            <div className="px-2.5 py-1.5 rounded-xl bg-amber-500 text-black text-[11px] font-extrabold uppercase flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-ping inline-block" />
              <span>Đang Sửa Trực Tiếp</span>
            </div>

            <button
              onClick={onOpenCms}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors cursor-pointer border border-emerald-500/40 shadow"
              title="Mở bảng quản trị CMS đầy đủ"
            >
              <Settings className="w-3.5 h-3.5 text-amber-300" />
              <span>Bảng CMS</span>
            </button>

            {onOpenAllImagesManager && (
              <button
                onClick={onOpenAllImagesManager}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold transition-colors cursor-pointer border border-amber-300 shadow"
                title="Quản lý và thay đổi toàn bộ ảnh trên web"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Quản Lý Ảnh</span>
              </button>
            )}

            <button
              onClick={onSaveData}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                hasUnsavedChanges 
                  ? 'bg-[#d8ae64] text-black font-extrabold shadow-lg animate-pulse' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Lưu toàn bộ nội dung đã sửa"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{hasUnsavedChanges ? "Lưu Ngay" : "Đã Lưu"}</span>
            </button>

            <button
              onClick={onToggleEditMode}
              className="p-1.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Thoát chế độ chỉnh sửa"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Normal floating trigger */
          <div className="flex items-center gap-2">
            {/* Quick 360 Tour Prominent Pill */}
            <button
              id="floating-btn-360-bottom"
              onClick={onOpen360Tour}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 text-[#122e23] font-extrabold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#fff2d1]"
              title="Mở trải nghiệm 360 độ thực tế ảo"
            >
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span className="whitespace-nowrap">XEM 360°</span>
            </button>

            {/* Direct CMS button */}
            <button
              id="floating-btn-cms"
              onClick={onOpenCms}
              className="flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-500/50 shadow-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
              title="Mở Bảng Quản Trị CMS (Chỉnh sửa text, thay ảnh, link)"
            >
              <Settings className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Quản Trị CMS</span>
              <span className="sm:hidden">CMS</span>
            </button>

            {/* Toggle edit mode button */}
            <button
              id="floating-btn-toggle-edit"
              onClick={onToggleEditMode}
              className="flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-full bg-[#122e23] hover:bg-[#194031] text-white/90 hover:text-white border border-emerald-600/60 shadow-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
              title="Bật chế độ chỉnh sửa trực tiếp trên website (thay text, đổi ảnh, chèn link)"
            >
              <Edit3 className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Sửa Trực Tiếp</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
