<template>
    <v-app>
      <v-navigation-drawer
        v-model="drawer"
        app
        permanent
        class="grey darken-4"
      >
        <v-list>
          <v-list-item>
            <v-list-item-title class="text-h6 text-white">
              Admin Panel
            </v-list-item-title>
          </v-list-item>
  
          <v-divider class="my-3"></v-divider>
  
          <v-list-item
            v-for="item in adminMenus"
            :key="item.title"
            link
            @click="goAdminPage(item.path)"
          >
            <v-list-item-title class="text-white">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
  
        <v-spacer></v-spacer>
        <v-list>
          <v-list-item link @click="handleLogout">
            <v-list-item-title class="text-white">
              로그아웃
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>Jamlounge Admin</v-toolbar-title>
      </v-app-bar>
  
      <v-main>
        <router-view />
      </v-main>
  
      <v-footer app color="secondary" dark>
        <v-col class="text-center">&copy; 2025 Jamlounge Admin</v-col>
      </v-footer>
    </v-app>
  </template>
  
  <script>
  import { useRouter } from 'vue-router'
  import { logout } from '@/services/authService'
  
  export default {
    name: 'AdminLayout',
    data() {
      return {
        drawer: true,
        adminMenus: [
          { title: '대시보드', path: '/admin' },
          { title: '메뉴 관리', path: '/admin/menu' },
          { title: '스케줄 관리', path: '/admin/schedule' },
          { title: '사진 관리', path: '/admin/pictures' }
        ]
      }
    },
    setup() {
      const router = useRouter()
      const handleLogout = async () => {
        await logout()
        router.push('/login')
      }
      const goAdminPage = (path) => {
        router.push(path)
      }
      return { handleLogout, goAdminPage }
    }
  }
  </script>
  
  <style scoped>
  </style>
  