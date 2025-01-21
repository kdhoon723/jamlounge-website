<template>
    <v-container class="py-10">
      <h2 class="text-h5 mb-6" style="color: #c5a46d;">
        Manage Pre-Order Food
      </h2>
  
      <!-- 목록 표시 -->
      <v-row>
        <v-col
          v-for="(item, idx) in preOrderItems"
          :key="item.id"
          cols="12"
        >
          <v-card class="pa-3 mb-4" outlined>
            <div class="d-flex align-center justify-space-between">
              <div>
                <strong>{{ item.name }}</strong>
              </div>
              <div>
                <v-btn color="primary" small @click="editItem(item)">Edit</v-btn>
                <v-btn color="error" small @click="deleteItem(item.id)">Delete</v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- 추가/수정 폼 -->
      <v-card class="p-4" elevation="1">
        <h3 class="text-h6 mb-3">
          {{ editMode ? 'Edit PreOrder Item' : 'Add PreOrder Item' }}
        </h3>
  
        <v-text-field
          label="Name"
          v-model="form.name"
          dense
          outlined
          class="mb-3"
        ></v-text-field>
  
        <v-text-field
          label="Image URL"
          v-model="form.imageUrl"
          dense
          outlined
          class="mb-3"
        ></v-text-field>
  
        <!-- descList: 줄바꿈 → 배열 -->
        <v-textarea
          label="descList (줄바꿈으로 구분)"
          v-model="descListInput"
          dense
          outlined
          rows="3"
          class="mb-3"
        ></v-textarea>
  
        <v-textarea
          label="Sub Info"
          v-model="form.subInfo"
          dense
          outlined
          rows="2"
          class="mb-3"
        ></v-textarea>
  
        <v-btn color="success" @click="saveItem">
          {{ editMode ? 'Update' : 'Add' }}
        </v-btn>
        <v-btn color="grey" @click="cancelEdit" v-if="editMode">Cancel</v-btn>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { db } from '@/services/firebase'
  import {
    collection,
    onSnapshot,
    addDoc,
    doc,
    updateDoc,
    deleteDoc
  } from 'firebase/firestore'
  
  export default {
    name: 'ManagePreOrder',
    setup() {
      const preOrderItems = ref([])
  
      // 폼 상태
      const editMode = ref(false)
      const editingId = ref(null)
      const form = ref({
        name: '',
        imageUrl: '',
        descList: [],
        subInfo: ''
      })
      // descListInput -> textarea에서 다룰 문자열
      const descListInput = ref('')
  
      // Firestore 실시간 구독
      onMounted(() => {
        const colRef = collection(db, 'preorderFood')
        onSnapshot(colRef, (snapshot) => {
          preOrderItems.value = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        })
      })
  
      // 새 항목 추가 or 수정
      const saveItem = async () => {
        if (!form.value.name.trim()) {
          alert('Name is required')
          return
        }
        // descListInput -> 배열 변환
        form.value.descList = descListInput.value
          .split('\n')
          .map(line => line.trim())
          .filter(line => line !== '')
  
        const colRef = collection(db, 'preorderFood')
  
        if (editMode.value && editingId.value) {
          // 수정
          const docRef = doc(db, 'preorderFood', editingId.value)
          await updateDoc(docRef, {
            name: form.value.name,
            imageUrl: form.value.imageUrl,
            descList: form.value.descList,
            subInfo: form.value.subInfo
          })
        } else {
          // 추가
          await addDoc(colRef, {
            name: form.value.name,
            imageUrl: form.value.imageUrl,
            descList: form.value.descList,
            subInfo: form.value.subInfo
          })
        }
        cancelEdit()
      }
  
      // 항목 수정
      const editItem = (item) => {
        editMode.value = true
        editingId.value = item.id
        form.value.name = item.name
        form.value.imageUrl = item.imageUrl
        form.value.descList = item.descList || []
        form.value.subInfo = item.subInfo || ''
  
        descListInput.value = form.value.descList.join('\n')
      }
  
      // 항목 삭제
      const deleteItem = async (id) => {
        if (!confirm('정말 삭제하시겠습니까?')) return
        const docRef = doc(db, 'preorderFood', id)
        await deleteDoc(docRef)
      }
  
      // 편집 취소
      const cancelEdit = () => {
        editMode.value = false
        editingId.value = null
        form.value = {
          name: '',
          imageUrl: '',
          descList: [],
          subInfo: ''
        }
        descListInput.value = ''
      }
  
      return {
        preOrderItems,
        editMode,
        editingId,
        form,
        descListInput,
        saveItem,
        editItem,
        deleteItem,
        cancelEdit
      }
    }
  }
  </script>
  
  <style scoped>
  /* 관리자 UI 기본 스타일 (심플) */
  </style>
  