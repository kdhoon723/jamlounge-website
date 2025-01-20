<template>
    <div class="manage-pictures">
      <h2>사진 관리</h2>
      <div class="upload-section">
        <input type="file" accept="image/*" @change="handleFileChange" />
        <input v-model="newDesc" placeholder="사진 설명 (예: 스테이지 구역)" />
        <button @click="uploadImage">업로드</button>
        <p v-if="uploadMessage">{{ uploadMessage }}</p>
      </div>
      <hr />
  
      <!-- 사진 목록 표시 및 삭제 기능 -->
      <div class="pictures-list">
        <div class="picture-item" v-for="pic in pictures" :key="pic.id">
          <img :src="pic.url" :alt="pic.desc" />
          <p>{{ pic.desc }}</p>
          <button @click="deletePicture(pic)">삭제</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { db, storage } from '@/services/firebase'
  import { collection, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
  import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
  
  export default {
    name: 'ManagePictures',
    data() {
      return {
        pictures: [],
        file: null,
        newDesc: '',
        uploadMessage: ''
      }
    },
    created() {
      this.loadPictures()
    },
    methods: {
      loadPictures() {
        onSnapshot(collection(db, 'internal_pictures'), snapshot => {
          this.pictures = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        })
      },
      handleFileChange(e) {
        this.file = e.target.files[0]
      },
      async uploadImage() {
        if (!this.file) {
          this.uploadMessage = '이미지 파일을 선택해주세요.'
          return
        }
        try {
          // 1) Storage에 업로드할 참조 경로 생성
          const fileName = Date.now() + '_' + this.file.name
          const imgRef = storageRef(storage, `internal_pictures/${fileName}`)
  
          // 2) 업로드
          await uploadBytes(imgRef, this.file)
          // 3) 다운로드 URL 획득
          const downloadURL = await getDownloadURL(imgRef)
  
          // 4) Firestore에 문서 생성 (url, desc 등)
          await addDoc(collection(db, 'internal_pictures'), {
            url: downloadURL,
            desc: this.newDesc,
            createdAt: new Date(),
            fileName // 나중에 삭제할 때 참고
          })
  
          // 5) 상태 초기화
          this.file = null
          this.newDesc = ''
          this.uploadMessage = '업로드 성공!'
        } catch (err) {
          console.error(err)
          this.uploadMessage = '업로드 실패: ' + err.message
        }
      },
      async deletePicture(pic) {
        if (!confirm('정말 이 사진을 삭제하시겠습니까?')) return
        try {
          // 1) Firestore 문서 삭제
          await deleteDoc(doc(db, 'internal_pictures', pic.id))
  
          // 2) 실제 이미지 파일도 Storage에서 삭제
          if (pic.fileName) {
            const imgRef = storageRef(storage, `internal_pictures/${pic.fileName}`)
            await deleteObject(imgRef)
          }
        } catch (err) {
          console.error(err)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .manage-pictures {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
  }
  .upload-section {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }
  .pictures-list {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  .picture-item {
    width: 200px;
    text-align: center;
  }
  .picture-item img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 8px;
  }
  </style>
  