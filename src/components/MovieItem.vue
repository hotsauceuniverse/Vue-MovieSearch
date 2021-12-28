<template>
  <div 
    :style="{ backgroundImage: `url(${movie.Poster})` }"
    class="movie">
    <Loader 
      v-if="imageLoading"
      :size="1.5"
      absolute /> 
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './Loader.vue'

export default {
  components: {
    Loader
  },
  props: {
    movie: {
      type: Object,
      dufault: () => ({})
    }
  },
  data() {
    return {
      imageLoading: true
    }
  },
  mounted() {
    this.init()
  }, 
  // movieItem이라는 component가 mounted, 즉 연결이 된 직후에 init이라는 메소드가 동작
  // created를 사용하면 안되는 이유 : component가 생성된 직후에 동작하기 때문이다. (html구조가 연결되지 않았다.) 
  methods: {
    async init() {
      await this.$loadImage(this.movie.Poster)
      this.imageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/main";

.movie {
  $width: 200px;
  width: $width;
  height: $width  * 3 / 2 ;
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover;
  overflow: hidden;
  position: relative;
  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0; // 테두리선잡기(top, bottom, left, right = 0)
    border: 6px solid $primary;
  }
  .info {
    background-color: rgba($black, .3);
    width: 100%;
    padding: 14px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
    .year {
      color: $primary;
    }
    .title {
      color: $white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
