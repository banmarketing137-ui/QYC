import React, { useState, useRef, useEffect } from 'react';
import { Tour360Scene } from '../types';
import { 
  X, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  ExternalLink, 
  Compass, 
  Layers, 
  Edit2, 
  Eye,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Tour360ModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenes: Tour360Scene[];
  tour360Url: string;
  onUpdateTour360Url: (newUrl: string) => void;
  isEditMode: boolean;
}

export const Tour360Modal: React.FC<Tour360ModalProps> = ({
  isOpen,
  onClose,
  scenes,
  tour360Url,
  onUpdateTour360Url,
  isEditMode
}) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'interactive' | 'embed'>('interactive');
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [editingUrl, setEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState(tour360Url);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentScene = scenes[activeSceneIndex] || scenes[0];

  // Auto rotate simulation
  useEffect(() => {
    if (!isOpen || !isAutoRotate || isDragging || viewMode !== 'interactive') return;
    const interval = setInterval(() => {
      setPanX((prev) => (prev + 0.25) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isOpen, isAutoRotate, isDragging, viewMode]);

  if (!isOpen) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setPanX((prev) => prev - deltaX * 0.35);
    setPanY((prev) => Math.max(-45, Math.min(45, prev + deltaY * 0.25)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSaveUrl = () => {
    onUpdateTour360Url(tempUrl);
    setEditingUrl(false);
  };

  return (
    <div 
      id="tour-360-modal-overlay"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col select-none"
    >
      {/* Top Bar */}
      <div className="h-16 px-4 sm:px-6 bg-[#0c1f17] border-b border-emerald-800/80 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 text-black shadow-md">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                TRẢI NGHIỆM VR 360° QUẢNG YÊN CENTRO
              </h2>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-700/60 text-emerald-200 border border-emerald-500/40">
                Thực Tế Ảo 360°
              </span>
            </div>
            <p className="text-xs text-amber-200/80 truncate max-w-xs sm:max-w-md">
              {currentScene?.title}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Toggle between interactive 360 simulator and external embed */}
          <div className="bg-black/50 p-1 rounded-xl border border-emerald-800 hidden md:flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                viewMode === 'interactive' 
                  ? 'bg-[#d8ae64] text-black font-bold' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Toàn Cảnh 360°
            </button>
            <button
              onClick={() => setViewMode('embed')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                viewMode === 'embed' 
                  ? 'bg-[#d8ae64] text-black font-bold' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Liên Kết VR Nhúng
            </button>
          </div>

          {/* Edit link button */}
          {(isEditMode || editingUrl) && (
            <button
              id="btn-edit-tour-url"
              onClick={() => setEditingUrl(!editingUrl)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold cursor-pointer"
              title="Đổi đường link 360 (Kuula, Matterport, Google Maps)"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chỉnh Link 360</span>
            </button>
          )}

          {/* Open direct tour in new tab */}
          <a
            id="btn-open-360-new-tab"
            href={tour360Url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 text-white text-xs font-semibold border border-emerald-500/40 cursor-pointer"
            title="Mở toàn màn hình ở tab mới"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Mở Tab Mới</span>
          </a>

          {/* Close button */}
          <button
            id="btn-close-360-modal"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
            title="Đóng cửa sổ 360"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Editing Tour URL Drawer / Prompt */}
      {editingUrl && (
        <div className="bg-[#173a2d] border-b border-amber-400/40 p-3 sm:px-6 flex flex-col sm:flex-row items-center gap-2 justify-between animate-fadeIn">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-amber-300 whitespace-nowrap">Đường link ảnh 360 / VR Tour:</span>
            <input
              type="text"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="Nhập link tour 360 (ví dụ Kuula, Matterport, Google Maps hoặc link web riêng)"
              className="flex-1 sm:w-96 px-3 py-1.5 bg-black/50 border border-emerald-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleSaveUrl}
              className="px-4 py-1.5 bg-[#d8ae64] text-black font-bold text-xs rounded-lg hover:bg-amber-400 cursor-pointer"
            >
              Lưu Link
            </button>
            <button
              onClick={() => setEditingUrl(false)}
              className="px-3 py-1.5 bg-white/10 text-white text-xs rounded-lg hover:bg-white/20 cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Main View Area */}
      <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
        {viewMode === 'interactive' ? (
          /* Interactive 360 Panorama Viewer */
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`w-full h-full relative overflow-hidden flex items-center justify-center ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {/* Cylindrical / Spherical Simulated 360 Panorama */}
            <div 
              className="absolute inset-0 transition-transform duration-75 ease-out"
              style={{
                backgroundImage: `url(${currentScene?.panoramaUrl})`,
                backgroundSize: `${280 * zoomLevel}% ${150 * zoomLevel}%`,
                backgroundPosition: `${panX}% ${50 + panY}%`,
                backgroundRepeat: 'repeat-x',
                filter: 'brightness(0.96) contrast(1.04)'
              }}
            />

            {/* Subtle Vignette & Compass Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-transparent to-black/50" />

            {/* Interactive Hotspots Overlay */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <button 
                onClick={() => setActiveSceneIndex((activeSceneIndex + 1) % scenes.length)}
                className="group relative flex items-center justify-center cursor-pointer"
              >
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-amber-400 opacity-75" />
                <div className="relative p-2.5 rounded-full bg-black/70 border border-amber-400 text-amber-300 shadow-xl backdrop-blur group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="absolute -bottom-8 whitespace-nowrap px-2.5 py-1 rounded bg-black/80 text-[11px] font-semibold text-white border border-white/20 shadow opacity-0 group-hover:opacity-100 transition-opacity">
                  Chuyển điểm nhìn tiếp theo
                </span>
              </button>
            </div>

            {/* On-screen control HUD */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className={`p-2.5 rounded-xl border backdrop-blur transition-all cursor-pointer ${
                  isAutoRotate 
                    ? 'bg-amber-400 text-black border-amber-400 shadow-lg' 
                    : 'bg-black/60 text-white border-white/20 hover:bg-black/80'
                }`}
                title={isAutoRotate ? "Dừng tự động xoay" : "Bật tự động xoay 360°"}
              >
                <RotateCw className={`w-4 h-4 ${isAutoRotate ? 'animate-spin-slow' : ''}`} />
              </button>

              <button
                onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
                className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white border border-white/20 backdrop-blur cursor-pointer"
                title="Phóng to"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))}
                className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white border border-white/20 backdrop-blur cursor-pointer"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setPanX(0);
                  setPanY(0);
                  setZoomLevel(1);
                }}
                className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white border border-white/20 backdrop-blur cursor-pointer"
                title="Đặt lại góc nhìn ban đầu"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Instruction tooltip badge */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 text-white/90 text-xs backdrop-blur pointer-events-none flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>Kéo chuột hoặc vuốt để quay 360° quanh dự án</span>
            </div>
          </div>
        ) : (
          /* External Embed Viewer (Kuula / Matterport iframe) */
          <div className="w-full h-full relative">
            <iframe
              src={tour360Url}
              title="360 Virtual Tour Embed"
              className="w-full h-full border-0"
              allowFullScreen
              allow="gyroscope; accelerometer; magnetometer; vr"
            />
          </div>
        )}
      </div>

      {/* Bottom Scene Selector Ribbon */}
      <div className="h-24 px-4 sm:px-6 bg-[#0c1f17] border-t border-emerald-800/80 flex items-center gap-3 overflow-x-auto shrink-0 py-2">
        <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 shrink-0 hidden lg:block mr-2">
          Góc nhìn 360°:
        </div>

        <div className="flex items-center gap-2.5 flex-1 overflow-x-auto pb-1">
          {scenes.map((scene, idx) => {
            const isSelected = activeSceneIndex === idx;
            return (
              <button
                key={scene.id}
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setViewMode('interactive');
                }}
                className={`relative flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border transition-all shrink-0 cursor-pointer ${
                  isSelected 
                    ? 'bg-emerald-900/90 border-amber-400 ring-2 ring-amber-400/40' 
                    : 'bg-black/40 border-emerald-800/60 hover:border-emerald-600'
                }`}
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-black/40">
                  <img
                    src={scene.thumbnailUrl}
                    alt={scene.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left max-w-[140px] sm:max-w-[180px]">
                  <p className={`text-xs font-bold truncate ${isSelected ? 'text-amber-300' : 'text-white'}`}>
                    {scene.title}
                  </p>
                  <p className="text-[10px] text-white/60 truncate mt-0.5">
                    {scene.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
