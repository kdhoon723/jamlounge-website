<template>
  <!-- Vuetify Footer (예시) -->
  <v-footer color="secondary" dark flat elevation="0">
    <v-col cols="12" class="text-center py-6">
      <!-- 기존 푸터 내용 -->
      <div class="mb-2" style="font-style: italic;">
        © 2025 by Jam Lounge. Proudly created with Creative Factory.
      </div>

      <!-- 소셜 아이콘 섹션 -->
      <!-- 소셜 아이콘 영역 -->
      <div class="middle">
        <!-- (1) 인스타그램 -->
        <a class="btn" href="https://www.instagram.com/_jam_lounge" target="_blank">
          <i class="fa fa-instagram"></i>
        </a>
        <!-- (2) 페이스북 -->
        <a class="btn" href="https://www.facebook.com/groups/2583569331865013" target="_blank">
          <i class="fa fa-facebook-f"></i>
        </a>
        <!-- (3) 통화 -->
        <a class="btn" href="tel:070-7799-2176">
          <i class="fa fa-phone"></i>
        </a>
        <!-- (4) 지도 서비스 -->
        <a class="btn" href="https://maps.app.goo.gl/8ZMHkZeuBwBprsqt9" target="_blank">
          <i class="fa fa-map-marker"></i>
        </a>
      </div>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<!-- scoped 스타일 -->
<style scoped>
/* (1) footer 자체 바탕색은 Vuetify에서 color="secondary" dark로 설정했다고 가정.
     필요 시 background-color: #303030; 처리를 해도 무방. */

/* (2) 소셜 아이콘 관련 코드 - 사용자가 제공한 CSS 통합 */
/* 부모 컨테이너 */
.middle {
  margin: 0;
  padding: 0;
  /* 위치를 고정하고 싶다면 position: absolute; 등으로 조정,
     하지만 footer 내부라면 보통 static/relative */
  text-align: center;
  width: 100%;
}

/* 공통 버튼 스타일 */
.btn {
  display: inline-block;
  width: 60px;
  height: 60px;
  background: #f1f1f1;
  margin: 10px;
  border-radius: 30%;
  box-shadow: -5px 5px 15px -5px #f1f1f1;
  overflow: hidden;
  position: relative;
  transition: 0.3s linear;
  text-align: center;
}

.btn i {
  line-height: 60px;
  font-size: 26px;
  transition: 0.3s linear;
}

/* 아이콘별 색상 */
.btn:nth-child(1) i {
  /* 인스타그램 */
  color: #c32aa3;
}

.btn:nth-child(2) i {
  /* 페이스북 */
  color: #3b5998;
}

.btn:nth-child(3) i {
  /* 전화 */
  color: #4caf50;
  /* 초록색 (전화 느낌) */
}

.btn:nth-child(4) i {
  /* 지도 */
  color: #db4437;
  /* 구글 레드 */
}

/* 호버 시 스케일 업 */
.btn:hover {
  transform: scale(1.1);
}

.btn:hover i {
  transform: scale(1.2);
  color: #fff;
}

/* 배경색 채워지는 효과 */
.btn:before {
  content: "";
  position: absolute;
  width: 120%;
  height: 120%;
  transform: rotate(45deg);
  left: -110%;
  top: 90%;
}

/* 아이콘별 배경색 (호버 시 채워짐) */
.btn:nth-child(1)::before {
  background: #c32aa3;
  /* 인스타그램 */
}

.btn:nth-child(2)::before {
  background: #3b5998;
  /* 페이스북 */
}

.btn:nth-child(3)::before {
  background: #4caf50;
  /* 전화 */
}

.btn:nth-child(4)::before {
  background: #db4437;
  /* 지도 */
}

.btn:hover::before {
  animation: fillcolor 0.7s 1 forwards;
}

@keyframes fillcolor {
  0% {
    left: -110%;
    top: 90%;
  }

  50% {
    left: 10%;
    top: -30%;
  }

  100% {
    left: -10%;
    top: -10%;
  }
}
</style>