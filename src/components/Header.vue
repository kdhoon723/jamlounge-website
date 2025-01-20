<template>
    <!-- Vuetify AppBar -->
    <v-app-bar
      color="secondary"
      dark
      flat
      elevation="0"
    >
      <!-- 로고/타이틀 영역 -->
      <div class="d-flex align-center cursor-pointer" @click="goHome">
        <v-img
          src="@/assets/jamlounge.png"
          max-width="50"
          class="mr-3"
        />
        <span class="text-h6 font-weight-bold">Jam Lounge</span>
      </div>
  
      <v-spacer></v-spacer>
  
      <!-- 네비게이션 메뉴 (버튼 형식) -->
      <v-btn text to="/" class="nav-link">Home</v-btn>
      <v-btn text to="/our-story" class="nav-link">Our Story</v-btn>
      <v-btn text to="/menu" class="nav-link">Menu</v-btn>
      <v-btn text to="/pre-order" class="nav-link">Pre-order food</v-btn>
      <v-btn text to="/reservation" class="nav-link">Reservation</v-btn>
      <v-btn text to="/schedule" class="nav-link">Schedule</v-btn>
      <v-btn text to="/internal-picture" class="nav-link">
        Internal Picture
      </v-btn>
    </v-app-bar>
  </template>
  
  <script>
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'Header',
    setup() {
      const router = useRouter()
      const goHome = () => {
        router.push('/')
      }
      return { goHome }
    }
  }
  </script>
  
  <style scoped>
  .nav-link {
    color: #f2f2e9 !important; /* 아이보리 톤 */
    margin-left: 8px;
  }
  .nav-link:hover {
    color: #c5a46d !important; /* 금색 포인트 */
  }
  .cursor-pointer {
    cursor: pointer;
  }
  </style>
  