import React, { useState } from 'react';
import { ProjectData } from '../types';
import { Logo } from './Logo';
import { saveConsultationLead } from '../firebase';
import { 
  PhoneCall, 
  Send, 
  MessageCircle, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Compass,
  ArrowUp
} from 'lucide-react';

interface ContactSectionProps {
  data: ProjectData;
  isEditMode: boolean;
  onEditField: (fieldPath: string, label: string, currentValue: string) => void;
  onOpen360Tour: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  data,
  isEditMode,
  onEditField,
  onOpen360Tour
}) => {
  const { general } = data;
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    productType: 'Shophouse Mặt Tiền Đại Lộ',
    note: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone.trim()) return;
    setSubmitted(true);
    saveConsultationLead({
      fullName: formData.fullName,
      phone: formData.phone,
      product: formData.productType,
      note: formData.note
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="lien-he" className="bg-[#0e241c] text-white pt-10 pb-6 border-t border-emerald-900/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Registration Form Box */}
        <div className="relative -mt-12 mb-6 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#16392c] to-[#0f2a20] border border-emerald-600/40 p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-3 mb-1">
                <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#d4af37]" />
                <span className="text-[11px] font-serif uppercase tracking-[0.25em] font-bold text-[#d4af37]">
                  Trực Tiếp Chủ Đầu Tư
                </span>
                <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#d4af37]" />
              </div>

              <h3 
                className="text-2xl sm:text-3xl font-extrabold text-white font-serif-luxury cursor-pointer"
                onClick={() => isEditMode && onEditField('general.consultationTitle', 'Tiêu đề đăng ký', general.consultationTitle)}
              >
                {general.consultationTitle}
              </h3>

              <p 
                className="text-sm text-emerald-100/80 leading-relaxed cursor-pointer"
                onClick={() => isEditMode && onEditField('general.consultationSubtitle', 'Mô tả đăng ký', general.consultationSubtitle)}
              >
                {general.consultationSubtitle}
              </p>

              <div className="pt-1 space-y-2 text-xs text-emerald-200/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f1d596]" />
                  <span>Bảng giá gốc đợt 1 trực tiếp từ phòng kinh doanh</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f1d596]" />
                  <span>Chính sách chiết khấu độc quyền lên đến 8.5%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f1d596]" />
                  <span>Hỗ trợ xe đưa đón tham quan thực tế công trường & trải nghiệm 360°</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7 bg-black/40 p-4 sm:p-6 rounded-xl border border-emerald-700/50 backdrop-blur-md">
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Đăng Ký Thành Công!</h4>
                  <p className="text-sm text-emerald-100/80 max-w-md mx-auto">
                    Cảm ơn quý khách đã quan tâm đến dự án Quảng Yên Centro. Chuyên viên tư vấn cao cấp sẽ liên hệ gửi bảng giá và chính sách chi tiết qua Zalo/SĐT trong ít phút.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    Gửi lại yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-emerald-200 uppercase mb-1">
                        Họ & Tên quý khách *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Ví dụ: Nguyễn Văn A"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-800 text-white text-sm focus:outline-none focus:border-amber-400 placeholder-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-200 uppercase mb-1">
                        Số điện thoại / Zalo *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ví dụ: 0912 345 678"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-800 text-white text-sm focus:outline-none focus:border-amber-400 placeholder-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-200 uppercase mb-1">
                      Loại hình sản phẩm quan tâm
                    </label>
                    <select
                      value={formData.productType}
                      onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-800 text-white text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="Shophouse Mặt Tiền Đại Lộ" className="bg-[#122e23]">Shophouse Mặt Tiền Đại Lộ</option>
                      <option value="Liền Kề Vườn Sinh Thái" className="bg-[#122e23]">Liền Kề Vườn Sinh Thái</option>
                      <option value="Biệt Thự Đơn Lập Ven Sông" className="bg-[#122e23]">Biệt Thự Đơn Lập Ven Sông</option>
                      <option value="Tư Vấn Đầu Tư Lô Góc Đẹp Nhất" className="bg-[#122e23]">Tư Vấn Đầu Tư Lô Góc Đẹp Nhất</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d8ae64] via-[#f1d596] to-[#caa054] text-[#11291f] font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#fff2d1]"
                  >
                    <Send className="w-4 h-4 text-[#11291f]" />
                    <span>GỬI YÊU CẦU NHẬN BẢNG GIÁ & CHÍNH SÁCH</span>
                  </button>

                  <p className="text-[11px] text-white/50 text-center">
                    Cam kết bảo mật thông tin khách hàng tuyệt đối 100%
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation & Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-emerald-900/60">
          {/* Col 1: Brand */}
          <div className="md:col-span-4 space-y-4">
            <Logo />
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              Khu đô thị thương mại trung tâm Quảng Yên - Đẳng cấp kiến trúc tân cổ điển châu Âu tại tâm điểm giao thương thịnh vượng Quảng Ninh.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpen360Tour}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 transition-colors cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Trải Nghiệm 360°</span>
              </button>

              <a
                href={`https://zalo.me/${general.zaloNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-bold hover:bg-blue-600/50 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Zalo Tư Vấn</span>
              </a>
            </div>
          </div>

          {/* Col 2: Direct Contact */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#f1d596] mb-3">
              Thông Tin Liên Hệ Dự Án
            </h4>

            <div 
              className="flex items-start gap-3 text-xs sm:text-sm text-white/80 cursor-pointer"
              onClick={() => isEditMode && onEditField('general.address', 'Địa chỉ dự án', general.address)}
            >
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{general.address}</span>
            </div>

            <div 
              className="flex items-center gap-3 text-xs sm:text-sm text-white/80 cursor-pointer"
              onClick={() => isEditMode && onEditField('general.hotline', 'Hotline dự án', general.hotline)}
            >
              <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Hotline 24/7: <strong className="text-white font-bold">{general.hotline}</strong></span>
            </div>

            <div 
              className="flex items-center gap-3 text-xs sm:text-sm text-white/80 cursor-pointer"
              onClick={() => isEditMode && onEditField('general.email', 'Email dự án', general.email)}
            >
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Email: {general.email}</span>
            </div>
          </div>

          {/* Col 3: Fast Navigation */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#f1d596] mb-3">
              Điều Hướng Nhanh
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-white/70">
              <a href="#gioi-thieu" className="hover:text-amber-300 transition-colors">Giới thiệu</a>
              <a href="#san-pham" className="hover:text-amber-300 transition-colors">Sản phẩm</a>
              <a href="#vi-tri" className="hover:text-amber-300 transition-colors">Vị trí</a>
              <a href="#tien-ich" className="hover:text-amber-300 transition-colors">Tiện ích</a>
              <a href="#hinh-anh" className="hover:text-amber-300 transition-colors">Hình ảnh</a>
              <a href="#chinh-sach" className="hover:text-amber-300 transition-colors">Chính sách</a>
              <a href="#tien-do" className="hover:text-amber-300 transition-colors">Tiến độ</a>
              <a href="#phap-ly" className="hover:text-amber-300 transition-colors">Pháp lý</a>
              <button onClick={onOpen360Tour} className="text-left text-amber-400 font-bold hover:underline cursor-pointer">
                Ảnh 360°
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {general.projectName}. Mọi thông tin, hình ảnh mang tính tham khảo và có thể điều chỉnh theo quyết định của cơ quan nhà nước có thẩm quyền.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <span>Về đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
