<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div 
        v-for="nav in navigations" 
        :key="nav.name"  
        class="nav-item">
        <RouterLink 
          :to="nav.href" 
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>  
      </div>
    </div>
    <!-- 위 코드 해석
      navigations 부분에서 각각의 nav이름으로 받아서 그 안에 name과 href라는 속성을 사용하고 있는데
      movie부분에서 새롭게 path라는 속성을 추가했고, path의 정규표현식을 isMatch라는 메소드 부분에 인수로 넣어서 
      실제로 일치하는지 판단하여 true/false를 반환하게 되며
      Boolean값이 true일 때, active라는 class가 RouterLink에 붙을 수 있고 버튼이 활성화 될 수 있다.
     -->
     <div class="user" @click="toAbout">
       <img :src="image" :alt="name">
     </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Logo from './Logo.vue'

export default {
  components: {
    Logo
  },

  data() {
    return {
      navigations: [
        {
          name: 'Serch',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie/tt4520988',
          path: /^\/movie/  // 정규표현식 -> '/movie'로 시작하는 경로인 경우 일치를 하겠다라는 의미
        },
        {
          name: 'About',
          href: '/about'
        },
      ]
    }
  },
  computed: {
    ...mapState('about', [
      'image',
      'name'
    ])
    // image() {
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // } 위 코드와 동일 -> vuex의 ...mapState를 사용해 코드 단순화
  },
  methods: {
    isMatch(path) {
      if(!path) return false
      console.log(this.$route)
      return path.test(this.$route.fullPath)
    },
    toAbout() {
      this.$router.push('/about')
    } // RouterLink가 아닌 클릭 이벤트로도 페이지 이동을 할 수 있다.
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;    
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  @include media-breakpoint-down(sm) {
    .nav{
      display: none;
    }
  } // 반응형 만들기
}
</style>
