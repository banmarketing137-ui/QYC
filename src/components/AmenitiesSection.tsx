import React, { useState } from 'react';
import { ProjectData, AmenityItem } from '../types';
import { SectionHeader } from './SectionHeader';
import { 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon, 
  Plus, 
  Trash2,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface AmenitiesSectionProps {
  data: ProjectData;
  isEditMode: boolean;
  onPickImage: (fieldPath: string, currentUrl: string, title?: string) => void;
  onEditField: (fieldPath: string, label: string, currentValue: string) => void;
  onUpdateAmenities: (items: AmenityItem[]) => void;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  data,
  isEditMode,
  onPickImage,
  onEditField,
  onUpdateAmenities
}) => {
  const { amenities } = data;

  // Filter out any external items
  const items = amenities.items.filter(item => item.type !== 'external');

  // Modal / Lightbox state
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Safely get items by index or fallback
  const item1 = items[0] || {
    id: 'a1',
    title: 'Vườn Đoàn Viên',
    category: 'TIỆN ÍCH TRUNG TÂM',
    description: 'Không gian gắn kết đa thế hệ giữa thảm cỏ xanh mướt, điểm sum vầy ấm cúng cho mọi gia đình.',
    imageUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1200&auto=format&fit=crop'
  };

  const item2 = items[1] || {
    id: 'a2',
    title: 'Vườn Thanh Âm',
    category: 'TIỆN ÍCH TRUNG TÂM',
    description: 'Khu vườn thi vị với tiếng nước róc rách, thanh âm êm dịu mang đến sự tĩnh tại và an yên cho tâm hồn.',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop'
  };

  const item3 = items[2] || {
    id: 'a3',
    title: 'Sân chơi trẻ em',
    category: 'GIA ĐÌNH & TRẺ EM',
    description: 'Thế giới sắc màu với thảm cỏ êm ái cùng trang thiết bị vận động an toàn theo tiêu chuẩn cho cư dân nhí.',
    imageUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1200&auto=format&fit=crop'
  };

  const item4 = items[3] || {
    id: 'a4',
    title: 'Khu vận động ngoài trời',
    category: 'RÈN LUYỆN THỂ CHẤT',
    description: 'Cụm máy tập thể chất đa năng ngoài trời rợp bóng mát, khuyến khích nếp sống năng động cho cả nhà.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop'
  };

  const item5 = items[4] || {
    id: 'a5',
    title: 'Nhà cộng đồng',
    category: 'GIAO LƯU CỘNG ĐỒNG',
    description: 'Không gian sinh hoạt chung hiện đại, sang trọng – nơi tổ chức các sự kiện, họp mặt và kết nối cộng đồng.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop'
  };

  const item6 = items[5] || {
    id: 'a6',
    title: 'Khu cafe ngoài trời',
    category: 'THƯ GIÃN & ẨM THỰC',
    description: 'Điểm hẹn thư thái dưới tán cây xanh mát, thưởng thức đồ uống ngon lành và trò chuyện cùng bạn bè.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop'
  };

  const item7 = items[6] || {
    id: 'a7',
    title: 'Sân bóng rổ',
    category: 'THỂ THAO NĂNG ĐỘNG',
    description: 'Sân bóng rổ tiêu chuẩn chất lượng cao, bề mặt sơn giảm chấn cho những trận cầu sôi động cuồng nhiệt.',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop'
  };

  // Lightbox handlers
  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null && items.length > 0) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + items.length) % items.length);
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null && items.length > 0) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % items.length);
    }
  };

  const handleAddNewItem = () => {
    const nextNum = items.length + 1;
    const newItem: AmenityItem = {
      id: `a-${Date.now()}`,
      title: `Tiện ích đặc quyền ${nextNum}`,
      category: 'TIỆN ÍCH ĐẲNG CẤP',
      type: 'internal',
      description: 'Không gian trải nghiệm sống xanh đỉnh cao dành riêng cho cư dân.',
      imageUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1200&auto=format&fit=crop',
      iconName: 'Sparkles'
    };
    onUpdateAmenities([...items, newItem]);
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Bạn có chắc chắn muốn xóa tiện ích này?')) {
      const updated = items.filter(i => i.id !== id);
      onUpdateAmenities(updated);
    }
  };

  // Reusable Card Renderer matching the user's reference screenshot
  const renderAmenityCard = (
    item: AmenityItem,
    index: number,
    className: string = '',
    customCTA?: React.ReactNode
  ) => {
    return (
      <div
        key={item.id || index}
        onClick={() => handleOpenLightbox(index)}
        className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-stone-900 border border-stone-800/80 ${className}`}
      >
        {/* BACKGROUND IMAGE */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        {/* TOP-LEFT CATEGORY BADGE */}
        {item.category && !customCTA && (
          <div 
            className="absolute top-3.5 left-3.5 z-10"
            onClick={(e) => {
              if (isEditMode) {
                e.stopPropagation();
                onEditField(`amenities.items.${index}.category`, 'Nhãn tiện ích', item.category);
              }
            }}
          >
            <span className="inline-block px-2.5 sm:px-3 py-1 bg-[#171717]/85 backdrop-blur-md text-[#f59e0b] border border-[#f59e0b]/40 rounded-md text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-md">
              {item.category}
              {isEditMode && <span className="ml-1 text-[9px] text-amber-200">✎</span>}
            </span>
          </div>
        )}

        {/* EDIT BUTTONS */}
        {isEditMode && (
          <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPickImage(`amenities.items.${index}.imageUrl`, item.imageUrl, `Thay ảnh ${item.title}`);
              }}
              className="px-2 py-1 rounded-md bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-bold shadow cursor-pointer"
              title="Đổi ảnh"
            >
              <ImageIcon className="w-3 h-3" />
            </button>
            {items.length > 1 && (
              <button
                onClick={(e) => handleDeleteItem(item.id, e)}
                className="p-1 rounded-md bg-rose-600/90 hover:bg-rose-600 text-white shadow transition-colors cursor-pointer"
                title="Xóa tiện ích"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* BOTTOM CONTENT OVERLAY */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 flex flex-col justify-end">
          {customCTA ? (
            customCTA
          ) : (
            <div>
              <h3 
                className="text-white font-extrabold text-base sm:text-lg lg:text-xl tracking-tight leading-snug drop-shadow-sm group-hover:text-amber-300 transition-colors"
                onClick={(e) => {
                  if (isEditMode) {
                    e.stopPropagation();
                    onEditField(`amenities.items.${index}.title`, 'Tên tiện ích', item.title);
                  }
                }}
              >
                {item.title}
                {isEditMode && <span className="ml-1 text-xs text-amber-300">✎</span>}
              </h3>

              {item.description && (
                <p 
                  className="text-stone-300 text-xs sm:text-[13px] leading-relaxed mt-1 font-normal line-clamp-2 drop-shadow-sm"
                  onClick={(e) => {
                    if (isEditMode) {
                      e.stopPropagation();
                      onEditField(`amenities.items.${index}.description`, 'Mô tả tiện ích', item.description);
                    }
                  }}
                >
                  {item.description}
                  {isEditMode && <span className="ml-1 text-[10px] text-amber-300">✎</span>}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="tien-ich" className="py-8 sm:py-10 bg-[#faf9f6] relative overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="mb-3 sm:mb-4">
          <SectionHeader
            badge={amenities.badge || "TIỆN ÍCH ĐẶC QUYỀN"}
            title={amenities.title || "HỆ THỐNG TIỆN ÍCH NỘI KHU ĐẲNG CẤP"}
            description={amenities.description || "Không gian sống xanh chuẩn nghỉ dưỡng, trọn vẹn đặc quyền thể thao, giải trí và chăm sóc sức khỏe cho cư dân tinh hoa."}
            theme="light"
            isEditMode={isEditMode}
            onEditBadge={() => onEditField('amenities.badge', 'Nhãn Tiện Ích', amenities.badge || "TIỆN ÍCH ĐẶC QUYỀN")}
            onEditTitle={() => onEditField('amenities.title', 'Tiêu Đề Tiện Ích', amenities.title || "HỆ THỐNG TIỆN ÍCH NỘI KHU ĐẲNG CẤP")}
            onEditDescription={() => onEditField('amenities.description', 'Mô Tả Tiện Ích', amenities.description || "Không gian sống xanh chuẩn nghỉ dưỡng...")}
          />

          {isEditMode && (
            <div className="flex justify-end mt-2">
              <button
                onClick={handleAddNewItem}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black shadow transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm Tiện Ích</span>
              </button>
            </div>
          )}
        </div>

        {/* 4-COLUMN MOSAIC BENTO GRID - EXACT LAYOUT FROM USER SCREENSHOT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 lg:h-[460px]">
          
          {/* COLUMN 1: TALL FULL-HEIGHT CARD (Bể bơi vô cực trên tầng mây) */}
          <div className="h-[380px] sm:h-[420px] lg:h-full">
            {renderAmenityCard(item1, 0, 'w-full h-full')}
          </div>

          {/* COLUMN 2: 2 STACKED CARDS (Sảnh Lounge 5 sao & Công viên dạo bộ) */}
          <div className="flex flex-col gap-3.5 sm:gap-4 h-auto lg:h-full">
            {/* Top Card: Sảnh Lounge đón khách 5 sao */}
            <div className="h-[210px] sm:h-[230px] lg:h-[55%]">
              {renderAmenityCard(item2, 1, 'w-full h-full')}
            </div>
            {/* Bottom Card: Công viên nội khu & Đường dạo bộ */}
            <div className="h-[190px] sm:h-[210px] lg:h-[45%]">
              {renderAmenityCard(item3, 2, 'w-full h-full')}
            </div>
          </div>

          {/* COLUMN 3: 2 STACKED CARDS (Kid Zone & Khu vườn Sky Garden) */}
          <div className="flex flex-col gap-3.5 sm:gap-4 h-auto lg:h-full">
            {/* Top Card: Khu vui chơi trẻ em Kid Zone */}
            <div className="h-[190px] sm:h-[210px] lg:h-[42%]">
              {renderAmenityCard(item4, 3, 'w-full h-full')}
            </div>
            {/* Bottom Card: Khu vườn nhiệt đới Sky Garden */}
            <div className="h-[210px] sm:h-[230px] lg:h-[58%]">
              {renderAmenityCard(item5, 4, 'w-full h-full')}
            </div>
          </div>

          {/* COLUMN 4: 2 STACKED CARDS (Sky Pool & KHÁM PHÁ BỘ SƯU TẬP CTA) */}
          <div className="flex flex-col gap-3.5 sm:gap-4 h-auto lg:h-full">
            {/* Top Card: Bể bơi khoáng nóng Sky Pool */}
            <div className="h-[180px] sm:h-[200px] lg:h-[40%]">
              {renderAmenityCard(item6, 5, 'w-full h-full')}
            </div>

            {/* Bottom Card with Featured CTA Button: KHÁM PHÁ BỘ SƯU TẬP */}
            <div className="h-[220px] sm:h-[240px] lg:h-[60%]">
              {renderAmenityCard(
                item7, 
                6, 
                'w-full h-full',
                <div className="flex flex-col items-center justify-center text-center w-full pb-3 pt-6">
                  {/* ORANGE PILL BUTTON: KHÁM PHÁ BỘ SƯU TẬP */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenLightbox(6);
                    }}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
                  >
                    <Eye className="w-4 h-4 text-black shrink-0" />
                    <span>KHÁM PHÁ BỘ SƯU TẬP (10 TIỆN ÍCH)</span>
                  </button>

                  {/* SUBTITLE */}
                  <p 
                    className="text-white font-medium text-xs sm:text-sm mt-3 drop-shadow cursor-pointer hover:underline"
                    onClick={(e) => {
                      if (isEditMode) {
                        e.stopPropagation();
                        onEditField('amenities.items.6.title', 'Tên tiện ích', item7.title);
                      }
                    }}
                  >
                    {item7.title} & Thể thao năng động
                    {isEditMode && <span className="ml-1 text-[10px] text-amber-300">✎</span>}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX PHOTO MODAL */}
      {activeLightboxIndex !== null && items[activeLightboxIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 transition-all"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white max-w-6xl mx-auto w-full z-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-[#f59e0b] text-black font-extrabold text-xs">
                {activeLightboxIndex + 1} / {items.length}
              </span>
              <span className="text-sm font-semibold text-stone-300">
                {items[activeLightboxIndex].category || 'TIỆN ÍCH NỘI KHU'}
              </span>
            </div>

            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Đóng xem ảnh"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Photo Display */}
          <div className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full my-3" onClick={(e) => e.stopPropagation()}>
            {/* Prev Button */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-2 sm:-left-12 z-20 p-3 rounded-full bg-black/60 hover:bg-white/20 text-white transition-all cursor-pointer backdrop-blur-sm"
              title="Ảnh trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={items[activeLightboxIndex].imageUrl}
              alt={items[activeLightboxIndex].title}
              className="max-h-[62vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />

            {/* Next Button */}
            <button
              onClick={handleNextPhoto}
              className="absolute right-2 sm:-right-12 z-20 p-3 rounded-full bg-black/60 hover:bg-white/20 text-white transition-all cursor-pointer backdrop-blur-sm"
              title="Ảnh tiếp theo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption & Thumbnail Strip */}
          <div className="text-center max-w-4xl mx-auto text-white pb-2 w-full" onClick={(e) => e.stopPropagation()}>
            <h4 className="text-lg sm:text-2xl font-bold text-[#f59e0b]">
              {items[activeLightboxIndex].title}
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed max-w-2xl mx-auto line-clamp-2">
              {items[activeLightboxIndex].description}
            </p>

            {/* 10 THUMBNAILS ROW */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto py-2.5 mt-2 scrollbar-none">
              {items.map((thumb, tIdx) => (
                <button
                  key={thumb.id || tIdx}
                  onClick={() => setActiveLightboxIndex(tIdx)}
                  className={`relative w-11 sm:w-14 h-8 sm:h-10 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeLightboxIndex === tIdx ? 'border-[#f59e0b] scale-110 shadow-lg' : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                  title={thumb.title}
                >
                  <img src={thumb.imageUrl} alt={thumb.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
