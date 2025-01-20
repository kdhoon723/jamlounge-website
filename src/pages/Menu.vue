<template>
    <v-container class="py-10">
      <!-- 페이지 제목 -->
      <h2 class="text-h4 mb-6" style="color: #c5a46d;">Menu (Firestore 연동)</h2>
  
      <!-- 카테고리 버튼들 -->
      <div class="mb-4">
        <v-btn
          v-for="cat in categories"
          :key="cat"
          class="mr-2"
          :color="currentCategory === cat ? 'accent' : 'secondary'"
          dark
          @click="currentCategory = cat"
        >
          {{ cat }}
        </v-btn>
      </div>
  
      <!-- 메뉴 리스트(카드) -->
      <v-row>
        <v-col
          v-for="(item, index) in filteredMenu"
          :key="index"
          cols="12" sm="6" md="4" lg="3"
        >
          <v-card color="#2b2b2b" dark class="mb-4">
            <!-- 이미지가 있을 경우 표시 -->
            <v-img
              v-if="item.imageUrl"
              :src="item.imageUrl"
              height="150"
            />
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-text>
              <div>{{ item.description }}</div>
              <div
                style="color: #c5a46d; margin-top: 8px; font-weight: bold;"
              >
                {{ formatPrice(item.price) }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  /*  
    이 부분은 Firebase Firestore를 연동할 때 사용.
    onSnapshot, collection, query, orderBy 등 필요한 함수 임포트
  */
  import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'
  import { db } from '@/services/firebase' // firebase.js 초기화 파일
  import { ref, computed, onMounted } from 'vue'
  
  export default {
    name: 'Menu',
    setup() {
      // 카테고리 목록 (하드코딩: 커피, 디저트, 식사, 주류)
      const categories = ref(['커피', '디저트', '식사', '주류'])
      const currentCategory = ref('커피')
  
      // Firestore에서 불러온 메뉴 항목들
      const menuItems = ref([])
  
      // Firestore 구독 함수
      const fetchMenuData = () => {
        // menus 컬렉션을 name 기준 정렬해서 가져오는 쿼리
        const q = query(collection(db, 'menus'), orderBy('name'))
        // 실시간(onSnapshot) 구독
        onSnapshot(q, (snapshot) => {
          menuItems.value = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          })
        })
      }
  
      // Lifecycle Hook
      onMounted(() => {
        fetchMenuData()
      })
  
      // 필터링(현재 카테고리에 해당하는 항목만 표시)
      const filteredMenu = computed(() => {
        return menuItems.value.filter(
          (item) => item.category === currentCategory.value
        )
      })
  
      // 가격 표시 포맷 함수
      const formatPrice = (val) => {
        if (typeof val === 'number') {
          return `${val.toLocaleString()} 원`
        }
        return val
      }
  
      return {
        categories,
        currentCategory,
        menuItems,
        filteredMenu,
        formatPrice
      }
    }
  }
  </script>
  
  <style scoped>
  /* 필요한 경우, 추가적인 스타일 */
  </style>
  