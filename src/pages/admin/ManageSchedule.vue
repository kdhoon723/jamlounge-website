<template>
    <div class="manage-schedule">
      <h2>스케줄 관리</h2>
      <!-- 새 스케줄 등록 -->
      <div class="new-schedule-form">
        <input v-model="newDate" type="date" />
        <input v-model="newTitle" placeholder="이벤트 제목" />
        <select v-model="newType">
          <option>특선메뉴</option>
          <option>공연</option>
          <option>대관</option>
        </select>
        <textarea v-model="newDescription" placeholder="설명"></textarea>
        <button @click="addEvent">추가</button>
      </div>
      <hr />
  
      <!-- 스케줄 목록 -->
      <ul class="schedule-list">
        <li v-for="item in scheduleEvents" :key="item.id">
          <span>
            {{ item.date }} - {{ item.title }} [{{ item.type }}]
          </span>
          <button @click="editEvent(item)">수정</button>
          <button @click="deleteEvent(item.id)">삭제</button>
        </li>
      </ul>
  
      <!-- 수정 섹션 -->
      <div v-if="editingItem" class="edit-schedule-form">
        <h3>이벤트 수정</h3>
        <input v-model="editingItem.date" type="date" />
        <input v-model="editingItem.title" placeholder="이벤트 제목" />
        <select v-model="editingItem.type">
          <option>특선메뉴</option>
          <option>공연</option>
          <option>대관</option>
        </select>
        <textarea v-model="editingItem.description" placeholder="설명"></textarea>
  
        <div class="edit-buttons">
          <button @click="updateEvent">저장</button>
          <button @click="cancelEdit">취소</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from '@/services/firebase'
  import {
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    query,
    orderBy
  } from 'firebase/firestore'
  
  export default {
    name: 'ManageSchedule',
    data() {
      return {
        scheduleEvents: [],
        newDate: '',
        newTitle: '',
        newType: '특선메뉴',
        newDescription: '',
        editingItem: null
      }
    },
    created() {
      this.loadEvents()
    },
    methods: {
      loadEvents() {
        const q = query(collection(db, 'schedule'), orderBy('date', 'desc'))
        onSnapshot(q, snapshot => {
          this.scheduleEvents = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        })
      },
      async addEvent() {
        if (!this.newDate || !this.newTitle) return
        try {
          await addDoc(collection(db, 'schedule'), {
            date: this.newDate,
            title: this.newTitle,
            type: this.newType,
            description: this.newDescription
          })
          // reset
          this.newDate = ''
          this.newTitle = ''
          this.newType = '특선메뉴'
          this.newDescription = ''
        } catch (err) {
          console.error('스케줄 추가 오류', err)
        }
      },
      editEvent(item) {
        this.editingItem = { ...item }
      },
      async updateEvent() {
        if (!this.editingItem || !this.editingItem.id) return
        try {
          await updateDoc(doc(db, 'schedule', this.editingItem.id), {
            date: this.editingItem.date,
            title: this.editingItem.title,
            type: this.editingItem.type,
            description: this.editingItem.description
          })
          this.editingItem = null
        } catch (err) {
          console.error('스케줄 수정 오류', err)
        }
      },
      cancelEdit() {
        this.editingItem = null
      },
      async deleteEvent(id) {
        if (!confirm('정말 삭제하시겠습니까?')) return
        try {
          await deleteDoc(doc(db, 'schedule', id))
        } catch (err) {
          console.error('스케줄 삭제 오류', err)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .manage-schedule {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
  }
  .new-schedule-form,
  .edit-schedule-form {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }
  .schedule-list {
    list-style: none;
    padding: 0;
  }
  .schedule-list li {
    margin-bottom: 8px;
  }
  .edit-buttons {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }
  </style>
  