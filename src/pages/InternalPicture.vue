<template>
  <v-container class="py-10">
    <h2 class="text-h4 mb-4" style="color: #c5a46d;">
      Internal Pictures
    </h2>
    <p style="color: #f2f2e9; line-height: 1.6;">
      잼라운지의 내부 분위기를 보여주는 여러 사진들입니다.<br />
      (관리자 페이지에서 업로드한 사진이 실시간으로 표시됩니다.)
    </p>

    <!-- 사진 목록 -->
    <v-row class="mt-6">
      <v-col
        v-for="(pic, idx) in pictures"
        :key="pic.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card color="#2b2b2b" dark class="mb-4">
          <!-- 이미지 -->
          <v-img
            :src="pic.url"
            height="200"
            cover
          />
          <!-- 사진 설명 -->
          <v-card-title>
            {{ pic.desc }}
          </v-card-title>
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
      // 관리자 페이지에서 업로드 시 createdAt이 저장되므로, 최신순 정렬
      const q = query(
        collection(db, 'internal_pictures'),
        orderBy('createdAt', 'desc')
      )
      onSnapshot(q, (snapshot) => {
        pictures.value = snapshot.docs.map(doc => ({
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
