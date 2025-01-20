import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import OurStory from '@/pages/OurStory.vue'
import Menu from '@/pages/Menu.vue'
import PreOrderFood from '@/pages/PreOrderFood.vue'
import Reservation from '@/pages/Reservation.vue'
import Schedule from '@/pages/Schedule.vue'
import InternalPicture from '@/pages/InternalPicture.vue'

// 관리자용
import AuthLogin from '@/pages/AuthLogin.vue'
import AdminLayout from '@/pages/admin/AdminLayout.vue'
import AdminHome from '@/pages/admin/AdminHome.vue'
import ManageMenu from '@/pages/admin/ManageMenu.vue'
import ManageSchedule from '@/pages/admin/ManageSchedule.vue'
import ManagePictures from '@/pages/admin/ManagePictures.vue'

import { auth } from '@/services/firebase' // Firebase Auth

const routes = [
  { path: '/', component: Home },
  { path: '/our-story', component: OurStory },
  { path: '/menu', component: Menu },
  { path: '/pre-order', component: PreOrderFood },
  { path: '/reservation', component: Reservation },
  { path: '/schedule', component: Schedule },
  { path: '/internal-picture', component: InternalPicture },

  // 로그인
  { path: '/login', name: 'Login', component: AuthLogin },

  // 관리자 레이아웃
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'AdminHome', component: AdminHome },
      { path: 'menu', name: 'ManageMenu', component: ManageMenu },
      { path: 'schedule', name: 'ManageSchedule', component: ManageSchedule },
      { path: 'pictures', name: 'ManagePictures', component: ManagePictures }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 전역 가드
router.beforeEach((to, from, next) => {
  // 인증이 필요한 라우트인지 확인
  if (to.meta.requiresAuth) {
    // 현재 로그인 상태 확인
    const currentUser = auth.currentUser
    if (!currentUser) {
      // 미로그인 상태 → 로그인 페이지로 이동
      return next('/login')
    }
  }
  // 그 외는 통과
  next()
})

export default router
