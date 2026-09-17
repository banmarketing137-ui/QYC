import React, { useState, useMemo } from 'react';
import { ProjectData, UnitItem, UnitStatus } from '../types';
import { SectionHeader } from './SectionHeader';
import { InteractiveMasterplan } from './InteractiveMasterplan';
import { 
  CheckCircle2, 
  Clock, 
  Lock, 
  Search, 
  Filter, 
  Maximize2, 
  Compass, 
  Sparkles, 
  Plus, 
  Edit3, 
  Trash2, 
  ChevronRight, 
  Building2, 
  Home, 
  Tag, 
  Eye, 
  X,
  PhoneCall,
  Check,
  RotateCcw,
  MapPin,
  ImageIcon,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface InventorySectionProps {
  data: ProjectData;
  isEditMode: boolean;
  onUpdateInventory: (units: UnitItem[]) => void;
  onEditField: (fieldPath: string, label: string, currentValue: string) => void;
  onPickImage: (fieldPath: string, currentUrl: string) => void;
  onOpenConsultModal: (unitCode?: string) => void;
  onOpen360Tour: () => void;
}

export const InventorySection: React.FC<InventorySectionProps> = ({
  data,
  isEditMode,
  onUpdateInventory,
  onEditField,
  onPickImage,
  onOpenConsultModal,
  onOpen360Tour
}) => {
  const inventory = data.inventory || {
    badge: "BẢNG HÀNG TRỰC TUYẾN",
    title: "CẬP NHẬT TÌNH TRẠNG CĂN THỜI GIAN THỰC",
    description: "Theo dõi tình trạng quỹ căn minh bạch theo từng Block & Phân khu. Cập nhật chi tiết các căn còn mở bán (Available) và đã giao dịch thành công (Sold).",
    masterplanImage: data.gallery?.masterplanImage || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop",
    units: []
  };

  // Ensure all units are sanitized from any legacy booking status
  const units = useMemo(() => {
    return (inventory.units || []).map(u => 
      ((u.status as string) === 'booking' ? { ...u, status: 'available' as UnitStatus } : u)
    );
  }, [inventory.units]);

  // Modals
  const [selectedUnitForDetail, setSelectedUnitForDetail] = useState<UnitItem | null>(null);
  const [editingUnit, setEditingUnit] = useState<UnitItem | null>(null);
  const [isAddingNewUnit, setIsAddingNewUnit] = useState<boolean>(false);
  const [showOriginalBlueprintModal, setShowOriginalBlueprintModal] = useState<boolean>(false);
  const [blueprintZoom, setBlueprintZoom] = useState<number>(1);

  // New unit form state
  const [newUnitForm, setNewUnitForm] = useState<Partial<UnitItem>>({
    code: '',
    block: 'Block SH-01',
    type: 'Shophouse',
    area: '96.6 m²',
    floorArea: '348 m²',
    floors: '4.5 tầng',
    frontage: '5.8m',
    orientation: 'Đông Nam',
    priceEstimate: '6.2 Tỷ',
    status: 'available',
    note: '',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
  });

  // Calculate statistics
  const stats = useMemo(() => {
    const total = units.length;
    const available = units.filter(u => u.status === 'available').length;
    const sold = units.filter(u => u.status === 'sold').length;
    const soldRate = total > 0 ? Math.round((sold / total) * 100) : 0;
    return { total, available, sold, soldRate };
  }, [units]);

  const handleSetUnitStatusById = (unitId: string, status: UnitStatus) => {
    const updated = units.map(u => u.id === unitId ? { ...u, status } : u);
    onUpdateInventory(updated);
  };

  const handleUpdateUnit = (updatedUnit: UnitItem) => {
    const updated = units.map(u => u.id === updatedUnit.id ? updatedUnit : u);
    onUpdateInventory(updated);
    if (selectedUnitForDetail?.id === updatedUnit.id) {
      setSelectedUnitForDetail(updatedUnit);
    }
  };

  // Delete unit
  const handleDeleteUnit = (unitId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc muốn xóa căn này khỏi bảng hàng?')) {
      const updated = units.filter(u => u.id !== unitId);
      onUpdateInventory(updated);
    }
  };

  // Save edited unit
  const handleSaveEditedUnit = () => {
    if (!editingUnit) return;
    const updated = units.map(u => u.id === editingUnit.id ? editingUnit : u);
    onUpdateInventory(updated);
    setEditingUnit(null);
  };

  // Save newly created unit
  const handleCreateNewUnit = () => {
    if (!newUnitForm.code) {
      alert('Vui lòng nhập mã căn!');
      return;
    }
    const newUnit: UnitItem = {
      id: `u-${Date.now()}`,
      code: newUnitForm.code || `C-${units.length + 1}`,
      block: newUnitForm.block || 'Block SH-01',
      type: newUnitForm.type || 'Shophouse',
      area: newUnitForm.area || '90 m²',
      floorArea: newUnitForm.floorArea || '320 m²',
      floors: newUnitForm.floors || '4 tầng',
      frontage: newUnitForm.frontage || '5m',
      orientation: newUnitForm.orientation || 'Đông Nam',
      priceEstimate: newUnitForm.priceEstimate || 'Liên hệ',
      status: (newUnitForm.status as UnitStatus) || 'available',
      note: newUnitForm.note || '',
      imageUrl: newUnitForm.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
    };
    onUpdateInventory([...units, newUnit]);
    setIsAddingNewUnit(false);
    setNewUnitForm({
      code: '',
      block: 'Block SH-01',
      type: 'Shophouse',
      area: '96.6 m²',
      floorArea: '348 m²',
      floors: '4.5 tầng',
      frontage: '5.8m',
      orientation: 'Đông Nam',
      priceEstimate: '6.2 Tỷ',
      status: 'available',
      note: '',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
    });
  };

  return (
    <section id="tinh-trang-can" className="py-8 sm:py-10 bg-[#0d221a] text-white relative overflow-hidden border-b border-emerald-950">
      {/* Invisible anchor for backward compatibility */}
      <span id="hinh-anh" className="absolute -top-24 left-0 pointer-events-none" />

      {/* Ambient background subtle lighting */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span 
              className="text-[11px] sm:text-xs font-serif uppercase tracking-[0.28em] font-bold text-[#d4af37] cursor-pointer"
              onClick={() => isEditMode && onEditField('inventory.badge', 'Badge Bảng Hàng', inventory.badge)}
            >
              {inventory.badge}
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif-luxury tracking-tight text-white cursor-pointer group"
            onClick={() => isEditMode && onEditField('inventory.title', 'Tiêu Đề Bảng Hàng', inventory.title)}
          >
            {inventory.title}
          </h2>

          <p 
            className="mt-2 text-sm sm:text-base text-emerald-100/80 leading-relaxed cursor-pointer group"
            onClick={() => isEditMode && onEditField('inventory.description', 'Mô Tả Bảng Hàng', inventory.description)}
          >
            {inventory.description}
          </p>
        </div>

        {/* ================= 1. LIVE SUMMARY STATS BAR ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-3">
          {/* Total Units */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3.5 border border-emerald-800/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <Building2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <p className="text-[11px] text-emerald-300 uppercase tracking-wider font-semibold">Tổng Quỹ Căn</p>
              <p className="text-xl font-extrabold text-white font-serif">{stats.total} <span className="text-xs font-normal text-white/70">căn</span></p>
            </div>
          </div>

          {/* Available */}
          <div className="bg-emerald-950/40 backdrop-blur-md rounded-2xl p-3.5 border border-emerald-700/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div>
              <p className="text-[11px] text-emerald-300 uppercase tracking-wider font-semibold">Còn Hàng</p>
              <p className="text-xl font-extrabold text-emerald-300 font-serif">{stats.available} <span className="text-xs font-normal text-emerald-200/80">căn</span></p>
            </div>
          </div>

          {/* Sold */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3.5 border border-stone-700/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-300 shrink-0">
              <Lock className="w-4 h-4 text-rose-300" />
            </div>
            <div>
              <p className="text-[11px] text-rose-200 uppercase tracking-wider font-semibold">Đã Giao Dịch</p>
              <p className="text-xl font-extrabold text-rose-300 font-serif">{stats.sold} <span className="text-xs font-normal text-rose-200/80">căn</span></p>
            </div>
          </div>

          {/* Absorption Rate */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3.5 border border-emerald-800/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/30 to-amber-600/30 flex items-center justify-center text-amber-300 shrink-0">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-amber-200 uppercase tracking-wider font-semibold">Tỷ Lệ Hấp Thụ</p>
                <span className="text-xs font-bold text-amber-300">{stats.soldRate}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${stats.soldRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= SƠ ĐỒ MẶT BẰNG PHÂN LÔ TƯƠNG TÁC (HIỂN THỊ TRỰC TIẾP TÌNH TRẠNG CĂN) ================= */}
        <div className="mb-3">
          <InteractiveMasterplan
            units={units}
            isEditMode={isEditMode}
            masterplanImage={inventory.masterplanImage}
            onPickImage={onPickImage}
            onSelectUnit={(unit) => setSelectedUnitForDetail(unit)}
            onUpdateUnitStatus={handleSetUnitStatusById}
            onUpdateUnit={handleUpdateUnit}
            onOpenConsultModal={onOpenConsultModal}
          />
        </div>



      </div>

      {/* ================= MODAL: CHI TIẾT CĂN (UNIT DETAIL MODAL) ================= */}
      {selectedUnitForDetail && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedUnitForDetail(null)}
        >
          <div 
            className="bg-[#10291f] border border-emerald-600/80 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl text-white max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-emerald-800/80 flex items-center justify-between bg-black/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-400 text-black font-bold">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold font-serif-luxury text-white">
                      CĂN {selectedUnitForDetail.code}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-amber-300 font-semibold">
                      {selectedUnitForDetail.block}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-300">{selectedUnitForDetail.type} - Quảng Yên Centro</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedUnitForDetail(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              
              {/* Image & Status Hero */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/50 border border-emerald-700/50">
                <img 
                  src={selectedUnitForDetail.imageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"} 
                  alt={selectedUnitForDetail.code}
                  className="w-full h-full object-cover" 
                />
                
                {/* Status tag */}
                <div className="absolute top-3 left-3">
                  {selectedUnitForDetail.status === 'available' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-black text-xs font-bold uppercase tracking-wider shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                      <span>Đang Còn Hàng (Available)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Đã Giao Dịch (Sold)</span>
                    </span>
                  )}
                </div>

                {/* Price tag */}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20">
                  <span className="text-[10px] text-stone-300 block">Giá Tham Khảo</span>
                  <span className="text-lg font-bold text-amber-300 font-serif">
                    {selectedUnitForDetail.priceEstimate || 'Liên hệ'}
                  </span>
                </div>
              </div>

              {/* Detailed Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/30 p-4 rounded-2xl border border-emerald-800/80 text-xs">
                <div>
                  <span className="text-emerald-400 block font-medium">Diện tích đất</span>
                  <span className="text-sm font-bold text-white">{selectedUnitForDetail.area}</span>
                </div>
                <div>
                  <span className="text-emerald-400 block font-medium">Diện tích xây dựng</span>
                  <span className="text-sm font-bold text-white">{selectedUnitForDetail.floorArea || '340 m²'}</span>
                </div>
                <div>
                  <span className="text-emerald-400 block font-medium">Hướng nhà</span>
                  <span className="text-sm font-bold text-amber-300">{selectedUnitForDetail.orientation}</span>
                </div>
                <div>
                  <span className="text-emerald-400 block font-medium">Mặt tiền</span>
                  <span className="text-sm font-bold text-white">{selectedUnitForDetail.frontage || '5.5m'}</span>
                </div>
              </div>

              {/* Note / Highlight */}
              {selectedUnitForDetail.note && (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-700/50 text-xs text-emerald-100">
                  <span className="font-bold text-amber-300 mr-1.5">Ưu điểm nổi bật:</span>
                  {selectedUnitForDetail.note}
                </div>
              )}

              {/* Special incentives reminder */}
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs space-y-1">
                <p className="font-bold text-amber-300">Chính sách ưu đãi độc quyền áp dụng cho căn này:</p>
                <ul className="list-disc list-inside text-stone-300 space-y-0.5 text-[11px]">
                  <li>Hỗ trợ lãi suất 0% lên đến 70% giá trị đất trong 24 tháng.</li>
                  <li>Chiết khấu thanh toán sớm lên tới 16%.</li>
                  <li>Đặt cọc thiện chí: 200.000.000 VNĐ / Căn.</li>
                </ul>
              </div>

              {/* In Edit Mode: Quick Edit Bar for Unit */}
              {isEditMode && (
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-amber-500/20 border border-amber-400/50 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-xs text-amber-300 font-extrabold">Chế độ sửa căn:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const unitToEdit = selectedUnitForDetail;
                        setSelectedUnitForDetail(null);
                        setEditingUnit(unitToEdit);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Sửa Thông Số Căn</span>
                    </button>
                    <button
                      onClick={() => {
                        onPickImage(
                          `unit_${selectedUnitForDetail.id}_image`,
                          selectedUnitForDetail.imageUrl || '',
                          `Ảnh căn ${selectedUnitForDetail.code}`
                        );
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 border border-emerald-500 shadow"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
                      <span>Đổi Ảnh Căn</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-emerald-800/80 bg-black/40 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedUnitForDetail(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Đóng
              </button>

              {selectedUnitForDetail.status === 'available' ? (
                <button
                  onClick={() => {
                    const unitCode = selectedUnitForDetail.code;
                    setSelectedUnitForDetail(null);
                    onOpenConsultModal(`Căn ${unitCode} (${selectedUnitForDetail.block})`);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black text-xs font-bold shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <Tag className="w-4 h-4" />
                  <span>Đăng Ký Tư Vấn & Báo Giá Căn Này</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    const code = selectedUnitForDetail.code;
                    setSelectedUnitForDetail(null);
                    onOpenConsultModal(`Tư vấn căn tương tự căn ${code}`);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <span>Nhận Tư Vấn Căn Tương Tự</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: CHỈNH SỬA CĂN (EDIT UNIT MODAL) ================= */}
      {editingUnit && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setEditingUnit(null)}
        >
          <div 
            className="bg-[#10271e] border border-emerald-600 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
              <h3 className="font-bold text-base text-amber-300">Chỉnh Sửa Căn {editingUnit.code}</h3>
              <button onClick={() => setEditingUnit(null)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Mã Căn</label>
                  <input
                    type="text"
                    value={editingUnit.code}
                    onChange={(e) => setEditingUnit({ ...editingUnit, code: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Block / Phân Khu</label>
                  <input
                    type="text"
                    value={editingUnit.block}
                    onChange={(e) => setEditingUnit({ ...editingUnit, block: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Trạng Thái</label>
                  <select
                    value={editingUnit.status}
                    onChange={(e) => setEditingUnit({ ...editingUnit, status: e.target.value as UnitStatus })}
                    className="w-full px-2 py-2 rounded-xl bg-black/50 border border-emerald-700 text-amber-300 text-xs font-bold"
                  >
                    <option value="available">Còn Hàng</option>
                    <option value="sold">Đã Giao Dịch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Loại Hình</label>
                  <input
                    type="text"
                    value={editingUnit.type}
                    onChange={(e) => setEditingUnit({ ...editingUnit, type: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Giá Tham Khảo</label>
                  <input
                    type="text"
                    value={editingUnit.priceEstimate || ''}
                    onChange={(e) => setEditingUnit({ ...editingUnit, priceEstimate: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl bg-black/50 border border-emerald-700 text-amber-400 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Diện Tích Đất</label>
                  <input
                    type="text"
                    value={editingUnit.area}
                    onChange={(e) => setEditingUnit({ ...editingUnit, area: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Hướng Nhà</label>
                  <input
                    type="text"
                    value={editingUnit.orientation}
                    onChange={(e) => setEditingUnit({ ...editingUnit, orientation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-emerald-300 font-semibold mb-1">Ghi Chú Nổi Bật</label>
                <input
                  type="text"
                  value={editingUnit.note || ''}
                  onChange={(e) => setEditingUnit({ ...editingUnit, note: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-emerald-300 font-semibold mb-1">Ảnh Đại Diện Căn (Tùy chọn)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingUnit.imageUrl || ''}
                    onChange={(e) => setEditingUnit({ ...editingUnit, imageUrl: e.target.value })}
                    placeholder="Dán link ảnh hoặc tải lên..."
                    className="flex-1 px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      onPickImage(
                        `unit_${editingUnit.id}_image`,
                        editingUnit.imageUrl || '',
                        `Ảnh căn ${editingUnit.code}`
                      );
                    }}
                    className="px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-amber-300 font-bold text-xs flex items-center gap-1 border border-emerald-600 cursor-pointer shrink-0"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Đổi Ảnh</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-emerald-800">
              <button
                onClick={() => setEditingUnit(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveEditedUnit}
                className="px-4 py-2 rounded-xl bg-amber-400 text-black text-xs font-bold cursor-pointer"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: THÊM CĂN MỚI (ADD NEW UNIT MODAL) ================= */}
      {isAddingNewUnit && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsAddingNewUnit(false)}
        >
          <div 
            className="bg-[#10271e] border border-emerald-600 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
              <h3 className="font-bold text-base text-amber-300">Thêm Căn Mới Vào Bảng Hàng</h3>
              <button onClick={() => setIsAddingNewUnit(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Mã Căn (VD: SH1-08)</label>
                  <input
                    type="text"
                    value={newUnitForm.code}
                    onChange={(e) => setNewUnitForm({ ...newUnitForm, code: e.target.value })}
                    placeholder="VD: LK1-09"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Block / Dãy</label>
                  <input
                    type="text"
                    value={newUnitForm.block}
                    onChange={(e) => setNewUnitForm({ ...newUnitForm, block: e.target.value })}
                    placeholder="VD: Block LK-01"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Trạng Thái</label>
                  <select
                    value={newUnitForm.status}
                    onChange={(e) => setNewUnitForm({ ...newUnitForm, status: e.target.value as UnitStatus })}
                    className="w-full px-2 py-2 rounded-xl bg-black/50 border border-emerald-700 text-amber-300 text-xs font-bold"
                  >
                    <option value="available">Còn Hàng</option>
                    <option value="sold">Đã Giao Dịch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Loại Hình</label>
                  <input
                    type="text"
                    value={newUnitForm.type}
                    onChange={(e) => setNewUnitForm({ ...newUnitForm, type: e.target.value })}
                    placeholder="VD: Shophouse"
                    className="w-full px-2 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Giá Tham Khảo</label>
                  <input
                    type="text"
                    value={newUnitForm.priceEstimate}
                    onChange={(e) => setNewUnitForm({ ...newUnitForm, priceEstimate: e.target.value })}
                    placeholder="VD: 5.8 Tỷ"
                    className="w-full px-2 py-2 rounded-xl bg-black/50 border border-emerald-700 text-amber-400 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Diện Tích Đất</label>
                  <input
                    type="text"
                    value={newUnitForm.area}
                    onChange={(e) => setNewUnitForm({ ...newUnitForm, area: e.target.value })}
                    placeholder="VD: 95 m²"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Hướng Nhà</label>
                  <input
                    type="text"
                    value={newUnitForm.orientation}
                    onChange={(e) => setNewUnitForm({ ...newUnitForm, orientation: e.target.value })}
                    placeholder="VD: Đông Nam"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-emerald-300 font-semibold mb-1">Ghi Chú Nổi Bật</label>
                <input
                  type="text"
                  value={newUnitForm.note}
                  onChange={(e) => setNewUnitForm({ ...newUnitForm, note: e.target.value })}
                  placeholder="VD: Lô góc 2 mặt tiền, view công viên"
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-emerald-800">
              <button
                onClick={() => setIsAddingNewUnit(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleCreateNewUnit}
                className="px-4 py-2 rounded-xl bg-amber-400 text-black text-xs font-bold cursor-pointer"
              >
                Thêm Căn
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: BẢN VẼ MẶT BẰNG 1/500 GỐC (ORIGINAL MASTERPLAN BLUEPRINT) ================= */}
      {showOriginalBlueprintModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => { setShowOriginalBlueprintModal(false); setBlueprintZoom(1); }}
        >
          <div 
            className="bg-[#0b1c15] border border-emerald-600/80 rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl text-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-emerald-800/80 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-400 text-black">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-serif-luxury text-white">
                    Bản Vẽ Quy Hoạch Mặt Bằng Phân Lô 1/500 Gốc
                  </h3>
                  <p className="text-xs text-emerald-300/80">
                    Sơ đồ bố trí chi tiết các khối Shophouse, Liền kề & Biệt thự dự án Quảng Yên Centro
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-xl border border-emerald-800">
                  <button
                    onClick={() => setBlueprintZoom(z => Math.max(z - 0.25, 0.75))}
                    className="p-1 hover:text-amber-300 cursor-pointer"
                    title="Thu nhỏ"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-emerald-300 min-w-[40px] text-center">
                    {Math.round(blueprintZoom * 100)}%
                  </span>
                  <button
                    onClick={() => setBlueprintZoom(z => Math.min(z + 0.25, 3))}
                    className="p-1 hover:text-amber-300 cursor-pointer"
                    title="Phóng to"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setBlueprintZoom(1)}
                    className="p-1 hover:text-amber-300 cursor-pointer text-[11px] font-semibold"
                    title="Đặt lại"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {isEditMode && (
                  <button
                    onClick={() => onPickImage('inventory.masterplanImage', inventory.masterplanImage)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs cursor-pointer"
                  >
                    Đổi Ảnh
                  </button>
                )}

                <button
                  onClick={() => { setShowOriginalBlueprintModal(false); setBlueprintZoom(1); }}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image viewer body */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#07130e]">
              <div 
                className="transition-transform duration-100 origin-center max-w-full"
                style={{ transform: `scale(${blueprintZoom})` }}
              >
                <img 
                  src={inventory.masterplanImage || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop"}
                  alt="Bản vẽ mặt bằng phân lô 1/500 Quảng Yên Centro"
                  className="rounded-xl shadow-2xl max-h-[75vh] object-contain mx-auto border border-emerald-900"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-emerald-800/80 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-emerald-200/80">
              <span>
                💡 Bạn có thể bấm nút phóng to (+) hoặc thu nhỏ (-) để xem rõ từng số lô đất.
              </span>
              <button
                onClick={() => {
                  setShowOriginalBlueprintModal(false);
                  onOpenConsultModal('Tư vấn mặt bằng phân lô 1/500');
                }}
                className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs cursor-pointer shadow-sm"
              >
                Đăng Ký Nhận Bản Vẽ HD & File CAD Gốc
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
