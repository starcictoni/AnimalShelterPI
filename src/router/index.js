import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import NewAnimalView from '../views/NewAnimalView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login-view',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register-view',
    component: RegisterView
  },
  {
    path: '/profile',
    name: 'profile-view',
    component: ProfileView
  },
  {
    path: '/animal',
    name: 'new-animal-view',
    component: NewAnimalView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
