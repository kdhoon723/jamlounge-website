import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics' // <— Analytics 추가

const firebaseConfig = {
  apiKey: "REMOVED_FIREBASE_WEB_API_KEY",
  authDomain: "jamloungeproject.firebaseapp.com",
  databaseURL: "REMOVED_FIREBASE_DATABASE_URL",
  projectId: "jamloungeproject",
  storageBucket: "REMOVED_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "REMOVED_FIREBASE_MESSAGING_SENDER_ID",
  appId: "1:REMOVED_FIREBASE_MESSAGING_SENDER_ID:web:796c2a43fe3c10d38505c8",
  measurementId: "REMOVED_FIREBASE_MEASUREMENT_ID"
}

// 1) Firebase 앱 초기화
const firebaseApp = initializeApp(firebaseConfig)

// 2) Firestore 인스턴스
export const db = getFirestore(firebaseApp)

// 3) Storage 인스턴스
export const storage = getStorage(firebaseApp)

// 4) Auth 인스턴스
export const auth = getAuth(firebaseApp)

// 5) Analytics 인스턴스 (추가)
export const analytics = getAnalytics(firebaseApp)