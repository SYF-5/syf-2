<template>
  <div class="login-container">
    <div class="login-form">
      <h1>后台管理系统</h1>
      <div class="form-group">
        <label>用户名</label>
        <input v-model="form.username" placeholder="请输入用户名" type="text" class="input-field">
      </div>
      <div class="form-group">
        <label>密码</label>
        <input v-model="form.password" placeholder="请输入密码" type="password" class="input-field">
      </div>
      <button @click="submitForm" class="login-button">登录</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import request from '../utils/request'

const router = useRouter()

const form = ref({
  username: '',
  password: ''
})

const submitForm = async () => {
  if (!form.value.username) {
    ElMessage.error('请输入用户名')
    return
  }
  if (!form.value.password) {
    ElMessage.error('请输入密码')
    return
  }
  
  try {
    const response = await request.post('/auth/login', {
      username: form.value.username,
      password: form.value.password,
      role: 0 // 管理员角色
    })
    
    if (response.code === 200) {
      ElMessage.success('登录成功！')
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
      
      // 使用 Vue Router 跳转到首页
      setTimeout(() => {
        router.push('/home')
      }, 1500)
    } else {
      ElMessage.error('账号或密码错误')
    }
  } catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('网络错误，请稍后重试')
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-form h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #303133;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #303133;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
}

.input-field:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #66b1ff;
}
</style>
