import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify 플러그인 불러오기
import vuetify from '@/plugins/vuetify'

const app = createApp(App)

// 라우터 등록
app.use(router)

// Vuetify 등록
app.use(vuetify)

// 마운트
app.mount('#app')
