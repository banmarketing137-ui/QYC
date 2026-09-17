import React, { useState } from 'react';
import { ProjectData } from '../types';
import { SectionHeader } from './SectionHeader';
import { 
  MapPin, 
  ExternalLink, 
  Image as ImageIcon, 
  Maximize2, 
  X,
  Layers,
  ZoomIn
} from 'lucide-react';

interface LocationSectionProps {
  data: ProjectData;
  isEditMode: boolean;
  onPickImage: (fieldPath: string, currentUrl: string, title?: string) => void;
  onEditField: (fieldPath: string, label: string, currentValue: string) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  data,
  isEditMode,
  onPickImage,
  onEditField
}) => {
  const { location, general } = data;
  const [activeMapTab, setActiveMapTab] = useState<'satellite' | 'interactive'>('satellite');
  const [zoomModalImage, setZoomModalImage] = useState<string | null>(null);

  const addressText = location.addressButtonText || general.address || 'Đường Trần Hưng Đạo, Phường Quảng Yên, Thị xã Quảng Yên, Tỉnh Quảng Ninh';
  const regionalImg = location.regionalMapImage || 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop';
  const mapsUrl = location.googleMapsLink || 'https://maps.google.com/?q=Quang+Yen+Quang+Ninh';

  return (
    <section id="vi-tri" className="py-10 sm:py-14 bg-[#0e241c] text-white relative overflow-hidden border-b border-emerald-950">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* LUXURIOUS SECTION HEADER (No button, no icon) */}
        <SectionHeader
          badge={location.badge || 'VỊ TRÍ CHIẾN LƯỢC'}
          title={location.title || 'TÂM ĐIỂM GIAO THƯƠNG - KẾT NỐI KHÔNG GIỚI HẠN'}
          description={location.description}
          theme="dark"
          isEditMode={isEditMode}
          onEditBadge={() => onEditField('location.badge', 'Nhãn Vị Trí', location.badge)}
          onEditTitle={() => onEditField('location.title', 'Tiêu Đề Vị Trí', location.title)}
          onEditDescription={() => onEditField('location.description', 'Mô Tả Vị Trí', location.description)}
        >
          {/* BUTTON GẮN LINK TRỎ */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#16382b] hover:bg-[#1f4c3a] border border-[#d4af37]/40 hover:border-[#d4af37] text-white text-xs sm:text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] group/btn cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-rose-400 group-hover/btn:scale-110 transition-transform shrink-0" />
              <span className="font-semibold tracking-wide">{addressText}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#d4af37] opacity-80 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* Quick Edit in Edit Mode for Address & Link */}
            {isEditMode && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEditField('location.addressButtonText', 'Địa chỉ trên nút', addressText)}
                  className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow cursor-pointer"
                >
                  ✎ Sửa địa chỉ
                </button>
                <button
                  onClick={() => onEditField('location.googleMapsLink', 'Link Google Maps', mapsUrl)}
                  className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow cursor-pointer"
                >
                  ✎ Sửa Link Map
                </button>
              </div>
            )}
          </div>
        </SectionHeader>

        {/* 2 VISUAL MEDIA BLOCKS SIDE-BY-SIDE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          
          {/* BLOCK 1: "ẢNH GOOGLE MAP" / BẢN ĐỒ VỆ TINH */}
          <div className="relative rounded-2xl overflow-hidden border border-emerald-700/60 shadow-2xl bg-black/50 group flex flex-col">
            
            {/* Header Tab inside map block */}
            <div className="bg-[#0b1b15] px-4 py-3 border-b border-emerald-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  Bản đồ vệ tinh khu vực
                </span>
                <span className="text-[10px] text-amber-300 font-medium px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40">
                  Tọa độ trung tâm
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveMapTab('satellite')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    activeMapTab === 'satellite'
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'text-emerald-300 hover:text-white'
                  }`}
                >
                  Ảnh vệ tinh
                </button>
                <button
                  onClick={() => setActiveMapTab('interactive')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    activeMapTab === 'interactive'
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'text-emerald-300 hover:text-white'
                  }`}
                >
                  Bản đồ số
                </button>
              </div>
            </div>

            {/* Viewport */}
            <div className="h-80 sm:h-96 relative bg-black/80 overflow-hidden flex-1">
              {activeMapTab === 'satellite' ? (
                <>
                  <img
                    src={location.locationImage}
                    alt="Bản đồ vệ tinh khu vực Quảng Yên Centro"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                    onClick={() => setZoomModalImage(location.locationImage)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Zoom button */}
                  <button
                    onClick={() => setZoomModalImage(location.locationImage)}
                    className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-white text-xs font-medium backdrop-blur border border-white/20 transition-colors cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                    <span>Xem ảnh lớn</span>
                  </button>
                </>
              ) : (
                <iframe
                  src={location.mapEmbedUrl}
                  title="Bản đồ tương tác Google Maps"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              )}

              {/* Edit Top Image Button */}
              {isEditMode && activeMapTab === 'satellite' && (
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => onPickImage('location.locationImage', location.locationImage, 'Đổi ảnh bản đồ vệ tinh')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Đổi ảnh vệ tinh</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom footer linking to Google Maps */}
            <div className="bg-[#0b1b15]/90 px-4 py-2.5 flex items-center justify-between border-t border-emerald-800/60 text-xs">
              <span className="text-emerald-300/80">Ảnh Google Map vệ tinh phân giải cao</span>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#f1d596] hover:text-white font-bold transition-colors"
              >
                <span>Mở Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* BLOCK 2: "ẢNH GIF LIÊN KẾT VÙNG" */}
          <div className="relative rounded-2xl overflow-hidden border border-emerald-700/60 shadow-2xl bg-black/50 group flex flex-col">
            
            {/* Header inside GIF block */}
            <div className="bg-[#0b1b15] px-4 py-3 border-b border-emerald-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  Ảnh GIF Liên Kết Vùng
                </span>
                <span className="text-[10px] text-emerald-300 font-medium px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700/60">
                  Sơ đồ mạng lưới
                </span>
              </div>

              <button
                onClick={() => setZoomModalImage(regionalImg)}
                className="inline-flex items-center gap-1 text-xs text-[#f1d596] hover:text-white font-medium cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Phóng to</span>
              </button>
            </div>

            {/* Image Viewport */}
            <div 
              className="h-80 sm:h-96 relative bg-black/80 overflow-hidden cursor-pointer flex-1"
              onClick={() => setZoomModalImage(regionalImg)}
            >
              <img
                src={regionalImg}
                alt="Sơ đồ GIF liên kết vùng Quảng Yên Centro"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

              {/* Subtitle / Hint: "Sử dụng ctrl + cuộn để thu phóng bản đồ" */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs pointer-events-none">
                <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 text-white/90 text-[11px] sm:text-xs">
                  Sử dụng ctrl + cuộn để thu phóng bản đồ
                </div>
                <div className="p-2 rounded-full bg-black/60 border border-white/20 text-white group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Edit Regional Image Button */}
              {isEditMode && (
                <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onPickImage('location.regionalMapImage', regionalImg, 'Đổi ảnh GIF liên kết vùng')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Đổi ảnh liên kết vùng</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom footer */}
            <div className="bg-[#0b1b15]/90 px-4 py-2.5 flex items-center justify-between border-t border-emerald-800/60 text-xs">
              <span className="text-emerald-300/80">Sơ đồ kết nối giao thông liên tỉnh</span>
              <button
                onClick={() => setZoomModalImage(regionalImg)}
                className="inline-flex items-center gap-1 text-[#f1d596] hover:text-white font-bold transition-colors cursor-pointer"
              >
                <span>Xem ảnh phóng to</span>
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* LIGHTBOX ZOOM MODAL FOR MAPS & GIF */}
      {zoomModalImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setZoomModalImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#0c1f17] border border-emerald-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-800 bg-[#081711]">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#d4af37]" />
                <h3 className="text-sm sm:text-base font-bold text-white font-serif-luxury">
                  Bản Đồ Chi Tiết Vị Trí & Liên Kết Vùng
                </h3>
              </div>
              <button
                onClick={() => setZoomModalImage(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-auto flex items-center justify-center bg-black/60">
              <img
                src={zoomModalImage}
                alt="Bản đồ phóng to"
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-lg"
              />
            </div>

            <div className="px-6 py-3 bg-[#081711] border-t border-emerald-800 text-xs text-stone-400 flex items-center justify-between">
              <span>Cuộn chuột để quan sát toàn bộ các trục giao thông kết nối</span>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white font-bold"
              >
                <span>Xem định vị thực tế trên Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
