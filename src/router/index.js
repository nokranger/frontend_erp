import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
// import Login from '../views/login.vue'
import Dashboard from '../views/dashboard.vue'
import Approveleave from '../views/approve_leave.vue'
import ApproveTransportation from '../views/approve_transportation.vue'
import ApprovePettycash from '../views/approve_prettycash.vue'
// import Printpdf from '../components/printpdf.vue'
import LeaveReport from '../views/leave_report.vue'
import TransportationReport from '../views/transportation_report.vue'
import PettyCash from '../views/petty_cash.vue'
import Profile from '../views/profile.vue'
import MenuRequest from '../views/menu_record.vue'
import MenuApprove from '../views/menu_Approve.vue'
import Plan from '../components/plan.vue'
import Resetpassword from '../views/reset_password.vue'
// import aaa from '../../lptt_erp/public/uploads/prettycash'

import Meta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(Meta)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/approveleave',
    name: 'approve_leave',
    component: Approveleave
  },
  {
    path: '/approvetrans',
    name: 'Approve_trans',
    component: ApproveTransportation
  },
  {
    path: '/approvepettycash',
    name: 'approve_pettycash',
    component: ApprovePettycash
  },
  {
    path: '/leavereport',
    name: 'leave_report',
    component: LeaveReport
  },
  {
    path: '/transreport',
    name: 'trans_report',
    component: TransportationReport
  },
  {
    path: '/pettycash',
    name: 'petty_cash',
    component: PettyCash
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/menurequest',
    name: 'menurequest',
    component: MenuRequest
  },
  {
    path: '/menuapprove',
    name: 'menuapprove',
    component: MenuApprove
  },
  {
    path: '/plan',
    name: 'plan',
    component: Plan
  },
  {
    path: '/password_reset',
    name: 'passwordreset',
    component: Resetpassword
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
