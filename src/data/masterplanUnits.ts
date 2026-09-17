import { UnitItem, UnitStatus } from '../types';

export interface BlockConfig {
  id: string;
  name: string;
  code: string;
  zone: 'Phú Quý' | 'Vinh Hoa';
  type: 'Biệt Thự' | 'Liền Kề' | 'Shophouse' | 'Thương Mại';
  description: string;
  unitCount: number;
}

export const masterplanBlocks: BlockConfig[] = [
  // PHÂN KHU PHÚ QUÝ
  { id: 'BT-4', name: 'Biệt Thự BT-4', code: 'BT-4', zone: 'Phú Quý', type: 'Biệt Thự', description: 'Biệt thự góc vườn cạnh đường Phú Quý 6 (26m)', unitCount: 8 },
  { id: 'BT-3', name: 'Biệt Thự BT-3', code: 'BT-3', zone: 'Phú Quý', type: 'Biệt Thự', description: 'Biệt thự song lập tiếp giáp công viên nội khu', unitCount: 8 },
  { id: 'BT-2', name: 'Biệt Thự BT-2', code: 'BT-2', zone: 'Phú Quý', type: 'Biệt Thự', description: 'Dãy biệt thự đại lộ Phú Quý 1 lộ giới 43.5m', unitCount: 22 },
  { id: 'L-10', name: 'Liền Kề L-10', code: 'L-10', zone: 'Phú Quý', type: 'Liền Kề', description: 'Liền kề trung tâm giữa khối XH-2 và XH-3', unitCount: 14 },
  { id: 'L-7', name: 'Liền Kề L-7', code: 'L-7', zone: 'Phú Quý', type: 'Liền Kề', description: 'Liền kề shophouse mặt tiền đường Phú Quý 3', unitCount: 14 },
  { id: 'L-8', name: 'Liền Kề L-8', code: 'L-8', zone: 'Phú Quý', type: 'Liền Kề', description: 'Liền kề thương mại giáp Phố Minh Thành 2', unitCount: 14 },

  // PHÂN KHU VINH HOA
  { id: 'BT-1', name: 'Biệt Thự BT-1', code: 'BT-1', zone: 'Vinh Hoa', type: 'Biệt Thự', description: 'Dãy biệt thự kim cương mặt tiền đại lộ 43.5m kết nối Quốc lộ 18A', unitCount: 22 },
  { id: 'L-5', name: 'Liền Kề L-5', code: 'L-5', zone: 'Vinh Hoa', type: 'Liền Kề', description: 'Liền kề mặt tiền Phố Minh Thành 1 hướng công viên trung tâm', unitCount: 14 },
  { id: 'L-6', name: 'Liền Kề L-6', code: 'L-6', zone: 'Vinh Hoa', type: 'Liền Kề', description: 'Liền kề shophouse kinh doanh thương mại', unitCount: 14 },
  { id: 'L-3', name: 'Liền Kề L-3', code: 'L-3', zone: 'Vinh Hoa', type: 'Liền Kề', description: 'Liền kề trung tâm trục Vinh Hoa 3 và Vinh Hoa 5', unitCount: 14 },
  { id: 'L-4', name: 'Liền Kề L-4', code: 'L-4', zone: 'Vinh Hoa', type: 'Liền Kề', description: 'Liền kề thoáng mát đón gió đông nam', unitCount: 14 },
  { id: 'L-1', name: 'Liền Kề L-1', code: 'L-1', zone: 'Vinh Hoa', type: 'Liền Kề', description: 'Dãy liền kề hướng công viên sinh thái phía đông', unitCount: 14 },
  { id: 'L-2', name: 'Liền Kề L-2', code: 'L-2', zone: 'Vinh Hoa', type: 'Liền Kề', description: 'Liền kề tiếp giáp đường Vinh Hoa 6 và vườn hoa', unitCount: 14 },
];

// Helper to generate realistic unit lists for each block
export function generateInitialUnits(): UnitItem[] {
  const units: UnitItem[] = [];

  // 1. BT-1 (BT1.A) - Vinh Hoa (22 units on 43.5m Boulevard, numbered 22 down to 01)
  for (let i = 22; i >= 1; i--) {
    const num = i < 10 ? `0${i}` : `${i}`;
    const isCorner = i === 22 || i === 1;
    const status: UnitStatus = (i % 5 === 0) ? 'sold' : 'available';
    const area = isCorner ? '278,14 m²' : '252,0 m²';
    units.push({
      id: `u-bt1a-${num}`,
      code: `BT1.A.${num}`,
      block: 'Block BT-1 (BT1.A)',
      zone: 'Vinh Hoa',
      type: isCorner ? 'Biệt Thự Đơn Lập (Góc)' : 'Biệt Thự Song Lập',
      area,
      floorArea: isCorner ? '520 m²' : '468 m²',
      floors: '3.5 tầng',
      frontage: isCorner ? '15.0m' : '12.0m',
      orientation: 'Đông Nam',
      priceEstimate: isCorner ? '14.5 Tỷ' : '11.8 Tỷ',
      status,
      note: isCorner 
        ? `Lô góc hoa hậu 2 mặt tiền (${area}) mặt tiền đại lộ 43.5m kết nối Quốc lộ 18A` 
        : `Biệt thự sang trọng mặt tiền đại lộ 43.5m (${area}), vỉa hè 8m kinh doanh đắc địa`,
      imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop'
    });
  }

  // 2. BT-2 (Phú Quý, 22 units on 43.5m Boulevard)
  for (let i = 1; i <= 22; i++) {
    const num = i < 10 ? `0${i}` : `${i}`;
    const isCorner = i === 1 || i === 22 || i === 10 || i === 11;
    const status: UnitStatus = i % 4 === 0 ? 'sold' : 'available';
    units.push({
      id: `u-bt2-${num}`,
      code: `BT2.${num}`,
      block: 'Block BT-2',
      zone: 'Phú Quý',
      type: isCorner ? 'Biệt Thự Đơn Lập (Góc)' : 'Biệt Thự Song Lập',
      area: isCorner ? '310.0 m²' : '255.0 m²',
      floorArea: isCorner ? '560 m²' : '475 m²',
      floors: '3.5 tầng',
      frontage: isCorner ? '14.5m' : '11.5m',
      orientation: 'Đông Nam',
      priceEstimate: isCorner ? '13.9 Tỷ' : '10.8 Tỷ',
      status,
      note: 'Mặt tiền Đại lộ Phú Quý 1 kết nối thẳng KĐT Amata 714ha',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
    });
  }

  // 3. BT-3 (Phú Quý, 8 units)
  for (let i = 1; i <= 8; i++) {
    const num = `0${i}`;
    const isCorner = i === 1 || i === 8;
    const status: UnitStatus = (i === 3 || i === 6) ? 'sold' : 'available';
    units.push({
      id: `u-bt3-${num}`,
      code: `BT3.${num}`,
      block: 'Block BT-3',
      zone: 'Phú Quý',
      type: isCorner ? 'Biệt Thự Góc Vườn' : 'Biệt Thự Song Lập',
      area: isCorner ? '260 m²' : '220 m²',
      floorArea: '430 m²',
      floors: '3.5 tầng',
      frontage: '11.0m',
      orientation: 'Tây Bắc - Đông Bắc',
      priceEstimate: isCorner ? '10.2 Tỷ' : '8.6 Tỷ',
      status,
      note: 'Cạnh đường Phú Quý 6 (26m), không gian yên tĩnh ven công viên',
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop'
    });
  }

  // 4. BT-4 (Phú Quý, 8 units)
  for (let i = 1; i <= 8; i++) {
    const num = `0${i}`;
    const isCorner = i === 1 || i === 8;
    const status: UnitStatus = (i === 2 || i === 7) ? 'sold' : 'available';
    units.push({
      id: `u-bt4-${num}`,
      code: `BT4.${num}`,
      block: 'Block BT-4',
      zone: 'Phú Quý',
      type: isCorner ? 'Biệt Thự Góc Vườn' : 'Biệt Thự Song Lập',
      area: isCorner ? '265 m²' : '225 m²',
      floorArea: '440 m²',
      floors: '3.5 tầng',
      frontage: '11.0m',
      orientation: 'Tây Bắc - Đông Bắc',
      priceEstimate: isCorner ? '10.5 Tỷ' : '8.8 Tỷ',
      status,
      note: 'Góc tiếp giáp đường quy hoạch mới 26m và công viên nội khu',
      imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop'
    });
  }

  // Helper for Liền kề blocks (L1, L2, L3, L4, L5, L6, L7, L8, L10)
  const lkBlocks = [
    { code: 'L-1', prefix: 'L1', zone: 'Vinh Hoa' as const, name: 'Block L-1', orient: 'Đông Bắc' },
    { code: 'L-2', prefix: 'L2', zone: 'Vinh Hoa' as const, name: 'Block L-2', orient: 'Tây Nam' },
    { code: 'L-3', prefix: 'L3', zone: 'Vinh Hoa' as const, name: 'Block L-3', orient: 'Đông Bắc' },
    { code: 'L-4', prefix: 'L4', zone: 'Vinh Hoa' as const, name: 'Block L-4', orient: 'Tây Nam' },
    { code: 'L-5', prefix: 'L5', zone: 'Vinh Hoa' as const, name: 'Block L-5', orient: 'Đông Bắc' },
    { code: 'L-6', prefix: 'L6', zone: 'Vinh Hoa' as const, name: 'Block L-6', orient: 'Tây Nam' },
    { code: 'L-7', prefix: 'L7', zone: 'Phú Quý' as const, name: 'Block L-7', orient: 'Đông Bắc' },
    { code: 'L-8', prefix: 'L8', zone: 'Phú Quý' as const, name: 'Block L-8', orient: 'Tây Nam' },
    { code: 'L-10', prefix: 'L10', zone: 'Phú Quý' as const, name: 'Block L-10', orient: 'Đông Nam' },
  ];

  lkBlocks.forEach((blk) => {
    for (let i = 1; i <= 14; i++) {
      const num = i < 10 ? `0${i}` : `${i}`;
      const isCorner = i === 1 || i === 14;
      const pseudoRand = (i * 7 + blk.prefix.charCodeAt(1)) % 10;
      const status: UnitStatus = pseudoRand <= 3 ? 'sold' : 'available';

      units.push({
        id: `u-${blk.prefix.toLowerCase()}-${num}`,
        code: `${blk.prefix}.${num}`,
        block: blk.name,
        zone: blk.zone,
        type: isCorner ? 'Liền Kề Góc (2 Mặt Tiền)' : 'Liền Kề Tiêu Chuẩn',
        area: isCorner ? '112.5 m²' : '85.0 m²',
        floorArea: isCorner ? '380 m²' : '295 m²',
        floors: '4 tầng',
        frontage: isCorner ? '7.5m' : '5.0m',
        orientation: blk.orient,
        priceEstimate: isCorner ? '5.8 Tỷ' : '4.25 Tỷ',
        status,
        note: isCorner ? 'Lô góc thương mại 2 mặt thoáng, tiềm năng kinh doanh vượt trội' : 'Nhà phố xây thô hoàn thiện mặt ngoài, sổ đỏ lâu dài',
        imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop'
      });
    }
  });

  return units;
}
