<template>
    <v-container class="py-10">
      <h2 class="text-h4 mb-4" style="color: #c5a46d;">Internal Picture (Firestore + Storage)</h2>
      <p style="color: #f2f2e9;">
        잼라운지의 내부 분위기를 보여주는 여러 사진들입니다.
      </p>
  
      <v-row class="mt-6">
        <v-col
          v-for="(pic, idx) in pictures"
          :key="idx"
          cols="12" sm="6" md="4"
        >
          <v-card color="#2b2b2b" dark class="mb-4">
            <v-img
              :src="pic.url"
              height="200"
            />
            <v-card-title>{{ pic.desc }}</v-card-title>
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
    name: 'InternalPicture',
    setup() {
      const pictures = ref([])
  
      const fetchPictures = () => {
        const q = query(collection(db, 'internal_pictures'), orderBy('createdAt', 'desc'))
        onSnapshot(q, (snapshot) => {
          pictures.value = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
        })
      }
  
      onMounted(() => {
        fetchPictures()
      })
  
      return {
        pictures
      }
    }
  }
  </script>
  
  <style scoped>
  /* 필요 시 추가 스타일 */
  </style>
  