import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js'
import store from './store/index.js'
import loadImage from './plugins/loadImage.js'

createApp(App)
  .use(router) // $route, $router
  .use(store) // $store
  .use(loadImage) // $loadImage
  .mount('#app')

// use라는 메소드는 vue에 연결할 플러그인 / 라이브러리들을 지정하는 용도
