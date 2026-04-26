'use client';

import { initializeApp, getApps, getApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

/**
 * Returns initialized Firebase SDK instances.
 */
export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

/**
 * Initializes the Firebase app and returns the SDK instances.
 * Handles both standard initialization and App Hosting environment fallbacks.
 */
export function initializeFirebase() {
  if (getApps().length > 0) {
    return getSdks(getApp());
  }

  let firebaseApp: FirebaseApp;

  try {
    // 1. Attempt initialization with explicit config (Most reliable for Vercel/Custom builds)
    firebaseApp = initializeApp(firebaseConfig);
  } catch (e) {
    try {
      // 2. Fallback to automatic environment detection (Standard Firebase App Hosting)
      firebaseApp = initializeApp();
    } catch (finalError) {
      // Silent failure during build time is preferred over noisy logs if we have a fallback
      if (typeof window !== 'undefined') {
        console.error('Firebase initialization failed critical check:', finalError);
      }
      // Return a "dead" initialization to prevent downstream crashes during build
      firebaseApp = initializeApp(firebaseConfig);
    }
  }

  return getSdks(firebaseApp);
}
