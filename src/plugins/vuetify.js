import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // MDI 아이콘 폰트 CSS
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { aliases, mdi } from 'vuetify/iconsets/mdi'

// 테마 컬러 (검은 배경 + 금색 포인트)
const myCustomTheme = {
  dark: false,   // dark 모드가 아니라도, 색상을 어두운 톤으로 직접 지정
  colors: {
    primary: '#1a1a1a',   // 전체 배경(거의 검정)
    secondary: '#333333', // 헤더/푸터에 쓰일 짙은 회색
    accent: '#c5a46d',    // 금색 포인트
    background: '#1a1a1a',
    surface: '#2b2b2b',
    error: '#e74c3c',
    success: '#2ecc71',
    warning: '#f1c40f',
    info: '#3498db'
  }
}

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi }
  },
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme
    }
  }
})
