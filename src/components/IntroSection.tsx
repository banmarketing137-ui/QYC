import React from 'react';
import { ProjectData } from '../types';
import { 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp
} from 'lucide-react';

interface IntroSectionProps {
  data: ProjectData;
  isEditMode: boolean;
  onPickImage: (fieldPath: string, currentUrl: string, title?: string) => void;
  onEditField: (fieldPath: string, label: string, currentValue: string) => void;
  onOpenConsultModal?: (productTitle?: string) => void;
  onOpen360Tour?: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({
  data,
  isEditMode,
  onEditField
}) => {
  const { intro } = data;

  const highlights = [
    {
      icon: Building2,
      title: "Trung Tâm Giao Thương Của Tỉnh Quảng Ninh",
      desc: "Tọa lạc tại tâm điểm giao thương phồn hoa, đón đầu các trục kinh tế huyết mạch và cửa ngõ giao thương sầm uất bậc nhất."
    },
    {
      icon: TrendingUp,
      title: "Đón Sóng Công Nghiệp Tỷ USD",
      desc: "Kề cận đại KCN Amata Sông Khoai, KCN Bắc Tiền Phong với hơn 100.000 chuyên gia kỹ sư."
    },
    {
      icon: ShieldCheck,
      title: "Pháp Lý Vàng Sổ Đỏ Lâu Dài",
      desc: "Quy hoạch 1/500 hoàn thiện, sẵn sàng ký HĐMB và nhận bàn giao đúng cam kết."
    },
    {
      icon: CheckCircle2,
      title: "Hạ Tầng Đồng Bộ 100%",
      desc: "Đường nội khu thảm nhựa, điện nước ngầm, công viên cây xanh và quảng trường ánh sáng."
    }
  ];

  return (
    <section id="gioi-thieu" className="py-10 sm:py-14 bg-white text-[#1c2826] relative overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* NARRATIVE INTRODUCTION & VALUE HIGHLIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-[#faf8f5] rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-sm">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#b89052]" />
              <span className="text-[11px] sm:text-xs font-serif uppercase tracking-[0.25em] font-bold text-[#a37b3f]">
                {intro.badge === 'TỔNG QUAN DỰ ÁN' ? 'TÂM ĐIỂM THỊNH VƯỢNG' : (intro.badge || 'TÂM ĐIỂM THỊNH VƯỢNG')}
              </span>
              <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#b89052]" />
            </div>

            <h3 
              className="text-2xl sm:text-3xl font-extrabold text-[#143325] font-serif-luxury leading-tight cursor-pointer"
              onClick={() => isEditMode && onEditField('intro.headline', 'Tiêu đề phụ', intro.headline)}
            >
              {intro.headline}
            </h3>

            <p 
              className="text-sm sm:text-base text-stone-600 leading-relaxed cursor-pointer"
              onClick={() => isEditMode && onEditField('intro.paragraph1', 'Đoạn văn 1', intro.paragraph1)}
            >
              {intro.paragraph1}
            </p>

            <p 
              className="text-sm sm:text-base text-stone-600 leading-relaxed cursor-pointer"
              onClick={() => isEditMode && onEditField('intro.paragraph2', 'Đoạn văn 2', intro.paragraph2)}
            >
              {intro.paragraph2}
            </p>

            {/* PHÁT TRIỂN BỞI CEN LAND */}
            <div className="pt-3 border-t border-stone-200/80 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-stone-500 font-medium">Phát triển bởi:</span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#143325]/5 border border-[#143325]/15">
                <span className="text-xs sm:text-sm font-extrabold text-[#143325] tracking-wider">CEN LAND</span>
                <span className="text-[10px] text-stone-400 italic hidden sm:inline">(Realizing your dreams)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-3.5 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:border-emerald-300 hover:-translate-y-1 cursor-default group"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#143325] group-hover:text-emerald-900 transition-colors">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
