import React, { useState, useEffect } from 'react';
import { X, Check, Edit3 } from 'lucide-react';

interface QuickEditFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  currentValue: string;
  onSave: (val: string) => void;
}

export const QuickEditFieldModal: React.FC<QuickEditFieldModalProps> = ({
  isOpen,
  onClose,
  label,
  currentValue,
  onSave
}) => {
  const [value, setValue] = useState(currentValue);

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue, isOpen]);

  if (!isOpen) return null;

  const isLongText = currentValue.length > 80 || currentValue.includes('\n');

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#132c21] border border-emerald-700/80 rounded-2xl p-5 shadow-2xl text-white flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-emerald-800/80 mb-4">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-[#f1d596]" />
            <h3 className="font-bold text-sm sm:text-base text-white">
              Chỉnh Sửa: {label}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
            Nội dung mới:
          </label>
          {isLongText ? (
            <textarea
              rows={5}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm focus:outline-none focus:border-amber-400 leading-relaxed"
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-800 text-white text-sm focus:outline-none focus:border-amber-400"
              autoFocus
            />
          )}
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-emerald-800/80">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white/70 hover:bg-white/10 transition-colors cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-[#d8ae64] hover:bg-[#caa054] text-[#132c21] transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Lưu Thay Đổi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
