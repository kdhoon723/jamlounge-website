<template>
  <v-container class="py-10 preorder-container">
    <!-- 상단 제목 -->
    <div class="text-center mb-8">
      <h2 class="text-h4" style="color: #c5a46d; font-style: italic;">
        - Special menu for rentals -
      </h2>
    </div>

    <!-- 메뉴 목록 -->
    <v-row dense>
      <v-col
        v-for="(item, idx) in menuItems"
        :key="idx"
        cols="12"
        class="mb-6"
      >
        <!-- 카드 -->
        <div class="menu-card">
          
          <!-- (1) 왼쪽: 이미지 컨테이너 (고정 폭, 100% 높이) -->
          <div class="menu-image-col">
            <!-- 실제 이미지 -->
            <v-img
              :src="item.imageUrl"
              cover
              class="menu-image"
            />
          </div>

          <!-- (2) 오른쪽: 텍스트 영역 -->
          <div class="menu-text-col d-flex flex-column justify-center px-4 py-3">
            <div class="menu-title mb-3">
              {{ item.name }}
            </div>
            <p class="menu-desc mb-3">
              <span
                v-for="(line, lineIdx) in item.descList"
                :key="lineIdx"
              >
                {{ line }}<br/>
              </span>
            </p>
            <div class="menu-subinfo" v-if="item.subInfo">
              {{ item.subInfo }}
            </div>
          </div>

        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PreOrderFood',
  data() {
    return {
      menuItems: [
        {
          name: 'Royal Octopus Dish\n - 대왕 문어 다리 요리 - ',
          imageUrl: 'src/assets/preorder/royal_octopus_dish.jpg',
          descList: [
            '잼라운지에서만 맛볼 수 있는 유상봉 셰프의 특별한 요리',
            '단체 회식의 고품격 요리로 잼라운지 단체 예약 손님들이 가장 선호하는 요리입니다.',
            '여러 명이 함께 즐길 수 있는 요리'
          ],
          subInfo: '- 단체 회식\n- 최소 2일 전 예약\n- 가격 문의'
        },
        {
          name: 'Yellowtail Sashimi\n - 대방어 회 -',
          imageUrl: 'src/assets/preorder/Yellowtail_sashimi.jpg',
          descList: [
            '9Kg ~ 15Kg의 진짜 대방어를 통째로 서비스합니다.',
            '단체 회식 당일 유셰프가 수산시장에서 직접 대방어 한 마리를 공수하여 서비스됩니다.'
          ],
          subInfo: '- 단체 회식\n- 최소 3일 전 예약\n- 겨울철 계절요리\n- 가격 변동 문의(싯가)'
        },
        {
          name: 'Salmon Sashimi\n - 숙성 생연어회 요리 -',
          imageUrl: 'src/assets/preorder/salmon_sashimi.jpg',
          descList: [
            '연어 회 요리'
          ],
          subInfo: '- 가격 문의'
        },
        {
          name: 'Meat Platter\n - 고기 플레터 요리 -',
          imageUrl: 'src/assets/preorder/Meat_platter.jpg',
          descList: [
            '잼라운지에서만 맛볼 수 있는 유상봉 셰프의 특별한 요리',
            '단체 회식 시 만족도가 높은 인기 메뉴',
            '3~4명이 함께 즐길 수 있는 요리'
          ],
          subInfo: '- 단체 회식\n- 최소 2일 전 예약\n- 가격 문의'
        },
        {
          name: 'Seafood Platter\n - 해물 플레터 요리 -',
          imageUrl: 'src/assets/preorder/seafood_platter.jpg',
          descList: [
            '고품격 해산물 요리로 잼라운지에서만 맛볼 수 있는 스페셜 플레터',
            '3~4명이 함께 즐길 수 있는 요리',
            '각종 소스와 야채 곁들임'
          ],
          subInfo: '- 단체 회식\n- 최소 2일 전 예약\n- 가격 문의'
        },
        {
          name: 'Buffet\n - 뷔페 요리 -',
          imageUrl: 'src/assets/preorder/buffet.jpg',
          descList: [
            '뷔페식으로 다양하게 세팅된 메인 메뉴들',
            '50인 이상 전체 대관시 주문 가능합니다.'
          ],
          subInfo: '- 대관 회식\n- 최소 1주일 전 예약\n- 가격 별도 문의'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.preorder-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* 카드: align-items: stretch → 높이 동일. border-right가 일자 */
.menu-card {
  display: flex;
  align-items: stretch;
  width: 100%;
  background-color: #2b2b2b;
  border-radius: 6px;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0,0,0,0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0,0,0,0.6);
  }

  /* 작은 화면에서는 세로 배치 */
  @media (max-width: 600px) {
    flex-direction: column;
  }
}

/* 왼쪽: 이미지 영역 (고정 폭 400px, 100% 높이) */
.menu-image-col {
  width: 400px;
  border-right: 2px solid #444;
  height: 100%; /* align-items: stretch로 카드 전체 높이와 동일 */
  display: flex;
  align-items: center; /* 수직 가운데 정렬(내부 v-img) */
  justify-content: center;

  @media (max-width: 600px) {
    width: 100%;
    border-right: none;
    border-bottom: 2px solid #444;
    height: 250px; /* 예시: 모바일에서 이미지 높이 250px */
  }
}

/* 실제 v-img은 부모 .menu-image-col 안에서 100%/100% */
.menu-image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

/* 오른쪽 텍스트 영역 (flex:1) */
.menu-text-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 텍스트 스타일 */
.menu-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #c5a46d;
  white-space: pre-line;
}

.menu-desc {
  color: #f2f2f2;
  line-height: 1.6;
  white-space: pre-line;
}

.menu-subinfo {
  color: #888;
  white-space: pre-line;
  margin-top: auto;
  font-size: 0.9rem;
}
</style>
