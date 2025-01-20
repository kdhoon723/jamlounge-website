<template>
    <div class="manage-menu">
      <h2>메뉴 관리</h2>
  
      <!-- 새 메뉴 등록 -->
      <div class="new-menu-form">
        <input v-model="newName" placeholder="메뉴 이름" />
        <select v-model="newCategory">
          <option>커피</option>
          <option>디저트</option>
          <option>식사</option>
          <option>주류</option>
        </select>
        <input v-model.number="newPrice" type="number" placeholder="가격" />
        <input v-model="newImageUrl" placeholder="이미지 URL" />
        <button @click="addMenuItem">추가</button>
      </div>
  
      <hr />
  
      <!-- 메뉴 목록 (간단 CRUD) -->
      <ul class="menu-list">
        <li v-for="item in menuItems" :key="item.id">
          <span class="menu-item-info">
            {{ item.name }} ({{ item.category }}) - {{ item.price }}원
          </span>
          <span class="menu-item-actions">
            <button @click="editMenu(item)">수정</button>
            <button @click="deleteMenuItem(item.id)">삭제</button>
          </span>
        </li>
      </ul>
  
      <!-- 수정 모달/섹션 (간단 예시) -->
      <div v-if="editingItem" class="edit-menu-form">
        <h3>메뉴 수정</h3>
        <input v-model="editingItem.name" placeholder="메뉴 이름" />
        <select v-model="editingItem.category">
          <option>커피</option>
          <option>디저트</option>
          <option>식사</option>
          <option>주류</option>
        </select>
        <input v-model.number="editingItem.price" type="number" placeholder="가격" />
        <input v-model="editingItem.imageUrl" placeholder="이미지 URL" />
  
        <div class="edit-buttons">
          <button @click="updateMenuItem">저장</button>
          <button @click="cancelEdit">취소</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from '@/services/firebase'
  import {
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query,
    doc,
    updateDoc,
    deleteDoc
  } from 'firebase/firestore'
  
  export default {
    name: 'ManageMenu',
    data() {
      return {
        menuItems: [],
        newName: '',
        newCategory: '커피',
        newPrice: 0,
        newImageUrl: '',
        editingItem: null // 수정 중인 메뉴 객체
      }
    },
    created() {
      this.loadMenus()
    },
    methods: {
      loadMenus() {
        const q = query(collection(db, 'menus'), orderBy('name'))
        onSnapshot(q, snapshot => {
          this.menuItems = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        })
      },
      async addMenuItem() {
        if (!this.newName) return
        try {
          await addDoc(collection(db, 'menus'), {
            name: this.newName,
            category: this.newCategory,
            price: this.newPrice,
            imageUrl: this.newImageUrl || '',
            createdAt: new Date()
          })
          // 입력값 리셋
          this.newName = ''
          this.newCategory = '커피'
          this.newPrice = 0
          this.newImageUrl = ''
        } catch (err) {
          console.error('메뉴 추가 오류', err)
        }
      },
      editMenu(item) {
        this.editingItem = { ...item } // 복사본
      },
      async updateMenuItem() {
        if (!this.editingItem || !this.editingItem.id) return
        try {
          const ref = doc(db, 'menus', this.editingItem.id)
          await updateDoc(ref, {
            name: this.editingItem.name,
            category: this.editingItem.category,
            price: this.editingItem.price,
            imageUrl: this.editingItem.imageUrl
          })
          this.editingItem = null
        } catch (err) {
          console.error('메뉴 수정 오류', err)
        }
      },
      cancelEdit() {
        this.editingItem = null
      },
      async deleteMenuItem(id) {
        if (!confirm('정말 삭제하시겠습니까?')) return
        try {
          const ref = doc(db, 'menus', id)
          await deleteDoc(ref)
        } catch (err) {
          console.error('메뉴 삭제 오류', err)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .manage-menu {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
  }
  .new-menu-form,
  .edit-menu-form {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
  .menu-list {
    list-style: none;
    padding: 0;
  }
  .menu-item-info {
    margin-right: 10px;
  }
  .menu-item-actions button {
    margin-right: 5px;
  }
  .edit-buttons {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }
  </style>
  