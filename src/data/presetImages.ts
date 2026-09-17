export interface ImagePreset {
  id: string;
  name: string;
  category: 'exterior' | 'interior' | 'aerial' | 'progress' | 'masterplan' | 'amenity';
  url: string;
}

export const PRESET_IMAGES: ImagePreset[] = [
  {
    id: "ext-1",
    name: "Dãy Shophouse Châu Âu Ban Ngày",
    category: "exterior",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "ext-2",
    name: "Phố Đô Thị Hoàng Hôn Lung Linh",
    category: "exterior",
    url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "ext-3",
    name: "Biệt Thự Vườn Hiện Đại",
    category: "exterior",
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "ext-4",
    name: "Mặt Tiền Cửa Hàng Kinh Doanh",
    category: "exterior",
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "aer-1",
    name: "Flycam Quy Hoạch Đô Thị Ven Sông",
    category: "aerial",
    url: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1800&auto=format&fit=crop"
  },
  {
    id: "aer-2",
    name: "Toàn Cảnh Bán Đảo & Cảng Biển",
    category: "aerial",
    url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1800&auto=format&fit=crop"
  },
  {
    id: "int-1",
    name: "Phòng Khách Duplex Sang Trọng",
    category: "interior",
    url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1800&auto=format&fit=crop"
  },
  {
    id: "int-2",
    name: "Phòng Ngủ Master View Panorama",
    category: "interior",
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1800&auto=format&fit=crop"
  },
  {
    id: "int-3",
    name: "Khu Vực Bếp & Bàn Ăn Cao Cấp",
    category: "interior",
    url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1800&auto=format&fit=crop"
  },
  {
    id: "ame-1",
    name: "Bể Bơi Vô Cực Resort Ngoài Trời",
    category: "amenity",
    url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1800&auto=format&fit=crop"
  },
  {
    id: "ame-2",
    name: "Công Viên Cây Xanh & Lối Dạo Bộ",
    category: "amenity",
    url: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1800&auto=format&fit=crop"
  },
  {
    id: "ame-3",
    name: "Sân Thể Thao Đa Năng",
    category: "amenity",
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1800&auto=format&fit=crop"
  },
  {
    id: "prog-1",
    name: "Công Trường Hạ Tầng Đường Nhựa",
    category: "progress",
    url: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?q=80&w=1800&auto=format&fit=crop"
  },
  {
    id: "prog-2",
    name: "Thi Công Ép Cọc & Xây Dựng",
    category: "progress",
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1800&auto=format&fit=crop"
  },
  {
    id: "plan-1",
    name: "Bản Vẽ Quy Hoạch 1/500",
    category: "masterplan",
    url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop"
  },
  {
    id: "plan-2",
    name: "Sơ Đồ Phân Lô Kiến Trúc",
    category: "masterplan",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1800&auto=format&fit=crop"
  }
];
