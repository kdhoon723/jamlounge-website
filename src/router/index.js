import { createRouter, createWebHistory } from 'vue-router'

// 사용자 페이지
import Home from '@/pages/Home.vue'
import OurStory from '@/pages/OurStory.vue'
import Menu from '@/pages/Menu.vue'
import PreOrderFood from '@/pages/PreOrderFood.vue'
import Reservation from '@/pages/Reservation.vue'
import Schedule from '@/pages/Schedule.vue'
import InternalPicture from '@/pages/InternalPicture.vue'

// 관리자 페이지
import AuthLogin from '@/pages/AuthLogin.vue'
import AdminLayout from '@/pages/admin/AdminLayout.vue'
import AdminHome from '@/pages/admin/AdminHome.vue'
import ManageMenu from '@/pages/admin/ManageMenu.vue'
import ManageSchedule from '@/pages/admin/ManageSchedule.vue'
import ManagePictures from '@/pages/admin/ManagePictures.vue'
import ManagePreOrder from '@/pages/admin/ManagePreOrder.vue'
import ManageReservation from '@/pages/admin/ManageReservation.vue'
// (추가적으로 ManagePreOrder, ManageReservation 등도 만들 수 있음)

import { auth } from '@/services/firebase' // Firebase Auth

const routes = [
  // 사용자 페이지
  { path: '/', component: Home },
  { path: '/our-story', component: OurStory },
  { path: '/menu', component: Menu },
  { path: '/pre-order', component: PreOrderFood },
  { path: '/reservation', component: Reservation },
  { path: '/schedule', component: Schedule },
  { path: '/internal-picture', component: InternalPicture },

  // 로그인 페이지
  { path: '/login', name: 'Login', component: AuthLogin },

  // 관리자 레이아웃
  {
    path: '/admin',
    component: AdminLayout,
    // 관리자 페이지들은 로그인/관리자 권한이 필요
    meta: { requiresAuth: true },
    children: [
      // 예: AdminHome
      { path: 'home', component: AdminHome },

      // 메뉴 관리
      { path: 'menu', component: ManageMenu },

      // 스케줄 관리
      { path: 'schedule', component: ManageSchedule },

      // 내부사진 관리
      { path: 'pictures', component: ManagePictures },

      // 필요 시: 예) ManagePreOrder, ManageReservation, etc.
      { path: 'preorder', component: ManagePreOrder },
      { path: 'reservation', component: ManageReservation },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 전역 가드
router.beforeEach((to, from, next) => {
  // 인증이 필요한 라우트인지 확인 (예: requiresAuth)
  if (to.meta.requiresAuth) {
    // 현재 로그인 상태 확인
    const currentUser = auth.currentUser
    if (!currentUser) {
      // 로그인 안되어 있으면 /login 이동
      return next('/login')
    }
    // (추가) 관리자 권한 체크가 필요하다면:
    // if (!isAdminUser(currentUser)) return next('/')
  }
  next()
})

export default router
