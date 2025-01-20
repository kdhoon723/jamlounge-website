<template>
  <v-container class="py-10 story-container">
    <!-- 제목 -->
    <div class="text-center mb-6">
      <h2 class="text-h4" style="color: #c5a46d; font-style: italic;">
        -Our Story-
      </h2>
      <!-- 장식 패턴 예시 (주석 처리) -->
      <!--
      <div
        class="my-3"
        style="color: #fff; font-size: 1.2rem; letter-spacing: 3px;"
      >
        xxxxxxxxxx
      </div>
      -->
    </div>

    <!-- 소개 문구 -->
    <v-row>
      <v-col cols="12" class="text-center mb-8">
        <h3 class="text-subtitle-1 mb-6" style="color: #f2f2e9;">
          This place is the client bar of the
          <em style="color: #c5a46d;">"Creative factory Co., Ltd."</em>
          for clients who are creating the future with us.
        </h3>
        <p style="color: #f2f2e9; line-height: 1.8;">
          Beginning in 1997, the musical life became a creative factory
          three years later, and 20 years later became a jam lounge.
          As if I had not walked alone for 23 years, I was very blessed.
          Lee and Bae are them. The fate of Jam Lounge has also been
          upgraded hundreds of times by meeting Chef You, and once again
          we started a wonderful voyage, and as we have been, we will
          achieve our dreams step by step.
          <br /><br />
          We will continue to work harder for our dreams.
        </p>
      </v-col>
    </v-row>

    <!-- 파트너 로고 섹션 -->
    <v-row
      class="py-4 px-2 justify-center align-center partner-row"
    >
      <!-- factory Creative logo -->
      <v-col
        cols="12" sm="4" md="3"
        class="d-flex align-center justify-center mb-4 mb-sm-0"
      >
        <v-img
          src="https://static.wixstatic.com/media/6486b7_9506848b44ca4aba8884190bbc734e6f~mv2.png/v1/fill/w_221,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%EC%B5%9C%EC%A2%851.png"
          max-width="200"
        />
      </v-col>
      <!-- Jamlounge logo -->
      <v-col
        cols="12" sm="4" md="3"
        class="d-flex align-center justify-center mb-4 mb-sm-0"
      >
        <v-img
          src="https://static.wixstatic.com/media/6486b7_a92270530b28411aaf3be47ca9d23929~mv2.png/v1/fill/w_279,h_119,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/jamlounge-01.png"
          max-width="220"
        />
      </v-col>
      <!-- Orange communications logo -->
      <v-col
        cols="12" sm="4" md="3"
        class="d-flex align-center justify-center"
      >
        <v-img
          src="https://static.wixstatic.com/media/6486b7_e9b37333957c4b399c931629d317f9e4~mv2.jpg/v1/fill/w_120,h_103,al_c,lg_1,q_80,enc_avif,quality_auto/%EC%98%A4%EB%9E%9C%EC%A7%80%EB%A1%9C%EA%B3%A0_JPG.jpg"
          max-width="150"
        />
      </v-col>
    </v-row>

    <!-- 운영진 소개 (1줄) -->
    <v-row class="mt-8 pa-4 manager-row">
      <!-- soheon shin -->
      <v-col cols="12" sm="4" class="text-center mb-6 mb-sm-0">
        <v-avatar size="140" class="manager-avatar">
          <v-img
            src="https://static.wixstatic.com/media/6486b7_134714f7fc9e4dfba19afcac2778e232~mv2.jpg/v1/fill/w_216,h_219,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%EC%8B%A0%EC%86%8C%ED%97%8C.jpg"
            alt="soheon Shin"
            cover
          />
        </v-avatar>
        <h4 class="mt-3 manager-name">soheon Shin</h4>
        <p class="manager-title">CEO</p>
        <p class="manager-desc">
          I am a music director, and I am the general manager of Jam Lounge.
        </p>
      </v-col>

      <!-- yoowaan lee -->
      <v-col cols="12" sm="4" class="text-center mb-6 mb-sm-0">
        <v-avatar size="140" class="manager-avatar">
          <v-img
            src="https://static.wixstatic.com/media/6486b7_164558a201914c83a90a393fb0d36f23~mv2.jpg/v1/fill/w_216,h_219,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/20180815_191601.jpg"
            alt="yoowaan Lee"
            cover
          />
        </v-avatar>
        <h4 class="mt-3 manager-name">yoowaan Lee</h4>
        <p class="manager-title">CFO</p>
        <p class="manager-desc">
          I'm in charge of management and investment in Jam Lounge.
        </p>
      </v-col>

      <!-- wonyoung Huh -->
      <v-col cols="12" sm="4" class="text-center">
        <v-avatar size="140" class="manager-avatar">
          <v-img
            src="https://cdn.icon-icons.com/icons2/3345/PNG/512/chef_cook_man_avatar_icon_210102.png"
            alt="wonyoung huh"
            cover
          />
        </v-avatar>
        <h4 class="mt-3 manager-name">wonyoung Huh</h4>
        <p class="manager-title">Chef</p>
        <p class="manager-desc">
          I'm the general chef at Jam Lounge, and operation.
        </p>
      </v-col>
    </v-row>

    <!-- 2줄째 -->
    <v-row class="mt-8 pa-4 manager-row">
      <!-- junsoung Park -->
      <v-col cols="12" sm="4" class="text-center mb-6 mb-sm-0">
        <v-avatar size="140" class="manager-avatar">
          <v-img
            src="https://cdn.icon-icons.com/icons2/3345/PNG/512/chef_cook_man_avatar_icon_210102.png"
            alt="junsoung Park"
            cover
          />
        </v-avatar>
        <h4 class="mt-3 manager-name">junsoung Park</h4>
        <p class="manager-title">Chef</p>
        <p class="manager-desc">
          I work as a cook in the Jam Lounge.
        </p>
      </v-col>

      <!-- youngchan Choi -->
      <v-col cols="12" sm="4" class="text-center mb-6 mb-sm-0">
        <v-avatar size="140" class="manager-avatar">
          <v-img
            src="https://cdn.icon-icons.com/icons2/3345/PNG/512/chef_cook_man_avatar_icon_210102.png"
            alt="youngchan Choi"
            cover
          />
        </v-avatar>
        <h4 class="mt-3 manager-name">youngchan Choi</h4>
        <p class="manager-title">Chef</p>
        <p class="manager-desc">
          I work as a cook in the Jam Lounge.
        </p>
      </v-col>

      <!-- huensoung Kim -->
      <v-col cols="12" sm="4" class="text-center">
        <v-avatar size="140" class="manager-avatar">
          <v-img
            src="https://cdn.icon-icons.com/icons2/3345/PNG/512/chef_cook_man_avatar_icon_210102.png"
            alt="huensoung Kim"
            cover
          />
        </v-avatar>
        <h4 class="mt-3 manager-name">huensoung Kim</h4>
        <p class="manager-title">Chef</p>
        <p class="manager-desc">
          I work as a cook in the Jam Lounge.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* 
  Vuetify 3에서 v-avatar, v-img를 쓰려면 
  1) 이 컴포넌트에서 import + components:{} 등록 
  OR 
  2) plugins/vuetify.js 에서 전역 등록
*/

import { VAvatar, VImg } from 'vuetify/components'

export default {
  name: 'OurStory',
  components: {
    VAvatar,
    VImg
  }
}
</script>

<style scoped>
.story-container {
  max-width: 1200px; /* 화면이 커져도 1200px 까지만 */
  margin: 0 auto;
}

/* 파트너 로고 섹션 */
.partner-row {
  background-color: #3a3a3a;
  border-radius: 6px;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
}

/* 운영진(Manager) 섹션 */
.manager-row {
  background-color: #2b2b2b;
  border-radius: 6px;
  margin-bottom: 20px;
}

/* 원형 사진 + 크기 */
.manager-avatar {
  border: 2px solid #c5a46d; /* 테두리(원한다면) */
  overflow: hidden;
  /* v-avatar size="140" already ensures 140x140 circle, but the border is for style. */
}

/* 이름, 직함, 설명 */
.manager-name {
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.manager-title {
  color: #c5a46d;
  font-weight: 500;
  margin-bottom: 5px;
}

.manager-desc {
  color: #f2f2f2;
  max-width: 240px;
  margin: 0 auto;
}
</style>
