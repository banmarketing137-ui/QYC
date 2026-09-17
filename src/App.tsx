import React, { useState, useEffect } from 'react';
import { initialProjectData } from './data/initialData';
import { ProjectData, ProductLineItem, AmenityItem, GalleryItem, UnitItem, ProgressMilestone, LegalDocument } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { ProductsSection } from './components/ProductsSection';
import { LocationSection } from './components/LocationSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { InventorySection } from './components/InventorySection';
import { PolicySection } from './components/PolicySection';
import { ProgressSection } from './components/ProgressSection';
import { LegalSection } from './components/LegalSection';
import { ContactSection } from './components/ContactSection';
import { Tour360Modal } from './components/Tour360Modal';
import { CmsDrawer } from './components/CmsDrawer';
import { ImagePickerModal } from './components/ImagePickerModal';
import { QuickEditFieldModal } from './components/QuickEditFieldModal';
import { EditToolbar } from './components/EditToolbar';
import { ConsultModal } from './components/ConsultModal';
import { AllImagesManagerModal } from './components/AllImagesManagerModal';
import { 
  subscribeToProjectData, 
  fetchProjectDataFromCloud, 
  saveProjectDataToCloud 
} from './firebase';

const STORAGE_KEY = 'quang_yen_centro_data_v1';

export default function App() {
  // Load data from localStorage or initial template
  const [data, setData] = useState<ProjectData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.products || !parsed.products.items || parsed.products.items.length === 0 || !parsed.products.items[0]?.quantity) {
          parsed.products = initialProjectData.products;
        } else {
          parsed.products.items = parsed.products.items.map((item: any, idx: number) => ({
            ...initialProjectData.products.items[idx],
            ...item,
            quantity: item.quantity || initialProjectData.products.items[idx]?.quantity || '140 căn',
            frontage: item.frontage || initialProjectData.products.items[idx]?.frontage || '5 – 6,5 m',
            floors: item.floors || initialProjectData.products.items[idx]?.floors || '4,5 tầng'
          }));
        }
        if (!parsed.intro || !parsed.intro.overview) {
          parsed.intro = {
            ...initialProjectData.intro,
            ...(parsed.intro || {}),
            overview: initialProjectData.intro.overview
          };
        }
        if (!parsed.location || !parsed.location.highlights || parsed.location.highlights.length < 10) {
          parsed.location = {
            ...initialProjectData.location,
            ...(parsed.location || {}),
            highlights: initialProjectData.location.highlights,
            addressButtonText: parsed.location?.addressButtonText || initialProjectData.location.addressButtonText,
            regionalMapImage: parsed.location?.regionalMapImage || initialProjectData.location.regionalMapImage
          };
        }
        if (!parsed.amenities || !parsed.amenities.items || parsed.amenities.items.length < 10 || !parsed.amenities.items.some((i: any) => i.title === 'Sân Pickleball')) {
          parsed.amenities = initialProjectData.amenities;
        }
        if (!parsed.policy || !parsed.policy.plans || parsed.policy.plans.length < 3 || !parsed.policy.highlights) {
          parsed.policy = initialProjectData.policy;
        }
        if (!parsed.inventory || !parsed.inventory.units || !parsed.inventory.units.some((u: any) => u.code?.startsWith('BT1.A.'))) {
          parsed.inventory = initialProjectData.inventory;
        } else {
          // Sanitize any legacy booking/lock căn status
          parsed.inventory.units = parsed.inventory.units.map((u: any) => 
            u.status === 'booking' ? { ...u, status: 'available' } : u
          );
        }
        if (parsed.intro && (parsed.intro.badge === 'TỔNG QUAN DỰ ÁN' || !parsed.intro.badge)) {
          parsed.intro.badge = 'TÂM ĐIỂM THỊNH VƯỢNG';
        }
        if (!parsed.legal || !parsed.legal.documents || parsed.legal.documents.length < 9 || !parsed.legal.documents.some((d: any) => d.docNumber?.includes('226/QĐ-UBND'))) {
          parsed.legal = initialProjectData.legal;
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to load local storage data:', e);
    }
    return initialProjectData;
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isTour360Open, setIsTour360Open] = useState<boolean>(false);
  const [isCmsDrawerOpen, setIsCmsDrawerOpen] = useState<boolean>(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('Nhà phố thương mại');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Modals for editing
  const [imagePicker, setImagePicker] = useState<{
    isOpen: boolean;
    fieldPath: string;
    currentUrl: string;
    title?: string;
  }>({
    isOpen: false,
    fieldPath: '',
    currentUrl: ''
  });

  const [quickEditor, setQuickEditor] = useState<{
    isOpen: boolean;
    fieldPath: string;
    label: string;
    currentValue: string;
  }>({
    isOpen: false,
    fieldPath: '',
    label: '',
    currentValue: ''
  });

  const [isAllImagesManagerOpen, setIsAllImagesManagerOpen] = useState(false);
  const [cloudSyncStatus, setCloudSyncStatus] = useState<'connecting' | 'synced' | 'local_only' | 'syncing'>('connecting');
  const [lastCloudSyncTime, setLastCloudSyncTime] = useState<string | null>(null);

  // Synchronize with Firebase Firestore Cloud Database
  useEffect(() => {
    let isMounted = true;

    // 1. Initial check: If Cloud has data, load it. If Cloud is empty, automatically seed it with local state!
    fetchProjectDataFromCloud()
      .then(async (cloudResult) => {
        if (!isMounted) return;
        if (cloudResult && cloudResult.data) {
          setData(cloudResult.data);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudResult.data));
          } catch (e) {}
          setCloudSyncStatus('synced');
          setLastCloudSyncTime(cloudResult.updatedAt);
        } else {
          // First time cloud setup: upload current state (including any local CMS edits) to Firestore!
          try {
            setCloudSyncStatus('syncing');
            await saveProjectDataToCloud(data);
            if (isMounted) {
              setCloudSyncStatus('synced');
              setLastCloudSyncTime(new Date().toISOString());
            }
          } catch (uploadErr) {
            console.warn('Initial cloud migration notice:', uploadErr);
            if (isMounted) setCloudSyncStatus('local_only');
          }
        }
      })
      .catch((err) => {
        console.warn('Firestore initial fetch error:', err);
        if (isMounted) setCloudSyncStatus('local_only');
      });

    // 2. Realtime listener: whenever ANY device updates data in Firestore, update state immediately
    const unsubscribe = subscribeToProjectData(
      (cloudData, updatedAt) => {
        if (!isMounted) return;
        if (cloudData) {
          setData(cloudData);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
          } catch (e) {}
          setCloudSyncStatus('synced');
          if (updatedAt) setLastCloudSyncTime(updatedAt);
        }
      },
      (err) => {
        console.warn('Realtime subscription notice:', err);
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Save to localStorage AND Cloud Firestore Database
  const handleSaveData = async (newData: ProjectData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setHasUnsavedChanges(false);
    } catch (e) {
      console.error('Error saving local data:', e);
    }

    // Persist to Cloud Firestore so all users see it immediately
    try {
      setCloudSyncStatus('syncing');
      await saveProjectDataToCloud(newData);
      setCloudSyncStatus('synced');
      setLastCloudSyncTime(new Date().toISOString());
    } catch (cloudErr) {
      console.error('Error persisting to Cloud Firestore:', cloudErr);
      setCloudSyncStatus('local_only');
    }
  };

  // Manual Force Sync to Cloud Database
  const handleManualSyncToCloud = async () => {
    try {
      setCloudSyncStatus('syncing');
      await saveProjectDataToCloud(data);
      setCloudSyncStatus('synced');
      setLastCloudSyncTime(new Date().toISOString());
      alert('✅ Đã đồng bộ thành công toàn bộ dữ liệu lên Đám mây (Firebase Firestore)!\nBất kỳ ai mở link web từ điện thoại hoặc máy tính khác đều sẽ thấy ngay nội dung mới nhất của bạn.');
    } catch (e) {
      console.error('Manual sync failed:', e);
      alert('⚠️ Chưa thể đồng bộ lên đám mây. Vui lòng kiểm tra lại kết nối mạng.');
    }
  };

  const handleResetData = async () => {
    setData(initialProjectData);
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHasUnsavedChanges(false);
      await saveProjectDataToCloud(initialProjectData);
    } catch (e) {
      console.error('Error resetting data:', e);
    }
  };

  // Helper to update deeply nested fields (e.g. "intro.title" or "intro.stats.0.value")
  const setNestedValue = (obj: any, path: string, value: any): any => {
    const keys = path.split('.');
    const newObj = JSON.parse(JSON.stringify(obj));
    let current = newObj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }
    const lastKey = isNaN(Number(keys[keys.length - 1]))
      ? keys[keys.length - 1]
      : Number(keys[keys.length - 1]);
    current[lastKey] = value;
    return newObj;
  };

  const handleUpdateField = (fieldPath: string, value: any) => {
    if (fieldPath.startsWith('unit_') && fieldPath.endsWith('_image')) {
      const unitId = fieldPath.replace('unit_', '').replace('_image', '');
      const updatedUnits = data.inventory.units.map(u => u.id === unitId ? { ...u, imageUrl: value } : u);
      const updated = { ...data, inventory: { ...data.inventory, units: updatedUnits } };
      handleSaveData(updated);
      return;
    }
    const updated = setNestedValue(data, fieldPath, value);
    handleSaveData(updated);
  };

  const handleOpenImagePicker = (fieldPath: string, currentUrl: string, title?: string) => {
    setImagePicker({
      isOpen: true,
      fieldPath,
      currentUrl,
      title: title || 'Thay Đổi Hình Ảnh'
    });
  };

  const handleOpenQuickEdit = (fieldPath: string, label: string, currentValue: string) => {
    setQuickEditor({
      isOpen: true,
      fieldPath,
      label,
      currentValue
    });
  };

  const handleOpenConsultModal = (productTitle?: string) => {
    if (productTitle) {
      setSelectedProduct(productTitle);
    }
    setIsConsultModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c2826] font-sans antialiased selection:bg-[#c5a880] selection:text-white relative">
      {/* Header Menu matching reference with exact navigation and prominent 360 button */}
      <Header
        onOpen360Tour={() => setIsTour360Open(true)}
        isEditMode={isEditMode}
        onToggleEditMode={() => setIsEditMode(!isEditMode)}
        onOpenCms={() => setIsCmsDrawerOpen(true)}
        hotline={data.general.hotline}
      />

      {/* Edit Mode Instruction Banner */}
      {isEditMode && (
        <div className="fixed top-[50px] sm:top-[54px] left-0 right-0 z-40 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-[#132c21] py-1.5 px-4 text-center text-xs sm:text-sm font-bold shadow-md flex flex-wrap items-center justify-center gap-2 border-b border-amber-500/80 animate-fadeIn">
          <span>💡 Sửa trực tiếp văn bản/ảnh trên trang. Mọi thay đổi được tự động lưu lên Cloud Firestore cho mọi thiết bị.</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#132c21]/20 text-[#132c21] text-[11px] font-extrabold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse" />
            <span>{cloudSyncStatus === 'synced' ? 'Cloud: Đồng Bộ Trực Tuyến' : 'Cloud: Đang Lưu'}</span>
          </span>
          <button
            onClick={() => setIsCmsDrawerOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#132c21] text-amber-300 hover:bg-[#1f4534] text-xs font-extrabold cursor-pointer transition-colors"
          >
            <span>Mở Bảng Quản Trị CMS</span>
            <span>&rarr;</span>
          </button>
        </div>
      )}

      {/* Hero Banner with Stats and Prominent 360 CTA */}
      <HeroSection
        data={data}
        onOpen360Tour={() => setIsTour360Open(true)}
        onOpenConsultModal={() => handleOpenConsultModal()}
        isEditMode={isEditMode}
        onPickImage={handleOpenImagePicker}
        onEditField={handleOpenQuickEdit}
      />

      {/* SECTION 1: GIỚI THIỆU & TỔNG QUAN DỰ ÁN */}
      <IntroSection
        data={data}
        isEditMode={isEditMode}
        onPickImage={handleOpenImagePicker}
        onEditField={handleOpenQuickEdit}
        onOpenConsultModal={() => handleOpenConsultModal()}
        onOpen360Tour={() => setIsTour360Open(true)}
      />

      {/* SECTION 2: CƠ CẤU CÁC DÒNG SẢN PHẨM */}
      <ProductsSection
        data={data}
        isEditMode={isEditMode}
        onPickImage={handleOpenImagePicker}
        onEditField={handleOpenQuickEdit}
        onUpdateProducts={(items: ProductLineItem[]) => {
          const updated = { ...data, products: { ...data.products, items } };
          handleSaveData(updated);
        }}
        onOpenConsultModal={handleOpenConsultModal}
      />

      {/* SECTION 3: VỊ TRÍ */}
      <LocationSection
        data={data}
        isEditMode={isEditMode}
        onPickImage={handleOpenImagePicker}
        onEditField={handleOpenQuickEdit}
      />

      {/* SECTION 3: TIỆN ÍCH */}
      <AmenitiesSection
        data={data}
        isEditMode={isEditMode}
        onPickImage={handleOpenImagePicker}
        onEditField={handleOpenQuickEdit}
        onUpdateAmenities={(items: AmenityItem[]) => {
          const updated = { ...data, amenities: { ...data.amenities, items } };
          handleSaveData(updated);
        }}
      />

      {/* SECTION 4: TÌNH TRẠNG CĂN & BẢNG HÀNG TRỰC TUYẾN */}
      <InventorySection
        data={data}
        isEditMode={isEditMode}
        onPickImage={handleOpenImagePicker}
        onEditField={handleOpenQuickEdit}
        onUpdateInventory={(units: UnitItem[]) => {
          const updated = {
            ...data,
            inventory: {
              ...(data.inventory || initialProjectData.inventory),
              units
            }
          };
          handleSaveData(updated);
        }}
        onOpenConsultModal={(unitCode) => handleOpenConsultModal(unitCode)}
        onOpen360Tour={() => setIsTour360Open(true)}
      />

      {/* SECTION 5: CHÍNH SÁCH */}
      <PolicySection
        data={data}
        isEditMode={isEditMode}
        onEditField={handleOpenQuickEdit}
        onOpenConsultModal={() => setIsConsultModalOpen(true)}
      />

      {/* SECTION 6: TIẾN ĐỘ */}
      <ProgressSection
        data={data}
        isEditMode={isEditMode}
        onPickImage={handleOpenImagePicker}
        onEditField={handleOpenQuickEdit}
        onUpdateMilestones={(milestones: ProgressMilestone[]) => {
          const updated = { ...data, progress: { ...data.progress, milestones } };
          handleSaveData(updated);
        }}
      />

      {/* SECTION 7: PHÁP LÝ */}
      <LegalSection
        data={data}
        isEditMode={isEditMode}
        onEditField={handleOpenQuickEdit}
        onUpdateDocuments={(docs: LegalDocument[]) => {
          const updated = { ...data, legal: { ...data.legal, documents: docs } };
          handleSaveData(updated);
        }}
        onOpenConsultModal={() => setIsConsultModalOpen(true)}
      />

      {/* FOOTER & REGISTRATION FORM */}
      <ContactSection
        data={data}
        isEditMode={isEditMode}
        onEditField={handleOpenQuickEdit}
        onOpen360Tour={() => setIsTour360Open(true)}
      />

      {/* FLOATING ACTION TOOLBAR & QUICK BUTTONS */}
      <EditToolbar
        isEditMode={isEditMode}
        onToggleEditMode={() => setIsEditMode(!isEditMode)}
        onOpenCms={() => setIsCmsDrawerOpen(true)}
        onOpenAllImagesManager={() => setIsAllImagesManagerOpen(true)}
        onOpen360Tour={() => setIsTour360Open(true)}
        onSaveData={() => handleSaveData(data)}
        hotline={data.general.hotline}
        zaloNumber={data.general.zaloNumber}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      {/* VR 360 TOUR INTERACTIVE MODAL */}
      <Tour360Modal
        isOpen={isTour360Open}
        onClose={() => setIsTour360Open(false)}
        scenes={data.tour360.scenes}
        tour360Url={data.general.tour360Url}
        onUpdateTour360Url={(newUrl: string) => {
          const updated = { ...data, general: { ...data.general, tour360Url: newUrl } };
          handleSaveData(updated);
        }}
        isEditMode={isEditMode}
      />

      {/* ALL IMAGES MANAGER MODAL (Trung Tâm Quản Lý Toàn Bộ Ảnh) */}
      <AllImagesManagerModal
        isOpen={isAllImagesManagerOpen}
        onClose={() => setIsAllImagesManagerOpen(false)}
        data={data}
        onPickImage={handleOpenImagePicker}
      />

      {/* CMS DRAWER FOR COMPREHENSIVE CONFIGURATION */}
      <CmsDrawer
        isOpen={isCmsDrawerOpen}
        onClose={() => setIsCmsDrawerOpen(false)}
        data={data}
        onSaveData={handleSaveData}
        onResetData={handleResetData}
        onOpenImagePicker={handleOpenImagePicker}
        cloudSyncStatus={cloudSyncStatus}
        lastCloudSyncTime={lastCloudSyncTime}
        onManualCloudSync={handleManualSyncToCloud}
      />

      {/* IMAGE PICKER MODAL (Presets, URL, or File upload) */}
      <ImagePickerModal
        isOpen={imagePicker.isOpen}
        onClose={() => setImagePicker({ ...imagePicker, isOpen: false })}
        currentUrl={imagePicker.currentUrl}
        onSelectImage={(newUrl: string) => {
          handleUpdateField(imagePicker.fieldPath, newUrl);
        }}
        title={imagePicker.title}
      />

      {/* QUICK TEXT EDIT MODAL */}
      <QuickEditFieldModal
        isOpen={quickEditor.isOpen}
        onClose={() => setQuickEditor({ ...quickEditor, isOpen: false })}
        label={quickEditor.label}
        currentValue={quickEditor.currentValue}
        onSave={(val: string) => {
          handleUpdateField(quickEditor.fieldPath, val);
        }}
      />

      {/* LEAD CONSULTATION MODAL */}
      <ConsultModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        projectName={data.general.projectName}
        hotline={data.general.hotline}
        zaloNumber={data.general.zaloNumber}
        initialInterest={selectedProduct}
      />
    </div>
  );
}
