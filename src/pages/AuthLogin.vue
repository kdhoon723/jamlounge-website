<template>
    <section class="login-page">
      <h2>관리자 로그인</h2>
      <div class="login-form">
        <label>
          이메일
          <input type="email" v-model="email" placeholder="user@example.invalid" />
        </label>
        <label>
          비밀번호
          <input type="password" v-model="password" placeholder="비밀번호" />
        </label>
        <button @click="handleLogin">로그인</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </section>
  </template>
  
  <script>
  import { login } from '@/services/authService'
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'

  export default {
    name: 'AuthLogin',
    setup() {
      const router = useRouter()
      const email = ref('')
      const password = ref('')
      const errorMessage = ref('')
  
      const handleLogin = async () => {
        errorMessage.value = ''
        try {
          await login(email.value, password.value)
          // 로그인 성공 시 관리자 페이지(/admin)로 이동
          router.push('/admin')
        } catch (err) {
          errorMessage.value = '로그인 실패: ' + err.message
        }
      }
  
      return {
        email,
        password,
        errorMessage,
        handleLogin
      }
    }
  }
  </script>
  
  <style scoped>
  .login-page {
    padding: 40px;
    max-width: 400px;
    margin: 0 auto;
  }
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .error {
    color: red;
    margin-top: 8px;
  }
  </style>
  