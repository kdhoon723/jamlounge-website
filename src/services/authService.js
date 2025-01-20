// [프로젝트 경로: jamlounge-website/src/services/authService.js]

import { auth } from './firebase'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

/**
 * 로그인 함수
 * @param {string} email
 * @param {string} password
 * @returns {Promise} 사용자 정보 or 에러
 */
export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

/**
 * 로그아웃 함수
 */
export async function logout() {
  return signOut(auth)
}

/**
 * 인증 상태 변화 감지: App 전역에서 호출
 * @param {Function} callback  (user) => {}
 */
export function observeAuthState(callback) {
  onAuthStateChanged(auth, user => {
    callback(user)
  })
}
