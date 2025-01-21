<template>
  <!-- Vuetify AppBar -->
  <v-app-bar
    color="secondary"
    dark
    flat
    elevation="0"
    app
  >
    <!-- 왼쪽: 햄버거 아이콘 (모바일용) + 로고/타이틀 -->
    <v-app-bar-nav-icon
      class="mr-2"
      @click="drawer = !drawer"
    />

    <div class="d-flex align-center cursor-pointer" @click="goHome">
      <v-img
        src="@/assets/jamlounge.png"
        max-width="50"
        class="mr-3"
      />
      <span class="text-h6 font-weight-bold">Jam Lounge</span>
    </div>

    <v-spacer></v-spacer>

    <!-- 데스크탑용 Nav 버튼: md 이상에서만 표시 -->
    <div class="d-none d-md-flex">
      <v-btn text to="/" class="nav-link">Home</v-btn>
      <v-btn text to="/our-story" class="nav-link">Our Story</v-btn>
      <v-btn text to="/menu" class="nav-link">Menu</v-btn>
      <v-btn text to="/pre-order" class="nav-link">Pre-order food</v-btn>
      <v-btn text to="/reservation" class="nav-link">Reservation</v-btn>
      <v-btn text to="/schedule" class="nav-link">Schedule</v-btn>
      <v-btn text to="/internal-picture" class="nav-link">
        Internal Picture
      </v-btn>
    </div>
  </v-app-bar>

  <!-- 모바일용 Navigation Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    app
    temporary
    color="#2b2b2b"
    dark
  >
    <v-list>
      <v-list-item link to="/">
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/our-story">
        <v-list-item-title>Our Story</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/menu">
        <v-list-item-title>Menu</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/pre-order">
        <v-list-item-title>Pre-order food</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/reservation">
        <v-list-item-title>Reservation</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/schedule">
        <v-list-item-title>Schedule</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/internal-picture">
        <v-list-item-title>Internal Picture</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Header',
  setup() {
    const router = useRouter()
    // Navigation Drawer 제어
    const drawer = ref(false)

    const goHome = () => {
      router.push('/')
    }

    return {
      drawer,
      goHome
    }
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

/* 
  d-none d-md-flex:
  - Vuetify 3에는 기본적으로 Bootstrap 클래스가 포함되지 않으므로,
  - 아래처럼 직접 media query를 써야 할 수도 있음
*/
@media (max-width: 960px) {
  .d-md-flex {
    display: none !important;
  }
}
@media (min-width: 961px) {
  .d-none {
    display: none !important;
  }
  .d-md-flex {
    display: flex !important;
    align-items: center;
  }
}
</style>
