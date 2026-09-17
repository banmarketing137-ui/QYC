import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  onSnapshot, 
  setDoc, 
  getDoc,
  collection, 
  addDoc 
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { ProjectData } from './types';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific databaseId if provided
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const SETTINGS_DOC_PATH = 'project_settings/main';

/**
 * Subscribe to realtime updates for ProjectData from Firestore
 */
export function subscribeToProjectData(
  onData: (data: ProjectData, updatedAt?: string) => void,
  onError?: (error: Error) => void
): () => void {
  const settingsRef = doc(db, 'project_settings', 'main');

  const unsubscribe = onSnapshot(
    settingsRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const payload = snapshot.data();
        if (payload && payload.data) {
          onData(payload.data as ProjectData, payload.updatedAt);
        }
      }
    },
    (err) => {
      console.warn('Firestore subscription notice:', err);
      if (onError) onError(err);
    }
  );

  return unsubscribe;
}

/**
 * Fetch initial project data once
 */
export async function fetchProjectDataFromCloud(): Promise<{ data: ProjectData; updatedAt: string } | null> {
  try {
    const settingsRef = doc(db, 'project_settings', 'main');
    const snapshot = await getDoc(settingsRef);
    if (snapshot.exists()) {
      const payload = snapshot.data();
      if (payload && payload.data) {
        return {
          data: payload.data as ProjectData,
          updatedAt: payload.updatedAt || new Date().toISOString()
        };
      }
    }
    return null;
  } catch (err) {
    console.warn('Failed to fetch project data from cloud:', err);
    return null;
  }
}

/**
 * Save updated ProjectData to Firestore
 */
export async function saveProjectDataToCloud(data: ProjectData): Promise<void> {
  const settingsRef = doc(db, 'project_settings', 'main');
  await setDoc(
    settingsRef,
    {
      data,
      updatedAt: new Date().toISOString(),
      updatedBy: 'CMS Admin'
    },
    { merge: true }
  );
}

/**
 * Save customer consultation registration
 */
export async function saveConsultationLead(lead: {
  fullName?: string;
  phone: string;
  note?: string;
  product?: string;
}): Promise<void> {
  try {
    const leadsCollection = collection(db, 'consultations');
    await addDoc(leadsCollection, {
      ...lead,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Failed to save consultation lead to Firestore:', err);
  }
}
