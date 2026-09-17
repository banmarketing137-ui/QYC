import React, { useState, useRef } from 'react';
import { ProjectData, PaymentMethodPlan } from '../types';
import { 
  Percent, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Award,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface PolicySectionProps {
  data: ProjectData;
  isEditMode: boolean;
  onEditField: (fieldPath: string, label: string, currentValue: string) => void;
  onOpenConsultModal: () => void;
}

export const PolicySection: React.FC<PolicySectionProps> = ({
  data,
  isEditMode,
  onEditField,
  onOpenConsultModal
}) => {
  const { policy } = data;
  const [activePlanCode, setActivePlanCode] = useState<string>('pa1');
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('tabs');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Fallback plans if not present
  const plans: PaymentMethodPlan[] = policy.plans || [
    {
      id: "plan-1",
      code: "pa1",
      title: "PHƯƠNG ÁN 1 – THANH TOÁN THƯỜNG",
      shortTitle: "Thanh Toán Thường",
      badge: "Chuẩn 11 đợt linh hoạt",
      highlight: "Chia nhỏ dòng vốn trong 270 ngày & giãn tiến độ đến khi nhận nhà",
      steps: [
        { step: "Ngày T", milestone: "Ký thỏa thuận đặt cọc", rate: "200 TRIỆU", category: "Tiền đặt cọc" },
        { step: "Đợt 1", milestone: "T+10 Ký HĐMB", rate: "30%", category: "Giá trị đất (Bao gồm tiền Đặt cọc)" },
        { step: "Đợt 2", milestone: "45 ngày", rate: "10%", category: "Giá trị đất" },
        { step: "Đợt 3", milestone: "90 ngày", rate: "10%", category: "Giá trị đất" },
        { step: "Đợt 4", milestone: "135 ngày", rate: "10%", category: "Giá trị đất" },
        { step: "Đợt 5", milestone: "180 ngày", rate: "10%", category: "Giá trị đất" },
        { step: "Đợt 6", milestone: "225 ngày", rate: "10%", category: "Giá trị đất" },
        { step: "Đợt 7", milestone: "270 ngày", rate: "20%", category: "Giá trị đất" },
        { step: "Đợt 8", milestone: "Vào ngày 1/6/2027", rate: "25%", category: "Giá trị xây" },
        { step: "Đợt 9", milestone: "Vào ngày 1/9/2027", rate: "25%", category: "Giá trị xây" },
        { step: "Đợt 10", milestone: "Bàn giao nhà dự kiến 31/12/2027", rate: "Đủ 95%", category: "Số tiền còn lại để đủ 95% Tổng giá bán nhà ở" },
        { step: "Đợt 11", milestone: "Cấp GCN QSDĐ & tài sản", rate: "5%", category: "Giá bán nhà ở còn lại của HĐMB" }
      ]
    },
    {
      id: "plan-2",
      code: "pa2",
      title: "PHƯƠNG ÁN 2 – THANH TOÁN SỚM",
      shortTitle: "Thanh Toán Sớm",
      badge: "Chiết khấu lên đến 16%",
      highlight: "Tối ưu hóa dòng tiền với mức chiết khấu cao nhất lên đến 16%",
      steps: [
        { step: "Ngày T", milestone: "Ký thỏa thuận đặt cọc", rate: "200 TRIỆU", category: "Tiền đặt cọc" },
        { step: "Đợt 1", milestone: "T+10 Ký HĐMB", rate: "30%", category: "Giá trị đất (Bao gồm tiền Đặt cọc)" },
        { step: "Đợt 2", milestone: "30 ngày", rate: "40%", category: "Giá trị đất" },
        { step: "Đợt 3", milestone: "60 ngày", rate: "30%", category: "Giá trị đất" },
        { step: "Đợt 4", milestone: "Vào ngày 1/6/2027", rate: "25%", category: "Giá trị xây" },
        { step: "Đợt 5", milestone: "Vào ngày 1/9/2027", rate: "25%", category: "Giá trị xây" },
        { step: "Đợt 6", milestone: "Bàn giao nhà dự kiến 31/12/2027", rate: "Đủ 95%", category: "Số tiền còn lại để đủ 95% Tổng giá bán nhà ở" },
        { step: "Đợt 7", milestone: "Cấp GCN QSDĐ & tài sản", rate: "5%", category: "Giá bán nhà ở còn lại của HĐMB" }
      ]
    },
    {
      id: "plan-3",
      code: "pa3",
      title: "PHƯƠNG ÁN 3 – TIẾN ĐỘ GIẢI NGÂN",
      shortTitle: "Tiến Độ Giải Ngân (HTLS)",
      badge: "Hỗ trợ lãi suất 70%",
      highlight: "Ngân hàng giải ngân 70% GTHĐ, hỗ trợ lãi suất 24 tháng hoặc đến 30/11/2028",
      steps: [
        { step: "Ngày T", milestone: "Ký thỏa thuận đặt cọc", rate: "200 TRIỆU", category: "Tiền đặt cọc" },
        { step: "Đợt 1", milestone: "T+10 Ký HĐMB", rate: "30%", category: "Giá trị đất (Bao gồm tiền Đặt cọc)" },
        { step: "Đợt 2", milestone: "30 ngày", rate: "70%", category: "Giá trị đất (Ngân hàng giải ngân HTLS)" },
        { step: "Đợt 3", milestone: "Vào ngày 1/6/2027", rate: "25%", category: "Giá trị xây" },
        { step: "Đợt 4", milestone: "Vào ngày 1/9/2027", rate: "25%", category: "Giá trị xây" },
        { step: "Đợt 5", milestone: "Bàn giao nhà dự kiến 31/12/2027", rate: "Đủ 95%", category: "Số tiền còn lại để đủ 95% Tổng giá bán nhà ở" },
        { step: "Đợt 6", milestone: "Cấp GCN QSDĐ & tài sản", rate: "5%", category: "Giá bán nhà ở còn lại của HĐMB" }
      ]
    }
  ];

  const currentPlan = plans.find(p => p.code === activePlanCode) || plans[0];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="chinh-sach" className="py-8 sm:py-10 bg-[#faf8f5] relative overflow-hidden">
      {/* Decorative subtle ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-100/40 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ================= 1. HEADER SECTION ================= */}
        <div className="text-center max-w-4xl mx-auto mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15382b]/8 border border-[#b89052]/30 text-[#8d692f] text-xs font-bold tracking-[0.25em] uppercase mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#b89052]" />
            <span>QUẢNG YÊN CENTRO</span>
          </div>

          <h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#15382b] tracking-tight leading-tight uppercase cursor-pointer group"
            onClick={() => isEditMode && onEditField('policy.title', 'Tiêu đề chính sách', policy.title)}
          >
            {policy.title || "CHÍNH SÁCH BÁN HÀNG & CHƯƠNG TRÌNH ƯU ĐÃI"}
            {isEditMode && <span className="ml-2 text-xs font-sans text-amber-600 font-bold">(Sửa)</span>}
          </h2>

          <div 
            className="mt-1.5 inline-block text-sm sm:text-lg lg:text-xl font-bold tracking-wider text-[#b8860b] uppercase cursor-pointer font-serif-luxury"
            onClick={() => isEditMode && onEditField('policy.slogan', 'Khẩu hiệu chính sách', policy.slogan || "VUN ĐẮP CƠ ĐỒ - VỮNG NỀN GIA SẢN")}
          >
            {policy.slogan || "VUN ĐẮP CƠ ĐỒ - VỮNG NỀN GIA SẢN"}
            {isEditMode && <span className="ml-2 text-xs font-sans text-amber-600 font-bold">(Sửa)</span>}
          </div>

          <p 
            className="mt-1 text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed cursor-pointer"
            onClick={() => isEditMode && onEditField('policy.description', 'Mô tả chính sách', policy.description)}
          >
            {policy.description}
          </p>
        </div>

        {/* ================= 2. TOP 2 HERO HIGHLIGHT CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5 max-w-5xl mx-auto">
          {/* Card 1: HTLS 70% */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#f6f2e9] to-[#eee4d0] p-4 sm:p-5 border border-[#d8c29d]/70 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#15382b] text-[#f1d596] text-xs font-extrabold tracking-wider uppercase">
                  HTLS
                </span>
                <p className="text-xs font-semibold text-stone-700 pt-0.5 leading-snug">
                  Trong 24 tháng hoặc đến 30/11/2028
                </p>
              </div>

              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-black text-[#b87333] tracking-tighter drop-shadow-sm font-sans">
                  70%
                </div>
                <div className="text-[11px] font-bold text-stone-800">
                  Giá trị đất (gồm VAT)
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-[#d8c29d]/40 flex items-center justify-between text-[11px] text-stone-600">
              <span className="font-medium">Ân hạn nợ gốc & miễn phí trả trước hạn</span>
              <span className="font-bold text-[#15382b]">Hỗ trợ lãi suất 0%</span>
            </div>
          </div>

          {/* Card 2: CHIẾT KHẤU 16% */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#f6f2e9] to-[#eee4d0] p-4 sm:p-5 border border-[#d8c29d]/70 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#15382b] text-[#f1d596] text-xs font-extrabold tracking-wider uppercase">
                  CHIẾT KHẤU
                </span>
                <p className="text-xs font-semibold text-stone-700 pt-0.5 leading-snug">
                  Lên đến mức cao nhất
                </p>
              </div>

              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-black text-[#c05621] tracking-tighter drop-shadow-sm font-sans">
                  16%
                </div>
                <div className="text-[11px] font-bold text-stone-800">
                  Với phương án thanh toán sớm
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-[#d8c29d]/40 flex items-center justify-between text-[11px] text-stone-600">
              <span className="font-medium">Tối ưu dòng vốn & biên lợi nhuận</span>
              <span className="font-bold text-[#15382b]">Khấu trừ trực tiếp</span>
            </div>
          </div>
        </div>

        {/* ================= 4. THREE PAYMENT PLANS SECTION (CLEAN & CLUTTER-FREE) ================= */}
        <div className="mb-8">
          
          {/* Plan Tabs Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-stone-200/80 border border-stone-300 w-full sm:w-auto shadow-inner">
              {plans.map((plan) => (
                <button
                  key={plan.code}
                  onClick={() => {
                    setActivePlanCode(plan.code);
                    setViewMode('tabs');
                  }}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    activePlanCode === plan.code && viewMode === 'tabs'
                      ? 'bg-[#15382b] text-[#f1d596] shadow-md scale-[1.02]'
                      : 'text-stone-700 hover:text-black hover:bg-stone-100/60'
                  }`}
                >
                  <span>{plan.shortTitle}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    activePlanCode === plan.code && viewMode === 'tabs'
                      ? 'bg-black/30 text-amber-200'
                      : 'bg-stone-300 text-stone-600'
                  }`}>
                    {plan.steps.length} mốc
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
              <button
                onClick={() => setViewMode(viewMode === 'tabs' ? 'all' : 'tabs')}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 shadow-sm cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <Layers className="w-4 h-4 text-emerald-800" />
                <span>{viewMode === 'tabs' ? 'Xem cả 3 phương án' : 'Xem theo Tab từng phương án'}</span>
              </button>
            </div>
          </div>

          {/* Render Plans */}
          <div className="space-y-10 max-w-6xl mx-auto">
            {(viewMode === 'all' ? plans : [currentPlan]).map((plan) => (
              <div 
                key={plan.code}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl relative overflow-hidden"
              >
                {/* Plan Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#15382b] text-[#f1d596] flex items-center justify-center font-black text-sm shrink-0">
                      {plan.code === 'pa1' ? '01' : plan.code === 'pa2' ? '02' : '03'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-extrabold text-[#15382b] uppercase tracking-wide font-sans">
                          {plan.title}
                        </h3>
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold">
                          {plan.badge}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {plan.highlight}
                      </p>
                    </div>
                  </div>

                  {/* Desktop / Mobile Scroll indicator */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    <span className="text-[11px] text-stone-400 font-medium mr-1 hidden sm:inline">
                      Cuộn xem lộ trình
                    </span>
                    <button
                      onClick={() => scroll('left')}
                      className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors cursor-pointer"
                      title="Cuộn sang trái"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => scroll('right')}
                      className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors cursor-pointer"
                      title="Cuộn sang phải"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* HORIZONTAL STEPPER TIMELINE (ACCURATE TO THE POSTER) */}
                <div 
                  ref={scrollRef}
                  className="overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  <div className="min-w-max flex items-stretch px-2 relative">
                    
                    {/* Connecting Golden Line Through Timeline */}
                    <div className="absolute top-[76px] left-10 right-10 h-[3px] bg-gradient-to-r from-[#b89052] via-[#e2c488] to-[#b89052] z-0 opacity-80" />

                    {plan.steps.map((step, idx) => {
                      const isDeposit = idx === 0;
                      const isComplete = idx === plan.steps.length - 1;
                      const isBuilding = step.category.toLowerCase().includes('xây');
                      const isLand = step.category.toLowerCase().includes('đất');

                      return (
                        <div 
                          key={step.id || idx}
                          className="flex flex-col items-center text-center w-36 sm:w-40 relative z-10 px-2 group"
                        >
                          {/* Top: Step Name & Milestone timing */}
                          <div className="h-16 flex flex-col justify-end pb-2">
                            <span className={`text-xs sm:text-sm font-black transition-colors ${
                              isDeposit ? 'text-amber-700' : 'text-[#15382b]'
                            }`}>
                              {step.step}
                            </span>
                            <span className="text-[11px] text-stone-500 font-semibold leading-tight line-clamp-2 max-w-[130px] mt-0.5">
                              {step.milestone}
                            </span>
                          </div>

                          {/* Middle: Golden Dot / Milestone Node */}
                          <div className="my-2.5">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow ${
                              isDeposit 
                                ? 'bg-amber-600 text-white ring-4 ring-amber-200' 
                                : isComplete 
                                  ? 'bg-[#15382b] text-white ring-4 ring-emerald-100'
                                  : 'bg-[#d4af37] text-black ring-4 ring-amber-100 group-hover:scale-110'
                            }`}>
                              <span className="w-2 h-2 rounded-full bg-white" />
                            </div>
                          </div>

                          {/* Bottom: Big Display Rate / Amount */}
                          <div className="mt-1 flex flex-col items-center">
                            <div className={`text-lg sm:text-xl font-black tracking-tight ${
                              isDeposit 
                                ? 'text-amber-800' 
                                : isBuilding 
                                  ? 'text-teal-800' 
                                  : 'text-[#15382b]'
                            }`}>
                              {step.rate}
                            </div>
                            
                            {/* Category description label */}
                            <span className="text-[10px] sm:text-[11px] text-stone-600 font-medium leading-tight max-w-[130px] mt-1 bg-stone-100/90 rounded-md px-1.5 py-0.5">
                              {step.category}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Quick Summary Bar for Plan */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>
                      {plan.code === 'pa1' && 'Tiến độ giãn đều: Giá trị đất đóng theo 7 đợt (270 ngày), Giá trị xây đóng từ 1/6/2027'}
                      {plan.code === 'pa2' && 'Thanh toán sớm nhận chiết khấu cao nhất, bàn giao nhà dự kiến 31/12/2027'}
                      {plan.code === 'pa3' && 'Hỗ trợ lãi suất 0% cho 70% giá trị đất trong 24 tháng hoặc đến 30/11/2028'}
                    </span>
                  </div>
                  <button
                    onClick={onOpenConsultModal}
                    className="text-emerald-800 hover:text-emerald-950 font-bold underline cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>Xem bảng tính dòng tiền chi tiết căn này</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
