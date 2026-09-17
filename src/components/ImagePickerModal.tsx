import React, { useState } from 'react';
import { PRESET_IMAGES } from '../data/presetImages';
import { X, Upload, Check, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface ImagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUrl: string;
  onSelectImage: (newUrl: string) => void;
  title?: string;
}

export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  isOpen,
  onClose,
  currentUrl,
  onSelectImage,
  title = "Thay Đổi Hình Ảnh"
}) => {
  const [urlInput, setUrlInput] = useState(currentUrl);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewError, setPreviewError] = useState(false);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'exterior', label: 'Ngoại thất / Phố' },
    { id: 'interior', label: 'Nội thất' },
    { id: 'aerial', label: 'Flycam / Toàn cảnh' },
    { id: 'amenity', label: 'Tiện ích' },
    { id: 'progress', label: 'Tiến độ' },
    { id: 'masterplan', label: 'Mặt bằng 1/500' },
  ];

  const filteredPresets = selectedCategory === 'all'
    ? PRESET_IMAGES
    : PRESET_IMAGES.filter(p => p.category === selectedCategory);

  const compressImage = (file: File, maxWidth = 1920, maxHeight = 1080, quality = 0.85): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  const processFile = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    try {
      const compressedDataUrl = await compressImage(file);
      if (compressedDataUrl) {
        setUrlInput(compressedDataUrl);
        setPreviewError(false);
      }
    } catch (err) {
      console.warn('Image compression fallback:', err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleApply = () => {
    if (urlInput.trim()) {
      onSelectImage(urlInput.trim());
      onClose();
    }
  };

  return (
    <div 
      id="image-picker-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        id="image-picker-modal"
        className="relative w-full max-w-2xl bg-[#132c21] border border-emerald-700/50 rounded-2xl shadow-2xl text-white overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-800/60 bg-[#0d221a]">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#f1d596]" />
            <h3 className="font-bold text-lg text-white">{title}</h3>
          </div>
          <button 
            id="btn-close-image-picker"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Method 1: Input URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-2">
              Cách 1: Nhập link ảnh trực tiếp (URL)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  id="image-url-input"
                  type="text"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    setPreviewError(false);
                  }}
                  placeholder="https://example.com/hinh-anh.jpg"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                id="btn-apply-url-image"
                onClick={handleApply}
                className="px-4 py-2.5 bg-[#d8ae64] hover:bg-[#caa054] text-[#132c21] font-bold text-sm rounded-xl transition-colors cursor-pointer"
              >
                Áp dụng
              </button>
            </div>
          </div>

          {/* Method 2: Upload local file */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-2">
              Cách 2: Tải ảnh từ máy tính của bạn
            </label>
            <label 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="flex flex-col items-center justify-center border-2 border-dashed border-emerald-700/60 rounded-xl p-4 hover:border-amber-400/80 bg-black/20 cursor-pointer transition-all"
            >
              <Upload className="w-6 h-6 text-amber-300 mb-1.5" />
              <span className="text-sm font-medium text-white/90">Bấm vào đây để chọn tệp ảnh từ máy</span>
              <span className="text-xs text-white/50 mt-0.5">Hỗ trợ JPG, PNG, WEBP (tự động nén và hiển thị ngay)</span>
              <input
                id="file-upload-input"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Preview Current / New Image */}
          {urlInput && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-2">
                Xem trước ảnh đã chọn:
              </div>
              <div className="relative w-full h-40 rounded-xl overflow-hidden border border-emerald-700/60 bg-black/40 flex items-center justify-center">
                {!previewError ? (
                  <img
                    src={urlInput}
                    alt="Xem trước"
                    className="w-full h-full object-cover"
                    onError={() => setPreviewError(true)}
                  />
                ) : (
                  <div className="text-rose-300 text-xs text-center p-3">
                    Không tải được ảnh từ đường dẫn này. Vui lòng kiểm tra lại link ảnh hoặc thử ảnh khác.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Method 3: Pick from curated library */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-2">
              Cách 3: Chọn từ thư viện ảnh BĐS mẫu cao cấp
            </label>
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#d8ae64] text-[#132c21] font-bold'
                      : 'bg-white/10 text-white/75 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid of presets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1 bg-black/30 rounded-xl border border-emerald-900">
              {filteredPresets.map((preset) => {
                const isSelected = urlInput === preset.url;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setUrlInput(preset.url);
                      setPreviewError(false);
                    }}
                    className={`group relative rounded-lg overflow-hidden border text-left cursor-pointer transition-all aspect-video ${
                      isSelected ? 'border-amber-400 ring-2 ring-amber-400/50' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-1 left-1.5 right-1.5 text-[10px] font-medium text-white/95 truncate">
                      {preset.name}
                    </span>
                    {isSelected && (
                      <div className="absolute top-1 right-1 bg-amber-400 text-black p-0.5 rounded-full">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#0d221a] border-t border-emerald-800/60 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white/75 hover:bg-white/10 transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-[#d8ae64] hover:bg-[#caa054] text-[#132c21] transition-colors cursor-pointer"
          >
            Xác nhận thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};
