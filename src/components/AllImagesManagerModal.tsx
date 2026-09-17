import React, { useState, useMemo } from 'react';
import { ProjectData } from '../types';
import { 
  X, 
  Image as ImageIcon, 
  Upload, 
  Search, 
  Filter, 
  Check, 
  Sparkles, 
  Map, 
  Layers, 
  Building2, 
  Compass, 
  Clock, 
  ShieldCheck,
  ExternalLink,
  Edit3
} from 'lucide-react';

export interface ImageEntry {
  id: string;
  fieldPath: string;
  section: string;
  title: string;
  category: 'hero' | 'map' | 'products' | 'amenities' | 'progress' | 'gallery';
  currentUrl: string;
  aspectRatioHint: string;
  description: string;
}

interface AllImagesManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ProjectData;
  onPickImage: (fieldPath: string, currentUrl: string, title?: string) => void;
}

export const AllImagesManagerModal: React.FC<AllImagesManagerModalProps> = ({
  isOpen,
  onClose,
  data,
  onPickImage
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all images across the website into a unified list
  const allImagesList = useMemo(() => {
    const list: ImageEntry[] = [];

    // 1. Hero & Header
    if (data.intro?.heroImage) {
      list.push({
        id: 'hero-bg',
        fieldPath: 'intro.heroImage',
        section: 'Hero Banner (Trang Đầu)',
        title: 'Ảnh Nền Toàn Cảnh Dự Án',
        category: 'hero',
        currentUrl: data.intro.heroImage,
        aspectRatioHint: '16:9 (1920 x 1080 px)',
        description: 'Ảnh phong cảnh chính xuất hiện ngay đầu website khi khách hàng truy cập'
      });
    }

    // 2. Maps & Masterplans
    if (data.inventory?.masterplanImage) {
      list.push({
        id: 'masterplan-map',
        fieldPath: 'inventory.masterplanImage',
        section: 'Bảng Hàng Trực Tuyến & Sơ Đồ 1/500',
        title: 'Ảnh Bản Vẽ Mặt Bằng Phân Lô 1/500',
        category: 'map',
        currentUrl: data.inventory.masterplanImage,
        aspectRatioHint: '16:9 hoặc 21:9 (Độ nét cao)',
        description: 'Bản vẽ thiết kế mặt bằng quy hoạch chi tiết 1/500 của dự án'
      });
    }

    if (data.gallery?.masterplanImage && data.gallery.masterplanImage !== data.inventory?.masterplanImage) {
      list.push({
        id: 'gallery-masterplan',
        fieldPath: 'gallery.masterplanImage',
        section: 'Thư Viện Mặt Bằng',
        title: 'Bản Vẽ Thiết Kế Quy Hoạch Gốc CĐT',
        category: 'map',
        currentUrl: data.gallery.masterplanImage,
        aspectRatioHint: '16:9 hoặc 4:3 (Bản vẽ CAD/Thiết kế)',
        description: 'Bản vẽ mặt bằng gốc hiển thị trong popup xem thiết kế'
      });
    }

    if (data.location?.locationImage) {
      list.push({
        id: 'location-sat',
        fieldPath: 'location.locationImage',
        section: 'Vị Trí & Kết Nối',
        title: 'Ảnh Bản Đồ Vệ Tinh Google Map',
        category: 'map',
        currentUrl: data.location.locationImage,
        aspectRatioHint: '4:3 hoặc 16:9 (1200 x 900 px)',
        description: 'Ảnh chụp vệ tinh tọa độ dự án tại trung tâm thị xã Quảng Yên'
      });
    }

    if (data.location?.regionalMapImage) {
      list.push({
        id: 'location-regional',
        fieldPath: 'location.regionalMapImage',
        section: 'Vị Trí & Kết Nối',
        title: 'Ảnh GIF Sơ Đồ Liên Kết Vùng',
        category: 'map',
        currentUrl: data.location.regionalMapImage,
        aspectRatioHint: '4:3 hoặc 1:1 (GIF hoặc JPG/PNG)',
        description: 'Sơ đồ mạng lưới kết nối giao thông liên tỉnh và các đại đô thị xung quanh'
      });
    }

    // 3. Products
    if (data.products?.items) {
      data.products.items.forEach((prod, idx) => {
        list.push({
          id: `product-${prod.id || idx}`,
          fieldPath: `products.items.${idx}.imageUrl`,
          section: 'Dòng Sản Phẩm Mở Bán',
          title: `${prod.orderNumber || ''} ${prod.title}`,
          category: 'products',
          currentUrl: prod.imageUrl,
          aspectRatioHint: '4:3 (800 x 600 px)',
          description: `Phối cảnh sản phẩm: ${prod.area || ''} - ${prod.tag || 'Dòng sản phẩm tiêu biểu'}`
        });
      });
    }

    // 4. Amenities
    if (data.amenities?.items) {
      data.amenities.items.forEach((amenity, idx) => {
        list.push({
          id: `amenity-${amenity.id || idx}`,
          fieldPath: `amenities.items.${idx}.imageUrl`,
          section: 'Hệ Thống Tiện Ích Thượng Lưu',
          title: amenity.title,
          category: 'amenities',
          currentUrl: amenity.imageUrl,
          aspectRatioHint: '16:9 hoặc 4:3 (1200 x 800 px)',
          description: `Danh mục: ${amenity.category || 'Tiện ích đặc quyền'}`
        });
      });
    }

    // 5. Progress
    if (data.progress?.milestones) {
      data.progress.milestones.forEach((m, idx) => {
        list.push({
          id: `progress-${m.id || idx}`,
          fieldPath: `progress.milestones.${idx}.imageUrl`,
          section: 'Tiến Độ Thi Công Thực Tế',
          title: `${m.date}: ${m.title}`,
          category: 'progress',
          currentUrl: m.imageUrl || '',
          aspectRatioHint: '4:3 (800 x 600 px)',
          description: `Hạng mục thực tế tại công trường (${m.status === 'completed' ? 'Đã xong' : 'Đang thi công'})`
        });
      });
    }

    // 6. Gallery
    if (data.gallery?.items) {
      data.gallery.items.forEach((g, idx) => {
        list.push({
          id: `gallery-${g.id || idx}`,
          fieldPath: `gallery.items.${idx}.imageUrl`,
          section: 'Thư Viện Ảnh Dự Án',
          title: g.title,
          category: 'gallery',
          currentUrl: g.imageUrl,
          aspectRatioHint: '16:9 (1600 x 900 px)',
          description: g.caption || 'Ảnh phối cảnh và thiết kế kiến trúc'
        });
      });
    }

    return list;
  }, [data]);

  // Filtered list
  const filteredList = useMemo(() => {
    return allImagesList.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.section.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchCat && matchSearch;
    });
  }, [allImagesList, activeCategory, searchQuery]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Tất Cả Ảnh', count: allImagesList.length },
    { id: 'hero', label: 'Hero / Banner', count: allImagesList.filter(i => i.category === 'hero').length },
    { id: 'map', label: 'Bản Đồ & Mặt Bằng', count: allImagesList.filter(i => i.category === 'map').length },
    { id: 'products', label: 'Dòng Sản Phẩm', count: allImagesList.filter(i => i.category === 'products').length },
    { id: 'amenities', label: 'Tiện Ích', count: allImagesList.filter(i => i.category === 'amenities').length },
    { id: 'progress', label: 'Tiến Độ Thực Tế', count: allImagesList.filter(i => i.category === 'progress').length },
    { id: 'gallery', label: 'Thư Viện Ảnh', count: allImagesList.filter(i => i.category === 'gallery').length },
  ];

  return (
    <div 
      id="all-images-manager-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        id="all-images-manager-modal"
        className="relative w-full max-w-6xl bg-[#0e251c] border border-emerald-600/80 rounded-3xl shadow-2xl text-white overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-emerald-800/80 bg-[#0a1c15] gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400 text-black font-bold shadow-md">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl text-white">
                  Trung Tâm Quản Lý Toàn Bộ Hình Ảnh Trên Web
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40">
                  {allImagesList.length} hình ảnh
                </span>
              </div>
              <p className="text-xs text-emerald-300">
                Thay đổi nhanh bất kỳ ảnh nào: tải tệp từ máy tính, dán link URL trực tiếp hoặc chọn từ kho ảnh kiến trúc mẫu
              </p>
            </div>
          </div>

          <button 
            id="btn-close-all-images-manager"
            onClick={onClose}
            className="self-end sm:self-center p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Categories & Search */}
        <div className="px-6 py-3.5 bg-black/30 border-b border-emerald-800/60 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900 hover:text-white border border-emerald-800/60'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat.id ? 'bg-black/20 text-black font-extrabold' : 'bg-black/40 text-emerald-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm hình ảnh..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/40 border border-emerald-700/80 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-amber-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Images Grid */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {filteredList.length === 0 ? (
            <div className="text-center py-16 text-emerald-300/60">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-40 text-amber-300" />
              <p className="text-base font-semibold text-white">Không tìm thấy hình ảnh phù hợp</p>
              <p className="text-xs mt-1">Vui lòng thử tìm kiếm với từ khóa khác hoặc chuyển sang danh mục Tất cả ảnh.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredList.map((item) => (
                <div
                  key={item.id}
                  className="group bg-[#112d22] border border-emerald-700/60 hover:border-amber-400/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  {/* Image Preview with overlay button */}
                  <div className="relative aspect-[16/10] bg-black/60 overflow-hidden">
                    {item.currentUrl ? (
                      <img
                        src={item.currentUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-white/40">
                        <ImageIcon className="w-8 h-8 mb-1" />
                        <span className="text-xs">Chưa có ảnh</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    {/* Section badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-amber-300 font-bold text-[10px] uppercase tracking-wider border border-white/10 shadow">
                        {item.section}
                      </span>
                    </div>

                    {/* Action button overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <button
                        onClick={() => onPickImage(item.fieldPath, item.currentUrl, `Thay đổi: ${item.title}`)}
                        className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-xl flex items-center gap-1.5 transition-all transform hover:scale-105 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Đổi Ảnh Này</span>
                      </button>
                    </div>
                  </div>

                  {/* Info & Metadata */}
                  <div className="p-4 flex flex-col justify-between flex-1 gap-2.5">
                    <div>
                      <h4 className="font-bold text-sm text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-emerald-800/60 flex items-center justify-between text-[11px] text-emerald-300/80">
                      <span className="text-emerald-400/90 font-medium">Gợi ý: {item.aspectRatioHint}</span>
                      
                      <button
                        onClick={() => onPickImage(item.fieldPath, item.currentUrl, `Thay đổi: ${item.title}`)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-800/80 hover:bg-amber-400 hover:text-black text-amber-300 text-xs font-bold transition-colors cursor-pointer border border-emerald-600/60"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Đổi ảnh</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#0a1c15] border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Mẹo: Bạn có thể kéo thả ảnh từ máy tính hoặc dán link ảnh trực tiếp vào bất kỳ mục nào.</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
