<template>
    <v-container class="py-10">
      <h2 class="text-h4 mb-4" style="color: #c5a46d;">Schedule</h2>
      <p style="color: #f2f2e9;">
        공연, 특선메뉴, 대관 이벤트 등의 일정을 확인해 보세요.
      </p>
  
      <v-row class="mt-6">
        <v-col
          v-for="(evt, idx) in scheduleEvents"
          :key="idx"
          cols="12" sm="6" md="4"
        >
          <v-card color="#2b2b2b" dark class="mb-4">
            <v-card-title>
              {{ evt.title }} 
              <span class="ml-2" style="font-size: 0.9rem; color: #c5a46d;">
                [{{ evt.type }}]
              </span>
            </v-card-title>
            <v-card-text>
              <div>날짜: {{ formatDate(evt.date) }}</div>
              <div class="mt-2">{{ evt.description }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { db } from '@/services/firebase'
  import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'
  
  export default {
    name: 'Schedule',
    setup() {
      const scheduleEvents = ref([])
  
      const fetchSchedule = () => {
        const q = query(collection(db, 'schedule'), orderBy('date'))
        onSnapshot(q, (snapshot) => {
          scheduleEvents.value = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          })
        })
      }
  
      onMounted(() => {
        fetchSchedule()
      })
  
      const formatDate = (dateVal) => {
        // dateVal이 "2025-01-20" 같은 문자열일 수도 있고,
        // Firestore Timestamp일 수도 있음. 예시는 간단 처리
        if (typeof dateVal === 'string') {
          return dateVal
        }
        // Timestamp -> toDate() -> YYYY-MM-DD 변환 로직
        return dateVal
      }
  
      return {
        scheduleEvents,
        formatDate
      }
    }
  }
  </script>
  
  <style scoped>
  /* 필요 시 추가 스타일 */
  </style>
  