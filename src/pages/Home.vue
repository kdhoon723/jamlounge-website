<template>
  <!-- 전체 컨테이너 -->
  <div class="home-page">


        <!-- 1) JamLounge 로고 애니메이션 섹션 -->
        <div class="logo-animation-section" ref="logoRef">
      <div v-html="jamloungeSvgRaw"></div>
    </div>

    <!-- 4) 아코디언 갤러리 섹션 (기존 코드) -->
    <div class="container gallery-section">
      <div class="gallery-wrap">
        <div class="item item-1"></div>
        <div class="item item-2"></div>
        <div class="item item-3"></div>
        <div class="item item-4"></div>
        <div class="item item-5"></div>
      </div>
    </div>



    <!-- 2) “Welcome to Jamlounge” 섹션 -->
    <div class="welcome-section">
      <h1>Welcome to Jamlounge</h1>
      <p class="welcome-text">
        안녕하세요.<br />
        맛있는 다양한 요리, 칵테일, 와인 그리고<br />
        재즈공연이 있는 잼라운지 입니다.
      </p>
      <button class="reserve-btn" @click="goReservation">
        예약 바로가기
      </button>
    </div>

    <!-- 3) 운영 시간, 위치 안내 카드 -->
    <div class="info-cards-container">
      <div class="info-card">
        <h3>운영 시간</h3>
        <p>
          월~금: 11:30 ~ 24:00 <br />
          브레이크타임: 15:00 ~ 17:00 <br />
          토요일, 공휴일: 17:00 ~ 23:00
        </p>
      </div>
      <div class="info-card">
        <h3>위치 안내</h3>
        <p>
          서울시 강남구<br />
          테헤란로 51길 16 <br/>
          지산빌딩 B1,B2<br />
          (선릉역 5번출구 1분)
        </p>
      </div>
    </div>
    <div class="welcome-section">
      <p class="welcome-text">
        The best dish made by a chef with 20 years of experience.<br />
        It is a jam lounge with jazz performances, cocktails, and wine..
      </p>
    </div>


  </div>
</template>

<script>
/* 
  1) Router 이용해 “예약 바로가기”를 /reservation 라우트로 이동
  2) jamlounge.svg?raw 로 SVG 문자열 가져오기
  3) onMounted 시 (or setInterval)로 .fin 클래스 반복 
     → 대신 여기서는 CSS keyframes로 무한 반복을 구현
*/
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import jamloungeSvg from '@/assets/jamlounge.svg?raw'

export default {
  name: 'Home',
  setup() {
    // 라우터
    const router = useRouter()
    const goReservation = () => {
      router.push('/reservation')
    }

    // SVG 로고
    const jamloungeSvgRaw = jamloungeSvg

    // 로고 섹션 ref (필요 시)
    const logoRef = ref(null)

    onMounted(() => {
      // 만약 JS로 .fin 클래스를 붙이는 방식을 사용한다면 
      // 아래 로직으로 일정 간격마다 재생 가능
      // 
      // 다만 아래 CSS keyframe은 무한 반복하므로,
      // JS로 .fin 붙였다 떼는 과정은 필요 없음.
      //
      // setInterval(() => {
      //   logoRef.value.classList.remove('fin')
      //   void logoRef.value.offsetWidth // reflow
      //   logoRef.value.classList.add('fin')
      // }, 8000)
    })

    return {
      goReservation,
      jamloungeSvgRaw,
      logoRef
    }
  }
}
</script>

<style lang="scss">
/* 전체 페이지 스타일 */
.home-page {
  width: 100%;
  min-height: 100vh;
  background-color: #0f0f0f;
  /* 어두운 배경 */
  color: #f2f2e9;
  /* 아이보리톤 텍스트 */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

/* 1) 로고 애니메이션 섹션 (상단) */
.logo-animation-section {
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  /* 아코디언과 동일 높이 */
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  /* pointer-events: none → 마우스가 로고를 클릭 안 하도록(아코디언이 hover되게) */
}

/* 인라인된 SVG 크기 조절 */
.logo-animation-section svg {
  width: 800px;
  height: auto;
}

/* 
   (가장 중요) 
   jamlounge.svg 파일의 각 <path>에 fill="none" stroke="..." 로 수정해야
   아래 라인드로잉 애니메이션이 보임.
   또한, 'class="path"'를 달아두면 선택에 편함.
*/
.logo-animation-section .path,
.logo-animation-section path {
  fill: none;
  stroke: #c5a46d;
  /* 금색 느낌 */
  stroke-width: 20;
  stroke-linecap: round;
  stroke-linejoin: round;

  /* 
    dasharray/offset: 실제 경로 길이에 맞춰서. 
    여기서는 임의로 3000 
  */
  stroke-dasharray: 3000;
  stroke-dashoffset: 3000;

  /*
    무한 반복을 위해
    animation: [keyframeName] [duration] [timing] [iteration-count];
    예: 1) 6초간 draw 2) ease in/out 3) infinite
  */
  animation: drawJam 6s ease-in-out infinite;
}

/* 
   keyframes: 
   0% -> dashoffset = 3000 (보이지 않음)
   40% -> dashoffset = 0 (선 다 그려짐)
   60% -> dashoffset = 0 (머무름)
   100% -> dashoffset = 3000 (재시작)
*/
@keyframes drawJam {
  0% {
    stroke-dashoffset: 3000;
  }

  40% {
    stroke-dashoffset: 0;
  }

  60% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: 3000;
  }
}

/* 2) Welcome to Jamlounge 섹션 */
.welcome-section {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;

  h1 {
    font-size: 2rem;
    margin: 20px 0;
    color: #f2f2e9;
  }

  .welcome-text {
    color: #c5a46d;
    /* 금색 포인트 텍스트 */
    line-height: 1.8;
    margin-bottom: 20px;
  }

  .reserve-btn {
    background-color: #c5a46d;
    color: #fff;
    border: none;
    padding: 12px 24px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      opacity: 0.8;
    }
  }
}

/* 3) 운영 시간/위치 안내 카드 */
.info-cards-container {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  justify-content: center;
}

.info-card {
  background-color: #2b2b2b;
  padding: 20px;
  border-radius: 4px;
  width: 270px;

  h3 {
    margin-top: 0;
    color: #c5a46d;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    line-height: 1.5;
  }
}

/* 4) 아코디언 갤러리 섹션 */
.gallery-section {
  padding: 75px 0;
  margin: 0 auto;
  width: 1800px;

  h1 {
    position: relative;
    margin-bottom: 45px;
    font-family: 'Oswald', sans-serif;
    font-size: 44px;
    text-transform: uppercase;
    color: #424242;
    text-align: center;
  }
}

.gallery-wrap {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 70vh;
}

.item {
  flex: 1;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: flex 0.8s ease;

  &:hover {
    flex: 7;
  }
}

/* 배경 이미지들 */
.item-1 {
  background-image: url('src/assets/home/main1.webp');
}

.item-2 {
  background-image: url('src/assets/home/main2.webp');
}

.item-3 {
  background-image: url('src/assets/home/main3.webp');
}

.item-4 {
  background-image: url('src/assets/home/main4.webp');
}

.item-5 {
  background-image: url('src/assets/home/main5.webp');
}
</style>
