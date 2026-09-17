import React from 'react';
import { ProjectData, ProgressMilestone } from '../types';
import { 
  Sparkles, 
  CheckCircle, 
  Clock, 
  Hourglass, 
  Calendar, 
  Image as ImageIcon, 
  Plus, 
  Trash2 
} from 'lucide-react';

interface ProgressSectionProps {
  data: ProjectData;
  isEditMode: boolean;
  onPickImage: (fieldPath: string, currentUrl: string) => void;
  onEditField: (fieldPath: string, label: string, currentValue: string) => void;
  onUpdateMilestones: (milestones: ProgressMilestone[]) => void;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
  data,
  isEditMode,
  onPickImage,
  onEditField,
  onUpdateMilestones
}) => {
  const { progress } = data;

  const handleAddMilestone = () => {
    const newM: ProgressMilestone = {
      id: `m-${Date.now()}`,
      date: "Tháng Mới",
      title: "Hạng mục thi công mới cập nhật",
      status: "in_progress",
      description: "Mô tả thực tế tiến độ công trình và nhân lực máy móc trên công trường.",
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?q=80&w=800&auto=format&fit=crop"
    };
    onUpdateMilestones([...progress.milestones, newM]);
  };

  const handleDeleteMilestone = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Bạn có chắc muốn xóa mốc tiến độ này?")) {
      onUpdateMilestones(progress.milestones.filter(m => m.id !== id));
    }
  };

  const getStatusBadge = (status: ProgressMilestone['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Đã hoàn thành</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Clock className="w-3.5 h-3.5" />
            <span>Đang thi công</span>
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
            <Hourglass className="w-3.5 h-3.5" />
            <span>Sắp triển khai</span>
          </span>
        );
    }
  };

  return (
    <section id="tien-do" className="py-8 sm:py-10 bg-[#11271e] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="text-[11px] sm:text-xs font-serif uppercase tracking-[0.28em] font-bold text-[#d4af37]">
              {progress.badge}
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif-luxury cursor-pointer group"
            onClick={() => isEditMode && onEditField('progress.title', 'Tiêu Đề Tiến Độ', progress.title)}
          >
            {progress.title}
            {isEditMode && <span className="ml-2 text-xs font-sans text-amber-400 font-bold">(Sửa)</span>}
          </h2>

          <p 
            className="mt-2 text-sm sm:text-base text-emerald-100/80 leading-relaxed cursor-pointer group"
            onClick={() => isEditMode && onEditField('progress.description', 'Mô Tả Tiến Độ', progress.description)}
          >
            {progress.description}
            {isEditMode && <span className="ml-2 text-xs font-sans text-amber-400 font-bold">(Sửa)</span>}
          </p>

          {/* Overall Progress Bar */}
          <div className="mt-3 max-w-xl mx-auto p-3 sm:p-3.5 rounded-2xl bg-black/40 border border-emerald-700/60 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Tổng tiến độ hạ tầng toàn khu
              </span>
              <span 
                className="text-xl font-extrabold text-amber-300 cursor-pointer"
                onClick={() => isEditMode && onEditField('progress.overallPercentage', 'Tỷ lệ tiến độ %', progress.overallPercentage.toString())}
              >
                {progress.overallPercentage}%
              </span>
            </div>
            <div className="w-full h-3.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-emerald-800">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-emerald-400 rounded-full transition-all duration-1000"
                style={{ width: `${progress.overallPercentage}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] text-white/60 flex items-center justify-between">
              <span>Cập nhật mới nhất: {progress.lastUpdated}</span>
              <span className="text-emerald-300 font-medium">Đảm bảo đúng hạn cam kết</span>
            </div>
          </div>
        </div>

        {/* Action button to add milestone in edit mode */}
        {isEditMode && (
          <div className="flex justify-end mb-6">
            <button
              onClick={handleAddMilestone}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black shadow transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Mốc Tiến Độ Mới</span>
            </button>
          </div>
        )}

        {/* Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {progress.milestones.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-[#17382c]/80 rounded-3xl overflow-hidden border border-emerald-700/50 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <div>
                {/* Photo */}
                <div className="relative h-44 w-full bg-black/40 overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40">
                      Không có ảnh
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 left-3">
                    {getStatusBadge(item.status)}
                  </div>

                  {isEditMode && (
                    <div className="absolute top-3 right-3 flex items-center gap-1">
                      <button
                        onClick={() => onPickImage(`progress.milestones.${idx}.imageUrl`, item.imageUrl || '')}
                        className="p-1.5 rounded-lg bg-amber-500 text-black font-bold text-xs shadow hover:bg-amber-400 cursor-pointer"
                        title="Đổi ảnh thực tế"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteMilestone(item.id, e)}
                        className="p-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs shadow hover:bg-rose-500 cursor-pointer"
                        title="Xóa mốc này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span 
                      className="cursor-pointer"
                      onClick={() => isEditMode && onEditField(`progress.milestones.${idx}.date`, 'Thời gian', item.date)}
                    >
                      {item.date}
                    </span>
                  </div>

                  <h4 
                    className="font-bold text-sm sm:text-base text-white mb-2 leading-snug cursor-pointer group-hover:text-amber-200 transition-colors"
                    onClick={() => isEditMode && onEditField(`progress.milestones.${idx}.title`, 'Tên hạng mục', item.title)}
                  >
                    {item.title}
                  </h4>

                  <p 
                    className="text-xs text-emerald-100/70 leading-relaxed cursor-pointer"
                    onClick={() => isEditMode && onEditField(`progress.milestones.${idx}.description`, 'Mô tả tiến độ', item.description)}
                  >
                    {item.description}
                  </p>
                </div>
              </div>

              {isEditMode && (
                <div className="p-3 bg-black/30 border-t border-emerald-800/60 text-[10px] text-amber-400 text-center font-medium">
                  Bấm trực tiếp để sửa nội dung mốc này
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
