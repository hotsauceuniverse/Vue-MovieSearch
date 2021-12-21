import { createRouter, createWebHashHistory } from "vue-router";
import Home from './Home.vue'
import Movie from './Movie.vue'
import About from './About.vue'

export default createRouter({
  // Hash mode - 특정페이지에서 새로고침을 했을 때, 페이지를 찾을 수 없다는 메세지를 방지 할 수 있다.
  history: createWebHashHistory(),
  // pages
  routes: [
    {
      path:'/', // 메인페이지 이동의미
      component: Home
    },
    {
      path:'/movie', 
      component: Movie
    },
    {
      path:'/about', 
      component: About
    }
  ]
})