<template>
  <v-container class="py-10 preorder-container">
    <!-- 상단 제목 -->
    <div class="text-center mb-8">
      <h2 class="text-h4" style="color: #c5a46d; font-style: italic;">
        - Special menu for rentals -
      </h2>
    </div>

    <!-- 메뉴 목록 (v-row) -->
    <v-row dense>
      <v-col
        v-for="(item, idx) in menuItems"
        :key="item.id"
        cols="12"
        class="mb-6"
      >
        <!-- 카드 형태 (flex row) -->
        <div class="menu-card">
          
          <!-- (1) 왼쪽: 이미지 영역 (고정 폭) -->
          <div class="menu-image-col">
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
              <!-- descList(문자열 배열)을 줄바꿈으로 표시 -->
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
import { ref, onMounted } from 'vue'
import { db } from '@/services/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

export default {
  name: 'PreOrderFood',
  setup() {
    // Firestore에서 불러온 메뉴 항목들 (descList, imageUrl, subInfo 등)
    const menuItems = ref([])

    // Firestore 컬렉션(예: 'preorderFood') 실시간 구독
    const fetchPreOrderFoods = () => {
      const colRef = collection(db, 'preorderFood') 
      // 필요 시 orderBy(...) 등 정렬 추가 가능
      onSnapshot(colRef, snapshot => {
        menuItems.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      })
    }

    onMounted(() => {
      fetchPreOrderFoods()
    })

    return {
      menuItems
    }
  }
}
</script>

<style scoped lang="scss">
.preorder-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* 카드: flex row, align-items: stretch (height 동일) */
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

/* 왼쪽: 이미지 영역 (고정 폭 400px) */
.menu-image-col {
  width: 400px;
  border-right: 2px solid #444;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    width: 100%;
    border-right: none;
    border-bottom: 2px solid #444;
    height: 250px; /* 모바일에서 높이 */
  }
}

/* 실제 v-img은 부모 안에서 width/height 100% */
.menu-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 오른쪽 텍스트 영역 */
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
