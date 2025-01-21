<template>
  <v-container class="py-10">
    <!-- 페이지 제목 -->
    <h2 class="text-h4 mb-6" style="color: #c5a46d;">Menu (Firestore 연동)</h2>
    <p class="mb-4" style="color: #f2f2e9;">
      다양한 메뉴들을 카테고리 별로 확인해보세요.
    </p>

    <!-- 카테고리 버튼들 -->
    <div class="mb-4">
      <!-- 'All' 버튼(전체 보기) -->
      <v-btn
        class="mr-2"
        :color="currentCategory === 'All' ? 'accent' : 'secondary'"
        dark
        @click="currentCategory = 'All'"
      >
        전체
      </v-btn>

      <!-- 동적으로 Firestore에서 불러온 카테고리 목록 -->
      <v-btn
        v-for="cat in categoryList"
        :key="cat.id"
        class="mr-2"
        :color="currentCategory === cat.name ? 'accent' : 'secondary'"
        dark
        @click="currentCategory = cat.name"
      >
        {{ cat.name }}
      </v-btn>
    </div>

    <!-- 메뉴 리스트(카드) -->
    <v-row>
      <v-col
        v-for="(item, index) in filteredMenu"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card color="#2b2b2b" dark class="mb-4">
          <!-- 이미지가 있을 경우 표시 -->
          <v-img
            v-if="item.imageUrl"
            :src="item.imageUrl"
            height="150"
            cover
          />
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>
            <div>{{ item.description }}</div>
            <div style="color: #c5a46d; margin-top: 8px; font-weight: bold;">
              {{ formatPrice(item.price) }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { db } from '@/services/firebase'
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore'

export default {
  name: 'Menu',
  setup() {
    // 1) 카테고리 목록 (Firestore -> MenuCategory)
    const categoryList = ref([]) // [{id, name, order, ...}, ...]
    // 현재 선택된 카테고리 (기본 'All')
    const currentCategory = ref('All')

    // 2) 메뉴 목록 (Firestore -> menus)
    const menuItems = ref([])

    // ---------------------------
    // Firestore 구독 함수
    // ---------------------------
    // (A) 카테고리 구독
    const fetchCategories = () => {
      const catCol = collection(db, 'MenuCategory')
      const q = query(catCol, orderBy('order', 'asc'))
      onSnapshot(q, snapshot => {
        categoryList.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() // { name, order, createdAt, ...}
        }))
      })
    }

    // (B) 메뉴 구독
    const fetchMenuData = () => {
      const menuCol = collection(db, 'menus')
      const q = query(menuCol, orderBy('name'))
      onSnapshot(q, snapshot => {
        menuItems.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      })
    }

    onMounted(() => {
      fetchCategories()
      fetchMenuData()
    })

    // ---------------------------
    // 3) 필터링 (현재 카테고리)
    // ---------------------------
    const filteredMenu = computed(() => {
      if (currentCategory.value === 'All') {
        return menuItems.value
      } else {
        return menuItems.value.filter(
          (item) => item.category === currentCategory.value
        )
      }
    })

    // ---------------------------
    // 가격 표시 포맷
    // ---------------------------
    const formatPrice = (val) => {
      if (typeof val === 'number') {
        return `${val.toLocaleString()}원`
      }
      return val
    }

    return {
      categoryList,
      currentCategory,
      menuItems,
      filteredMenu,
      formatPrice
    }
  }
}
</script>

<style scoped>
/* 필요한 경우 추가 스타일 */
</style>
