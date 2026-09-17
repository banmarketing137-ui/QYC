import React, { useState, useRef, useMemo, useEffect } from 'react';
import { UnitItem, UnitStatus } from '../types';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Filter, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Compass, 
  Info,
  ChevronRight,
  ChevronDown,
  Eye,
  Check,
  Image as ImageIcon,
  Layers,
  Edit3,
  Upload,
  Sliders,
  X,
  Tag
} from 'lucide-react';

interface InteractiveMasterplanProps {
  units: UnitItem[];
  isEditMode: boolean;
  masterplanImage?: string;
  onPickImage?: (fieldPath: string, currentUrl: string, title?: string) => void;
  onSelectUnit: (unit: UnitItem) => void;
  onUpdateUnitStatus?: (unitId: string, nextStatus: UnitStatus) => void;
  onUpdateUnit?: (updatedUnit: UnitItem) => void;
  onOpenConsultModal: (unitCode?: string) => void;
}

export const InteractiveMasterplan: React.FC<InteractiveMasterplanProps> = ({
  units,
  isEditMode,
  masterplanImage = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop",
  onPickImage,
  onSelectUnit,
  onUpdateUnitStatus,
  onUpdateUnit,
  onOpenConsultModal,
}) => {
  // Map display modes
  const [mapViewMode, setMapViewMode] = useState<'vector' | 'blueprint' | 'hybrid'>('vector');
  const [hybridOpacity, setHybridOpacity] = useState<number>(0.65);
  const [editingUnitModal, setEditingUnitModal] = useState<UnitItem | null>(null);

  // Quick hover state for top control boxes
  const [isTopHovered, setIsTopHovered] = useState<boolean>(false);
  const topHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTopMouseEnter = () => {
    if (topHoverTimeoutRef.current) {
      clearTimeout(topHoverTimeoutRef.current);
      topHoverTimeoutRef.current = null;
    }
    setIsTopHovered(true);
  };

  const handleTopMouseLeave = () => {
    if (topHoverTimeoutRef.current) {
      clearTimeout(topHoverTimeoutRef.current);
    }
    topHoverTimeoutRef.current = setTimeout(() => {
      setIsTopHovered(false);
    }, 350);
  };

  useEffect(() => {
    return () => {
      if (topHoverTimeoutRef.current) {
        clearTimeout(topHoverTimeoutRef.current);
      }
    };
  }, []);

  // Map zoom and pan states
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Filters & highlights
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'sold'>('all');
  const [zoneFilter, setZoneFilter] = useState<'all' | 'phu-quy' | 'vinh-hoa' | 'boulevard'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredUnit, setHoveredUnit] = useState<UnitItem | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Create a quick lookup map by unit code
  const unitMap = useMemo(() => {
    const map: Record<string, UnitItem> = {};
    units.forEach(u => {
      map[u.code] = u;
      map[u.code.toLowerCase()] = u;
      // Also normalize key without dot or hyphen e.g. "BT101" or "L101"
      map[u.code.replace(/\./g, '')] = u;
      map[u.code.replace(/-/g, '')] = u;
      // Support matching e.g. "BT1.22" to "BT1.A.22" and vice versa
      if (u.code.includes('.A.')) {
        map[u.code.replace('.A.', '.')] = u;
      }
    });
    return map;
  }, [units]);

  // Statistics
  const stats = useMemo(() => {
    const total = units.length;
    const available = units.filter(u => u.status === 'available').length;
    const sold = units.filter(u => u.status === 'sold').length;
    return { total, available, sold };
  }, [units]);

  // Zoom handlers
  const handleZoomIn = () => setScale(s => Math.min(s + 0.25, 3.0));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.25, 0.75));
  const handleResetZoom = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
    setZoneFilter('all');
  };

  // Quick preset zones
  const handleFocusZone = (zone: 'all' | 'phu-quy' | 'vinh-hoa' | 'boulevard') => {
    setZoneFilter(zone);
    if (zone === 'all') {
      setScale(1);
      setPan({ x: 0, y: 0 });
    } else if (zone === 'phu-quy') {
      setScale(1.5);
      setPan({ x: 260, y: 30 });
    } else if (zone === 'vinh-hoa') {
      setScale(1.5);
      setPan({ x: -280, y: 30 });
    } else if (zone === 'boulevard') {
      setScale(1.6);
      setPan({ x: 0, y: -190 });
    }
  };

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // only left click
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Toggle unit status or open unit editor for quick edits
  const handleUnitClick = (unit: UnitItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEditMode) {
      setEditingUnitModal(unit);
    } else {
      onSelectUnit(unit);
    }
  };

  // Color helper based on status
  const getStatusFill = (status: UnitStatus, isMatchedSearch: boolean, isDimmed: boolean) => {
    if (isDimmed) return 'rgba(75, 85, 99, 0.4)'; // Dimmed gray
    if (isMatchedSearch) return '#38bdf8'; // Sky blue highlight for search match
    return status === 'sold' ? '#be123c' : '#059669';
  };

  const getStatusBorder = (status: UnitStatus, isMatchedSearch: boolean, isHovered: boolean) => {
    if (isHovered) return '#fbbf24'; // Gold ring on hover
    if (isMatchedSearch) return '#ffffff';
    return status === 'sold' ? '#fda4af' : '#34d399';
  };

  // Component to render a unit box on SVG
  const renderLot = (
    code: string,
    x: number,
    y: number,
    w: number,
    h: number,
    label?: string,
    customType?: string,
    customArea?: string,
    isCornerLeft?: boolean,
    isCornerRight?: boolean
  ) => {
    const unit = unitMap[code] || unitMap[code.toLowerCase()] || unitMap[code.replace('.A.', '.')] || {
      id: `fallback-${code}`,
      code,
      block: code.split('.')[0] || 'Block',
      type: customType || 'Liền Kề',
      area: customArea || '85 m²',
      orientation: 'Đông Nam',
      priceEstimate: 'Liên hệ',
      status: 'available' as UnitStatus
    };

    const isMatchSearch = searchQuery.trim() !== '' && 
      (code.toLowerCase().includes(searchQuery.toLowerCase().trim()) || 
       code.replace('.A.', '.').toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
       unit.block?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
       (label && label.toLowerCase().includes(searchQuery.toLowerCase().trim())) ||
       (unit.area && unit.area.toLowerCase().includes(searchQuery.toLowerCase().trim())));

    const isStatusFiltered = statusFilter !== 'all' && unit.status !== statusFilter;
    const isDimmed = isStatusFiltered || (searchQuery.trim() !== '' && !isMatchSearch);
    const isHovered = hoveredUnit?.code === unit.code;

    const fill = getStatusFill(unit.status, isMatchSearch, isDimmed);
    const stroke = getStatusBorder(unit.status, isMatchSearch, isHovered);

    const isTallLot = h >= 32 && w >= 13;

    return (
      <g
        key={code}
        className="cursor-pointer transition-transform duration-150 group"
        onClick={(e) => handleUnitClick(unit, e)}
        onMouseEnter={() => setHoveredUnit(unit)}
        onMouseLeave={() => setHoveredUnit(null)}
        style={{
          transformOrigin: `${x + w / 2}px ${y + h / 2}px`,
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          filter: isHovered ? 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.9))' : 'none'
        }}
      >
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx={isCornerLeft || isCornerRight ? 5 : 3}
          fill={fill}
          stroke={stroke}
          strokeWidth={isHovered ? 2 : (isMatchSearch ? 1.8 : 0.8)}
          opacity={isDimmed ? 0.35 : 1}
        />
        
        {/* Status dot in top right for clear glance */}
        <circle
          cx={x + w - 3.5}
          cy={y + 3.5}
          r={1.8}
          fill={unit.status === 'sold' ? '#f43f5e' : '#4ade80'}
          opacity={isDimmed ? 0.4 : 0.9}
        />

        {/* Unit Code Label & Area */}
        {isTallLot ? (
          <g pointerEvents="none">
            {/* Main unit number e.g. "22" */}
            <text
              x={x + w / 2}
              y={y + h / 2 - 2}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={w > 16 ? "7.5px" : "6.5px"}
              fontWeight="bold"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              opacity={isDimmed ? 0.5 : 1}
            >
              {label || code.split('.').pop() || code}
            </text>
            {/* Area sub-label e.g. "278m²" or "252m²" */}
            <text
              x={x + w / 2}
              y={y + h / 2 + 7}
              textAnchor="middle"
              fill="#fef08a"
              fontSize={w > 16 ? "5px" : "4.2px"}
              fontWeight="semibold"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              opacity={isDimmed ? 0.4 : 0.95}
            >
              {unit.area ? unit.area.replace(' m²', 'm²').replace(' m2', 'm2').split(',')[0] + 'm²' : (customArea || '')}
            </text>
          </g>
        ) : (
          <text
            x={x + w / 2}
            y={y + h / 2 + 3}
            textAnchor="middle"
            fill="#ffffff"
            fontSize={w > 32 ? "8px" : "6.5px"}
            fontWeight="bold"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            pointerEvents="none"
            opacity={isDimmed ? 0.5 : 1}
          >
            {label || code.split('.')[1] || code}
          </text>
        )}
      </g>
    );
  };

  // Helper to render Liền kề blocks (2 rows of 7 units each)
  const renderLkBlock = (
    blockCode: string,
    startX: number,
    startY: number,
    lotW = 20,
    lotH = 26,
    gapX = 1,
    gapY = 1
  ) => {
    const lots = [];
    // Left column: 01 to 07
    for (let i = 1; i <= 7; i++) {
      const code = `${blockCode}.${i < 10 ? '0' + i : i}`;
      const x = startX;
      const y = startY + (i - 1) * (lotH + gapY);
      lots.push(renderLot(code, x, y, lotW, lotH, `${blockCode}.${i}`));
    }
    // Right column: 08 to 14
    for (let i = 8; i <= 14; i++) {
      const code = `${blockCode}.${i < 10 ? '0' + i : i}`;
      const x = startX + lotW + gapX;
      const y = startY + (14 - i) * (lotH + gapY);
      lots.push(renderLot(code, x, y, lotW, lotH, `${blockCode}.${i}`));
    }
    return (
      <g key={blockCode}>
        {/* Block background plate */}
        <rect
          x={startX - 3}
          y={startY - 3}
          width={lotW * 2 + gapX + 6}
          height={(lotH + gapY) * 7 + 6}
          rx={4}
          fill="#0f172a"
          stroke="#334155"
          strokeWidth={1}
          opacity={0.7}
        />
        {lots}
        {/* Block Badge */}
        <g transform={`translate(${startX + lotW}, ${startY + (lotH + gapY) * 3.5})`}>
          <rect x={-18} y={-8} width={36} height={16} rx={3} fill="#1e293b" stroke="#64748b" strokeWidth={0.8} />
          <text x={0} y={3} textAnchor="middle" fill="#38bdf8" fontSize="8px" fontWeight="bold">
            {blockCode}
          </text>
        </g>
      </g>
    );
  };

  // Helper to render BT-1 & BT-2 (long horizontal rows of 22 villas along the boulevard)
  const renderBoulevardVillas = (
    blockPrefix: 'BT1' | 'BT2',
    startX: number,
    startY: number,
    lotW = 14.8,
    lotH = 36,
    gap = 1.6
  ) => {
    const lots = [];

    if (blockPrefix === 'BT1') {
      // BT-1 (BT1.A): Ordered from left to right: 22 down to 01 as in the 1/500 Masterplan
      for (let i = 0; i < 22; i++) {
        const unitNum = 22 - i; // 22, 21, 20, ..., 1
        const numStr = unitNum < 10 ? `0${unitNum}` : `${unitNum}`;
        const code = `BT1.A.${numStr}`;
        const x = startX + i * (lotW + gap);
        const y = startY;
        const isCornerLeft = i === 0; // Lot 22
        const isCornerRight = i === 21; // Lot 01
        const areaStr = isCornerLeft || isCornerRight ? '278,14 m²' : '252,0 m²';
        const typeStr = isCornerLeft || isCornerRight ? 'Biệt Thự Đơn Lập (Góc)' : 'Biệt Thự Song Lập';

        lots.push(
          renderLot(
            code,
            x,
            y,
            lotW,
            lotH,
            numStr,
            typeStr,
            areaStr,
            isCornerLeft,
            isCornerRight
          )
        );
      }
    } else {
      // BT-2 (Phú Quý Boulevard): 22 units
      for (let i = 1; i <= 22; i++) {
        const num = i < 10 ? `0${i}` : `${i}`;
        const code = `${blockPrefix}.${num}`;
        const x = startX + (i - 1) * (lotW + gap);
        const y = startY;
        const isCornerLeft = i === 1;
        const isCornerRight = i === 22;
        lots.push(
          renderLot(
            code,
            x,
            y,
            lotW,
            lotH,
            num,
            isCornerLeft || isCornerRight ? 'Biệt Thự Đơn Lập (Góc)' : 'Biệt Thự Song Lập',
            isCornerLeft || isCornerRight ? '310 m²' : '255 m²',
            isCornerLeft,
            isCornerRight
          )
        );
      }
    }

    const totalWidth = 22 * (lotW + gap);

    return (
      <g key={blockPrefix}>
        {/* Background plate */}
        <rect
          x={startX - 4}
          y={startY - 4}
          width={totalWidth + 6}
          height={lotH + 8}
          rx={4}
          fill="#0f172a"
          stroke="#475569"
          strokeWidth={1.2}
          opacity={0.85}
        />
        {lots}
        {/* Block code tag */}
        <rect
          x={startX + totalWidth / 2 - 38}
          y={startY - 14}
          width={76}
          height={14}
          rx={3}
          fill="#d97706"
        />
        <text
          x={startX + totalWidth / 2}
          y={startY - 4}
          textAnchor="middle"
          fill="#000000"
          fontSize="7.5px"
          fontWeight="bold"
        >
          {blockPrefix === 'BT1' ? 'BLOCK BT1.A' : 'BLOCK BT-2'}
        </text>
      </g>
    );
  };

  // Helper for BT-3 & BT-4 (2 rows of 4 villas)
  const renderVillasGrid = (
    blockCode: 'BT-3' | 'BT-4',
    startX: number,
    startY: number,
    lotW = 28,
    lotH = 22,
    gap = 3
  ) => {
    const lots = [];
    const prefix = blockCode === 'BT-3' ? 'BT3' : 'BT4';
    // Row 1: 01 to 04
    for (let i = 1; i <= 4; i++) {
      const code = `${prefix}.0${i}`;
      const x = startX + (i - 1) * (lotW + gap);
      const y = startY;
      lots.push(renderLot(code, x, y, lotW, lotH, `${prefix}.${i}`, 'Biệt Thự Góc'));
    }
    // Row 2: 05 to 08
    for (let i = 5; i <= 8; i++) {
      const code = `${prefix}.0${i}`;
      const x = startX + (i - 5) * (lotW + gap);
      const y = startY + lotH + gap;
      lots.push(renderLot(code, x, y, lotW, lotH, `${prefix}.${i}`, 'Biệt Thự Góc'));
    }
    return (
      <g key={blockCode}>
        <rect
          x={startX - 3}
          y={startY - 3}
          width={4 * (lotW + gap) + 4}
          height={2 * (lotH + gap) + 4}
          rx={4}
          fill="#0f172a"
          stroke="#475569"
          strokeWidth={1}
          opacity={0.8}
        />
        {lots}
        <rect x={startX + 2 * (lotW + gap) - 22} y={startY - 12} width={44} height={12} rx={2} fill="#1e293b" stroke="#d97706" />
        <text x={startX + 2 * (lotW + gap)} y={startY - 3} textAnchor="middle" fill="#fbbf24" fontSize="7.5px" fontWeight="bold">
          {blockCode}
        </text>
      </g>
    );
  };

  return (
    <div className={`relative bg-[#081510] rounded-3xl border border-emerald-600/40 shadow-2xl overflow-hidden transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'w-full mb-4'}`}>
      
      {/* MAP MODE & MAP EDIT BAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-[#0c2218] border-b border-emerald-800/80 text-xs">
        {/* Left: View Mode tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
          <span className="text-[11px] font-bold text-emerald-300 hidden sm:inline mr-1">Chế Độ:</span>
          <button
            type="button"
            onClick={() => setMapViewMode('vector')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              mapViewMode === 'vector' 
                ? 'bg-amber-400 text-black shadow' 
                : 'bg-emerald-950/80 text-emerald-200 hover:bg-emerald-900 border border-emerald-800'
            }`}
          >
            🗺️ Sơ Đồ Vector 1/500
          </button>
          <button
            type="button"
            onClick={() => setMapViewMode('blueprint')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              mapViewMode === 'blueprint' 
                ? 'bg-amber-400 text-black shadow' 
                : 'bg-emerald-950/80 text-emerald-200 hover:bg-emerald-900 border border-emerald-800'
            }`}
          >
            🖼️ Ảnh Bản Vẽ CĐT
          </button>
          <button
            type="button"
            onClick={() => setMapViewMode('hybrid')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              mapViewMode === 'hybrid' 
                ? 'bg-amber-400 text-black shadow' 
                : 'bg-emerald-950/80 text-emerald-200 hover:bg-emerald-900 border border-emerald-800'
            }`}
          >
            🔲 Lớp Phủ Kết Hợp
          </button>

          {/* Opacity slider for hybrid mode */}
          {mapViewMode === 'hybrid' && (
            <div className="flex items-center gap-1.5 ml-2 px-2 py-0.5 bg-black/40 rounded-lg border border-emerald-700/60 shrink-0">
              <Sliders className="w-3 h-3 text-amber-300" />
              <span className="text-[10px] text-emerald-300">Độ mờ:</span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={hybridOpacity}
                onChange={(e) => setHybridOpacity(parseFloat(e.target.value))}
                className="w-16 h-1 bg-emerald-900 accent-amber-400 rounded cursor-pointer"
              />
              <span className="text-[10px] text-amber-300 font-bold">{Math.round(hybridOpacity * 100)}%</span>
            </div>
          )}
        </div>

        {/* Right: Map Edit Button */}
        <div className="flex items-center gap-2">
          {onPickImage && (
            <button
              type="button"
              onClick={() => onPickImage('inventory.masterplanImage', masterplanImage, 'Thay Đổi Ảnh Bản Vẽ Mặt Bằng Phân Lô 1/500')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-extrabold text-xs shadow-md transition-all cursor-pointer border ${
                isEditMode 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black border-amber-300 ring-2 ring-amber-400/50' 
                  : 'bg-emerald-800/80 hover:bg-emerald-700 text-white border-emerald-600'
              }`}
              title="Tải lên ảnh bản đồ/mặt bằng từ máy tính hoặc dán link URL"
            >
              <Upload className="w-3.5 h-3.5 text-amber-300" />
              <span>Đổi Ảnh Map / Mặt Bằng</span>
            </button>
          )}

          {isEditMode && (
            <span className="text-[11px] text-amber-300 hidden md:inline font-medium">
              💡 Bấm vào căn trên map để sửa thông tin hoặc đổi Còn/Bán
            </span>
          )}
        </div>
      </div>

      {/* TOP HOVER DETECTION STRIP (Invisible hover trigger along top 36px) */}
      <div 
        onMouseEnter={handleTopMouseEnter}
        className="absolute top-0 left-0 right-0 h-9 z-30 pointer-events-auto"
      />

      {/* DISCREET TOP PILL (Visible only when controls are collapsed, hints to hover) */}
      <div 
        onMouseEnter={handleTopMouseEnter}
        className={`absolute top-1.5 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 pointer-events-auto cursor-pointer ${
          isTopHovered ? 'opacity-0 -translate-y-3 pointer-events-none' : 'opacity-90 hover:opacity-100 translate-y-0'
        }`}
      >
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#091e16]/90 hover:bg-[#091e16] backdrop-blur-md border border-emerald-500/50 hover:border-amber-400 text-emerald-200 text-[11px] font-semibold shadow-xl transition-all duration-200 hover:scale-105">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>Bảng Điều Khiển & Bộ Lọc (Rê chuột để mở)</span>
          <ChevronDown className="w-3 h-3 text-amber-400" />
        </div>
      </div>

      {/* FLOATING 2-BOX CONTROLS (70% Navigation/Filter & 16% Status/Zoom - COMPACT LOW-HEIGHT) */}
      <div 
        onMouseEnter={handleTopMouseEnter}
        onMouseLeave={handleTopMouseLeave}
        className={`absolute top-1.5 left-0 right-0 z-30 px-2 sm:px-4 flex items-center justify-between gap-2 transition-all duration-300 ease-out ${
          isTopHovered 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        
        {/* BOX 1: 70% WIDTH - MASTERPLAN TITLE, ZONE NAV & QUICK SEARCH (SINGLE SLEEK COMPACT ROW) */}
        <div className="w-[70%] rounded-xl bg-[#091e16]/98 backdrop-blur-md border border-emerald-500/50 shadow-2xl px-2.5 py-1.5 ring-1 ring-amber-400/40 transition-all duration-200 flex items-center justify-between gap-2">
          {/* Title */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm animate-pulse shrink-0" />
            <span className="text-xs font-black uppercase tracking-wider text-white font-serif truncate">
              Mặt Bằng 1/500
            </span>
          </div>

          {/* Zone buttons */}
          <div className="flex items-center gap-1 shrink-0 overflow-x-auto scrollbar-none">
            <button
              onClick={() => handleFocusZone('all')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                zoneFilter === 'all' 
                  ? 'bg-amber-500 text-black shadow-sm' 
                  : 'bg-emerald-950 text-emerald-200 border border-emerald-800 hover:border-emerald-600'
              }`}
            >
              Toàn Khu
            </button>
            <button
              onClick={() => handleFocusZone('phu-quy')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                zoneFilter === 'phu-quy' 
                  ? 'bg-amber-500 text-black shadow-sm' 
                  : 'bg-emerald-950 text-emerald-200 border border-emerald-800 hover:border-emerald-600'
              }`}
            >
              Phú Quý
            </button>
            <button
              onClick={() => handleFocusZone('vinh-hoa')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                zoneFilter === 'vinh-hoa' 
                  ? 'bg-amber-500 text-black shadow-sm' 
                  : 'bg-emerald-950 text-emerald-200 border border-emerald-800 hover:border-emerald-600'
              }`}
            >
              Vinh Hoa
            </button>
            <button
              onClick={() => handleFocusZone('boulevard')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                zoneFilter === 'boulevard' 
                  ? 'bg-amber-500 text-black shadow-sm' 
                  : 'bg-emerald-950 text-emerald-200 border border-emerald-800 hover:border-emerald-600'
              }`}
            >
              Đại Lộ 43.5m
            </button>
          </div>

          {/* Inline compact search input */}
          <div className="relative flex-1 min-w-[120px] max-w-[220px]">
            <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-emerald-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm căn..."
              className="w-full pl-6 pr-2 py-0.5 bg-black/70 border border-emerald-600/60 rounded-lg text-white text-[11px] placeholder:text-emerald-500/70 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* BOX 2: 16% WIDTH - STATUS & ZOOM CONTROLS (SINGLE SLEEK COMPACT ROW) */}
        <div className="w-[16%] min-w-[160px] rounded-xl bg-[#091e16]/98 backdrop-blur-md border border-emerald-500/50 shadow-2xl px-2 py-1.5 ring-1 ring-amber-400/40 transition-all duration-200 flex items-center justify-between gap-1.5">
          {/* Status buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setStatusFilter(statusFilter === 'available' ? 'all' : 'available')}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                statusFilter === 'available' 
                  ? 'bg-emerald-500 text-black shadow-sm' 
                  : 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900'
              }`}
              title="Lọc căn còn hàng"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{stats.available}</span>
            </button>

            <button
              onClick={() => setStatusFilter(statusFilter === 'sold' ? 'all' : 'sold')}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                statusFilter === 'sold' 
                  ? 'bg-rose-500 text-white shadow-sm' 
                  : 'bg-rose-950/80 text-rose-300 border border-rose-700/60 hover:bg-rose-900'
              }`}
              title="Lọc căn đã bán"
            >
              <Lock className="w-2 h-2 text-rose-400" />
              <span>{stats.sold}</span>
            </button>
          </div>

          {/* Zoom & Fullscreen controls */}
          <div className="flex items-center gap-0.5 bg-black/60 px-1 py-0.5 rounded-lg border border-emerald-800">
            <button
              onClick={handleZoomIn}
              className="p-0.5 rounded text-emerald-200 hover:text-white hover:bg-emerald-800/60 cursor-pointer"
              title="Phóng to"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-0.5 rounded text-emerald-200 hover:text-white hover:bg-emerald-800/60 cursor-pointer"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-0.5 rounded text-emerald-200 hover:text-white hover:bg-emerald-800/60 cursor-pointer"
              title="Đặt lại góc nhìn"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-0.5 rounded text-emerald-200 hover:text-white hover:bg-emerald-800/60 cursor-pointer"
              title={isFullscreen ? "Thu nhỏ cửa sổ" : "Toàn màn hình"}
            >
              {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </button>
          </div>
        </div>

      </div>

      {/* 3. INTERACTIVE SVG MASTERPLAN CANVAS */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative overflow-hidden cursor-grab active:cursor-grabbing bg-[#102219] select-none ${
          isFullscreen ? 'h-[calc(100vh-100px)]' : 'h-[540px] sm:h-[620px] lg:h-[700px]'
        }`}
      >
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-75"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          {/* THE SVG SITE PLAN (1200 x 780 viewBox) */}
          <svg
            viewBox="0 0 1200 780"
            className="w-full h-full max-w-none pointer-events-auto"
            style={{ minWidth: '1080px', minHeight: '700px' }}
          >
            <defs>
              {/* Grass gradient */}
              <radialGradient id="grassGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1e3a2f" />
                <stop offset="100%" stopColor="#0f221a" />
              </radialGradient>
              {/* Boulevard gradient */}
              <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              {/* Lake gradient */}
              <radialGradient id="lakeGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
              </radialGradient>
              {/* Gold gradient for badges */}
              <linearGradient id="goldBadge" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>

            {/* BASE GROUND & GRASS */}
            <rect x="0" y="0" width="1200" height="780" fill="url(#grassGrad)" />

            {/* BLUEPRINT BACKGROUND IMAGE (CUSTOM / UPLOADED MASTERPLAN) */}
            {(mapViewMode === 'blueprint' || mapViewMode === 'hybrid') && masterplanImage && (
              <image
                href={masterplanImage}
                x="0"
                y="0"
                width="1200"
                height="780"
                preserveAspectRatio="xMidYMid slice"
                opacity={mapViewMode === 'blueprint' ? 0.95 : hybridOpacity}
              />
            )}

            {/* BACKGROUND ROAD NETWORK */}
            {/* Top Outer Highway */}
            <rect x="50" y="20" width="1100" height="38" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <line x1="60" y1="39" x2="1140" y2="39" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.4" />

            {/* Leftmost Road: Đường Phú Quý 6 (26m) */}
            <rect x="60" y="20" width="46" height="640" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <line x1="83" y1="30" x2="83" y2="650" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.4" />
            <text x="73" y="360" fill="#94a3b8" fontSize="10px" fontWeight="bold" transform="rotate(-90 73 360)">
              ĐƯỜNG PHÚ QUÝ 6 (26 m)
            </text>

            {/* Internal Roads - Phú Quý */}
            {/* Đường Phú Quý 5 */}
            <rect x="235" y="58" width="22" height="490" fill="#243242" />
            <text x="248" y="290" fill="#64748b" fontSize="8px" fontWeight="bold" transform="rotate(-90 248 290)">
              ĐƯỜNG PHÚ QUÝ 5
            </text>

            {/* Đường Phú Quý 3 */}
            <rect x="408" y="58" width="22" height="490" fill="#243242" />
            <text x="421" y="290" fill="#64748b" fontSize="8px" fontWeight="bold" transform="rotate(-90 421 290)">
              ĐƯỜNG PHÚ QUÝ 3
            </text>

            {/* Đường Phú Quý 2 (ngang) */}
            <rect x="106" y="380" width="370" height="22" fill="#243242" />
            <text x="240" y="394" fill="#64748b" fontSize="8px" fontWeight="bold">
              ĐƯỜNG PHÚ QUÝ 2
            </text>

            {/* Central Spine: Phố Minh Thành 2 (trái) & Phố Minh Thành 1 (phải) */}
            <rect x="480" y="58" width="24" height="490" fill="#243242" />
            <text x="494" y="300" fill="#94a3b8" fontSize="8px" fontWeight="bold" transform="rotate(-90 494 300)">
              PHỐ MINH THÀNH 2
            </text>

            <rect x="585" y="58" width="24" height="490" fill="#243242" />
            <text x="599" y="300" fill="#94a3b8" fontSize="8px" fontWeight="bold" transform="rotate(-90 599 300)">
              PHỐ MINH THÀNH 1
            </text>

            {/* Internal Roads - Vinh Hoa */}
            {/* Đường Vinh Hoa 2 (ngang) */}
            <rect x="610" y="375" width="280" height="22" fill="#243242" />
            <text x="710" y="390" fill="#64748b" fontSize="8px" fontWeight="bold">
              ĐƯỜNG VINH HOA 2
            </text>

            {/* Đường Vinh Hoa 3 */}
            <rect x="690" y="58" width="22" height="490" fill="#243242" />
            <text x="703" y="300" fill="#64748b" fontSize="8px" fontWeight="bold" transform="rotate(-90 703 300)">
              ĐƯỜNG VINH HOA 3
            </text>

            {/* Đường Vinh Hoa 5 */}
            <rect x="778" y="58" width="22" height="490" fill="#243242" />
            <text x="791" y="300" fill="#64748b" fontSize="8px" fontWeight="bold" transform="rotate(-90 791 300)">
              ĐƯỜNG VINH HOA 5
            </text>

            {/* Đường Vinh Hoa 6 */}
            <rect x="866" y="58" width="22" height="490" fill="#243242" />
            <text x="879" y="300" fill="#64748b" fontSize="8px" fontWeight="bold" transform="rotate(-90 879 300)">
              ĐƯỜNG VINH HOA 6
            </text>

            {/* CENTRAL GREEN PARK & AMENITY SPINE */}
            <g id="central-park">
              <rect x="504" y="60" width="81" height="488" rx="8" fill="#14532d" stroke="#22c55e" strokeWidth="1" opacity="0.85" />
              
              {/* Central Pool / Lake */}
              <ellipse cx="544" cy="180" rx="26" ry="40" fill="url(#lakeGrad)" stroke="#7dd3fc" strokeWidth="1.5" />
              <circle cx="544" cy="180" r="12" fill="#0284c7" opacity="0.6" />
              <text x="544" y="183" textAnchor="middle" fill="#ffffff" fontSize="7px" fontWeight="bold">HỒ BƠI</text>

              {/* Flame monument icon */}
              <ellipse cx="544" cy="100" rx="14" ry="20" fill="#d97706" opacity="0.9" />
              <text x="544" y="103" textAnchor="middle" fill="#ffffff" fontSize="6px" fontWeight="bold">BIỂU TƯỢNG</text>

              {/* Sports court */}
              <rect x="526" y="260" width="36" height="26" rx="3" fill="#ea580c" stroke="#fed7aa" strokeWidth="1" />
              <text x="544" y="276" textAnchor="middle" fill="#ffffff" fontSize="6px" fontWeight="bold">SÂN THỂ THAO</text>

              {/* Fountain & Garden */}
              <circle cx="544" cy="360" r="18" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
              <circle cx="544" cy="360" r="8" fill="#38bdf8" />
              <text x="544" y="363" textAnchor="middle" fill="#ffffff" fontSize="5.5px" fontWeight="bold">ĐÀI PHUN</text>

              {/* Clubhouse */}
              <rect x="520" y="420" width="48" height="34" rx="4" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
              <text x="544" y="440" textAnchor="middle" fill="#fbbf24" fontSize="6px" fontWeight="bold">CLUBHOUSE</text>

              {/* CỔNG CHÍNH */}
              <g transform="translate(544, 520)">
                <rect x="-35" y="-12" width="70" height="24" rx="4" fill="#0f172a" stroke="#d97706" strokeWidth="1.5" />
                <text x="0" y="3" textAnchor="middle" fill="#fbbf24" fontSize="8.5px" fontWeight="black" letterSpacing="1px">
                  CỔNG CHÍNH
                </text>
              </g>
            </g>

            {/* EAST ECO PARK & COMPASS ROSE (Bên phải) */}
            <g id="east-eco-park">
              <path
                d="M 986,58 Q 1050,80 1080,180 T 1030,380 T 1085,520 L 986,540 Z"
                fill="#166534"
                stroke="#22c55e"
                strokeWidth="1.5"
                opacity="0.9"
              />
              <text x="1036" y="240" textAnchor="middle" fill="#86efac" fontSize="10px" fontWeight="bold" letterSpacing="1px" transform="rotate(45 1036 240)">
                CÔNG VIÊN SINH THÁI
              </text>

              {/* Fengshui Compass Rose (La bàn) */}
              <g transform="translate(1080, 620)">
                <circle cx="0" cy="0" r="46" fill="#0f172a" stroke="#d97706" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="36" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                {/* Compass needles */}
                <polygon points="0,-32 6,0 0,6" fill="#ef4444" />
                <polygon points="0,32 6,0 0,-6" fill="#94a3b8" />
                <polygon points="-32,0 0,-6 6,0" fill="#94a3b8" />
                <polygon points="32,0 0,-6 -6,0" fill="#94a3b8" />
                <circle cx="0" cy="0" r="4" fill="#fbbf24" />
                {/* Letters */}
                <text x="0" y="-36" textAnchor="middle" fill="#ef4444" fontSize="10px" fontWeight="black">B</text>
                <text x="0" y="44" textAnchor="middle" fill="#ffffff" fontSize="9px" fontWeight="bold">N</text>
                <text x="42" y="4" textAnchor="middle" fill="#ffffff" fontSize="9px" fontWeight="bold">Đ</text>
                <text x="-42" y="4" textAnchor="middle" fill="#ffffff" fontSize="9px" fontWeight="bold">T</text>
              </g>
            </g>

            {/* ================= PHÂN KHU PHÚ QUÝ (LEFT ZONE) ================= */}
            {/* Zone Label Badge */}
            <g transform="translate(42, 340)">
              <rect x="-16" y="-80" width="28" height="160" rx="14" fill="#ea580c" stroke="#ffffff" strokeWidth="1.5" />
              <text x="-2" y="5" textAnchor="middle" fill="#ffffff" fontSize="11px" fontWeight="black" transform="rotate(-90 -2 5)">
                PHÂN KHU PHÚ QUÝ
              </text>
            </g>

            {/* 1. BT-4 (Top left, 8 villas) */}
            {renderVillasGrid('BT-4', 114, 80, 26, 22, 3)}

            {/* 2. BT-3 (Middle left, 8 villas) */}
            {renderVillasGrid('BT-3', 114, 250, 26, 22, 3)}

            {/* 3. Khối Nhà ở XH & Thương Mại: XH-1, XH-2, XH-3 */}
            {/* XH-1 (Top) */}
            <g id="block-xh1">
              <rect x="265" y="80" width="135" height="120" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
              <rect x="290" y="105" width="85" height="70" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1" />
              <circle cx="332" cy="140" r="14" fill="#334155" />
              <text x="332" y="143" textAnchor="middle" fill="#94a3b8" fontSize="10px" fontWeight="bold">XH-1</text>
              <text x="332" y="190" textAnchor="middle" fill="#64748b" fontSize="7px">KHỐI THƯƠNG MẠI</text>
            </g>

            {/* XH-2 (Middle left) */}
            <g id="block-xh2">
              <rect x="260" y="240" width="55" height="120" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1.2" />
              <circle cx="287" cy="300" r="10" fill="#334155" />
              <text x="287" y="303" textAnchor="middle" fill="#94a3b8" fontSize="8px" fontWeight="bold">XH-2</text>
            </g>

            {/* L-10 (Between XH-2 and XH-3) */}
            {renderLkBlock('L10', 324, 236, 18, 16, 1, 1)}

            {/* XH-3 (Middle right) */}
            <g id="block-xh3">
              <rect x="372" y="240" width="55" height="120" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1.2" />
              <circle cx="399" cy="300" r="10" fill="#334155" />
              <text x="399" y="303" textAnchor="middle" fill="#94a3b8" fontSize="8px" fontWeight="bold">XH-3</text>
            </g>

            {/* 4. Liền kề L-7 (Phú Quý trên) */}
            {renderLkBlock('L7', 436, 80, 18, 18, 1, 2)}

            {/* 5. Liền kề L-8 (Phú Quý dưới) */}
            {renderLkBlock('L8', 436, 240, 18, 18, 1, 2)}

            {/* 6. Biệt Thự BT-2 (Dãy 22 căn đại lộ 43.5m) */}
            {renderBoulevardVillas('BT2', 114, 430, 14.8, 36, 1.6)}


            {/* ================= PHÂN KHU VINH HOA (RIGHT ZONE) ================= */}
            {/* Zone Label Badge */}
            <g transform="translate(805, 340)">
              <rect x="-16" y="-80" width="28" height="160" rx="14" fill="#ea580c" stroke="#ffffff" strokeWidth="1.5" />
              <text x="-2" y="5" textAnchor="middle" fill="#ffffff" fontSize="11px" fontWeight="black" transform="rotate(-90 -2 5)">
                PHÂN KHU VINH HOA
              </text>
            </g>

            {/* Liền kề L-5 (trên) & L-6 (dưới) */}
            {renderLkBlock('L5', 618, 80, 18, 18, 1, 2)}
            {renderLkBlock('L6', 618, 230, 18, 18, 1, 2)}

            {/* Liền kề L-3 (trên) & L-4 (dưới) */}
            {renderLkBlock('L3', 718, 80, 18, 18, 1, 2)}
            {renderLkBlock('L4', 718, 230, 18, 18, 1, 2)}

            {/* Liền kề L-1 (trên) & L-2 (dưới) */}
            {renderLkBlock('L1', 806, 80, 18, 18, 1, 2)}
            {renderLkBlock('L2', 806, 230, 18, 18, 1, 2)}

            {/* Biệt Thự BT-1 (BT1.A) (Dãy 22 căn đại lộ 43.5m - 22 xuống 01) */}
            {renderBoulevardVillas('BT1', 614, 430, 14.8, 36, 1.6)}


            {/* ================= BOTTOM MAIN BOULEVARD (43.5m) ================= */}
            <g id="main-boulevard">
              {/* Road bed */}
              <rect x="50" y="490" width="940" height="52" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
              
              {/* Divider median */}
              <rect x="50" y="513" width="940" height="6" fill="#14532d" />
              <line x1="50" y1="516" x2="990" y2="516" stroke="#fbbf24" strokeWidth="1" strokeDasharray="6 6" />

              {/* Road names on map */}
              <text x="240" y="508" fill="#e2e8f0" fontSize="9px" fontWeight="bold">
                ĐƯỜNG PHÚ QUÝ 1 (43.5 m)
              </text>
              <text x="750" y="508" fill="#e2e8f0" fontSize="9px" fontWeight="bold">
                ĐƯỜNG VINH HOA 1 (43.5 m)
              </text>

              {/* Direction Arrows */}
              <g transform="translate(180, 532)">
                <text x="0" y="0" textAnchor="middle" fill="#fbbf24" fontSize="9px" fontWeight="black" letterSpacing="0.5px">
                  « HƯỚNG ĐI KHU ĐÔ THỊ AMATA 714HA
                </text>
              </g>

              <g transform="translate(780, 532)">
                <text x="0" y="0" textAnchor="middle" fill="#fbbf24" fontSize="9px" fontWeight="black" letterSpacing="0.5px">
                  ĐƯỜNG KẾT NỐI QUỐC LỘ 18A »
                </text>
              </g>
            </g>

            {/* Upper Highway Arrow */}
            <text x="140" y="32" fill="#fbbf24" fontSize="8.5px" fontWeight="bold">
              HƯỚNG ĐI ĐƯỜNG QUY HOẠCH »»
            </text>
          </svg>
        </div>

        {/* 4. RICH FLOATING TOOLTIP ON HOVER */}
        {hoveredUnit && (
          <div
            className="absolute z-30 pointer-events-none transition-all duration-150 transform -translate-x-1/2 -translate-y-full mb-3"
            style={{
              left: `${Math.min(Math.max(tooltipPos.x, 140), (containerRef.current?.clientWidth || 800) - 140)}px`,
              top: `${Math.max(tooltipPos.y - 12, 100)}px`
            }}
          >
            <div className="bg-[#091d15]/95 backdrop-blur-md text-white p-3.5 rounded-2xl border border-amber-400/60 shadow-2xl w-64 text-left space-y-2">
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5 border-b border-emerald-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{
                    backgroundColor: hoveredUnit.status === 'sold' ? '#f43f5e' : '#10b981'
                  }} />
                  <span className="font-extrabold text-amber-300 font-mono text-sm">{hoveredUnit.code}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  hoveredUnit.status === 'sold'
                    ? 'bg-rose-950 text-rose-300 border border-rose-500'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                }`}>
                  {hoveredUnit.status === 'sold' ? '🔴 Đã Bán' : '🟢 Còn Hàng'}
                </span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                <div>
                  <span className="text-[10px] text-emerald-400/80 block">Loại Hình:</span>
                  <span className="font-semibold text-white truncate block">{hoveredUnit.type}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400/80 block">Diện Tích:</span>
                  <span className="font-semibold text-white">{hoveredUnit.area}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400/80 block">Hướng:</span>
                  <span className="font-semibold text-white">{hoveredUnit.orientation}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400/80 block">Giá Dự Kiến:</span>
                  <span className="font-bold text-amber-300">{hoveredUnit.priceEstimate || 'Liên hệ'}</span>
                </div>
              </div>

              {/* Call to action note */}
              <div className="pt-1 text-[11px] text-emerald-200/90 flex items-center justify-between">
                <span>{isEditMode ? '👉 Click để đổi trạng thái' : '👉 Click xem chi tiết căn'}</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </div>
            </div>
          </div>
        )}

        {/* 5. MASTERPLAN MAP LEGEND IN BOTTOM LEFT */}
        <div className="absolute bottom-3 left-3 bg-[#0b1c15]/90 backdrop-blur-md p-3 rounded-2xl border border-emerald-800/80 shadow-lg text-xs space-y-1.5 z-10 pointer-events-auto">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-1">
            <Info className="w-3 h-3 text-amber-300" />
            <span>Chú Thích Trạng Thái</span>
          </p>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-600 border border-emerald-400 shrink-0" />
            <span className="text-white">Còn hàng (Mở bán)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-rose-700 border border-rose-400 shrink-0" />
            <span className="text-white">Đã giao dịch (Bán)</span>
          </div>
        </div>

        {/* Instruction overlay badge */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] text-emerald-200 z-10 hidden sm:flex items-center gap-2">
          <span>Kéo chuột để di chuyển • Cuộn để phóng to</span>
        </div>
      </div>

      {/* ================= MODAL: CHỈNH SỬA CĂN TRỰC TIẾP TRÊN MAP ================= */}
      {editingUnitModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setEditingUnitModal(null)}
        >
          <div 
            className="bg-[#0f271d] border border-emerald-500 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-400 text-black font-bold">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">
                    Sửa Thông Tin Căn {editingUnitModal.code}
                  </h3>
                  <p className="text-[11px] text-emerald-300">
                    Cập nhật trực tiếp thông số, trạng thái và hình ảnh của căn này
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setEditingUnitModal(null)} 
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Quick Status Selector */}
              <div>
                <label className="block text-emerald-300 font-bold mb-1.5">Trạng Thái Bán</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingUnitModal({ ...editingUnitModal, status: 'available' })}
                    className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      editingUnitModal.status === 'available'
                        ? 'bg-emerald-500 text-black border-emerald-300 shadow-md ring-2 ring-emerald-400'
                        : 'bg-black/40 text-emerald-300 border-emerald-800 hover:bg-emerald-950'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black" />
                    <span>Còn Hàng (Mở Bán)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingUnitModal({ ...editingUnitModal, status: 'sold' })}
                    className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      editingUnitModal.status === 'sold'
                        ? 'bg-rose-600 text-white border-rose-400 shadow-md ring-2 ring-rose-400'
                        : 'bg-black/40 text-rose-300 border-rose-900 hover:bg-rose-950'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 border border-white" />
                    <span>Đã Giao Dịch (Bán)</span>
                  </button>
                </div>
              </div>

              {/* Code & Block */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Mã Căn (Ví dụ: LK1-01)</label>
                  <input
                    type="text"
                    value={editingUnitModal.code}
                    onChange={(e) => setEditingUnitModal({ ...editingUnitModal, code: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Block / Phân Khu</label>
                  <input
                    type="text"
                    value={editingUnitModal.block}
                    onChange={(e) => setEditingUnitModal({ ...editingUnitModal, block: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                </div>
              </div>

              {/* Type & Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Loại Hình</label>
                  <input
                    type="text"
                    value={editingUnitModal.type}
                    onChange={(e) => setEditingUnitModal({ ...editingUnitModal, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Giá Tham Khảo</label>
                  <input
                    type="text"
                    value={editingUnitModal.priceEstimate || ''}
                    onChange={(e) => setEditingUnitModal({ ...editingUnitModal, priceEstimate: e.target.value })}
                    placeholder="VD: 3.2 Tỷ"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-amber-400 text-xs font-bold"
                  />
                </div>
              </div>

              {/* Area & Orientation */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Diện Tích Đất</label>
                  <input
                    type="text"
                    value={editingUnitModal.area}
                    onChange={(e) => setEditingUnitModal({ ...editingUnitModal, area: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Hướng Nhà</label>
                  <input
                    type="text"
                    value={editingUnitModal.orientation}
                    onChange={(e) => setEditingUnitModal({ ...editingUnitModal, orientation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                </div>
              </div>

              {/* Frontage & Note */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Mặt Tiền (m)</label>
                  <input
                    type="text"
                    value={editingUnitModal.frontage || ''}
                    onChange={(e) => setEditingUnitModal({ ...editingUnitModal, frontage: e.target.value })}
                    placeholder="VD: 6.0m"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-emerald-300 font-semibold mb-1">Ghi Chú Nổi Bật</label>
                  <input
                    type="text"
                    value={editingUnitModal.note || ''}
                    onChange={(e) => setEditingUnitModal({ ...editingUnitModal, note: e.target.value })}
                    placeholder="VD: View công viên, Lô góc"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                </div>
              </div>

              {/* Unit Photo / Image */}
              <div>
                <label className="block text-emerald-300 font-semibold mb-1">Ảnh Căn Hộ / Bản Vẽ (Tùy chọn)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingUnitModal.imageUrl || ''}
                    onChange={(e) => setEditingUnitModal({ ...editingUnitModal, imageUrl: e.target.value })}
                    placeholder="Dán link ảnh hoặc chọn từ máy..."
                    className="flex-1 px-3 py-2 rounded-xl bg-black/50 border border-emerald-700 text-white text-xs"
                  />
                  {onPickImage && (
                    <button
                      type="button"
                      onClick={() => {
                        onPickImage(
                          `unit_${editingUnitModal.id}_image`,
                          editingUnitModal.imageUrl || '',
                          `Ảnh căn ${editingUnitModal.code}`
                        );
                      }}
                      className="px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-amber-300 font-bold text-xs flex items-center gap-1 border border-emerald-600 cursor-pointer shrink-0"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Đổi Ảnh</span>
                    </button>
                  )}
                </div>
                {editingUnitModal.imageUrl && (
                  <div className="mt-2 w-20 h-14 rounded-lg overflow-hidden border border-emerald-600">
                    <img src={editingUnitModal.imageUrl} alt={editingUnitModal.code} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-emerald-800/80">
              <button
                type="button"
                onClick={() => setEditingUnitModal(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onUpdateUnit) {
                    onUpdateUnit(editingUnitModal);
                  } else if (onUpdateUnitStatus) {
                    onUpdateUnitStatus(editingUnitModal.id, editingUnitModal.status);
                  }
                  setEditingUnitModal(null);
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black text-xs font-bold cursor-pointer shadow-lg flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Lưu Thay Đổi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
