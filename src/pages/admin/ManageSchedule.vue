<template>
  <v-container class="py-4">
    <h2 class="text-h5 mb-4" style="color: #c5a46d;">
      스케줄 관리
    </h2>

    <!-- 새 스케줄 등록 -->
    <v-card outlined class="p-4 mb-4">
      <h3 class="text-h6 mb-3">새 일정 추가</h3>
      <v-row dense>
        <!-- date -->
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="newDate"
            label="날짜 (YYYY-MM-DD)"
            type="date"
            outlined
            dense
          />
        </v-col>
        <!-- title -->
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="newTitle"
            label="이벤트 제목"
            outlined
            dense
          />
        </v-col>
        <!-- type -->
        <v-col cols="12" sm="3">
          <v-select
            v-model="newType"
            :items="typeOptions"
            label="타입"
            outlined
            dense
          />
        </v-col>
        <!-- desc -->
        <v-col cols="12" sm="12">
          <v-textarea
            v-model="newDescription"
            label="설명"
            rows="2"
            outlined
            dense
          />
        </v-col>
      </v-row>
      <v-btn color="primary" class="mt-2" @click="addEvent">
        추가
      </v-btn>
    </v-card>

    <!-- 스케줄 목록 -->
    <v-row>
      <v-col
        v-for="item in scheduleEvents"
        :key="item.id"
        cols="12"
      >
        <v-card outlined class="px-3 py-2 mb-3">
          <div class="d-flex align-center justify-space-between">
            <div>
              <strong>{{ item.date }}</strong>
              <span class="grey--text ms-3">
                {{ item.title }}
              </span>
              <span class="ms-3">[{{ item.type }}]</span>
            </div>
            <div>
              <v-btn color="primary" small @click="editEvent(item)">
                수정
              </v-btn>
              <v-btn color="error" small @click="deleteEvent(item.id)">
                삭제
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- 수정 다이얼로그 -->
    <v-dialog
      v-model="dialogEdit"
      max-width="600px"
    >
      <v-card>
        <v-card-title>이벤트 수정</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editingItem.date"
            label="날짜 (YYYY-MM-DD)"
            type="date"
            outlined
            dense
            class="mb-3"
          />
          <v-text-field
            v-model="editingItem.title"
            label="이벤트 제목"
            outlined
            dense
            class="mb-3"
          />
          <v-select
            v-model="editingItem.type"
            :items="typeOptions"
            label="타입"
            outlined
            dense
            class="mb-3"
          />
          <v-textarea
            v-model="editingItem.description"
            label="설명"
            rows="2"
            outlined
            dense
            class="mb-3"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="updateEvent">
            저장
          </v-btn>
          <v-btn color="grey" @click="cancelEdit">
            취소
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue'
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
  setup() {
    const scheduleEvents = ref([])
    const newDate = ref('')
    const newTitle = ref('')
    const newType = ref('특선메뉴')
    const newDescription = ref('')
    
    const typeOptions = ref(['특선메뉴', '공연', '대관'])

    // 수정 모달
    const dialogEdit = ref(false)
    const editingItem = ref(null)

    onMounted(() => {
      loadEvents()
    })

    const loadEvents = () => {
      const colRef = collection(db, 'schedule')
      const q = query(colRef, orderBy('date', 'desc'))
      onSnapshot(q, snapshot => {
        scheduleEvents.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      })
    }

    const addEvent = async () => {
      if (!newDate.value || !newTitle.value.trim()) {
        alert('날짜와 이벤트 제목을 입력하세요')
        return
      }
      try {
        await addDoc(collection(db, 'schedule'), {
          date: newDate.value,
          title: newTitle.value,
          type: newType.value,
          description: newDescription.value
        })
        // reset
        newDate.value = ''
        newTitle.value = ''
        newType.value = '특선메뉴'
        newDescription.value = ''
      } catch (err) {
        console.error('스케줄 추가 오류', err)
      }
    }

    const editEvent = (item) => {
      editingItem.value = { ...item }
      dialogEdit.value = true
    }

    const updateEvent = async () => {
      if (!editingItem.value || !editingItem.value.id) return
      try {
        await updateDoc(doc(db, 'schedule', editingItem.value.id), {
          date: editingItem.value.date,
          title: editingItem.value.title,
          type: editingItem.value.type,
          description: editingItem.value.description
        })
        dialogEdit.value = false
        editingItem.value = null
      } catch (err) {
        console.error('스케줄 수정 오류', err)
      }
    }

    const cancelEdit = () => {
      dialogEdit.value = false
      editingItem.value = null
    }

    const deleteEvent = async (id) => {
      if (!confirm('정말 삭제하시겠습니까?')) return
      try {
        await deleteDoc(doc(db, 'schedule', id))
      } catch (err) {
        console.error('스케줄 삭제 오류', err)
      }
    }

    return {
      scheduleEvents,
      newDate,
      newTitle,
      newType,
      newDescription,
      typeOptions,
      dialogEdit,
      editingItem,
      loadEvents,
      addEvent,
      editEvent,
      updateEvent,
      cancelEdit,
      deleteEvent
    }
  }
}
</script>

<style scoped>
/* 관리자 페이지 스타일 (간단) */
</style>
