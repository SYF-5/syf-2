<template>
  <div class="admin-container">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>后台管理</h2>
      </div>
      <div class="menu-list">
        <!-- 仪表盘 -->
        <div class="menu-item dashboard" :class="{ active: currentMenu === 'dashboard' }"
          @click="navigate('dashboard')">
          <span class="menu-icon">📊</span>
          <span class="menu-text">仪表盘</span>
        </div>

        <!-- 用户管理模块 -->
        <div class="menu-group-wrapper">
          <div class="menu-group-header" @click="toggleMenu('user')">
            <span class="menu-icon">👤</span>
            <span class="menu-text">用户管理</span>
            <span class="menu-arrow" :class="{ expanded: expandedMenus.includes('user') }">▼</span>
          </div>
          <div class="menu-group-content" v-show="expandedMenus.includes('user')">
            <div class="menu-item" :class="{ active: currentMenu === 'user-list' }" @click="navigate('user-list')">
              <span class="menu-icon">👥</span>
              <span class="menu-text">用户列表</span>
            </div>
          </div>
        </div>

        <!-- 门店与菜品管理模块 -->
        <div class="menu-group-wrapper">
          <div class="menu-group-header" @click="toggleMenu('store')">
            <span class="menu-icon">🏪</span>
            <span class="menu-text">门店与菜品管理</span>
            <span class="menu-arrow" :class="{ expanded: expandedMenus.includes('store') }">▼</span>
          </div>
          <div class="menu-group-content" v-show="expandedMenus.includes('store')">
            <div class="menu-item" :class="{ active: currentMenu === 'store-audit' }" @click="navigate('store-audit')">
              <span class="menu-icon">✅</span>
              <span class="menu-text">门店审核列表</span>
            </div>
            <div class="menu-item" :class="{ active: currentMenu === 'store-search' }"
              @click="navigate('store-search')">
              <span class="menu-icon">🔍</span>
              <span class="menu-text">门店查询列表</span>
            </div>
            <div class="menu-item" :class="{ active: currentMenu === 'dish-audit' }" @click="navigate('dish-audit')">
              <span class="menu-icon">🍲</span>
              <span class="menu-text">菜品审核与查询</span>
            </div>
          </div>
        </div>

        <!-- 点评内容管理模块 -->
        <div class="menu-group-wrapper">
          <div class="menu-group-header" @click="toggleMenu('review')">
            <span class="menu-icon">📝</span>
            <span class="menu-text">点评管理</span>
            <span class="menu-arrow" :class="{ expanded: expandedMenus.includes('review') }">▼</span>
          </div>
          <div class="menu-group-content" v-show="expandedMenus.includes('review')">
            <div class="menu-item" :class="{ active: currentMenu === 'review-list' }" @click="navigate('review-list')">
              <span class="menu-icon">📋</span>
              <span class="menu-text">点评列表</span>
            </div>
            <div class="menu-item" :class="{ active: currentMenu === 'violation-handle' }"
              @click="navigate('violation-handle')">
              <span class="menu-icon">🚨</span>
              <span class="menu-text">违规处理</span>
            </div>
          </div>
        </div>

        <!-- 学校与地理信息管理模块 -->
        <div class="menu-group-wrapper">
          <div class="menu-group-header" @click="toggleMenu('school')">
            <span class="menu-icon">🏫</span>
            <span class="menu-text">学校管理</span>
            <span class="menu-arrow" :class="{ expanded: expandedMenus.includes('school') }">▼</span>
          </div>
          <div class="menu-group-content" v-show="expandedMenus.includes('school')">
            <div class="menu-item" :class="{ active: currentMenu === 'school-list' }" @click="navigate('school-list')">
              <span class="menu-icon">📚</span>
              <span class="menu-text">学校列表</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 顶部导航 -->
      <div class="top-nav">
        <div class="nav-left">
          <span class="nav-title">{{ pageTitle }}</span>
        </div>
        <div class="nav-right">
          <span class="user-name">欢迎, {{ user.username }}</span>
          <button class="logout-btn" @click="logout">退出登录</button>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-area">
        <!-- 仪表盘统计 -->
        <div v-if="currentMenu === 'dashboard'" class="dashboard-content">
          <div class="dashboard-stats">
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-info">
                <div class="stat-number">{{ stats.totalUsers }}</div>
                <div class="stat-label">总用户数</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🏪</div>
              <div class="stat-info">
                <div class="stat-number">{{ stats.totalStores }}</div>
                <div class="stat-label">总门店数</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⭐</div>
              <div class="stat-info">
                <div class="stat-number">{{ stats.totalReviews }}</div>
                <div class="stat-label">总点评数</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏳</div>
              <div class="stat-info">
                <div class="stat-number">{{ stats.pendingStores }}</div>
                <div class="stat-label">待审核门店数</div>
              </div>
            </div>
          </div>

          <!-- 快速操作 -->
          <div class="quick-actions">
            <h3>快速操作</h3>
            <div class="action-grid">
              <div class="action-card" @click="navigate('store-audit')">
                <div class="action-icon">✅</div>
                <div class="action-text">审核门店</div>
              </div>
              <div class="action-card" @click="navigate('review-list')">
                <div class="action-icon">📝</div>
                <div class="action-text">查看点评</div>
              </div>
              <div class="action-card" @click="navigate('user-list')">
                <div class="action-icon">👤</div>
                <div class="action-text">用户管理</div>
              </div>
              <div class="action-card" @click="navigate('school-list')">
                <div class="action-icon">🏫</div>
                <div class="action-text">学校管理</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 用户列表页面 -->
        <div v-else-if="currentMenu === 'user-list'" class="page-content">
          <!-- 筛选区域 -->
          <div class="filter-section">
            <select v-model="filterRole" @change="loadUsers" class="role-select">
              <option value="">全部角色</option>
              <option value="1">学生</option>
              <option value="2">商家</option>
              <option value="0">管理员</option>
            </select>
            <select v-model="filterSchool" @change="loadUsers" class="school-select">
              <option value="">全部学校</option>
              <option v-for="school in schoolList" :key="school.id" :value="school.id">
                {{ school.name }}
              </option>
            </select>
            <button @click="loadUsers" class="refresh-btn">刷新</button>
          </div>

          <!-- 用户列表表格 -->
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户名</th>
                  <th>角色</th>
                  <th>学校</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in userList" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.username }}</td>
                  <td>{{ getRoleName(user.role) }}</td>
                  <td>{{ getSchoolName(user.school_id) || '-' }}</td>
                  <td>
                    <button class="edit-btn" @click="viewUserDetail(user)">查看</button>
                  </td>
                </tr>
                <tr v-if="userList.length === 0">
                  <td colspan="5" class="empty-cell">暂无数据</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 用户详情弹窗 -->
          <div v-if="showDetailModal" class="modal-overlay" @click="closeDetailModal">
            <div class="modal-content" @click.stop>
              <div class="modal-header">
                <h3>用户详情</h3>
                <button class="close-btn" @click="closeDetailModal">×</button>
              </div>
              <div class="modal-body" v-if="userDetail">
                <!-- 用户基本信息 -->
                <div class="detail-section">
                  <h4>基本信息</h4>
                  <div class="detail-row">
                    <span class="detail-label">ID:</span>
                    <span class="detail-value">{{ userDetail.user?.id }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">用户名:</span>
                    <span class="detail-value">{{ userDetail.user?.username }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">角色:</span>
                    <span class="detail-value">{{ getRoleName(userDetail.user?.role) }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">学校:</span>
                    <span class="detail-value">{{ getSchoolName(userDetail.user?.school_id) || '-' }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">创建时间:</span>
                    <span class="detail-value">{{ formatDate(userDetail.user?.created_at) || '-' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 门店审核列表 -->
        <div v-else-if="currentMenu === 'store-audit'" class="page-content">
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>门店名称</th>
                  <th>地址</th>
                  <th>电话</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="restaurant in restaurantList" :key="restaurant.id">
                  <td>{{ restaurant.id }}</td>
                  <td>{{ restaurant.name }}</td>
                  <td>{{ restaurant.address }}</td>
                  <td>{{ restaurant.phone }}</td>
                  <td>{{ formatDate(restaurant.created_at || restaurant.createdAt) }}</td>
                  <td>
                    <button class="audit-btn" @click="auditRestaurant(restaurant, 1)">通过</button>
                    <button class="reject-btn" @click="auditRestaurant(restaurant, 2)">拒绝</button>
                  </td>
                </tr>
                <tr v-if="restaurantList.length === 0">
                  <td colspan="6" class="empty-cell">暂无待审核门店</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 门店查询列表 -->
        <div v-else-if="currentMenu === 'store-search'" class="page-content">
          <!-- 筛选区域 -->
          <div class="filter-row">
            <select v-model="categoryFilter" @change="loadRestaurantsByCategory()" class="status-select">
              <option value="">全部分类</option>
              <option value="1">火锅</option>
              <option value="2">中餐</option>
              <option value="3">西餐</option>
              <option value="4">甜品</option>
              <option value="5">饮品</option>
              <option value="6">快餐</option>
            </select>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>门店名称</th>
                  <th>分类</th>
                  <th>地址</th>
                  <th>电话</th>
                  <th>创建时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="restaurant in restaurantList" :key="restaurant.id">
                  <td>{{ restaurant.id }}</td>
                  <td>{{ restaurant.name }}</td>
                  <td>{{ getCategoryName(restaurant.category_code || restaurant.categoryCode) }}</td>
                  <td>{{ restaurant.address }}</td>
                  <td>{{ restaurant.phone }}</td>
                  <td>{{ formatDate(restaurant.created_at || restaurant.createdAt) }}</td>
                </tr>
                <tr v-if="restaurantList.length === 0">
                  <td colspan="6" class="empty-cell">暂无门店数据</td>
                </tr>
              </tbody>
            </table>

            <!-- 分页控件 -->
            <div class="pagination" v-if="totalPages > 1">
              <button class="page-btn" :disabled="currentPage === 1" @click="prevPage">上一页</button>
              <span class="page-info">第 {{ currentPage }} / {{ totalPages }} 页</span>
              <button class="page-btn" :disabled="currentPage === totalPages" @click="nextPage">下一页</button>
            </div>
          </div>
        </div>

        <!-- 菜品审核与查询 -->
        <div v-else-if="currentMenu === 'dish-audit'" class="page-content">
          <div class="filter-row">
            <select v-model="dishStatusFilter" @change="loadDishes" class="status-select">
              <option value="">全部状态</option>
              <option value="0">待审核</option>
              <option value="1">已通过</option>
              <option value="2">已拒绝</option>
            </select>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>菜品名称</th>
                  <th>价格</th>
                  <th>状态</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="dish in dishList" :key="dish.id">
                  <td>{{ dish.id }}</td>
                  <td>{{ dish.name }}</td>
                  <td>{{ dish.price }}</td>
                  <td>{{ getStatusName(dish.status) }}</td>
                  <td>{{ formatDate(dish.created_at || dish.createdAt) }}</td>
                  <td v-if="dish.status === 0">
                    <button class="audit-btn" @click="auditDish(dish, 1)">通过</button>
                    <button class="reject-btn" @click="auditDish(dish, 2)">拒绝</button>
                  </td>
                  <td v-else>
                    <span class="no-action">-</span>
                  </td>
                </tr>
                <tr v-if="dishList.length === 0">
                  <td colspan="6" class="empty-cell">暂无菜品数据</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 学校列表 -->
        <div v-else-if="currentMenu === 'school-list'" class="page-content">
          <button class="add-btn" @click="openAddSchoolModal()">添加学校</button>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>学校名称</th>
                  <th>地址</th>
                  <th>经度</th>
                  <th>纬度</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="school in schoolList" :key="school.id">
                  <td>{{ school.id }}</td>
                  <td>{{ school.name }}</td>
                  <td>{{ school.address || '-' }}</td>
                  <td>{{ school.longitude || '-' }}</td>
                  <td>{{ school.latitude || '-' }}</td>
                  <td>{{ formatDate(school.create_time) }}</td>
                  <td>
                    <button class="edit-btn" @click="editSchool(school)">编辑</button>
                    <button class="delete-btn" @click="deleteSchool(school.id)">删除</button>
                  </td>
                </tr>
                <tr v-if="schoolList.length === 0">
                  <td colspan="7" class="empty-cell">暂无学校数据</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 添加/编辑学校弹窗 -->
          <div v-if="showSchoolModal" class="modal-overlay" @click="closeSchoolModal">
            <div class="modal-content" @click.stop>
              <div class="modal-header">
                <h3>{{ editingSchool ? '编辑学校' : '添加学校' }}</h3>
                <button class="close-btn" @click="closeSchoolModal">×</button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>学校名称：</label>
                  <input v-model="schoolForm.name" type="text" class="form-input" placeholder="请输入学校名称">
                </div>
                <div class="form-group">
                  <label>学校地址：</label>
                  <input v-model="schoolForm.address" type="text" class="form-input" placeholder="请输入学校地址">
                </div>
                <div class="form-group">
                  <label>经度：</label>
                  <input v-model="schoolForm.longitude" type="text" class="form-input" placeholder="请输入经度">
                </div>
                <div class="form-group">
                  <label>纬度：</label>
                  <input v-model="schoolForm.latitude" type="text" class="form-input" placeholder="请输入纬度">
                </div>
                <div class="form-actions">
                  <button class="submit-btn" @click="saveSchool">{{ editingSchool ? '保存修改' : '添加' }}</button>
                  <button class="cancel-btn" @click="closeSchoolModal">取消</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 点评列表 -->
        <div v-else-if="currentMenu === 'review-list'" class="page-content">
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户ID</th>
                  <th>用户昵称</th>
                  <th>菜品名称</th>
                  <th>评论内容</th>
                  <th>口味评分</th>
                  <th>环境评分</th>
                  <th>服务评分</th>
                  <th>点赞数</th>
                  <th>评论时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="review in reviewList" :key="review.id">
                  <td>{{ review.id }}</td>
                  <td>{{ review.userId }}</td>
                  <td>{{ review.nickname || '-' }}</td>
                  <td>{{ review.dishName || '-' }}</td>
                  <td class="content-cell">{{ truncateContent(review.content) }}</td>
                  <td>{{ review.tasteScore }}</td>
                  <td>{{ review.environmentScore }}</td>
                  <td>{{ review.serviceScore }}</td>
                  <td>{{ review.likeCount }}</td>
                  <td>{{ formatDate(review.createdAt) }}</td>
                  <td>
                    <button class="edit-btn" @click="viewReviewDetail(review)">查看</button>
                  </td>
                </tr>
                <tr v-if="reviewList.length === 0">
                  <td colspan="11" class="empty-cell">暂无点评数据</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 点评详情弹窗 -->
        <div v-if="showReviewModal" class="modal-overlay" @click="closeReviewModal">
          <div class="modal-content" @click.stop>
            <div class="modal-header">
              <h3>点评详情</h3>
              <button class="close-btn" @click="closeReviewModal">×</button>
            </div>
            <div class="modal-body" v-if="reviewDetail">
              <div class="detail-section">
                <div class="detail-row">
                  <span class="detail-label">ID:</span>
                  <span class="detail-value">{{ reviewDetail.id }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">用户ID:</span>
                  <span class="detail-value">{{ reviewDetail.userId }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">用户昵称:</span>
                  <span class="detail-value">{{ reviewDetail.nickname || '-' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">菜品名称:</span>
                  <span class="detail-value">{{ reviewDetail.dishName || '-' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">评论内容:</span>
                  <span class="detail-value full-content">{{ reviewDetail.content }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">口味评分:</span>
                  <span class="detail-value">{{ reviewDetail.tasteScore }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">环境评分:</span>
                  <span class="detail-value">{{ reviewDetail.environmentScore }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">服务评分:</span>
                  <span class="detail-value">{{ reviewDetail.serviceScore }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">点赞数:</span>
                  <span class="detail-value">{{ reviewDetail.likeCount }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">评论时间:</span>
                  <span class="detail-value">{{ formatDate(reviewDetail.createdAt) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 违规处理 -->
        <div v-else-if="currentMenu === 'violation-handle'" class="page-content">
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户ID</th>
                  <th>用户昵称</th>
                  <th>菜品名称</th>
                  <th>评论内容</th>
                  <th>口味评分</th>
                  <th>环境评分</th>
                  <th>服务评分</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="review in violationList" :key="review.id">
                  <td>{{ review.id }}</td>
                  <td>{{ review.userId }}</td>
                  <td>{{ review.nickname || '-' }}</td>
                  <td>{{ review.dishName || '-' }}</td>
                  <td class="content-cell">{{ review.content }}</td>
                  <td>{{ review.tasteScore }}</td>
                  <td>{{ review.environmentScore }}</td>
                  <td>{{ review.serviceScore }}</td>
                  <td>
                    <button class="audit-btn" @click="handleReview(review, 0)">展示</button>
                    <button class="reject-btn" @click="handleReview(review, 2)">隐藏</button>
                  </td>
                </tr>
                <tr v-if="violationList.length === 0">
                  <td colspan="9" class="empty-cell">暂无违规点评数据</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import request from '../utils/request'

const user = ref({})
const currentMenu = ref('dashboard')
const expandedMenus = ref(['user']) // 默认展开用户管理

// 统计数据
const stats = ref({
  totalUsers: 0,
  totalStores: 0,
  totalReviews: 0,
  pendingStores: 0
})

// 用户列表数据
const userList = ref([])
const filterRole = ref('')
const filterSchool = ref('')

// 学校列表数据
const schoolList = ref([])

// 用户详情数据
const showDetailModal = ref(false)
const userDetail = ref(null)

// 点评列表数据
const reviewList = ref([])

// 点评详情数据
const showReviewModal = ref(false)
const reviewDetail = ref(null)

// 违规处理数据
const violationList = ref([])

// 门店列表数据
const restaurantList = ref([])

// 分页数据
const currentPage = ref(1)
const pageSize = ref(20)
const totalPages = ref(1)

// 门店分类筛选
const categoryFilter = ref('')

// 菜品列表数据
const dishList = ref([])
const dishStatusFilter = ref('')

// 学校管理数据
const showSchoolModal = ref(false)
const editingSchool = ref(null)
const schoolForm = ref({
  name: '',
  address: '',
  longitude: '',
  latitude: ''
})

// 页面标题映射
const pageTitleMap = {
  'dashboard': '仪表盘',
  'user-list': '用户列表',
  'user-detail': '用户详情',
  'status-management': '状态管理',
  'store-audit': '门店审核列表',
  'store-search': '门店查询列表',
  'dish-audit': '菜品审核与查询',
  'review-list': '点评列表',
  'violation-handle': '违规处理',
  'school-list': '学校列表'
}

const pageTitle = computed(() => {
  return pageTitleMap[currentMenu.value] || '仪表盘'
})

onMounted(() => {
  const userInfo = localStorage.getItem('user')
  if (userInfo) {
    user.value = JSON.parse(userInfo)
    loadStats()
  } else {
    window.location.href = '/login'
  }
})

const loadStats = async () => {
  try {
    const response = await request.get('/stats')
    if (response.code === 200) {
      stats.value = response.data
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
  }
}

const navigate = async (menu) => {
  currentMenu.value = menu
  currentPage.value = 1
  if (menu === 'user-list') {
    await loadSchools()
    await loadUsers()
  } else if (menu === 'store-audit') {
    await loadRestaurants(0)
  } else if (menu === 'store-search') {
    categoryFilter.value = ''
    await loadRestaurantsByCategory()
  } else if (menu === 'dish-audit') {
    dishStatusFilter.value = ''
    await loadDishes()
  } else if (menu === 'school-list') {
    await loadSchoolList()
  } else if (menu === 'review-list') {
    await loadReviews()
  } else if (menu === 'violation-handle') {
    await loadViolations()
  }
}

const loadSchools = async () => {
  try {
    const response = await request.get('/schools')
    if (response.code === 200) {
      schoolList.value = response.data
    }
  } catch (error) {
    console.error('获取学校列表失败:', error)
  }
}

const loadUsers = async () => {
  try {
    const params = {}
    if (filterRole.value) params.role = filterRole.value
    if (filterSchool.value) params.schoolId = filterSchool.value
    const response = await request.get('/users', { params })
    if (response.code === 200) {
      userList.value = response.data
    } else {
      ElMessage.error('获取用户列表失败')
    }
  } catch (error) {
    console.error('获取用户列表失败:', error)
    ElMessage.error('网络错误，请稍后重试')
  }
}

const getRoleName = (role) => {
  switch (role) {
    case 0: return '管理员'
    case 1: return '学生'
    case 2: return '商家'
    default: return '未知'
  }
}

const getSchoolName = (schoolId) => {
  if (!schoolId) return ''
  const school = schoolList.value.find(s => s.id === schoolId)
  return school ? school.name : ''
}

const formatDate = (date) => {
  if (!date) return '-'
  if (typeof date === 'string' && date.includes('T')) {
    return date.replace('T', '-').substring(0, 19)
  }
  return new Date(date).toLocaleString('zh-CN')
}

const loadRestaurants = async (status) => {
  try {
    const response = await request.get('/restaurants', { params: { status } })
    if (response.code === 200) {
      restaurantList.value = response.data
    } else {
      ElMessage.error('获取门店列表失败')
    }
  } catch (error) {
    console.error('获取门店列表失败:', error)
    ElMessage.error('网络错误，请稍后重试')
  }
}

const auditRestaurant = async (restaurant, status) => {
  try {
    const response = await request.put(`/restaurants/${restaurant.id}/audit`, null, { params: { status } })
    if (response.code === 200) {
      ElMessage.success(status === 1 ? '审核通过' : '审核拒绝')
      await loadRestaurants(0)
    } else {
      ElMessage.error('审核失败')
    }
  } catch (error) {
    console.error('审核失败:', error)
    ElMessage.error('网络错误，请稍后重试')
  }
}

const viewUserDetail = async (user) => {
  try {
    const response = await request.get(`/users/${user.id}`)
    if (response.code === 200) {
      userDetail.value = response.data
      showDetailModal.value = true
    } else {
      ElMessage.error('获取用户详情失败')
    }
  } catch (error) {
    console.error('获取用户详情失败:', error)
    ElMessage.error('网络错误，请稍后重试')
  }
}

const closeDetailModal = () => {
  showDetailModal.value = false
  userDetail.value = null
}

const truncateContent = (content) => {
  if (!content) return '-'
  const text = String(content)
  if (text.length <= 50) return text
  return text.substring(0, 50) + '...'
}

const viewReviewDetail = (review) => {
  reviewDetail.value = review
  showReviewModal.value = true
}

const closeReviewModal = () => {
  showReviewModal.value = false
  reviewDetail.value = null
}

const loadSchoolList = async () => {
  try {
    const response = await request.get('/schools')
    if (response.code === 200) {
      schoolList.value = response.data
    } else {
      ElMessage.error('获取学校列表失败')
    }
  } catch (error) {
    console.error('获取学校列表失败:', error)
    ElMessage.error('网络错误，请稍后重试')
  }
}

const openAddSchoolModal = () => {
  editingSchool.value = null
  schoolForm.value = {
    name: '',
    address: '',
    longitude: '',
    latitude: ''
  }
  showSchoolModal.value = true
}

const editSchool = (school) => {
  editingSchool.value = school
  schoolForm.value = {
    name: school.name,
    address: school.address || '',
    longitude: school.longitude || '',
    latitude: school.latitude || ''
  }
  showSchoolModal.value = true
}

const closeSchoolModal = () => {
  showSchoolModal.value = false
  editingSchool.value = null
  schoolForm.value = {
    name: '',
    address: '',
    longitude: '',
    latitude: ''
  }
}

const saveSchool = async () => {
  if (!schoolForm.value.name) {
    ElMessage.error('请输入学校名称')
    return
  }

  try {
    let response
    if (editingSchool.value) {
      response = await request.put(`/schools/${editingSchool.value.id}`, schoolForm.value)
    } else {
      response = await request.post('/schools', schoolForm.value)
    }

    if (response.code === 200) {
      ElMessage.success(editingSchool.value ? '更新成功' : '添加成功')
      closeSchoolModal()
      await loadSchoolList()
    } else {
      ElMessage.error(editingSchool.value ? '更新失败' : '添加失败')
    }
  } catch (error) {
    console.error('保存学校失败:', error)
    ElMessage.error('网络错误，请稍后重试')
  }
}

const deleteSchool = async (id) => {
  if (!confirm('确定要删除这所学校吗？')) {
    return
  }

  try {
    const response = await request.delete(`/schools/${id}`)
    if (response.code === 200) {
      ElMessage.success('删除成功')
      await loadSchoolList()
    } else {
      ElMessage.error('删除失败')
    }
  } catch (error) {
    console.error('删除学校失败:', error)
    ElMessage.error('网络错误，请稍后重试')
  }
}

const loadReviews = async () => {
  try {
    const response = await request.get('/reviews')
    if (response.code === 200) {
      reviewList.value = response.data.filter(review => review.status === 0 || review.status === 1)
    } else {
      ElMessage.error('获取点评列表失败')
    }
  } catch (error) {
    console.error('获取点评列表失败:', error)
    ElMessage.error('网络错误，请稍后重试')
  }
}

const loadViolations = async () => {
  try {
    const response = await request.get('/reviews', { params: { status: 1 } })
    if (response.code === 200) {
      violationList.value = response.data
    } else {
      ElMessage.error('获取违规点评列表失败')
    }
  } catch (error) {
    console.error('获取违规点评列表失败:', error)
    ElMessage.error('网络错误，请稍后重试')
  }
}

const handleReview = async (review, status) => {
  try {
    const response = await request.put(`/reviews/${review.id}/status`, null, { params: { status } })
    if (response.code === 200) {
      ElMessage.success(status === 0 ? '已设置为展示' : '已设置为隐藏')
      await loadViolations()
    } else {
      ElMessage.error('操作失败')
    }
  } catch (error) {
    console.error('操作失败:', error)
    ElMessage.error('网络错误，请稍后重试')
  }
}

const loadRestaurantsByCategory = async () => {
  currentPage.value = 1
  console.log('loadRestaurantsByCategory - categoryFilter:', categoryFilter.value, 'typeof:', typeof categoryFilter.value)
  try {
    const url = categoryFilter.value 
      ? `/restaurants?categoryCode=${parseInt(categoryFilter.value)}` 
      : '/restaurants'
    console.log('loadRestaurantsByCategory - url:', url)
    const response = await request.get(url)
    console.log('loadRestaurantsByCategory - response code:', response?.code, 'data length:', response?.data?.length)
    if (response.code === 200) {
      const allData = response.data
      const startIndex = (currentPage.value - 1) * pageSize.value
      const endIndex = startIndex + pageSize.value
      restaurantList.value = allData.slice(startIndex, endIndex)
      totalPages.value = Math.ceil(allData.length / pageSize.value)
    } else {
      ElMessage.error('获取门店列表失败')
    }
  } catch (error) {
    console.error('获取门店列表失败:', error)
    ElMessage.error('网络错误，请稍后重试')
  }
}

const loadRestaurantsWithPage = async (status, page) => {
  try {
    const params = { status }
    if (categoryFilter.value) {
      params.categoryCode = parseInt(categoryFilter.value)
    }
    const response = await request.get('/restaurants', { params })
    if (response.code === 200) {
      const allData = response.data
      const startIndex = (page - 1) * pageSize.value
      const endIndex = startIndex + pageSize.value
      restaurantList.value = allData.slice(startIndex, endIndex)
      totalPages.value = Math.ceil(allData.length / pageSize.value)
      currentPage.value = page
    } else {
      ElMessage.error('获取门店列表失败')
    }
  } catch (error) {
    console.error('获取门店列表失败:', error)
    ElMessage.error('网络错误，请稍后重试')
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    loadRestaurantsWithPage(1, currentPage.value - 1)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    loadRestaurantsWithPage(1, currentPage.value + 1)
  }
}

const loadDishes = async () => {
  try {
    const params = {}
    if (dishStatusFilter.value !== '') {
      params.status = parseInt(dishStatusFilter.value)
    }
    const response = await request.get('/dishes', { params })
    if (response.code === 200) {
      dishList.value = response.data
    } else {
      ElMessage.error('获取菜品列表失败')
    }
  } catch (error) {
    console.error('获取菜品列表失败:', error)
    ElMessage.error('网络错误，请稍后重试')
  }
}

const auditDish = async (dish, status) => {
  try {
    const response = await request.put(`/dishes/${dish.id}/audit`, null, { params: { status } })
    if (response.code === 200) {
      ElMessage.success(status === 1 ? '审核通过' : '审核拒绝')
      await loadDishes()
    } else {
      ElMessage.error('审核失败')
    }
  } catch (error) {
    console.error('审核失败:', error)
    ElMessage.error('网络错误，请稍后重试')
  }
}

const getStatusName = (status) => {
  switch (status) {
    case 0: return '待审核'
    case 1: return '已通过'
    case 2: return '已拒绝'
    default: return '未知'
  }
}

const getCategoryName = (categoryCode) => {
  if (!categoryCode) return '-'
  const code = String(categoryCode)
  switch (code) {
    case '1': return '火锅'
    case '2': return '中餐'
    case '3': return '西餐'
    case '4': return '甜品'
    case '5': return '饮品'
    case '6': return '快餐'
    default: return categoryCode
  }
}

const toggleMenu = (menu) => {
  const index = expandedMenus.value.indexOf(menu)
  if (index > -1) {
    expandedMenus.value.splice(index, 1)
  } else {
    expandedMenus.value.push(menu)
  }
}

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  ElMessage.success('退出登录成功')
  window.location.href = '/login'
}
</script>

<style scoped>
.admin-container {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

/* 侧边栏 */
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 20px;
  background-color: #34495e;
  text-align: center;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
}

.menu-list {
  flex: 1;
  padding: 10px 0;
}

/* 仪表盘菜单项 */
.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: #34495e;
}

.menu-item.active {
  background-color: #3498db;
}

.menu-item.dashboard {
  font-weight: 500;
}

.menu-icon {
  font-size: 18px;
  margin-right: 10px;
}

.menu-text {
  flex: 1;
  font-size: 14px;
  text-align: left;
}

/* 菜单组包装器 */
.menu-group-wrapper {
  margin-top: 5px;
}

/* 菜单组头部（可折叠） */
.menu-group-header {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  background-color: #34495e;
  transition: background-color 0.3s;
}

.menu-group-header:hover {
  background-color: #2c3e50;
}

.menu-arrow {
  font-size: 12px;
  transition: transform 0.3s;
}

.menu-arrow.expanded {
  transform: rotate(180deg);
}

/* 菜单组内容 */
.menu-group-content {
  background-color: #1a252f;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.menu-group-content .menu-item {
  padding-left: 40px;
  font-size: 13px;
}

.menu-group-content .menu-item:hover {
  background-color: #2c3e50;
}

.menu-group-content .menu-item.active {
  background-color: #3498db;
}

/* 主内容区 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 顶部导航 */
.top-nav {
  height: 60px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.nav-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-name {
  font-size: 14px;
  color: #666;
}

.logout-btn {
  padding: 8px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #c0392b;
}

/* 内容区域 */
.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* 仪表盘内容 */
.dashboard-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* 仪表盘统计 */
.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 40px;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: #333;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

/* 快速操作 */
.quick-actions {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quick-actions h3 {
  margin: 0 0 20px 0;
  font-size: 16px;
  color: #333;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.action-card:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
}

.action-icon {
  font-size: 32px;
  margin-bottom: 10px;
}

.action-text {
  font-size: 14px;
  color: #333;
}

/* 页面内容 */
.page-content {
  animation: fadeIn 0.3s ease;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-state p {
  font-size: 16px;
  color: #999;
}

/* 筛选区域 */
.filter-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.role-select,
.school-select {
  padding: 8px 16px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  min-width: 150px;
}

.refresh-btn {
  padding: 8px 16px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.refresh-btn:hover {
  background-color: #66b1ff;
}

.add-btn {
  padding: 8px 16px;
  background-color: #67c23a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
}

.add-btn:hover {
  background-color: #85ce61;
}

.delete-btn {
  padding: 5px 10px;
  background-color: #f56c6c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-left: 5px;
}

.delete-btn:hover {
  background-color: #f78989;
}

.content-cell {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 表单样式 */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #409eff;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.submit-btn:hover {
  background-color: #66b1ff;
}

.cancel-btn {
  padding: 10px 20px;
  background-color: #dcdfe6;
  color: #666;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.cancel-btn:hover {
  background-color: #c0c4cc;
}

/* 表格容器 */
.table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
  max-height: calc(100vh - 300px);
}

.data-table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
  white-space: nowrap;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
  position: sticky;
  top: 0;
  z-index: 1;
}

.data-table th:nth-child(1),
.data-table td:nth-child(1) {
  width: 80px;
}

.data-table th:nth-child(2),
.data-table td:nth-child(2) {
  width: 150px;
}

.data-table th:nth-child(3),
.data-table td:nth-child(3) {
  width: 100px;
}

.data-table th:nth-child(4),
.data-table td:nth-child(4) {
  width: 250px;
}

.data-table th:nth-child(5),
.data-table td:nth-child(5) {
  width: 100px;
}

.data-table tbody tr:hover {
  background-color: #f5f7fa;
}

.empty-cell {
  text-align: center;
  color: #999;
  padding: 60px;
}

.edit-btn {
  padding: 5px 12px;
  background-color: #67c23a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.edit-btn:hover {
  background-color: #85ce61;
}

.audit-btn {
  padding: 5px 10px;
  background-color: #67c23a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-right: 5px;
}

.audit-btn:hover {
  background-color: #85ce61;
}

.reject-btn {
  padding: 5px 10px;
  background-color: #f56c6c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.reject-btn:hover {
  background-color: #f78989;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.page-btn {
  padding: 8px 16px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.page-btn:hover:not(:disabled) {
  background-color: #66b1ff;
}

.page-btn:disabled {
  background-color: #dcdfe6;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: #666;
}

/* 筛选行 */
.filter-row {
  margin-top: 10px;
}

.status-select {
  padding: 8px 16px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  min-width: 150px;
}

/* 无操作提示 */
.no-action {
  color: #999;
}

/* 弹窗遮罩 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* 弹窗内容 */
.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 700px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* 弹窗头部 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e8e8e8;
  background-color: #f8f9fa;
}

.modal-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.close-btn {
  width: 28px;
  height: 28px;
  border: none;
  background-color: transparent;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  line-height: 24px;
}

.close-btn:hover {
  color: #666;
}

/* 弹窗主体 */
.modal-body {
  padding: 20px;
  overflow-y: auto;
  max-height: calc(80vh - 60px);
}

/* 详情区块 */
.detail-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
}

.detail-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.detail-section h4 {
  margin: 0 0 15px 0;
  font-size: 14px;
  color: #333;
  font-weight: 600;
}

/* 详情行 */
.detail-row {
  display: flex;
  margin-bottom: 10px;
}

.detail-label {
  width: 80px;
  color: #999;
  font-size: 14px;
}

.detail-value {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.detail-value.full-content {
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 200px;
  overflow-y: auto;
}

/* 记录列表 */
.record-list {
  max-height: 200px;
  overflow-y: auto;
}

.record-item {
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  margin-bottom: 10px;
}

.record-item:last-child {
  margin-bottom: 0;
}

.record-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.record-rating,
.record-restaurant {
  font-size: 13px;
  color: #333;
}

.record-time {
  font-size: 12px;
  color: #999;
}

.record-content {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

/* 空提示 */
.empty-notice {
  text-align: center;
  color: #999;
  padding: 20px;
  font-size: 14px;
}
</style>
