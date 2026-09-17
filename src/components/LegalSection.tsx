import React, { useState } from 'react';
import { ProjectData, LegalDocument } from '../types';
import { SectionHeader } from './SectionHeader';
import { 
  Building2, 
  FileText, 
  CheckCircle2, 
  Download, 
  Plus, 
  Trash2,
  Lock,
  Layers,
  Calendar,
  Landmark,
  Compass,
  FileCheck2,
  Receipt,
  ChevronDown
} from 'lucide-react';

interface LegalSectionProps {
  data: ProjectData;
  isEditMode: boolean;
  onEditField: (fieldPath: string, label: string, currentValue: string) => void;
  onUpdateDocuments: (docs: LegalDocument[]) => void;
  onOpenConsultModal: () => void;
}

type LegalFilter = 'all' | 'investment' | 'land' | 'planning';

export const LegalSection: React.FC<LegalSectionProps> = ({
  data,
  isEditMode,
  onEditField,
  onUpdateDocuments,
  onOpenConsultModal
}) => {
  const { legal } = data;
  const [activeFilter, setActiveFilter] = useState<LegalFilter>('all');
  const [showDocGrid, setShowDocGrid] = useState<boolean>(false);

  // Categorization helpers
  const getDocGroup = (doc: LegalDocument): 'investment' | 'land' | 'planning' => {
    if (doc.group) return doc.group as any;
    const lower = (doc.title + ' ' + doc.docNumber).toLowerCase();
    if (lower.includes('226') || lower.includes('2093') || lower.includes('chủ trương') || lower.includes('lựa chọn nhà đầu tư')) {
      return 'investment';
    }
    if (lower.includes('3536') || lower.includes('3189') || lower.includes('thuế') || lower.includes('giao đất') || lower.includes('giá đất') || lower.includes('1358') || lower.includes('1357')) {
      return 'land';
    }
    return 'planning';
  };

  const filteredDocs = legal.documents.filter(doc => {
    if (activeFilter === 'all') return true;
    return getDocGroup(doc) === activeFilter;
  });

  const investmentCount = legal.documents.filter(d => getDocGroup(d) === 'investment').length;
  const landCount = legal.documents.filter(d => getDocGroup(d) === 'land').length;
  const planningCount = legal.documents.filter(d => getDocGroup(d) === 'planning').length;

  const handleAddDocument = () => {
    const newDoc: LegalDocument = {
      id: `d-${Date.now()}`,
      group: activeFilter === 'all' ? 'investment' : activeFilter,
      groupTitle: activeFilter === 'planning' ? '3. Quy Hoạch & Thiết Kế' : activeFilter === 'land' ? '2. Giấy Tờ Đất Đai' : '1. Chủ Trương Đầu Tư',
      title: "Văn bản pháp lý mới",
      docNumber: "Số .../QĐ-UBND",
      authority: "Cơ quan thẩm quyền",
      date: "Ngày ban hành",
      status: "Đầy đủ hiệu lực",
      description: "Mô tả nội dung văn bản pháp lý minh bạch.",
      fileUrl: "#"
    };
    onUpdateDocuments([...legal.documents, newDoc]);
  };

  const handleDeleteDocument = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Bạn có chắc muốn xóa văn bản này khỏi danh sách pháp lý?")) {
      onUpdateDocuments(legal.documents.filter(d => d.id !== id));
    }
  };

  return (
    <section id="phap-ly" className="py-8 sm:py-12 bg-[#faf8f5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <SectionHeader
          badge={legal.badge}
          title={legal.title}
          description={legal.description}
          theme="light"
          isEditMode={isEditMode}
          onEditBadge={() => onEditField('legal.badge', 'Nhãn Pháp Lý', legal.badge)}
          onEditTitle={() => onEditField('legal.title', 'Tiêu Đề Pháp Lý', legal.title)}
          onEditDescription={() => onEditField('legal.description', 'Mô Tả Pháp Lý', legal.description)}
        />

        {/* 3 PILLARS SUMMARY - LOW-HEIGHT COMPACT DIGEST CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 mt-4 mb-4">
          
          {/* Pillar 1: Chủ trương đầu tư */}
          <div 
            onClick={() => {
              setActiveFilter('investment');
              setShowDocGrid(true);
            }}
            className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeFilter === 'investment' && showDocGrid
                ? 'bg-[#15382b] text-white border-amber-400 shadow-sm ring-1 ring-amber-400/40'
                : 'bg-white hover:bg-emerald-50/50 text-slate-800 border-emerald-900/15 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                activeFilter === 'investment' && showDocGrid ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-emerald-100 text-emerald-900'
              }`}>
                TRỤ CỘT 1
              </span>
              <span className={`text-[10px] font-bold ${activeFilter === 'investment' && showDocGrid ? 'text-amber-300' : 'text-emerald-700'}`}>
                {investmentCount} văn bản
              </span>
            </div>
            <h4 className={`text-xs sm:text-[13px] font-bold truncate ${activeFilter === 'investment' && showDocGrid ? 'text-white' : 'text-emerald-950'}`}>
              1. Chủ Trương Đầu Tư
            </h4>
            <p className={`text-[11px] leading-snug line-clamp-1 mt-0.5 ${activeFilter === 'investment' && showDocGrid ? 'text-emerald-100/80' : 'text-slate-500'}`}>
              Lựa chọn CĐT Thành Đạt VN (QĐ 226) & Duyệt chủ trương nhà ở (QĐ 2093).
            </p>
          </div>

          {/* Pillar 2: Đất đai & Nghĩa vụ thuế */}
          <div 
            onClick={() => {
              setActiveFilter('land');
              setShowDocGrid(true);
            }}
            className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeFilter === 'land' && showDocGrid
                ? 'bg-[#15382b] text-white border-amber-400 shadow-sm ring-1 ring-amber-400/40'
                : 'bg-white hover:bg-emerald-50/50 text-slate-800 border-emerald-900/15 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                activeFilter === 'land' && showDocGrid ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-emerald-100 text-emerald-900'
              }`}>
                TRỤ CỘT 2
              </span>
              <span className={`text-[10px] font-bold ${activeFilter === 'land' && showDocGrid ? 'text-amber-300' : 'text-emerald-700'}`}>
                {landCount} văn bản & thông báo
              </span>
            </div>
            <h4 className={`text-xs sm:text-[13px] font-bold truncate ${activeFilter === 'land' && showDocGrid ? 'text-white' : 'text-emerald-950'}`}>
              2. Đất Đai & Nghĩa Vụ Thuế
            </h4>
            <p className={`text-[11px] leading-snug line-clamp-1 mt-0.5 ${activeFilter === 'land' && showDocGrid ? 'text-emerald-100/80' : 'text-slate-500'}`}>
              Giao đất (QĐ 3536), định giá đất (QĐ 3189) & Xác nhận 100% thuế 2022-2023.
            </p>
          </div>

          {/* Pillar 3: Quy hoạch 1/500 & Thiết kế */}
          <div 
            onClick={() => {
              setActiveFilter('planning');
              setShowDocGrid(true);
            }}
            className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeFilter === 'planning' && showDocGrid
                ? 'bg-[#15382b] text-white border-amber-400 shadow-sm ring-1 ring-amber-400/40'
                : 'bg-white hover:bg-emerald-50/50 text-slate-800 border-emerald-900/15 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                activeFilter === 'planning' && showDocGrid ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-emerald-100 text-emerald-900'
              }`}>
                TRỤ CỘT 3
              </span>
              <span className={`text-[10px] font-bold ${activeFilter === 'planning' && showDocGrid ? 'text-amber-300' : 'text-emerald-700'}`}>
                {planningCount} quyết định & bản vẽ
              </span>
            </div>
            <h4 className={`text-xs sm:text-[13px] font-bold truncate ${activeFilter === 'planning' && showDocGrid ? 'text-white' : 'text-emerald-950'}`}>
              3. Quy Hoạch & Thiết Kế 1/500
            </h4>
            <p className={`text-[11px] leading-snug line-clamp-1 mt-0.5 ${activeFilter === 'planning' && showDocGrid ? 'text-emerald-100/80' : 'text-slate-500'}`}>
              QĐ 3229 (25/6/2025) duyệt QH 1/500 lần 2 & Bản vẽ thiết kế mẫu LK, BT.
            </p>
          </div>

        </div>

        {/* ACTION BAR: Toggle to show/hide detailed 9 documents & Consult Modal */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 mb-2">
          <button
            onClick={() => setShowDocGrid(prev => !prev)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-emerald-50/70 border border-emerald-900/20 text-[#15382b] font-bold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>{showDocGrid ? 'Thu gọn danh mục văn bản' : 'Xem chi tiết 9 văn bản pháp lý (Quyết định, Bản vẽ, Thuế)'}</span>
            <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${showDocGrid ? 'rotate-180' : ''}`} />
          </button>

          <button
            onClick={onOpenConsultModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#15382b] hover:bg-[#0f281f] text-[#f1d596] font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Tải trọn bộ hồ sơ pháp lý công chứng</span>
          </button>
        </div>

        {/* DETAILED DOCUMENTS & TABS - COLLAPSIBLE TO KEEP INTERFACE SHORT */}
        {showDocGrid && (
          <div className="mt-4 pt-3.5 border-t border-stone-200/90">
            {/* Filter Tabs Toolbar & Add Button */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-200">
              
              {/* Quick Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    activeFilter === 'all'
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  Tất cả ({legal.documents.length})
                </button>

                <button
                  onClick={() => setActiveFilter('investment')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    activeFilter === 'investment'
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  1. Chủ Trương Đầu Tư ({investmentCount})
                </button>

                <button
                  onClick={() => setActiveFilter('land')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    activeFilter === 'land'
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  2. Đất Đai & Thuế ({landCount})
                </button>

                <button
                  onClick={() => setActiveFilter('planning')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    activeFilter === 'planning'
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  3. Quy Hoạch & Bản Vẽ ({planningCount})
                </button>
              </div>

              {/* Edit Mode Add Button */}
              {isEditMode && (
                <button
                  onClick={handleAddDocument}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 hover:bg-amber-400 text-black shadow transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-3 h-3" />
                  <span>Thêm văn bản</span>
                </button>
              )}

            </div>

            {/* COMPACT & LOW-HEIGHT LEGAL DOCUMENTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {filteredDocs.map((doc, idx) => {
                const group = getDocGroup(doc);
                const isGroupInvestment = group === 'investment';
                const isGroupLand = group === 'land';

                return (
                  <div
                    key={doc.id || idx}
                    className="bg-white rounded-xl p-3 sm:p-3.5 border border-stone-200 shadow-2xs hover:shadow-sm hover:border-emerald-600/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Bar: Group Badge & Number */}
                      <div className="flex items-center justify-between gap-1.5 mb-1.5">
                        <span className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isGroupInvestment 
                            ? 'bg-blue-50 text-blue-900 border border-blue-200' 
                            : isGroupLand 
                            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-900 border border-amber-200'
                        }`}>
                          {doc.docNumber}
                        </span>

                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-stone-100 text-stone-700 border border-stone-200 shrink-0">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                          <span>{doc.status}</span>
                        </span>
                      </div>

                      {/* Authority & Date Line */}
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-1 font-medium">
                        <span className="truncate text-emerald-900 font-semibold">{doc.authority}</span>
                        {doc.date && (
                          <>
                            <span>•</span>
                            <span className="shrink-0">{doc.date}</span>
                          </>
                        )}
                      </div>

                      {/* Document Title (Compact 1-2 lines) */}
                      <h4 
                        className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug group-hover:text-emerald-900 transition-colors line-clamp-1 cursor-pointer"
                        onClick={() => isEditMode && onEditField(`legal.documents.${idx}.title`, 'Tên văn bản', doc.title)}
                        title={doc.title}
                      >
                        {doc.title}
                      </h4>

                      {/* Document Core Summary Description (Compact 1-2 lines) */}
                      <p 
                        className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed cursor-pointer"
                        onClick={() => isEditMode && onEditField(`legal.documents.${idx}.description`, 'Mô tả pháp lý', doc.description)}
                        title={doc.description}
                      >
                        {doc.description}
                      </p>
                    </div>

                    {/* Card Footer: Action & Delete */}
                    <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <button
                        onClick={onOpenConsultModal}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer"
                      >
                        <FileCheck2 className="w-3 h-3 text-amber-600" />
                        <span>Xem hồ sơ công chứng</span>
                      </button>

                      {isEditMode && (
                        <button
                          onClick={(e) => handleDeleteDocument(doc.id, e)}
                          className="p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                          title="Xóa văn bản"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}


      </div>
    </section>
  );
};
