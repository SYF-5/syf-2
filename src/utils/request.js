import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    console.log('发送请求:', config.url, 'params:', config.params, 'data:', config.data)
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    console.log('收到响应:', response)
    return response.data
  },
  error => {
    console.error('响应错误:', error)
    if (error.response) {
      console.error('错误状态码:', error.response.status)
      console.error('错误响应:', error.response.data)
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          console.error('权限不足')
          break
        case 500:
          console.error('服务器错误')
          break
      }
    }
    return Promise.reject(error)
  }
)

export default request
