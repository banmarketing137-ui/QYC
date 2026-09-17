import React, { useState } from 'react';
import { ProjectData, GalleryItem } from '../types';
import { 
  Sparkles, 
  Maximize2, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Download, 
  Eye, 
  X,
  Compass
} from 'lucide-react';

interface GallerySectionProps {
  data: ProjectData;
  isEditMode: boolean;
  onPickImage: (fieldPath: string, currentUrl: string) => void;
  onEditField: (fieldPath: string, label: string, currentValue: string) => void;
  onUpdateGallery: (items: GalleryItem[]) => void;
  onOpen360Tour: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  data,
  isEditMode,
  onPickImage,
  onEditField,
  onUpdateGallery,
  onOpen360Tour
}) => {
  const { gallery } = data;
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const filters = [
    { id: 'all', label: 'Tất Cả Hình Ảnh' },
    { id: 'perspective', label: 'Phối Cảnh Kiến Trúc' },
    { id: 'masterplan', label: 'Mặt Bằng 1/500' },
    { id: 'interior', label: 'Nội Thất Sang Trọng' },
    { id: 'actual', label: 'Thực Tế Dự Án' },
  ];

  const filteredItems = selectedFilter === 'all'
    ? gallery.items
    : gallery.items.filter(item => item.category === selectedFilter);

  const handleAddPhoto = () => {
    const newItem: GalleryItem = {
      id: `g-${Date.now()}`,
      title: "Hình Ảnh Mới Thêm",
      category: "perspective",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
      caption: "Phối cảnh dự án Quảng Yên Centro mới cập nhật"
    };
    onUpdateGallery([...gallery.items, newItem]);
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Bạn có chắc muốn xóa ảnh này khỏi bộ sưu tập?")) {
      onUpdateGallery(gallery.items.filter(i => i.id !== id));
    }
  };

  return (
    <section id="hinh-anh" className="py-8 sm:py-10 bg-[#122b21] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="text-[11px] sm:text-xs font-serif uppercase tracking-[0.28em] font-bold text-[#d4af37]">
              {gallery.badge}
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif-luxury cursor-pointer group"
            onClick={() => isEditMode && onEditField('gallery.title', 'Tiêu Đề Hình Ảnh', gallery.title)}
          >
            {gallery.title}
            {isEditMode && <span className="ml-2 text-xs font-sans text-amber-400 font-bold">(Sửa)</span>}
          </h2>

          <p 
            className="mt-2 text-sm sm:text-base text-emerald-100/80 leading-relaxed cursor-pointer group"
            onClick={() => isEditMode && onEditField('gallery.description', 'Mô Tả Hình Ảnh', gallery.description)}
          >
            {gallery.description}
            {isEditMode && <span className="ml-2 text-xs font-sans text-amber-400 font-bold">(Sửa)</span>}
          </p>
        </div>

        {/* Masterplan 1/500 Spotlight Banner */}
        <div className="relative mb-4 rounded-3xl overflow-hidden border border-emerald-700/60 shadow-2xl bg-black/40 group">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Image Preview */}
            <div className="lg:col-span-8 relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-black/60">
              <img
                src={gallery.masterplanImage}
                alt="Sơ đồ mặt bằng phân lô 1/500"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 cursor-pointer"
                onClick={() => setLightboxImage({
                  id: "masterplan-preview",
                  title: "Mặt Bằng Quy Hoạch Chi Tiết 1/500",
                  category: "masterplan",
                  imageUrl: gallery.masterplanImage,
                  caption: "Sơ đồ tổng thể phân lô Shophouse, Liền kề & Hệ sinh thái tiện ích Quảng Yên Centro"
                })}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#122b21]/90 hidden lg:block" />

              {/* Edit Masterplan Button */}
              {isEditMode && (
                <button
                  onClick={() => onPickImage('gallery.masterplanImage', gallery.masterplanImage)}
                  className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-black font-bold text-xs shadow-lg hover:bg-amber-400 cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Đổi Ảnh Mặt Bằng 1/500</span>
                </button>
              )}
            </div>

            {/* Content Side */}
            <div className="lg:col-span-4 p-6 sm:p-8 space-y-4">
              <div className="inline-block px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/40">
                Quy Hoạch Chi Tiết
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-serif-luxury">
                Mặt Bằng Phân Lô Tổng Thể 1/500
              </h3>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                Thiết kế thông minh với các dãy Shophouse hai mặt tiền kinh doanh, các trục đường nội khu rộng từ 13.5m đến 20.5m kết nối trực tiếp đại lộ.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setLightboxImage({
                    id: "masterplan-preview",
                    title: "Mặt Bằng Quy Hoạch Chi Tiết 1/500",
                    category: "masterplan",
                    imageUrl: gallery.masterplanImage,
                    caption: "Sơ đồ tổng thể phân lô dự án Quảng Yên Centro"
                  })}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Phóng To Mặt Bằng</span>
                </button>
                <button
                  onClick={onOpen360Tour}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Xem Phân Lô 360°</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Add Photo Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-[#d8ae64] text-[#122b21] shadow-md'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {isEditMode && (
            <button
              onClick={handleAddPhoto}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-black shadow transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Ảnh Mới</span>
            </button>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const globalIndex = gallery.items.findIndex(i => i.id === item.id);

            return (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden border border-emerald-700/50 bg-[#0d221a] shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[4/3] cursor-pointer"
                onClick={() => setLightboxImage(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-end">
                  <h4 
                    className="text-base font-bold text-white group-hover:text-amber-300 transition-colors"
                    onClick={(e) => {
                      if (isEditMode) {
                        e.stopPropagation();
                        onEditField(`gallery.items.${globalIndex}.title`, 'Tên hình ảnh', item.title);
                      }
                    }}
                  >
                    {item.title}
                  </h4>
                  {item.caption && (
                    <p 
                      className="text-xs text-white/70 mt-1 line-clamp-2"
                      onClick={(e) => {
                        if (isEditMode) {
                          e.stopPropagation();
                          onEditField(`gallery.items.${globalIndex}.caption`, 'Chú thích ảnh', item.caption || '');
                        }
                      }}
                    >
                      {item.caption}
                    </p>
                  )}
                </div>

                {/* Lightbox / View Icon */}
                <div className="absolute top-4 left-4 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4 text-amber-300" />
                </div>

                {/* Edit & Delete Controls in Edit Mode */}
                {isEditMode && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onPickImage(`gallery.items.${globalIndex}.imageUrl`, item.imageUrl)}
                      className="p-2 rounded-xl bg-amber-500 text-black font-bold text-xs shadow-lg hover:bg-amber-400 cursor-pointer"
                      title="Đổi ảnh này"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDeletePhoto(item.id, e)}
                      className="p-2 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-lg hover:bg-rose-500 cursor-pointer"
                      title="Xóa ảnh này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl max-h-[78vh] flex items-center justify-center bg-black">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="max-h-[78vh] max-w-full object-contain"
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-white">{lightboxImage.title}</h3>
              {lightboxImage.caption && (
                <p className="text-sm text-white/70 mt-1">{lightboxImage.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
