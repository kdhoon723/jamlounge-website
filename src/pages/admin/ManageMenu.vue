<template>
  <v-container class="py-4">
    <h2 class="text-h5 mb-4" style="color: #c5a46d">메뉴 관리</h2>

    <!-- 1) 카테고리 관리 영역 -->
    <v-card outlined class="p-4 mb-4">
      <h3 class="text-h6 mb-3">카테고리 관리</h3>
      <v-row dense>
        <!-- 기존에 등록된 카테고리 리스트 -->
        <v-col cols="12" sm="12">
          <div class="d-flex flex-wrap">
            <v-chip
              v-for="cat in categories"
              :key="cat.id"
              class="ma-1"
              close
              @click:close="removeCategory(cat.id)"
            >
              {{ cat.name }}
            </v-chip>
          </div>
        </v-col>

        <!-- 새 카테고리 추가 입력 -->
        <v-col cols="12" sm="4">
          <v-text-field
            label="새 카테고리 이름"
            v-model="newCategoryName"
            dense
            outlined
          />
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn color="primary" class="mt-2" @click="addCategory">
            추가
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <!-- // 카테고리 관리 영역 -->

    <!-- 2) 새 메뉴 등록 -->
    <v-card outlined class="p-4 mb-4">
      <h3 class="text-h6 mb-3">새 메뉴 추가</h3>
      <v-row dense>
        <v-col cols="12" sm="3">
          <v-text-field label="메뉴 이름" v-model="newName" dense outlined />
        </v-col>
        <v-col cols="12" sm="3">
          <!-- 카테고리 목록을 Firestore에서 불러온 뒤 이름만 추출해서 사용 -->
          <v-select
            label="카테고리"
            :items="categories.map(cat => cat.name)"
            v-model="newCategory"
            dense
            outlined
          />
        </v-col>
        <v-col cols="12" sm="2">
          <v-text-field
            label="가격"
            v-model.number="newPrice"
            dense
            outlined
            type="number"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            label="이미지 URL"
            v-model="newImageUrl"
            dense
            outlined
          />
        </v-col>
      </v-row>
      <v-btn color="primary" class="mt-2" @click="addMenuItem"> 추가 </v-btn>
    </v-card>

    <!-- 3) 메뉴 목록 -->
    <v-row>
      <v-col v-for="(item, idx) in menuItems" :key="item.id" cols="12">
        <v-card outlined class="px-3 py-2 mb-3">
          <div class="d-flex align-center justify-space-between">
            <div>
              <strong>{{ item.name }}</strong>
              <span class="grey--text ms-3">
                ({{ item.category }} / {{ item.price }}원)
              </span>
            </div>
            <div>
              <v-btn color="primary" small @click="editMenu(item)">
                수정
              </v-btn>
              <v-btn color="error" small @click="deleteMenuItem(item.id)">
                삭제
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- 4) 수정 다이얼로그 -->
    <v-dialog v-model="dialogEdit" max-width="600px">
      <v-card>
        <v-card-title> 메뉴 수정 </v-card-title>
        <v-card-text>
          <v-text-field
            label="메뉴 이름"
            v-model="editingItem.name"
            dense
            outlined
            class="mb-3"
          />
          <v-select
            label="카테고리"
            :items="categories.map(cat => cat.name)"
            v-model="editingItem.category"
            dense
            outlined
            class="mb-3"
          />
          <v-text-field
            label="가격"
            v-model.number="editingItem.price"
            dense
            outlined
            type="number"
            class="mb-3"
          />
          <v-text-field
            label="이미지 URL"
            v-model="editingItem.imageUrl"
            dense
            outlined
            class="mb-3"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="updateMenuItem"> 저장 </v-btn>
          <v-btn color="grey" @click="cancelEdit"> 취소 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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
import { ref, onMounted } from 'vue'

export default {
  name: 'ManageMenu',
  setup() {
    // ---------------------------
    // 1) 카테고리 (컬렉션+문서)
    // ---------------------------
    const categories = ref([])
    const newCategoryName = ref('')

    // 실시간 카테고리 구독
    const loadCategories = () => {
      const catColRef = collection(db, 'MenuCategory') // 컬렉션 이름
      onSnapshot(catColRef, (snapshot) => {
        // { id, name, createdAt } 형태로 가져옴
        categories.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      })
    }

    // 카테고리 추가
    const addCategory = async () => {
      if (!newCategoryName.value.trim()) {
        alert('카테고리 이름을 입력해주세요.')
        return
      }
      try {
        await addDoc(collection(db, 'MenuCategory'), {
          name: newCategoryName.value.trim(),
          createdAt: new Date()
        })
        newCategoryName.value = ''
      } catch (err) {
        console.error('카테고리 추가 오류', err)
      }
    }

    // 카테고리 삭제
    const removeCategory = async (catId) => {
      if (!confirm('정말 이 카테고리를 삭제하시겠습니까?')) return
      try {
        await deleteDoc(doc(db, 'MenuCategory', catId))
      } catch (err) {
        console.error('카테고리 삭제 오류', err)
      }
    }

    // ---------------------------
    // 2) 메뉴
    // ---------------------------
    const menuItems = ref([])
    const newName = ref('')
    const newCategory = ref('커피') // 기본값
    const newPrice = ref(0)
    const newImageUrl = ref('')

    // 수정 다이얼로그
    const dialogEdit = ref(false)
    const editingItem = ref(null)

    // 메뉴 실시간 구독
    const loadMenus = () => {
      const colRef = collection(db, 'menus')
      const q = query(colRef, orderBy('name'))
      onSnapshot(q, (snapshot) => {
        menuItems.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      })
    }

    // 새 메뉴 추가
    const addMenuItem = async () => {
      if (!newName.value.trim()) {
        alert('메뉴 이름을 입력해주세요')
        return
      }
      try {
        await addDoc(collection(db, 'menus'), {
          name: newName.value,
          category: newCategory.value,
          price: newPrice.value,
          imageUrl: newImageUrl.value || '',
          createdAt: new Date()
        })
        // 입력값 초기화
        newName.value = ''
        newCategory.value = '커피'
        newPrice.value = 0
        newImageUrl.value = ''
      } catch (err) {
        console.error('메뉴 추가 오류', err)
      }
    }

    // 메뉴 수정 버튼 클릭
    const editMenu = (item) => {
      editingItem.value = { ...item } // 복사
      dialogEdit.value = true
    }

    // 메뉴 수정 저장
    const updateMenuItem = async () => {
      if (!editingItem.value?.id) return
      try {
        const refDoc = doc(db, 'menus', editingItem.value.id)
        await updateDoc(refDoc, {
          name: editingItem.value.name,
          category: editingItem.value.category,
          price: editingItem.value.price,
          imageUrl: editingItem.value.imageUrl
        })
        dialogEdit.value = false
        editingItem.value = null
      } catch (err) {
        console.error('메뉴 수정 오류', err)
      }
    }

    // 수정 취소
    const cancelEdit = () => {
      dialogEdit.value = false
      editingItem.value = null
    }

    // 메뉴 삭제
    const deleteMenuItem = async (id) => {
      if (!confirm('정말 삭제하시겠습니까?')) return
      try {
        const refDoc = doc(db, 'menus', id)
        await deleteDoc(refDoc)
      } catch (err) {
        console.error('메뉴 삭제 오류', err)
      }
    }

    // ---------------------------
    // onMounted 시점에 불러오기
    // ---------------------------
    onMounted(() => {
      loadCategories() // 카테고리 실시간 구독
      loadMenus()      // 메뉴 실시간 구독
    })

    return {
      // 카테고리
      categories,
      newCategoryName,
      addCategory,
      removeCategory,

      // 메뉴
      menuItems,
      newName,
      newCategory,
      newPrice,
      newImageUrl,

      // 수정 모달
      dialogEdit,
      editingItem,
      editMenu,
      updateMenuItem,
      cancelEdit,
      deleteMenuItem
    }
  }
}
</script>

<style scoped>
/* 필요 시 스타일 추가 */
</style>
