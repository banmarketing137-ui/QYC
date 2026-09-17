import React, { useState } from 'react';
import { ProjectData, AmenityItem, GalleryItem, UnitItem, UnitStatus, ProgressMilestone, LegalDocument } from '../types';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  Settings, 
  Layers, 
  Compass, 
  MapPin, 
  Sparkles, 
  Image as ImageIcon, 
  Percent, 
  Clock, 
  ShieldCheck,
  Link as LinkIcon,
  Phone,
  FileText,
  Home,
  Plus,
  Trash2,
  Building2,
  Tag,
  Cloud,
  RefreshCw
} from 'lucide-react';

interface CmsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: ProjectData;
  onSaveData: (newData: ProjectData) => void;
  onResetData: () => void;
  onOpenImagePicker: (fieldPath: string, currentUrl: string) => void;
  cloudSyncStatus?: 'connecting' | 'synced' | 'local_only' | 'syncing';
  lastCloudSyncTime?: string | null;
  onManualCloudSync?: () => Promise<void>;
}

export const CmsDrawer: React.FC<CmsDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onSaveData,
  onResetData,
  onOpenImagePicker,
  cloudSyncStatus = 'synced',
  lastCloudSyncTime,
  onManualCloudSync
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'intro' | 'products' | 'location' | 'amenities' | 'inventory' | 'policy' | 'progress' | 'legal' | 'backup'>('general');
  const [formData, setFormData] = useState<ProjectData>(data);
  const [jsonInput, setJsonInput] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Sync when data or drawer opens
  React.useEffect(() => {
    setFormData(data);
  }, [data, isOpen]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = () => {
    onSaveData(formData);
    showToast("Đã lưu mọi thay đổi thành công!");
  };

  const handleExportJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(formData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `quang_yen_centro_content_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Đã xuất file dữ liệu JSON thành công!");
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (parsed.general && parsed.intro) {
        setFormData(parsed);
        onSaveData(parsed);
        showToast("Đã nhập dữ liệu thành công!");
      } else {
        alert("Dữ liệu JSON không đúng cấu trúc trang web.");
      }
    } catch (err) {
      alert("Mã JSON không hợp lệ. Vui lòng kiểm tra lại cú pháp.");
    }
  };

  const tabs = [
    { id: 'general', label: 'Cài Đặt & Link', icon: Settings },
    { id: 'intro', label: 'Giới Thiệu', icon: Sparkles },
    { id: 'products', label: 'Sản Phẩm', icon: Home },
    { id: 'location', label: 'Vị Trí', icon: MapPin },
    { id: 'amenities', label: 'Tiện Ích', icon: Layers },
    { id: 'inventory', label: 'Tình Trạng Căn', icon: Building2 },
    { id: 'policy', label: 'Chính Sách', icon: Percent },
    { id: 'progress', label: 'Tiến Độ', icon: Clock },
    { id: 'legal', label: 'Pháp Lý', icon: ShieldCheck },
    { id: 'backup', label: 'Sao Lưu / Nhập', icon: Download },
  ];

  return (
    <div 
      id="cms-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <div 
        id="cms-drawer-panel"
        className="w-full max-w-2xl bg-[#10271e] border-l border-emerald-700/80 text-white flex flex-col h-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#0a1b14] border-b border-emerald-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-300 text-black font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">Quản Trị Nội Dung Website</h2>
              <p className="text-xs text-amber-200/80">Tự do chỉnh sửa text, thay ảnh và cập nhật liên kết</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-[#d8ae64] hover:bg-amber-400 text-[#10271e] font-bold text-xs shadow cursor-pointer transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Lưu & Đồng Bộ</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real-time Cloud Sync Status Ribbon */}
        <div className="px-4 py-2 bg-[#081812] border-b border-emerald-900/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                cloudSyncStatus === 'synced' ? 'bg-emerald-400' : 'bg-amber-400'
              }`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                cloudSyncStatus === 'synced' ? 'bg-emerald-500' : 'bg-amber-500'
              }`} />
            </span>
            <div className="text-[11px] sm:text-xs">
              <span className="font-bold text-emerald-300">
                {cloudSyncStatus === 'synced' && 'Cloud Firestore: Đã kết nối & Đồng bộ trực tuyến (Mọi người đều xem được nội dung mới)'}
                {cloudSyncStatus === 'syncing' && 'Cloud Firestore: Đang đồng bộ dữ liệu lên máy chủ...'}
                {cloudSyncStatus === 'connecting' && 'Cloud Firestore: Đang kết nối cơ sở dữ liệu...'}
                {cloudSyncStatus === 'local_only' && 'Cloud Firestore: Chế độ offline'}
              </span>
              {lastCloudSyncTime && (
                <span className="text-emerald-500/80 ml-2 hidden sm:inline">
                  (Cập nhật: {new Date(lastCloudSyncTime).toLocaleTimeString('vi-VN')})
                </span>
              )}
            </div>
          </div>

          {onManualCloudSync && (
            <button
              onClick={onManualCloudSync}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-[11px] font-bold cursor-pointer transition-colors border border-emerald-600/50 shadow-2xs"
              title="Đẩy ngay toàn bộ nội dung bạn vừa sửa lên Cloud để người xem trên thiết bị khác thấy ngay"
            >
              <RefreshCw className="w-3 h-3 text-[#f1d596]" />
              <span>Đồng bộ lên Cloud ngay</span>
            </button>
          )}
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="px-4 bg-[#0d221a] border-b border-emerald-800/60 flex items-center gap-1 overflow-x-auto py-2 shrink-0">
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#d8ae64] text-black font-bold'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: GENERAL & LINKS */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 pb-2 border-b border-emerald-800">
                Thông Tin Chung & Đường Link Trọng Yếu
              </h3>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Tên Dự Án</label>
                <input
                  type="text"
                  value={formData.general.projectName}
                  onChange={(e) => setFormData({
                    ...formData,
                    general: { ...formData.general, projectName: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Khẩu Hiệu / Tagline</label>
                <input
                  type="text"
                  value={formData.general.tagline}
                  onChange={(e) => setFormData({
                    ...formData,
                    general: { ...formData.general, tagline: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                />
              </div>

              {/* Prominent 360 Tour Link Field */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 space-y-2">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <label className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">
                    Đường Link Ảnh 360 / VR Tour Dự Án (Quan Trọng)
                  </label>
                </div>
                <p className="text-[11px] text-white/70">
                  Đây là link sẽ được mở khi người xem bấm vào nút nổi bật <strong>ẢNH 360°</strong> trên menu hoặc banner. Bạn có thể dán link Kuula, Matterport, Google Maps 360 hoặc bất kỳ link web nào.
                </p>
                <input
                  type="text"
                  value={formData.general.tour360Url}
                  onChange={(e) => setFormData({
                    ...formData,
                    general: { ...formData.general, tour360Url: e.target.value }
                  })}
                  placeholder="https://kuula.co/share/..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-amber-400/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">Hotline Liên Hệ</label>
                  <input
                    type="text"
                    value={formData.general.hotline}
                    onChange={(e) => setFormData({
                      ...formData,
                      general: { ...formData.general, hotline: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">Số Zalo Nhận Tin</label>
                  <input
                    type="text"
                    value={formData.general.zaloNumber}
                    onChange={(e) => setFormData({
                      ...formData,
                      general: { ...formData.general, zaloNumber: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Địa Chỉ Dự Án</label>
                <input
                  type="text"
                  value={formData.general.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    general: { ...formData.general, address: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Link Tải Brochure / Tài Liệu PDF</label>
                <input
                  type="text"
                  value={formData.general.brochureUrl}
                  onChange={(e) => setFormData({
                    ...formData,
                    general: { ...formData.general, brochureUrl: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                />
              </div>
            </div>
          )}

          {/* TAB 2: INTRO & HERO */}
          {activeTab === 'intro' && (
            <div className="space-y-5">
              {/* HERO BANNER & 4 KEY STATS */}
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/60 space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#f1d596]" />
                  <span>Khu Vực Hero Banner Đầu Trang</span>
                </h3>

                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">Ảnh Nền Hero (Toàn Cảnh Dự Án)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.intro.heroImage}
                      onChange={(e) => setFormData({
                        ...formData,
                        intro: { ...formData.intro, heroImage: e.target.value }
                      })}
                      className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-xs"
                      placeholder="Link ảnh nền..."
                    />
                    <button
                      onClick={() => onOpenImagePicker('intro.heroImage', formData.intro.heroImage)}
                      className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Chọn Ảnh
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-emerald-200 mb-1">Huy Hiệu (Badge Nhỏ)</label>
                    <input
                      type="text"
                      value={formData.intro.badge}
                      onChange={(e) => setFormData({
                        ...formData,
                        intro: { ...formData.intro, badge: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-emerald-800 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-200 mb-1">Mô Tả Phụ Dưới Khẩu Hiệu</label>
                    <input
                      type="text"
                      value={formData.general.subDescription}
                      onChange={(e) => setFormData({
                        ...formData,
                        general: { ...formData.general, subDescription: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-emerald-800 text-white text-xs"
                    />
                  </div>
                </div>

                {/* 4 Key Stats Editing */}
                <div className="pt-2 border-t border-emerald-800/60">
                  <label className="block text-xs font-bold text-[#f1d596] mb-2 uppercase tracking-wider">
                    4 Thẻ Chỉ Số Nổi Bật Trên Hero
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(formData.intro.stats || []).map((st, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-black/40 border border-emerald-800 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded">Thẻ #{idx + 1}</span>
                          <input
                            type="text"
                            value={st.value}
                            placeholder="Số liệu (VD: 70%, 9+)"
                            onChange={(e) => {
                              const updated = [...(formData.intro.stats || [])];
                              updated[idx] = { ...updated[idx], value: e.target.value };
                              setFormData({
                                ...formData,
                                intro: { ...formData.intro, stats: updated }
                              });
                            }}
                            className="flex-1 px-2 py-1 rounded bg-black/60 border border-emerald-700 text-xs font-bold text-[#f1d596]"
                          />
                        </div>
                        <input
                          type="text"
                          value={st.label}
                          placeholder="Tiêu đề chỉ số"
                          onChange={(e) => {
                            const updated = [...(formData.intro.stats || [])];
                            updated[idx] = { ...updated[idx], label: e.target.value };
                            setFormData({
                              ...formData,
                              intro: { ...formData.intro, stats: updated }
                            });
                          }}
                          className="w-full px-2 py-1 rounded bg-black/60 border border-emerald-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={st.subtext || ''}
                          placeholder="Ghi chú phụ (nếu có)"
                          onChange={(e) => {
                            const updated = [...(formData.intro.stats || [])];
                            updated[idx] = { ...updated[idx], subtext: e.target.value };
                            setFormData({
                              ...formData,
                              intro: { ...formData.intro, stats: updated }
                            });
                          }}
                          className="w-full px-2 py-1 rounded bg-black/60 border border-emerald-700 text-[11px] text-white/70"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 pb-2 border-b border-emerald-800">
                Phần 1: Giới Thiệu Tổng Quan
              </h3>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Tiêu Đề Lớn</label>
                <input
                  type="text"
                  value={formData.intro.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    intro: { ...formData.intro, title: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Dòng Headline</label>
                <input
                  type="text"
                  value={formData.intro.headline}
                  onChange={(e) => setFormData({
                    ...formData,
                    intro: { ...formData.intro, headline: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Đoạn Văn 1</label>
                <textarea
                  rows={3}
                  value={formData.intro.paragraph1}
                  onChange={(e) => setFormData({
                    ...formData,
                    intro: { ...formData.intro, paragraph1: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Đoạn Văn 2</label>
                <textarea
                  rows={3}
                  value={formData.intro.paragraph2}
                  onChange={(e) => setFormData({
                    ...formData,
                    intro: { ...formData.intro, paragraph2: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                />
              </div>

              {/* CÁC TRƯỜNG THÔNG TIN TỔNG QUAN DỰ ÁN (THEO MẪU REFERENCE) */}
              <div className="pt-4 border-t border-emerald-800/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#f1d596]">
                  Các Trường Thông Tin Bảng Tổng Quan
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-1">Tên dự án</label>
                    <input
                      type="text"
                      value={formData.intro.overview?.projectName || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        intro: {
                          ...formData.intro,
                          overview: {
                            ...(formData.intro.overview || {}),
                            projectName: e.target.value
                          } as any
                        }
                      })}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-emerald-800 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-1">Quy mô</label>
                    <input
                      type="text"
                      value={formData.intro.overview?.scale || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        intro: {
                          ...formData.intro,
                          overview: {
                            ...(formData.intro.overview || {}),
                            scale: e.target.value
                          } as any
                        }
                      })}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-emerald-800 text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1">Vị trí dự án</label>
                  <input
                    type="text"
                    value={formData.intro.overview?.location || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      intro: {
                        ...formData.intro,
                        overview: {
                          ...(formData.intro.overview || {}),
                          location: e.target.value
                        } as any
                      }
                    })}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-emerald-800 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1">Tổng số sản phẩm</label>
                  <input
                    type="text"
                    value={formData.intro.overview?.totalProducts || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      intro: {
                        ...formData.intro,
                        overview: {
                          ...(formData.intro.overview || {}),
                          totalProducts: e.target.value
                        } as any
                      }
                    })}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-emerald-800 text-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-1">Số lượng Liền kề / Shophouse</label>
                    <input
                      type="text"
                      value={formData.intro.overview?.shophouseCount || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        intro: {
                          ...formData.intro,
                          overview: {
                            ...(formData.intro.overview || {}),
                            shophouseCount: e.target.value
                          } as any
                        }
                      })}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-emerald-800 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-1">Số lượng Biệt thự</label>
                    <input
                      type="text"
                      value={formData.intro.overview?.villaCount || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        intro: {
                          ...formData.intro,
                          overview: {
                            ...(formData.intro.overview || {}),
                            villaCount: e.target.value
                          } as any
                        }
                      })}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-emerald-800 text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1">Pháp lý dự án</label>
                  <input
                    type="text"
                    value={formData.intro.overview?.legal || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      intro: {
                        ...formData.intro,
                        overview: {
                          ...(formData.intro.overview || {}),
                          legal: e.target.value
                        } as any
                      }
                    })}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-emerald-800 text-white text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-emerald-200 mb-1">Ảnh Phối Cảnh Giới Thiệu</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.intro.bannerImage}
                    onChange={(e) => setFormData({
                      ...formData,
                      intro: { ...formData.intro, bannerImage: e.target.value }
                    })}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-xs"
                  />
                  <button
                    onClick={() => onOpenImagePicker('intro.bannerImage', formData.intro.bannerImage)}
                    className="px-3 py-2 bg-amber-500 text-black text-xs font-bold rounded-xl cursor-pointer hover:bg-amber-400"
                  >
                    Chọn Ảnh
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-800">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
                  Cơ Cấu Các Dòng Sản Phẩm
                </h3>
                <button
                  onClick={() => {
                    const currentItems = formData.products?.items || [];
                    const nextNum = currentItems.length + 1;
                    const formatted = nextNum < 10 ? `0${nextNum}.` : `${nextNum}.`;
                    const newItem = {
                      id: `prod-${Date.now()}`,
                      orderNumber: formatted,
                      title: "Dòng sản phẩm mới",
                      area: "100–150 m²",
                      frontage: "6–8m",
                      depth: "18 m",
                      floors: "4 tầng",
                      description: "Mô tả dòng sản phẩm mới.",
                      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                    };
                    setFormData({
                      ...formData,
                      products: {
                        ...formData.products,
                        items: [...currentItems, newItem]
                      }
                    });
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Sản Phẩm</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Tiêu Đề Section</label>
                <input
                  type="text"
                  value={formData.products?.title || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    products: { ...formData.products, title: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Mô Tả Tổng Quan</label>
                <textarea
                  rows={2}
                  value={formData.products?.description || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    products: { ...formData.products, description: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                />
              </div>

              <div className="space-y-4 pt-2">
                <label className="block text-xs font-bold text-amber-300">
                  Danh Sách Các Dòng Sản Phẩm ({formData.products?.items?.length || 0})
                </label>

                {(formData.products?.items || []).map((item, idx) => (
                  <div key={item.id || idx} className="p-4 bg-black/35 rounded-2xl border border-emerald-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-850 pb-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item.orderNumber}
                          onChange={(e) => {
                            const updated = [...(formData.products?.items || [])];
                            updated[idx].orderNumber = e.target.value;
                            setFormData({
                              ...formData,
                              products: { ...formData.products, items: updated }
                            });
                          }}
                          className="w-16 px-2 py-1 rounded bg-black/50 border border-emerald-800 text-xs font-bold text-amber-400"
                        />
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...(formData.products?.items || [])];
                            updated[idx].title = e.target.value;
                            setFormData({
                              ...formData,
                              products: { ...formData.products, items: updated }
                            });
                          }}
                          className="w-48 px-2 py-1 rounded bg-black/50 border border-emerald-800 text-xs font-bold text-white"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenImagePicker(`products.items.${idx}.imageUrl`, item.imageUrl)}
                          className="text-xs text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Đổi ảnh</span>
                        </button>
                        <button
                          onClick={() => {
                            const updated = (formData.products?.items || []).filter((_, i) => i !== idx);
                            setFormData({
                              ...formData,
                              products: { ...formData.products, items: updated }
                            });
                          }}
                          className="p-1 rounded bg-rose-900/50 hover:bg-rose-800 text-rose-300 cursor-pointer"
                          title="Xóa sản phẩm này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>
                        <label className="text-[10px] text-emerald-300 font-semibold block">Diện tích</label>
                        <input
                          type="text"
                          value={item.area}
                          onChange={(e) => {
                            const updated = [...(formData.products?.items || [])];
                            updated[idx].area = e.target.value;
                            setFormData({
                              ...formData,
                              products: { ...formData.products, items: updated }
                            });
                          }}
                          className="w-full px-2 py-1 rounded bg-black/50 border border-emerald-800 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-emerald-300 font-semibold block">Mặt tiền</label>
                        <input
                          type="text"
                          value={item.frontage || ''}
                          onChange={(e) => {
                            const updated = [...(formData.products?.items || [])];
                            updated[idx].frontage = e.target.value;
                            setFormData({
                              ...formData,
                              products: { ...formData.products, items: updated }
                            });
                          }}
                          className="w-full px-2 py-1 rounded bg-black/50 border border-emerald-800 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-emerald-300 font-semibold block">Số lượng sản phẩm</label>
                        <input
                          type="text"
                          value={item.quantity || ''}
                          placeholder="VD: 140 căn"
                          onChange={(e) => {
                            const updated = [...(formData.products?.items || [])];
                            updated[idx].quantity = e.target.value;
                            setFormData({
                              ...formData,
                              products: { ...formData.products, items: updated }
                            });
                          }}
                          className="w-full px-2 py-1 rounded bg-black/50 border border-emerald-800 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-emerald-300 font-semibold block">Số tầng</label>
                        <input
                          type="text"
                          value={item.floors || ''}
                          onChange={(e) => {
                            const updated = [...(formData.products?.items || [])];
                            updated[idx].floors = e.target.value;
                            setFormData({
                              ...formData,
                              products: { ...formData.products, items: updated }
                            });
                          }}
                          className="w-full px-2 py-1 rounded bg-black/50 border border-emerald-800 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-emerald-300 font-semibold block mb-1">Đoạn giới thiệu</label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...(formData.products?.items || [])];
                          updated[idx].description = e.target.value;
                          setFormData({
                            ...formData,
                            products: { ...formData.products, items: updated }
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-black/50 border border-emerald-800 text-xs text-white/90"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LOCATION */}
          {activeTab === 'location' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 pb-2 border-b border-emerald-800">
                Phần 2: Vị Trí & Liên Kết Vùng
              </h3>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Tiêu Đề Vị Trí</label>
                <input
                  type="text"
                  value={formData.location.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, title: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Mô Tả Vị Trí</label>
                <textarea
                  rows={3}
                  value={formData.location.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, description: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Link Mở Google Maps</label>
                <input
                  type="text"
                  value={formData.location.googleMapsLink}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, googleMapsLink: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                />
              </div>

              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-emerald-200">5 Mốc Liên Kết Vùng</label>
                {formData.location.highlights.map((item, idx) => (
                  <div key={item.id || idx} className="p-3 bg-black/30 rounded-xl border border-emerald-850 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) => {
                          const updated = [...formData.location.highlights];
                          updated[idx].time = e.target.value;
                          setFormData({ ...formData, location: { ...formData.location, highlights: updated } });
                        }}
                        className="w-24 px-2.5 py-1 rounded bg-black/50 border border-emerald-800 text-xs font-bold text-amber-300"
                        placeholder="Thời gian"
                      />
                      <input
                        type="text"
                        value={item.destination}
                        onChange={(e) => {
                          const updated = [...formData.location.highlights];
                          updated[idx].destination = e.target.value;
                          setFormData({ ...formData, location: { ...formData.location, highlights: updated } });
                        }}
                        className="flex-1 px-2.5 py-1 rounded bg-black/50 border border-emerald-800 text-xs text-white font-medium"
                        placeholder="Địa điểm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AMENITIES */}
          {activeTab === 'amenities' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 pb-2 border-b border-emerald-800">
                Phần 3: Quản Lý Tiện Ích Đẳng Cấp
              </h3>

              <div className="space-y-3">
                {formData.amenities.items.map((item, idx) => (
                  <div key={item.id || idx} className="p-3.5 bg-black/30 rounded-xl border border-emerald-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300">Tiện ích #{idx + 1}</span>
                      <button
                        onClick={() => onOpenImagePicker(`amenities.items.${idx}.imageUrl`, item.imageUrl)}
                        className="text-xs text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Đổi ảnh</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={item.category || ''}
                        onChange={(e) => {
                          const updated = [...formData.amenities.items];
                          updated[idx].category = e.target.value;
                          setFormData({ ...formData, amenities: { ...formData.amenities, items: updated } });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-black/50 border border-emerald-800 text-xs text-amber-300 font-bold"
                        placeholder="Categories (VD: Tiện ích trung tâm)"
                      />
                      <select
                        value={item.type || 'internal'}
                        onChange={(e) => {
                          const updated = [...formData.amenities.items];
                          updated[idx].type = e.target.value as 'internal' | 'external';
                          setFormData({ ...formData, amenities: { ...formData.amenities, items: updated } });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-black/50 border border-emerald-800 text-xs text-white"
                      >
                        <option value="internal">Tiện ích Nội khu</option>
                        <option value="external">Tiện ích Kết nối</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...formData.amenities.items];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, amenities: { ...formData.amenities, items: updated } });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-black/50 border border-emerald-800 text-xs text-white font-bold"
                      placeholder="Tên tiện ích"
                    />
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...formData.amenities.items];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, amenities: { ...formData.amenities, items: updated } });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-black/50 border border-emerald-800 text-xs text-white/80"
                      placeholder="Mô tả tiện ích"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INVENTORY & UNIT STATUS */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-800">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
                  Phần 4: Quản Lý Bảng Hàng & Tình Trạng Căn
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const currentUnits = formData.inventory?.units || [];
                    const newUnit: UnitItem = {
                      id: `u-${Date.now()}`,
                      code: `LK-${currentUnits.length + 1}`,
                      block: 'Block LK-01',
                      type: 'Liền kề',
                      area: '85 m²',
                      floorArea: '275 m²',
                      floors: '3.5 tầng',
                      frontage: '5.0m',
                      orientation: 'Đông Nam',
                      priceEstimate: '4.35 Tỷ',
                      status: 'available',
                      note: 'Mới cập nhật',
                      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop'
                    };
                    setFormData({
                      ...formData,
                      inventory: {
                        ...(formData.inventory || {
                          badge: 'BẢNG HÀNG TRỰC TUYẾN',
                          title: 'CẬP NHẬT TÌNH TRẠNG CĂN THỜI GIAN THỰC',
                          description: 'Theo dõi tình trạng quỹ căn minh bạch theo từng Block & Phân khu.',
                          masterplanImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop',
                          units: []
                        }),
                        units: [...currentUnits, newUnit]
                      }
                    });
                  }}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Căn</span>
                </button>
              </div>

              {/* Title & Badge */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">Badge</label>
                  <input
                    type="text"
                    value={formData.inventory?.badge || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      inventory: {
                        ...(formData.inventory || { badge: '', title: '', description: '', masterplanImage: '', units: [] }),
                        badge: e.target.value
                      }
                    })}
                    className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-emerald-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">Tiêu Đề Bảng Hàng</label>
                  <input
                    type="text"
                    value={formData.inventory?.title || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      inventory: {
                        ...(formData.inventory || { badge: '', title: '', description: '', masterplanImage: '', units: [] }),
                        title: e.target.value
                      }
                    })}
                    className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-emerald-800 text-white text-xs"
                  />
                </div>
              </div>

              {/* Masterplan image */}
              <div className="p-3 bg-black/30 rounded-xl border border-emerald-800 space-y-2">
                <label className="block text-xs font-bold text-amber-300">Ảnh Mặt Bằng Phân Lô 1/500</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.inventory?.masterplanImage || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      inventory: {
                        ...(formData.inventory || { badge: '', title: '', description: '', masterplanImage: '', units: [] }),
                        masterplanImage: e.target.value
                      }
                    })}
                    className="flex-1 px-3 py-1.5 rounded bg-black/50 border border-emerald-800 text-xs text-white"
                  />
                  <button
                    onClick={() => onOpenImagePicker('inventory.masterplanImage', formData.inventory?.masterplanImage || '')}
                    className="px-3 py-1.5 bg-amber-500 text-black text-xs font-bold rounded cursor-pointer"
                  >
                    Đổi
                  </button>
                </div>
              </div>

              {/* Unit List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-emerald-200">
                    Danh Sách Quỹ Căn & Trạng Thái ({(formData.inventory?.units || []).length} căn)
                  </label>
                  <span className="text-[11px] text-amber-300">
                    🟢 Còn: {(formData.inventory?.units || []).filter(u => u.status === 'available').length} | 
                    🟡 Cọc: {(formData.inventory?.units || []).filter(u => u.status === 'booking').length} | 
                    🔴 Đã Bán: {(formData.inventory?.units || []).filter(u => u.status === 'sold').length}
                  </span>
                </div>

                {(formData.inventory?.units || []).map((unit, idx) => (
                  <div key={unit.id || idx} className="p-3 bg-black/35 rounded-xl border border-emerald-800 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={unit.code}
                          onChange={(e) => {
                            const updated = [...(formData.inventory?.units || [])];
                            updated[idx].code = e.target.value;
                            setFormData({
                              ...formData,
                              inventory: { ...(formData.inventory || { badge: '', title: '', description: '', masterplanImage: '', units: [] }), units: updated }
                            });
                          }}
                          className="w-20 px-2 py-1 rounded bg-black/50 border border-emerald-700 text-xs font-bold text-amber-300"
                          placeholder="Mã căn"
                        />
                        <input
                          type="text"
                          value={unit.block}
                          onChange={(e) => {
                            const updated = [...(formData.inventory?.units || [])];
                            updated[idx].block = e.target.value;
                            setFormData({
                              ...formData,
                              inventory: { ...(formData.inventory || { badge: '', title: '', description: '', masterplanImage: '', units: [] }), units: updated }
                            });
                          }}
                          className="w-28 px-2 py-1 rounded bg-black/50 border border-emerald-700 text-xs text-white"
                          placeholder="Block"
                        />
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <select
                          value={unit.status}
                          onChange={(e) => {
                            const updated = [...(formData.inventory?.units || [])];
                            updated[idx].status = e.target.value as UnitStatus;
                            setFormData({
                              ...formData,
                              inventory: { ...(formData.inventory || { badge: '', title: '', description: '', masterplanImage: '', units: [] }), units: updated }
                            });
                          }}
                          className={`px-2 py-1 rounded text-xs font-bold cursor-pointer border ${
                            unit.status === 'available'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                              : unit.status === 'booking'
                              ? 'bg-amber-950 text-amber-300 border-amber-500'
                              : 'bg-rose-950 text-rose-300 border-rose-500'
                          }`}
                        >
                          <option value="available">🟢 Còn Hàng</option>
                          <option value="booking">🟡 Đang Giữ Chỗ</option>
                          <option value="sold">🔴 Đã Bán</option>
                        </select>

                        <button
                          onClick={() => {
                            const updated = (formData.inventory?.units || []).filter((_, i) => i !== idx);
                            setFormData({
                              ...formData,
                              inventory: { ...(formData.inventory || { badge: '', title: '', description: '', masterplanImage: '', units: [] }), units: updated }
                            });
                          }}
                          className="p-1 rounded bg-rose-900/50 hover:bg-rose-800 text-rose-300 cursor-pointer"
                          title="Xóa căn này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-emerald-300 font-semibold block">Loại</span>
                        <input
                          type="text"
                          value={unit.type}
                          onChange={(e) => {
                            const updated = [...(formData.inventory?.units || [])];
                            updated[idx].type = e.target.value;
                            setFormData({
                              ...formData,
                              inventory: { ...(formData.inventory || { badge: '', title: '', description: '', masterplanImage: '', units: [] }), units: updated }
                            });
                          }}
                          className="w-full px-2 py-0.5 rounded bg-black/50 border border-emerald-800 text-xs text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-300 font-semibold block">Diện tích</span>
                        <input
                          type="text"
                          value={unit.area}
                          onChange={(e) => {
                            const updated = [...(formData.inventory?.units || [])];
                            updated[idx].area = e.target.value;
                            setFormData({
                              ...formData,
                              inventory: { ...(formData.inventory || { badge: '', title: '', description: '', masterplanImage: '', units: [] }), units: updated }
                            });
                          }}
                          className="w-full px-2 py-0.5 rounded bg-black/50 border border-emerald-800 text-xs text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-300 font-semibold block">Hướng</span>
                        <input
                          type="text"
                          value={unit.orientation}
                          onChange={(e) => {
                            const updated = [...(formData.inventory?.units || [])];
                            updated[idx].orientation = e.target.value;
                            setFormData({
                              ...formData,
                              inventory: { ...(formData.inventory || { badge: '', title: '', description: '', masterplanImage: '', units: [] }), units: updated }
                            });
                          }}
                          className="w-full px-2 py-0.5 rounded bg-black/50 border border-emerald-800 text-xs text-amber-200"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-300 font-semibold block">Giá</span>
                        <input
                          type="text"
                          value={unit.priceEstimate || ''}
                          onChange={(e) => {
                            const updated = [...(formData.inventory?.units || [])];
                            updated[idx].priceEstimate = e.target.value;
                            setFormData({
                              ...formData,
                              inventory: { ...(formData.inventory || { badge: '', title: '', description: '', masterplanImage: '', units: [] }), units: updated }
                            });
                          }}
                          className="w-full px-2 py-0.5 rounded bg-black/50 border border-emerald-800 text-xs font-bold text-amber-400"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: POLICY */}
          {activeTab === 'policy' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 pb-2 border-b border-emerald-800">
                Phần 5: Chính Sách & Tiến Độ Thanh Toán
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">Mức Đặt Cọc Thiện Chí</label>
                  <input
                    type="text"
                    value={formData.policy.bookingDeposit}
                    onChange={(e) => setFormData({
                      ...formData,
                      policy: { ...formData.policy, bookingDeposit: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">Điểm Nhấn Chiết Khấu</label>
                  <input
                    type="text"
                    value={formData.policy.discountHighlight}
                    onChange={(e) => setFormData({
                      ...formData,
                      policy: { ...formData.policy, discountHighlight: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-amber-300">4 Gói Ưu Đãi Bán Hàng</label>
                {formData.policy.incentives.map((item, idx) => (
                  <div key={item.id || idx} className="p-3 bg-black/30 rounded-xl border border-emerald-800 space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => {
                          const updated = [...formData.policy.incentives];
                          updated[idx].value = e.target.value;
                          setFormData({ ...formData, policy: { ...formData.policy, incentives: updated } });
                        }}
                        className="w-36 px-2 py-1 rounded bg-black/50 border border-emerald-800 text-xs font-bold text-amber-300"
                        placeholder="Giá trị"
                      />
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...formData.policy.incentives];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, policy: { ...formData.policy, incentives: updated } });
                        }}
                        className="flex-1 px-2 py-1 rounded bg-black/50 border border-emerald-800 text-xs text-white font-bold"
                        placeholder="Tên ưu đãi"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: PROGRESS */}
          {activeTab === 'progress' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 pb-2 border-b border-emerald-800">
                Phần 6: Tiến Độ Thi Công Thực Tế
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">Tổng Tiến Độ %</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={formData.progress.overallPercentage}
                    onChange={(e) => setFormData({
                      ...formData,
                      progress: { ...formData.progress, overallPercentage: Number(e.target.value) }
                    })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">Kỳ Cập Nhật</label>
                  <input
                    type="text"
                    value={formData.progress.lastUpdated}
                    onChange={(e) => setFormData({
                      ...formData,
                      progress: { ...formData.progress, lastUpdated: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-amber-300">Các Mốc Thi Công</label>
                {formData.progress.milestones.map((m, idx) => (
                  <div key={m.id || idx} className="p-3 bg-black/30 rounded-xl border border-emerald-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={m.date}
                        onChange={(e) => {
                          const updated = [...formData.progress.milestones];
                          updated[idx].date = e.target.value;
                          setFormData({ ...formData, progress: { ...formData.progress, milestones: updated } });
                        }}
                        className="w-32 px-2 py-1 rounded bg-black/50 border border-emerald-800 text-xs text-amber-300 font-bold"
                      />
                      <button
                        onClick={() => onOpenImagePicker(`progress.milestones.${idx}.imageUrl`, m.imageUrl || '')}
                        className="text-xs text-emerald-300 hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Đổi ảnh</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={m.title}
                      onChange={(e) => {
                        const updated = [...formData.progress.milestones];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, progress: { ...formData.progress, milestones: updated } });
                      }}
                      className="w-full px-2 py-1 rounded bg-black/50 border border-emerald-800 text-xs text-white font-bold"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: LEGAL */}
          {activeTab === 'legal' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 pb-2 border-b border-emerald-800">
                Phần 7: Hồ Sơ Pháp Lý
              </h3>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Tóm Tắt Pháp Lý</label>
                <textarea
                  rows={3}
                  value={formData.legal.summaryText}
                  onChange={(e) => setFormData({
                    ...formData,
                    legal: { ...formData.legal, summaryText: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-amber-300">Văn Bản Pháp Lý ({formData.legal.documents.length})</label>
                {formData.legal.documents.map((doc, idx) => (
                  <div key={doc.id || idx} className="p-3 bg-black/30 rounded-xl border border-emerald-800 space-y-2">
                    <input
                      type="text"
                      value={doc.title}
                      onChange={(e) => {
                        const updated = [...formData.legal.documents];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, legal: { ...formData.legal, documents: updated } });
                      }}
                      className="w-full px-2 py-1 rounded bg-black/50 border border-emerald-800 text-xs text-white font-bold"
                      placeholder="Tên văn bản"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={doc.docNumber}
                        onChange={(e) => {
                          const updated = [...formData.legal.documents];
                          updated[idx].docNumber = e.target.value;
                          setFormData({ ...formData, legal: { ...formData.legal, documents: updated } });
                        }}
                        className="px-2 py-1 rounded bg-black/50 border border-emerald-800 text-xs text-amber-200"
                        placeholder="Số quyết định"
                      />
                      <input
                        type="text"
                        value={doc.authority}
                        onChange={(e) => {
                          const updated = [...formData.legal.documents];
                          updated[idx].authority = e.target.value;
                          setFormData({ ...formData, legal: { ...formData.legal, documents: updated } });
                        }}
                        className="px-2 py-1 rounded bg-black/50 border border-emerald-800 text-xs text-emerald-300"
                        placeholder="Cơ quan cấp"
                      />
                      <input
                        type="text"
                        value={doc.date || ''}
                        onChange={(e) => {
                          const updated = [...formData.legal.documents];
                          updated[idx].date = e.target.value;
                          setFormData({ ...formData, legal: { ...formData.legal, documents: updated } });
                        }}
                        className="px-2 py-1 rounded bg-black/50 border border-emerald-800 text-xs text-white"
                        placeholder="Ngày ban hành"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <input
                        type="text"
                        value={doc.description}
                        onChange={(e) => {
                          const updated = [...formData.legal.documents];
                          updated[idx].description = e.target.value;
                          setFormData({ ...formData, legal: { ...formData.legal, documents: updated } });
                        }}
                        className="flex-1 px-2 py-1 rounded bg-black/50 border border-emerald-800 text-xs text-white/80 mr-2"
                        placeholder="Trích yếu tóm tắt"
                      />
                      <button
                        onClick={() => {
                          const updated = formData.legal.documents.filter((_, i) => i !== idx);
                          setFormData({ ...formData, legal: { ...formData.legal, documents: updated } });
                        }}
                        className="p-1 rounded bg-rose-900/50 hover:bg-rose-800 text-rose-300 cursor-pointer"
                        title="Xóa văn bản"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 pb-2 border-b border-emerald-800">
                Sao Lưu, Xuất, Nhập & Đồng Bộ Đám Mây
              </h3>

              {/* Cloud Database Sync Card */}
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-xs font-bold text-emerald-200 uppercase">Cơ Sở Dữ Liệu Đám Mây (Firebase Firestore)</h4>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    cloudSyncStatus === 'synced' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {cloudSyncStatus === 'synced' ? 'ĐANG KẾT NỐI & ĐỒNG BỘ' : 'CHẾ ĐỘ NỘI BỘ'}
                  </span>
                </div>

                <p className="text-xs text-white/80 leading-relaxed">
                  Trang web đã được kết nối với Cloud Database Firebase. Mọi thông tin bạn sửa trên thiết bị này sẽ được lưu trữ vĩnh viễn trên máy chủ đám mây, giúp người khác xem trên điện thoại hoặc máy tính khác thấy nội dung mới nhất ngay lập tức.
                </p>

                {lastCloudSyncTime && (
                  <p className="text-[11px] text-emerald-400/90 font-mono">
                    Thời điểm đồng bộ gần nhất: {new Date(lastCloudSyncTime).toLocaleString('vi-VN')}
                  </p>
                )}

                {onManualCloudSync && (
                  <button
                    onClick={onManualCloudSync}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer transition-colors shadow-sm"
                  >
                    <RefreshCw className="w-4 h-4 text-[#f1d596]" />
                    <span>Đồng Bộ Toàn Bộ Dữ Liệu Lên Đám Mây Ngay</span>
                  </button>
                )}
              </div>

              {/* Export Button */}
              <div className="p-4 rounded-2xl bg-black/30 border border-emerald-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-200 uppercase">Xuất file cấu hình JSON</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Tải toàn bộ nội dung, liên kết và ảnh bạn đã chỉnh sửa về máy tính dưới dạng tệp JSON để lưu trữ hoặc chuyển đổi sang website khác.
                </p>
                <button
                  onClick={handleExportJson}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải File JSON Dự Án</span>
                </button>
              </div>

              {/* Import Area */}
              <div className="p-4 rounded-2xl bg-black/30 border border-emerald-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-200 uppercase">Khôi phục / Nhập từ mã JSON</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Dán nội dung JSON đã sao lưu vào ô dưới đây và bấm xác nhận để tải lại cấu hình:
                </p>
                <textarea
                  rows={4}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Dán chuỗi JSON vào đây..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-emerald-800 text-xs text-white font-mono"
                />
                <button
                  onClick={handleImportJson}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Áp Dụng Dữ Liệu JSON Này</span>
                </button>
              </div>

              {/* Reset to Default */}
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 space-y-2">
                <h4 className="text-xs font-bold text-rose-300 uppercase">Khôi phục về mẫu mặc định ban đầu</h4>
                <p className="text-xs text-white/70">
                  Xóa toàn bộ chỉnh sửa đã lưu và đưa dữ liệu về bản mẫu chuẩn của dự án Quảng Yên Centro.
                </p>
                <button
                  onClick={() => {
                    if (confirm("Bạn có chắc chắn muốn đặt lại tất cả về nội dung mẫu mặc định?")) {
                      onResetData();
                      onClose();
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Đặt Lại Mặc Định</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#0a1b14] border-t border-emerald-800/80 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-white/50">
            Dữ liệu tự động lưu trữ trên trình duyệt của bạn
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white/70 hover:bg-white/10 cursor-pointer"
            >
              Đóng
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1 px-5 py-1.5 rounded-xl bg-[#d8ae64] hover:bg-amber-400 text-[#10271e] font-bold text-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu Lại</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
