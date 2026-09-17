import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, PhoneCall, MessageCircle } from 'lucide-react';
import { saveConsultationLead } from '../firebase';

interface ConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  hotline: string;
  zaloNumber: string;
  initialInterest?: string;
}

export const ConsultModal: React.FC<ConsultModalProps> = ({
  isOpen,
  onClose,
  projectName,
  hotline,
  zaloNumber,
  initialInterest
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: initialInterest || 'Nhà phố thương mại'
  });
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (initialInterest) {
      setFormData(prev => ({ ...prev, interest: initialInterest }));
    }
  }, [initialInterest, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone.trim()) return;
    setSubmitted(true);
    saveConsultationLead({
      fullName: formData.name,
      phone: formData.phone,
      note: formData.email,
      product: formData.interest
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#122e23] border border-emerald-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white font-serif-luxury">
              Đăng Ký Thành Công!
            </h3>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Thông tin của quý khách đã được gửi trực tiếp tới Phòng Kinh Doanh {projectName}. Chuyên viên sẽ liên hệ gửi trọn bộ tài liệu, bảng giá và chính sách ưu đãi trong ít phút.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#d8ae64] text-black font-bold text-xs hover:bg-amber-400 cursor-pointer"
              >
                Hoàn Tất & Quay Lại Trang
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Phòng Kinh Doanh Chủ Đầu Tư</span>
            </div>

            <h3 className="text-2xl font-bold text-white font-serif-luxury mb-1">
              Đăng Ký Tư Vấn & Nhận Bảng Giá
            </h3>
            <p className="text-xs text-emerald-100/80 mb-6">
              Ưu tiên chọn căn đẹp, nhận chiết khấu cao nhất và bộ hồ sơ pháp lý hoàn chỉnh.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-emerald-200 uppercase mb-1">
                  Họ và tên quý khách *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm focus:outline-none focus:border-amber-400 placeholder-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 uppercase mb-1">
                  Số điện thoại / Zalo *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0912 345 678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm focus:outline-none focus:border-amber-400 placeholder-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 uppercase mb-1">
                  Loại hình quan tâm
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="Nhà phố thương mại" className="bg-[#122e23]">01. Nhà phố thương mại (85–96,6 m²)</option>
                  <option value="Nhà liền kề" className="bg-[#122e23]">02. Nhà liền kề (85–96,6 m²)</option>
                  <option value="Nhà biệt thự" className="bg-[#122e23]">03. Nhà biệt thự (180–299 m²)</option>
                  <option value="Tư Vấn Đầu Tư Lô Góc Đẹp Nhất" className="bg-[#122e23]">Tư Vấn Đầu Tư Lô Góc Đẹp Nhất</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#d8ae64] via-[#f1d596] to-[#caa054] text-[#11291f] font-extrabold text-sm tracking-wider uppercase shadow-xl hover:bg-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#fff2d1]"
              >
                <Send className="w-4 h-4 text-[#11291f]" />
                <span>GỬI YÊU CẦU NGAY</span>
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-emerald-800/80 flex items-center justify-between text-xs text-white/70">
              <a
                href={`tel:${hotline.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 hover:text-amber-300 font-bold"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Hotline: {hotline}</span>
              </a>

              <a
                href={`https://zalo.me/${zaloNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-300 font-bold"
              >
                <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Chat Zalo</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
