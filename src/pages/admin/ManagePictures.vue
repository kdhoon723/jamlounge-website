<template>
  <v-container class="py-4">
    <h2 class="text-h5 mb-4" style="color: #c5a46d;">
      사진 관리
    </h2>

    <!-- 업로드 섹션 -->
    <v-card outlined class="p-4 mb-4">
      <h3 class="text-h6 mb-3">사진 업로드</h3>
      <v-row dense>
        <v-col cols="12" sm="4">
          <!-- 이미지 파일 선택 -->
          <v-file-input
            label="이미지 선택"
            accept="image/*"
            outlined
            dense
            prepend-icon="mdi-image"
            @change="handleFileChange"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <!-- 사진 설명 -->
          <v-text-field
            label="사진 설명 (예: 스테이지 구역)"
            v-model="newDesc"
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" sm="2" class="d-flex align-end">
          <v-btn color="primary" @click="uploadImage">
            업로드
          </v-btn>
        </v-col>
      </v-row>
      <div v-if="uploadMessage" class="mt-2 grey--text">
        {{ uploadMessage }}
      </div>
    </v-card>

    <!-- 사진 목록 -->
    <v-row>
      <v-col
        v-for="pic in pictures"
        :key="pic.id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card outlined class="pa-2 d-flex flex-column align-center">
          <v-img
            :src="pic.url"
            :alt="pic.desc"
            width="100%"
            height="150"
            cover
          />
          <p class="my-2" style="white-space: pre-line;">
            {{ pic.desc }}
          </p>
          <v-btn color="error" small @click="deletePicture(pic)">
            삭제
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db, storage } from '@/services/firebase'
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc
} from 'firebase/firestore'
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import { ref, onMounted } from 'vue'

export default {
  name: 'ManagePictures',
  setup() {
    const pictures = ref([])
    const file = ref(null)
    const newDesc = ref('')
    const uploadMessage = ref('')

    onMounted(() => {
      loadPictures()
    })

    // Firestore에서 목록 실시간 구독
    const loadPictures = () => {
      onSnapshot(collection(db, 'internal_pictures'), snapshot => {
        pictures.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      })
    }

    // 파일 선택
    const handleFileChange = (event) => {
      file.value = event.target.files[0] || null
    }

    // 업로드
    const uploadImage = async () => {
      if (!file.value) {
        uploadMessage.value = '이미지를 선택해주세요.'
        return
      }
      try {
        const fileName = Date.now() + '_' + file.value.name
        // 1) Firebase Storage 경로
        const imgRef = storageRef(storage, `internal_pictures/${fileName}`)
        // 2) 업로드
        await uploadBytes(imgRef, file.value)
        // 3) 다운로드 URL
        const downloadURL = await getDownloadURL(imgRef)
        // 4) Firestore에 문서 생성
        await addDoc(collection(db, 'internal_pictures'), {
          url: downloadURL,
          desc: newDesc.value,
          createdAt: new Date(),
          fileName
        })
        // 상태 초기화
        file.value = null
        newDesc.value = ''
        uploadMessage.value = '업로드 완료!'
      } catch (err) {
        console.error(err)
        uploadMessage.value = '업로드 실패: ' + err.message
      }
    }

    // 사진 삭제 (Firestore 문서 + Storage 파일)
    const deletePicture = async (pic) => {
      if (!confirm('정말 이 사진을 삭제하시겠습니까?')) return
      try {
        // 1) Firestore 문서 삭제
        await deleteDoc(doc(db, 'internal_pictures', pic.id))

        // 2) Storage 파일 삭제
        if (pic.fileName) {
          const imgRef = storageRef(storage, `internal_pictures/${pic.fileName}`)
          await deleteObject(imgRef)
        }
      } catch (err) {
        console.error(err)
      }
    }

    return {
      pictures,
      file,
      newDesc,
      uploadMessage,
      loadPictures,
      handleFileChange,
      uploadImage,
      deletePicture
    }
  }
}
</script>

<style scoped>
/* 관리자 페이지 스타일 (간단) */
</style>
