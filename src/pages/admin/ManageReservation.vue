<template>
    <v-container class="py-10">
      <h2 class="text-h5 mb-6" style="color: #c5a46d;">
        Manage Reservation Info 메롱메롱메롱
      </h2>
  
      <!-- 목록 표시 -->
      <v-row>
        <v-col
          v-for="(item, idx) in reservationItems"
          :key="item.id"
          cols="12"
        >
          <v-card class="pa-3 mb-4" outlined>
            <div class="d-flex align-center justify-space-between">
              <div>
                <strong>{{ item.title }}</strong>
                <p class="grey--text" style="white-space: pre-line;">{{ item.detail }}</p>
                <div v-if="item.link" style="color: #4fc3f7; text-decoration: underline;">
                  {{ item.link }}
                </div>
              </div>
              <!-- 수정/삭제 -->
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
        <h3 class="text-h6 mb-3">{{ editMode ? 'Edit Reservation Item' : 'Add Reservation Item' }}</h3>
  
        <v-text-field
          label="Title"
          v-model="form.title"
          dense
          outlined
          class="mb-3"
        ></v-text-field>
  
        <v-textarea
          label="Detail"
          v-model="form.detail"
          dense
          outlined
          rows="3"
          class="mb-3"
        ></v-textarea>
  
        <v-text-field
          label="Link (네이버예약 등)"
          v-model="form.link"
          dense
          outlined
          class="mb-3"
        ></v-text-field>
  
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
    name: 'ManageReservation',
    setup() {
      const reservationItems = ref([])
  
      const editMode = ref(false)
      const editingId = ref(null)
  
      // 폼 데이터
      const form = ref({
        title: '',
        detail: '',
        link: ''
      })
  
      onMounted(() => {
        const colRef = collection(db, 'reservationItems')
        onSnapshot(colRef, (snapshot) => {
          reservationItems.value = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        })
      })
  
      // Save (Add/Update)
      const saveItem = async () => {
        if (!form.value.title.trim()) {
          alert('Title is required')
          return
        }
        const colRef = collection(db, 'reservationItems')
        if (editMode.value && editingId.value) {
          // update
          const docRef = doc(db, 'reservationItems', editingId.value)
          await updateDoc(docRef, {
            title: form.value.title,
            detail: form.value.detail,
            link: form.value.link
          })
        } else {
          // add
          await addDoc(colRef, {
            title: form.value.title,
            detail: form.value.detail,
            link: form.value.link
          })
        }
        cancelEdit()
      }
  
      // Edit
      const editItem = (item) => {
        editMode.value = true
        editingId.value = item.id
        form.value.title = item.title
        form.value.detail = item.detail
        form.value.link = item.link || ''
      }
  
      // Delete
      const deleteItem = async (id) => {
        if (!confirm('정말 삭제하시겠습니까?')) return
        const docRef = doc(db, 'reservationItems', id)
        await deleteDoc(docRef)
      }
  
      // Cancel
      const cancelEdit = () => {
        editMode.value = false
        editingId.value = null
        form.value = {
          title: '',
          detail: '',
          link: ''
        }
      }
  
      return {
        reservationItems,
        editMode,
        editingId,
        form,
        saveItem,
        editItem,
        deleteItem,
        cancelEdit
      }
    }
  }
  </script>
  
  <style scoped>
  /* 관리자 페이지 스타일 (간단) */
  </style>
  