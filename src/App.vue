<template>
  <!-- Vuetify의 앱 구조 -->
  <v-app>
    <!-- 헤더 -->
    <Header />

    <!-- 메인 화면(라우트 뷰) -->
    <v-main>
      <router-view />
    </v-main>

    <!-- 푸터 -->
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
/* 전체 레이아웃 관련 추가 스타일이 필요하면 여기에 작성 가능 */
/* 하지만 Vuetify theme가 우선 적용될 수 있음 */
</style>
