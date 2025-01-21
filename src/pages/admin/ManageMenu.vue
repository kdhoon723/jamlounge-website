<template>
  <v-container class="py-4">
    <h2 class="text-h5 mb-4" style="color: #c5a46d">메뉴 관리</h2>

    <!-- 1) 카테고리 관리 영역 -->
    <v-card outlined class="p-4 mb-4">
      <h3 class="text-h6 mb-3">카테고리 관리</h3>
      <v-row dense>
        <!-- 기존에 등록된 카테고리 리스트 (정렬된 순서) -->
        <v-col cols="12">
          <div class="d-flex flex-column">
            <div
              v-for="(cat, index) in categories"
              :key="cat.id"
              class="d-flex align-center mb-2"
            >
              <!-- 이름 표시 -->
              <v-chip class="ma-1" color="grey darken-1" text-color="white">
                {{ cat.name }}
              </v-chip>
              <!-- Up/Down 버튼 -->
              <v-btn icon small @click="moveCategoryUp(index)" :disabled="index === 0">
                <v-icon>mdi-chevron-up</v-icon>
              </v-btn>
              <v-btn icon small @click="moveCategoryDown(index)" :disabled="index === categories.length - 1">
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              <!-- 삭제 버튼 -->
              <v-btn icon color="error" small @click="removeCategory(cat.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
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
          <!-- 카테고리 목록에서 name만 추출하여 select에 표시 -->
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
          <!-- 이미지 파일 선택 -->
          <v-file-input
            v-model="newMenuFile"
            label="메뉴 이미지"
            accept="image/*"
            dense
            outlined
            prepend-icon="mdi-image"
          />
        </v-col>
      </v-row>
      <v-btn color="primary" class="mt-2" @click="addMenuItem"> 추가 </v-btn>
    </v-card>

    <!-- 3) 메뉴 목록 -->
    <v-row>
      <v-col v-for="item in menuItems" :key="item.id" cols="12">
        <v-card outlined class="px-3 py-2 mb-3 d-flex align-center justify-space-between">
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
          <!-- 수정 시에도 이미지 변경 가능 (선택사항). 여긴 생략해도 됨 -->
          <!-- 
          <v-file-input
            v-model="editingMenuFile"
            label="새 이미지 (선택)"
            accept="image/*"
            dense
            outlined
            class="mb-3"
            prepend-icon="mdi-image"
          />
          -->
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
import { ref, onMounted } from 'vue'
import { db, storage } from '@/services/firebase'
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore'
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'

export default {
  name: 'ManageMenu',
  setup() {
    // --------------------------------
    // 1) 카테고리 (MenuCategory 컬렉션) + 순서 편집
    // --------------------------------
    const categories = ref([])
    const newCategoryName = ref('')

    // 카테고리 로드 (order 필드 오름차순 정렬)
    const loadCategories = () => {
      const catCol = collection(db, 'MenuCategory')
      // orderBy('order') -> 오름차순
      const q = query(catCol, orderBy('order', 'asc'))
      onSnapshot(q, (snapshot) => {
        categories.value = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data() // { name, order, createdAt, ...}
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
        // 새 카테고리 order: 현재 목록 중 최대값+1 (간단한 방식)
        const maxOrder = Math.max(...categories.value.map(c => c.order ?? 0), 0)
        await addDoc(collection(db, 'MenuCategory'), {
          name: newCategoryName.value.trim(),
          createdAt: new Date(),
          order: maxOrder + 1
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

    // 카테고리 순서 (Up/Down)
    const moveCategoryUp = async (index) => {
      if (index <= 0) return
      // 현재 cat, 위 cat
      const current = categories.value[index]
      const above = categories.value[index - 1]
      // swap order
      const tmp = current.order
      current.order = above.order
      above.order = tmp

      try {
        await updateDoc(doc(db, 'MenuCategory', current.id), { order: current.order })
        await updateDoc(doc(db, 'MenuCategory', above.id), { order: above.order })
      } catch (err) {
        console.error('카테고리 순서 변경 오류', err)
      }
    }
    const moveCategoryDown = async (index) => {
      if (index >= categories.value.length - 1) return
      const current = categories.value[index]
      const below = categories.value[index + 1]
      const tmp = current.order
      current.order = below.order
      below.order = tmp
      try {
        await updateDoc(doc(db, 'MenuCategory', current.id), { order: current.order })
        await updateDoc(doc(db, 'MenuCategory', below.id), { order: below.order })
      } catch (err) {
        console.error('카테고리 순서 변경 오류', err)
      }
    }

    // --------------------------------
    // 2) 메뉴 (menus 컬렉션)
    // --------------------------------
    const menuItems = ref([])
    const newName = ref('')
    const newCategory = ref('커피')
    const newPrice = ref(0)
    // 이미지 파일 (Storage 업로드)
    const newMenuFile = ref(null)

    // 수정 모달 관련
    const dialogEdit = ref(false)
    const editingItem = ref(null)
    // const editingMenuFile = ref(null) // (선택) 수정 시 이미지 변경

    const loadMenus = () => {
      const colRef = collection(db, 'menus')
      const q = query(colRef, orderBy('name'))
      onSnapshot(q, (snapshot) => {
        menuItems.value = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
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
        let imageUrl = ''
        // 파일 업로드 -> Storage -> downloadURL
        if (newMenuFile.value) {
          const fileName = Date.now() + '_' + newMenuFile.value.name
          const storagePath = storageRef(storage, `menus_images/${fileName}`)
          await uploadBytes(storagePath, newMenuFile.value)
          imageUrl = await getDownloadURL(storagePath)
        }

        await addDoc(collection(db, 'menus'), {
          name: newName.value,
          category: newCategory.value,
          price: newPrice.value,
          imageUrl,
          createdAt: new Date()
        })
        // reset
        newName.value = ''
        newCategory.value = categories.value[0]?.name || ''
        newPrice.value = 0
        newMenuFile.value = null
      } catch (err) {
        console.error('메뉴 추가 오류', err)
      }
    }

    // 메뉴 수정 버튼
    const editMenu = (item) => {
      editingItem.value = { ...item } // 복사
      dialogEdit.value = true
    }

    // 메뉴 수정 저장
    const updateMenuItem = async () => {
      if (!editingItem.value || !editingItem.value.id) return
      try {
        const refDoc = doc(db, 'menus', editingItem.value.id)

        // (선택) 이미지 변경 로직이 필요하다면 여기에 Storage 업로드

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
      // editingMenuFile.value = null
    }

    // 메뉴 삭제
    const deleteMenuItem = async (id) => {
      if (!confirm('정말 삭제하시겠습니까?')) return
      try {
        await deleteDoc(doc(db, 'menus', id))
      } catch (err) {
        console.error('메뉴 삭제 오류', err)
      }
    }

    onMounted(() => {
      loadCategories()
      loadMenus()
    })

    return {
      // 카테고리
      categories,
      newCategoryName,
      addCategory,
      removeCategory,
      moveCategoryUp,
      moveCategoryDown,

      // 메뉴
      menuItems,
      newName,
      newCategory,
      newPrice,
      newMenuFile,

      dialogEdit,
      editingItem,

      addMenuItem,
      editMenu,
      updateMenuItem,
      cancelEdit,
      deleteMenuItem
    }
  }
}
</script>

<style scoped>
/* 예시 스타일 */

</style>
