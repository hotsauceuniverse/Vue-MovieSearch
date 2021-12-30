<template>
  <div class="about">
    <div class="photo">
      <Loader 
       v-if="imageLoading"
       absolute />
      <img :src="image" alt="name">
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ github }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '../components/Loader.vue'

export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    ...mapState('about', [  // (모듈, [베열데이터])
      'image',
      'name',
      'email',
      'github',
      'phone'
    ]) 
    // image() {
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // },
    // email() {
    //   return this.$store.state.about.email
    // },
    // github() {
    //   return this.$store.state.about.github
    // },
    // phone() {
    //   return this.$store.state.about.phone
    // } 위 코드와 동일 -> vuex의 ...mapState를 사용해 코드 단순화
  },
  mounted() {
    this.init()
  }, // lifeCycle은 비동기도 동작하지 않기 떄문에 async/await를 쓰면 안된다.
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';

.about {
  text-align: center;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .name {
    font-size: 40px;
    font-family: 'Oswald', sans-serif;
    margin-bottom: 20px;
  }
}
</style>
