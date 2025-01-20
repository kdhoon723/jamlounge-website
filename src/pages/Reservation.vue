<template>
    <v-container class="py-10">
      <h2
        class="text-h4 text-center mb-6"
        style="color: #c5a46d;"
      >
        - Reservation -
      </h2>
  
      <!-- 상단 2장 이미지 -->
      <v-row>
        <v-col cols="12" md="6">
          <v-img src="https://static.wixstatic.com/media/6486b7_020c671560064b9e94c16cdc2c501fc8~mv2.jpg/v1/fill/w_486,h_280,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/KakaoTalk_20191216_012601739.jpg" />
        </v-col>
        <v-col cols="12" md="6">
          <v-img src="https://static.wixstatic.com/media/6486b7_b5e88280505c48e9b1234d2706100d1b~mv2.jpg/v1/crop/x_0,y_358,w_4032,h_2309/fill/w_499,h_280,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/20200212_150655.jpg" />
        </v-col>
      </v-row>
  
      <!-- 소개 섹션 (Come Dine with Us, Opening Hours) -->
      <v-row class="mt-8">
        <v-col cols="12" md="6" class="text-center">
          <h3 class="mb-3" style="color: #c5a46d; font-style: italic;">
            Come Dine with Us
          </h3>
          <p style="color: #f2f2e9;">
            서울시 강남구 테헤란로 5길 16 지산빌딩 B1
          </p>
        </v-col>
        <v-col cols="12" md="6" class="text-center">
          <h3 class="mb-3" style="color: #c5a46d; font-style: italic;">
            Opening Hours
          </h3>
          <p style="color: #f2f2e9;">
            Tue - Fri: 11 am ~ 12 pm<br />
            Mon, Sat: 5 pm ~ 11 pm
          </p>
        </v-col>
      </v-row>
  
      <!-- 예약 버튼 -->
      <div class="text-center mt-6">
        <v-btn color="accent" dark @click="goToNaver">
          예약 바로가기
        </v-btn>
      </div>
  
      <!-- 추가 정보 (좌석 수, 주차 정보 등) -->
      <div class="text-center mt-4" style="color: #f2f2e9;">
        식사 100석 / 세미나 150석<br />
        1층 80석 / 2층 24석 / 바 12석<br />
        2층 테라스 12인실 2EA<br />
        주차: 2시간 무료
      </div>
  
      <div class="text-center mt-8" style="color: #f2f2e9; font-style: italic;">
        For private occasions &amp; catering<br />
        070-7799-2176 | user@example.invalid
      </div>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'Reservation',
    setup() {
      const goToNaver = () => {
        // 네이버 예약 페이지 링크 예시
        window.open('http://m.booking.naver.com/booking/6/bizes/519939/items/4192733?theme=place&service-target=map-pc&area=plt', '_blank')
      }
      return { goToNaver }
    }
  }
  </script>
  
  <style scoped>
  /* 필요 시 추가 스타일 */
  </style>
  