<template>
  <div class="container">
    <div 
      :class="{ 'no-result': !movies.length }" 
      class="inner">
      <Loader v-if="loading" />
      <div v-if="message" class="message">
        {{ message }}
      </div>
      <div v-else class="movies">
        <MovieItem  
        v-for="movie in movies"  
        :key="movie.imdbID"
        :movie="movie" /></div> 
    </div>
  </div>
  <!-- v-for의 movies는 computed의 movies(배열 데이터) -->
  <!-- for문의 movies라는 배열데이터 안에서 각각의 객체 아이템을 v-for라는 디렉티브로 반복해서 movie라는 이름으로 사용하는 것이고,
   그 movie안에 imdbID라는 속성의 문자데이터로 반복되는 아이템의 고유값을 정의해 주고, 
   그 객체데이터 자체인 movie라는 데이터를 movie라는 이름으로 MovieItem이라는 컴포넌트에 전달해 준다. -->
</template>

<script>
import MovieItem from './MovieItem.vue'
import Loader from './Loader.vue'

export default {
  computed: {
    movies() {
      return this.$store.state.movie.movies
    },
    message() {
      return this.$store.state.movie.message
    },
    loading() {
      return this.$store.state.movie.loading
    }
  },

  components: {
    MovieItem,
    Loader
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
  }
  .message {
    color: $gray-400;
    font-size : 20px;
  }
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
