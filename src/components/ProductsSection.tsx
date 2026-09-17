import React, { useState, useRef, useEffect } from 'react';
import { ProjectData, ProductLineItem } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Image as ImageIcon,
  Tag,
  Layers,
  Boxes,
  Ruler,
  FileText
} from 'lucide-react';

interface ProductsSectionProps {
  data: ProjectData;
  isEditMode: boolean;
  onPickImage: (fieldPath: string, currentUrl: string, title?: string) => void;
  onEditField: (fieldPath: string, label: string, currentValue: string) => void;
  onUpdateProducts?: (items: ProductLineItem[]) => void;
  onOpenConsultModal: (productTitle?: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  data,
  isEditMode,
  onPickImage,
  onEditField,
  onUpdateProducts,
  onOpenConsultModal
}) => {
  const { products } = data;
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Default selected card is the first card (has the distinct orange border as seen in the reference image)
  const [selectedId, setSelectedId] = useState<string>(() => products.items[0]?.id || '');

  useEffect(() => {
    if (!selectedId && products.items.length > 0) {
      setSelectedId(products.items[0].id);
    }
  }, [products.items, selectedId]);

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
    const currentIndex = products.items.findIndex(p => p.id === selectedId);
    if (currentIndex > 0) {
      setSelectedId(products.items[currentIndex - 1].id);
    } else if (products.items.length > 0) {
      setSelectedId(products.items[products.items.length - 1].id);
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
    const currentIndex = products.items.findIndex(p => p.id === selectedId);
    if (currentIndex >= 0 && currentIndex < products.items.length - 1) {
      setSelectedId(products.items[currentIndex + 1].id);
    } else if (products.items.length > 0) {
      setSelectedId(products.items[0].id);
    }
  };

  const handleAddProduct = () => {
    if (!onUpdateProducts) return;
    const nextIndex = products.items.length + 1;
    const formattedNum = nextIndex < 10 ? `0${nextIndex}.` : `${nextIndex}.`;
    const newItem: ProductLineItem = {
      id: `prod-${Date.now()}`,
      orderNumber: formattedNum,
      title: "Căn hộ Penthouse / Duplex",
      area: "120 - 150 m²",
      tag: "VIP",
      description: "Không gian sống thượng lưu tầm nhìn bao trọn toàn cảnh, tối ưu công năng cho gia đình tinh hoa.",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
    };
    onUpdateProducts([...products.items, newItem]);
    setSelectedId(newItem.id);
  };

  const handleDeleteProduct = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onUpdateProducts) return;
    if (confirm("Bạn có chắc chắn muốn xóa dòng sản phẩm này?")) {
      const filtered = products.items.filter(p => p.id !== id);
      onUpdateProducts(filtered);
      if (selectedId === id && filtered.length > 0) {
        setSelectedId(filtered[0].id);
      }
    }
  };

  return (
    <section id="san-pham" className="py-8 sm:py-10 bg-[#faf9f6]/80 text-[#111827] relative overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER AREA - EXACT MATCH TO REFERENCE IMAGE */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-5">
          <div>
            {/* BADGE WITH ORANGE DOT */}
            <div 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fef3ec] border border-[#fed7c3] text-[#f95721] text-xs font-bold uppercase tracking-wider cursor-pointer shadow-2xs hover:bg-[#feeae0] transition-colors"
              onClick={() => isEditMode && onEditField('products.badge', 'Nhãn danh mục', products.badge || 'SẢN PHẨM DỰ ÁN')}
            >
              <span className="w-2 h-2 rounded-full bg-[#f95721] shrink-0 animate-pulse" />
              <span>{products.badge || 'SẢN PHẨM DỰ ÁN'}</span>
              {isEditMode && <span className="text-[10px] text-amber-700 ml-1 font-normal">(Sửa)</span>}
            </div>

            {/* MAIN TITLE */}
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight mt-3 cursor-pointer group flex items-center flex-wrap gap-2"
              onClick={() => isEditMode && onEditField('products.title', 'Tiêu đề sản phẩm', products.title || 'Các loại hình căn hộ')}
            >
              <span>{products.title || 'Các loại hình căn hộ'}</span>
              {isEditMode && <span className="text-xs text-amber-700 font-bold font-sans">(Sửa tiêu đề)</span>}
            </h2>

            {/* SUBTITLE */}
            <p 
              className="text-stone-500 text-sm sm:text-base mt-2 font-normal leading-relaxed max-w-3xl cursor-pointer"
              onClick={() => isEditMode && onEditField('products.description', 'Mô tả danh mục', products.description || 'Thiết kế hiện đại, tối ưu diện tích và công năng sử dụng cho từng nhu cầu sống')}
            >
              {products.description || 'Thiết kế hiện đại, tối ưu diện tích và công năng sử dụng cho từng nhu cầu sống'}
              {isEditMode && <span className="text-xs text-amber-700 font-bold ml-2">(Sửa mô tả)</span>}
            </p>
          </div>

          {/* SLIDER NAVIGATION BUTTONS (< and >) */}
          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl border border-stone-200 bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 hover:border-stone-300 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
              aria-label="Previous product"
              title="Xem sản phẩm trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-xl border border-stone-200 bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 hover:border-stone-300 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
              aria-label="Next product"
              title="Xem sản phẩm tiếp theo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* EDIT CONTROLS */}
        {isEditMode && onUpdateProducts && (
          <div className="flex justify-end mb-6">
            <button
              onClick={handleAddProduct}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black shadow transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Loại Hình Sản Phẩm</span>
            </button>
          </div>
        )}

        {/* PRODUCT CARDS - 3 COLUMNS MATCHING EXACT REFERENCE SCREENSHOT */}
        <div 
          ref={carouselRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 overflow-x-auto pb-4 pt-1 snap-x scroll-smooth"
        >
          {products.items.map((item, index) => {
            const isSelected = selectedId === item.id;

            return (
              <div
                key={item.id || index}
                onClick={() => setSelectedId(item.id)}
                className={`relative flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer group snap-start ${
                  isSelected 
                    ? 'border-2 border-[#f97316] ring-4 ring-[#f97316]/10 shadow-lg' 
                    : 'border border-stone-200/90 hover:border-stone-300'
                }`}
              >
                {/* TOP IMAGE WITH 4:3 RATIO */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 rounded-t-[22px]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Subtle dark gradient overlay at bottom for maximum legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                  {/* TOP-RIGHT BRAND TAG (e.g. SERIES MIK GROUP in orange) */}
                  {item.tag && (
                    <div 
                      className="absolute top-3.5 right-3.5 z-10"
                      onClick={(e) => {
                        if (isEditMode) {
                          e.stopPropagation();
                          onEditField(`products.items.${index}.tag`, 'Nhãn góc trên ảnh', item.tag || '');
                        }
                      }}
                    >
                      <span className="inline-block px-3 py-1 bg-[#f95721] text-white font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider rounded-lg shadow-md cursor-pointer hover:bg-orange-600 transition-colors">
                        {item.tag}
                      </span>
                    </div>
                  )}

                  {/* BOTTOM-LEFT DIMENSION BADGE (DIỆN TÍCH PILL) */}
                  <div 
                    className="absolute bottom-3.5 left-3.5 z-10 cursor-pointer"
                    onClick={(e) => {
                      if (isEditMode) {
                        e.stopPropagation();
                        onEditField(`products.items.${index}.area`, 'Diện tích căn hộ', item.area);
                      }
                    }}
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-xs shadow-lg hover:bg-black/90 transition-colors">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-bold text-amber-400">Diện tích:</span>
                      <span className="font-extrabold text-amber-300">{item.area}</span>
                      {isEditMode && <span className="text-[10px] text-amber-300 font-bold ml-0.5">✎</span>}
                    </div>
                  </div>

                  {/* EDIT IMAGE BUTTON IN EDIT MODE */}
                  {isEditMode && (
                    <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPickImage(`products.items.${index}.imageUrl`, item.imageUrl, `Thay ảnh ${item.title}`);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow cursor-pointer"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Đổi ảnh</span>
                      </button>

                      {!item.tag && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditField(`products.items.${index}.tag`, 'Thêm nhãn góc (ví dụ SERIES MIK GROUP)', 'SERIES MIK GROUP');
                          }}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/90 hover:bg-white text-stone-800 text-xs font-bold shadow cursor-pointer"
                        >
                          <Tag className="w-3 h-3" />
                          <span>+ Tag</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* DELETE PRODUCT IN EDIT MODE */}
                  {isEditMode && onUpdateProducts && products.items.length > 1 && (
                    <button
                      onClick={(e) => handleDeleteProduct(item.id, e)}
                      className="absolute bottom-3.5 right-3.5 z-20 p-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white shadow transition-colors cursor-pointer"
                      title="Xóa loại hình này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* CONTENT AREA */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-3.5">
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-2">
                      <h3 
                        className="text-lg sm:text-xl font-extrabold text-[#0f172a] tracking-tight group-hover:text-[#f95721] transition-colors cursor-pointer"
                        onClick={(e) => {
                          if (isEditMode) {
                            e.stopPropagation();
                            onEditField(`products.items.${index}.title`, 'Tên loại hình', item.title);
                          }
                        }}
                      >
                        {item.title}
                        {isEditMode && <span className="ml-1 text-xs text-amber-600 font-bold">✎</span>}
                      </h3>
                      {item.orderNumber && (
                        <span className="text-xs font-bold text-stone-400 shrink-0">
                          {item.orderNumber}
                        </span>
                      )}
                    </div>

                    {/* 4 SPECIFICATION FIELDS: DIỆN TÍCH, MẶT TIỀN, SỐ LƯỢNG SẢN PHẨM, SỐ TẦNG */}
                    <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#faf9f6] border border-stone-200/80">
                      {/* 1. DIỆN TÍCH */}
                      <div 
                        className="flex items-start gap-2 p-1.5 rounded-xl hover:bg-white/80 transition-colors cursor-pointer"
                        onClick={(e) => {
                          if (isEditMode) {
                            e.stopPropagation();
                            onEditField(`products.items.${index}.area`, 'Diện tích', item.area);
                          }
                        }}
                        title={isEditMode ? "Bấm để sửa Diện tích" : undefined}
                      >
                        <Maximize2 className="w-4 h-4 text-[#f95721] shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-semibold text-stone-500 block leading-tight">
                            Diện tích:
                          </span>
                          <span className="text-xs sm:text-[13px] font-extrabold text-stone-900 truncate block">
                            {item.area || 'Đang cập nhật'}
                            {isEditMode && <span className="text-[10px] text-amber-600 ml-0.5">✎</span>}
                          </span>
                        </div>
                      </div>

                      {/* 2. MẶT TIỀN */}
                      <div 
                        className="flex items-start gap-2 p-1.5 rounded-xl hover:bg-white/80 transition-colors cursor-pointer"
                        onClick={(e) => {
                          if (isEditMode) {
                            e.stopPropagation();
                            onEditField(`products.items.${index}.frontage`, 'Mặt tiền', item.frontage || '5 - 6m');
                          }
                        }}
                        title={isEditMode ? "Bấm để sửa Mặt tiền" : undefined}
                      >
                        <Ruler className="w-4 h-4 text-[#f95721] shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-semibold text-stone-500 block leading-tight">
                            Mặt tiền:
                          </span>
                          <span className="text-xs sm:text-[13px] font-extrabold text-stone-900 truncate block">
                            {item.frontage || '5 – 6,5 m'}
                            {isEditMode && <span className="text-[10px] text-amber-600 ml-0.5">✎</span>}
                          </span>
                        </div>
                      </div>

                      {/* 3. SỐ LƯỢNG SẢN PHẨM */}
                      <div 
                        className="flex items-start gap-2 p-1.5 rounded-xl hover:bg-white/80 transition-colors cursor-pointer"
                        onClick={(e) => {
                          if (isEditMode) {
                            e.stopPropagation();
                            onEditField(`products.items.${index}.quantity`, 'Số lượng sản phẩm', item.quantity || '140 căn');
                          }
                        }}
                        title={isEditMode ? "Bấm để sửa Số lượng sản phẩm" : undefined}
                      >
                        <Boxes className="w-4 h-4 text-[#f95721] shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-semibold text-stone-500 block leading-tight">
                            Số lượng sản phẩm:
                          </span>
                          <span className="text-xs sm:text-[13px] font-extrabold text-stone-900 truncate block">
                            {item.quantity || '140 căn'}
                            {isEditMode && <span className="text-[10px] text-amber-600 ml-0.5">✎</span>}
                          </span>
                        </div>
                      </div>

                      {/* 4. SỐ TẦNG */}
                      <div 
                        className="flex items-start gap-2 p-1.5 rounded-xl hover:bg-white/80 transition-colors cursor-pointer"
                        onClick={(e) => {
                          if (isEditMode) {
                            e.stopPropagation();
                            onEditField(`products.items.${index}.floors`, 'Số tầng', item.floors || '4,5 tầng');
                          }
                        }}
                        title={isEditMode ? "Bấm để sửa Số tầng" : undefined}
                      >
                        <Layers className="w-4 h-4 text-[#f95721] shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-semibold text-stone-500 block leading-tight">
                            Số tầng:
                          </span>
                          <span className="text-xs sm:text-[13px] font-extrabold text-stone-900 truncate block">
                            {item.floors || '4,5 tầng'}
                            {isEditMode && <span className="text-[10px] text-amber-600 ml-0.5">✎</span>}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 5. ĐOẠN GIỚI THIỆU */}
                    <div 
                      className="p-3 rounded-2xl bg-amber-50/40 border border-amber-200/50 hover:border-amber-300 transition-colors cursor-pointer"
                      onClick={(e) => {
                        if (isEditMode) {
                          e.stopPropagation();
                          onEditField(`products.items.${index}.description`, 'Đoạn giới thiệu', item.description);
                        }
                      }}
                      title={isEditMode ? "Bấm để sửa Đoạn giới thiệu" : undefined}
                    >
                      <div className="flex items-center gap-1.5 mb-1 text-stone-700">
                        <FileText className="w-3.5 h-3.5 text-[#f95721]" />
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-700">
                          Đoạn giới thiệu:
                        </span>
                        {isEditMode && <span className="text-[10px] text-amber-600 ml-auto font-bold">✎ Sửa</span>}
                      </div>
                      <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* BOTTOM ACTION BUTTON: TÌM HIỂU THÊM & XEM MẶT BẰNG */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenConsultModal(item.title);
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-[#faf9f6] hover:bg-[#fff5ee] border border-stone-200/90 hover:border-[#fed7c3] text-stone-900 hover:text-[#f95721] font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-all duration-300 shadow-2xs group/btn cursor-pointer mt-1"
                  >
                    <span className="font-extrabold">TÌM HIỂU THÊM & XEM MẶT BẰNG</span>
                    <ArrowRight className="w-4 h-4 text-[#f95721] group-hover/btn:translate-x-1.5 transition-transform shrink-0 ml-2" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
