// [프로젝트 경로: jamlounge-website/src/services/firebase.js]

/**
 * Firebase 초기화 파일
 * - Firestore, Storage 등 사용할 서비스 모듈을 불러와 구성
 * - 외부에서 import하여 사용
 */

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

// (선택) .env 로 설정을 분리할 수 있으나, 여기서는 예시로 하드코딩
// 실제 운영 시, 다음과 같이 .env에 저장한 뒤 process.env.XXX 로 불러오는 방식을 권장
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID
// }

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