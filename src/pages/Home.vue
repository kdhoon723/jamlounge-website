<template>
  <!-- 전체 컨테이너 -->
  <div class="home-page">
    <!-- (새로 추가) 히어로 섹션 -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">JamLounge</h1>
        <p class="hero-subtitle">
          Experience the best dishes, cocktails, wine,
          <br />
          and live jazz performances in one place.
        </p>
      </div>
    </div>

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
          테헤란로 51길 16 <br />
          지산빌딩 B1,B2<br />
          (선릉역 5번출구 1분)
        </p>
      </div>
    </div>

    <!-- 추가 안내문 -->
    <div class="welcome-section">
      <p class="welcome-text">
        The best dish made by a chef with 20 years of experience.<br />
        It is a jam lounge with jazz performances, cocktails, and wine.
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const goReservation = () => {
      router.push('/reservation')
    }

    onMounted(() => {
      // 필요한 추가 동작이 있으면 여기 작성
    })

    return {
      goReservation
    }
  }
}
</script>

<style lang="scss">
/* ========== 전체 페이지 기본 스타일 ========== */
.home-page {
  width: 100%;
  min-height: 100vh;
  background-color: #0f0f0f; /* 어두운 배경 */
  color: #f2f2e9; /* 아이보리톤 텍스트 */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

/* ========== (새로 추가) 히어로 섹션 ========== */
.hero-section {
  width: 100%;
  height: 80vh; /* 높이 조절 */
  background: url('src/assets/home/hero-bg.webp') center/cover no-repeat;
  /* ↑ 원하는 이미지 경로로 변경 (또는 배경색만 사용) */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* 이미지 어두운 오버레이 */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
  }
}

.hero-content {
  position: relative;
  text-align: center;
  z-index: 1; /* 오버레이보다 위에 있게 */
}

.hero-title {
  font-size: 4rem;
  margin: 0 0 20px 0;
  color: #c5a46d; /* 금색 */
  font-weight: bold;
  letter-spacing: 1px;
}

.hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #f2f2e9;
}



/* ========== 2) Welcome to Jamlounge 섹션 ========== */
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
    color: #c5a46d; /* 금색 포인트 텍스트 */
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

/* ========== 3) 운영 시간/위치 안내 카드 ========== */
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
</style>
