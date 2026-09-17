export interface StatItem {
  id: string;
  label: string;
  value: string;
  subtext?: string;
}

export interface ConnectivityItem {
  id: string;
  time: string;
  destination: string;
  description: string;
}

export interface AmenityItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type?: 'internal' | 'external';
  imageUrl: string;
  iconName: string;
}

export type UnitStatus = 'available' | 'sold';

export interface UnitItem {
  id: string;
  code: string;
  block: string;
  zone?: 'Phú Quý' | 'Vinh Hoa';
  type: string;
  area: string;
  floorArea?: string;
  floors?: string;
  frontage?: string;
  orientation: string;
  priceEstimate?: string;
  status: UnitStatus;
  note?: string;
  imageUrl?: string;
}

export interface InventorySectionData {
  badge: string;
  title: string;
  description: string;
  masterplanImage: string;
  units: UnitItem[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'perspective' | 'masterplan' | 'interior' | 'actual';
  imageUrl: string;
  caption?: string;
}

export interface PolicyPaymentStep {
  id: string;
  step: string;
  milestone: string;
  percentage: string;
  note: string;
}

export interface PolicyPlanStep {
  id?: string;
  step: string;
  milestone: string;
  rate: string;
  category: string;
  note?: string;
}

export interface PaymentMethodPlan {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  badge: string;
  highlight: string;
  steps: PolicyPlanStep[];
}

export interface PolicyIncentive {
  id: string;
  title: string;
  value: string;
  description: string;
}

export interface ProgressMilestone {
  id: string;
  date: string;
  title: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  description: string;
  imageUrl?: string;
}

export interface LegalDocument {
  id: string;
  title: string;
  docNumber: string;
  authority: string;
  status: string;
  description: string;
  fileUrl?: string;
  date?: string;
  group?: 'investment' | 'land' | 'planning' | string;
  groupTitle?: string;
}

export interface ProductLineItem {
  id: string;
  orderNumber?: string; // e.g. "01.", "02.", "03."
  title: string; // e.g. "Nhà phố thương mại"
  area: string; // "85–96,6 m²" (Diện tích)
  frontage?: string; // "5–5,8m" (Mặt tiền)
  quantity?: string; // "140 căn" (Số lượng sản phẩm)
  floors?: string; // "4,5 tầng" (Số tầng)
  depth?: string; // "17 m"
  description: string; // Đoạn giới thiệu
  imageUrl: string;
  tag?: string; // e.g. "SERIES MIK GROUP"
}

export interface Tour360Scene {
  id: string;
  title: string;
  description: string;
  panoramaUrl: string;
  thumbnailUrl: string;
}

export interface OverviewFields {
  projectName: string;
  location: string;
  scale: string;
  totalProducts: string;
  shophouseCount: string;
  villaCount: string;
  legal: string;
}

export interface ProjectData {
  general: {
    projectName: string;
    tagline: string;
    subDescription: string;
    hotline: string;
    zaloNumber: string;
    email: string;
    address: string;
    tour360Url: string;
    brochureUrl: string;
    consultationTitle: string;
    consultationSubtitle: string;
  };
  intro: {
    title: string;
    badge: string;
    headline: string;
    paragraph1: string;
    paragraph2: string;
    bannerImage: string;
    heroImage: string;
    overview: OverviewFields;
    stats: StatItem[];
  };
  products: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    items: ProductLineItem[];
  };
  location: {
    badge: string;
    title: string;
    description: string;
    addressButtonText?: string;
    mapEmbedUrl: string;
    googleMapsLink: string;
    locationImage: string;
    regionalMapImage?: string;
    highlights: ConnectivityItem[];
  };
  amenities: {
    badge: string;
    title: string;
    description: string;
    items: AmenityItem[];
  };
  inventory: InventorySectionData;
  gallery?: {
    badge: string;
    title: string;
    description: string;
    masterplanImage: string;
    items: GalleryItem[];
  };
  policy: {
    badge: string;
    title: string;
    slogan?: string;
    description: string;
    bannerImage?: string;
    highlights?: {
      htls: {
        title: string;
        rate: string;
        duration: string;
        scope: string;
      };
      discount: {
        title: string;
        rate: string;
        condition: string;
      };
    };
    bookingDeposit: string;
    discountHighlight: string;
    incentives: PolicyIncentive[];
    paymentSchedule: PolicyPaymentStep[];
    plans?: PaymentMethodPlan[];
    conditions?: {
      title: string;
      items: string[];
    };
    validity?: {
      title: string;
      items: string[];
    };
    developer?: {
      name: string;
      slogan: string;
      website: string;
    };
  };
  progress: {
    badge: string;
    title: string;
    description: string;
    overallPercentage: number;
    lastUpdated: string;
    milestones: ProgressMilestone[];
  };
  legal: {
    badge: string;
    title: string;
    description: string;
    summaryText: string;
    documents: LegalDocument[];
  };
  tour360: {
    activeSceneId: string;
    scenes: Tour360Scene[];
  };
}
