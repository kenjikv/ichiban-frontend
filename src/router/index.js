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
    path: PAGE.ZONE.PATH,
    name: PAGE.ZONE.NAME,
    component: () => import('../views/zone/Zone')
  },
  {
    path: PAGE.TURN.PATH,
    name: PAGE.TURN.NAME,
    component: () => import('../views/turn/Turn')
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
    component: () => import('../views/product/Product')
  },
  {
    path: PAGE.PRODUCT_DETAIL.PATH,
    name: PAGE.PRODUCT_DETAIL.NAME,
    component: () => import('../views/product/DetailProduct')
  },
  {
    path: PAGE.SERVICE.PATH,
    name: PAGE.SERVICE.NAME,
    component: () => import('../views/service/Service')
  },
  {
    path: PAGE.SERVICE_DETAIL.PATH,
    name: PAGE.SERVICE_DETAIL.NAME,
    component: () => import('../views/service/DetailService')
  },
  {
    path: PAGE.VACCINE.PATH,
    name: PAGE.VACCINE.NAME,
    component: () => import('../views/vaccine/Vaccine')
  },
  {
    path: PAGE.VACCINE_DETAIL.PATH,
    name: PAGE.VACCINE_DETAIL.NAME,
    component: () => import('../views/vaccine/DetailVaccine')
  },
  {
    path: PAGE.PAYMENT.PATH,
    name: PAGE.PAYMENT.NAME,
    component: () => import('../views/payment/Payment')
  },
  {
    path: PAGE.CASH.PATH,
    name: PAGE.CASH.NAME,
    component: () => import('../views/cash/Cash')
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
