import { PAGE } from '@/helpers/data-value-common'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: PAGE.REDIRECT.PATH, // Catch all or 404 Not Found route
    name: PAGE.REDIRECT.NAME,
    component: () => import('../views/Index')
  },
  {
    path: PAGE.BASE.PATH,
    name: PAGE.BASE.NAME,
    component: () => import('../views/Index')
  },
  {
    path: PAGE.LOGIN.PATH,
    name: PAGE.LOGIN.NAME,
    component: () => import('../views/auth/Login')
  },
  {
    path: PAGE.FORGOT.PATH,
    name: PAGE.FORGOT.NAME,
    component: () => import('../views/auth/Forgot')
  },
  {
    path: PAGE.DASHBOARD.PATH,
    name: PAGE.DASHBOARD.NAME,
    component: () => import('../views/dashboard/Dashboard')
  },
  {
    path: PAGE.USER.PATH,
    name: PAGE.USER.NAME,
    component: () => import('../views/user/Index')
  },
  {
    path: PAGE.USER_DETAIL.PATH,
    name: PAGE.USER_DETAIL.NAME,
    component: () => import('../views/user/Detail')
  },
  {
    path: PAGE.ROLE.PATH,
    name: PAGE.ROLE.NAME,
    component: () => import('../views/role/Role')
  },
  {
    path: PAGE.CUSTOMER.PATH,
    name: PAGE.CUSTOMER.NAME,
    component: () => import('../views/customer/Index')
  },
  {
    path: PAGE.CUSTOMER_DETAIL.PATH,
    name: PAGE.CUSTOMER_DETAIL.NAME,
    component: () => import('../views/customer/Detail')
  },
  {
    path: PAGE.CATEGORY.PATH,
    name: PAGE.CATEGORY.NAME,
    component: () => import('../views/category/Index')
  },
  {
    path: PAGE.CATEGORY_DETAIL.PATH,
    name: PAGE.CATEGORY_DETAIL.NAME,
    component: () => import('../views/category/Detail')
  },
  {
    path: PAGE.PRODUCT.PATH,
    name: PAGE.PRODUCT.NAME,
    component: () => import('../views/product/Index')
  },
  {
    path: PAGE.PRODUCT_DETAIL.PATH,
    name: PAGE.PRODUCT_DETAIL.NAME,
    component: () => import('../views/product/Detail')
  },
  {
    path: PAGE.SUPPLIER.PATH,
    name: PAGE.SUPPLIER.NAME,
    component: () => import('../views/service/Service')
  },
  {
    path: PAGE.SUPPLIER_DETAIL.PATH,
    name: PAGE.SUPPLIER_DETAIL.NAME,
    component: () => import('../views/service/DetailService')
  },
  {
    path: PAGE.EMPLOYEE.PATH,
    name: PAGE.EMPLOYEE.NAME,
    component: () => import('../views/employee/Index.vue')
  },
  {
    path: PAGE.EMPLOYEE_DETAIL.PATH,
    name: PAGE.EMPLOYEE_DETAIL.NAME,
    component: () => import('../views/employee/Detail.vue')
  },
  {
    path: PAGE.REPORT.PATH,
    name: PAGE.REPORT.NAME,
    component: () => import('../views/report/Report')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
