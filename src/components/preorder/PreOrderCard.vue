<template>
    <v-container class="py-10">
      <h2 class="text-h4 mb-6" style="color: #c5a46d;">
        Pre-order Food (Firestore 연동)
      </h2>
      <p style="color: #f2f2e9;">
        단체나 이벤트를 위한 사전 예약 메뉴를 소개합니다.
      </p>
  
      <v-row class="mt-6">
        <v-col
          v-for="(item, idx) in preorderItemsFiltered"
          :key="idx"
          cols="12" sm="6" md="4"
        >
          <v-card color="#2b2b2b" dark class="mb-4">
            <v-img
              v-if="item.imageUrl"
              :src="item.imageUrl"
              height="160"
            />
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-text>
              <div>{{ item.description }}</div>
              <div
                style="color: #c5a46d; margin-top: 8px; font-weight: bold;"
              >
                {{ formatPrice(item.price) }}
              </div>
              <p v-if="item.minPeople" style="margin-top: 6px; font-style: italic;">
                최소 {{ item.minPeople }}인 이상
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue'
  import { db } from '@/services/firebase'
  import {
    onSnapshot,
    collection,
    query,
    orderBy
  } from 'firebase/firestore'
  
  export default {
    name: 'PreOrderFood',
    setup() {
      const preorderItems = ref([])
  
      const fetchPreorderItems = () => {
        // Firestore 컬렉션 이름: "preorder_food"
        // name 기준 정렬 등 필요하면 orderBy 추가
        const q = query(collection(db, 'preorder_food'), orderBy('name'))
        onSnapshot(q, (snapshot) => {
          preorderItems.value = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
        })
      }
  
      onMounted(() => {
        fetchPreorderItems()
      })
  
      // 필요 시 필터링 또는 정렬 등을 적용 가능
      const preorderItemsFiltered = computed(() => {
        return preorderItems.value
      })
  
      const formatPrice = (val) => {
        if (typeof val === 'number') {
          return `${val.toLocaleString()} 원`
        }
        return val
      }
  
      return {
        preorderItems,
        preorderItemsFiltered,
        formatPrice
      }
    }
  }
  </script>
  
  <style scoped>
  /* 필요 시 추가 스타일 */
  </style>
  