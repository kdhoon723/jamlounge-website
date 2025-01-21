import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics' // <— Analytics 추가

const firebaseConfig = {
  apiKey: "AIzaSyAver1t3a3HfjAJ72sRvYZdxesEQprRfSM",
  authDomain: "jamloungeproject.firebaseapp.com",
  databaseURL: "https://jamloungeproject-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jamloungeproject",
  storageBucket: "jamloungeproject.firebasestorage.app",
  messagingSenderId: "500498269657",
  appId: "1:500498269657:web:796c2a43fe3c10d38505c8",
  measurementId: "G-F6HETLVHSZ"
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