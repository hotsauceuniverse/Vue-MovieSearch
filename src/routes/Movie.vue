<template>
  <div class="container">
    <template v-if="loading">
      <div class="skeletons">
      <div class="skeleton poster"></div>
      <div class="specs">
        <div class="skeleton title"></div>
        <div class="skeleton spec"></div>
        <div class="skeleton plot"></div>
        <div class="skeleton etc"></div>
        <div class="skeleton etc"></div>
        <div class="skeleton etc"></div>
      </div>
    </div>
    <Loader 
    :size="3"
    :z-index="9" 
    :fixed="true" />
    </template>
    <div v-else class="movie-details">
      <div 
        :style="{ backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})` }"
        class="poster">
        <Loader 
        v-if="imageLoading"
        absolute />  
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <div 
              v-for="{ Source: name, Value: score } in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating">
              <img 
                :src="`https://raw.githubusercontent.com/hotsauceuniverse/Vue-MovieSearch/main/src/assets/${name}.png`" 
                :alt="name" />
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>                
      </div>
    </div>
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
    ...mapState('movie', [
      'theMovie',
      'loading'
    ])
    // theMovie() {
    //   return this.$store.state.movie.theMovie
    // },
    // loading() {
    //   return this.$store.state.movie.loading
    // } 위 코드와 동일 -> vuex의 ...mapState를 사용해 코드 단순화
  },
  created() {
    console.log(this.$route)
    this.$store.dispatch('movie/searchMovieWithId', {
      id: this.$route.params.id
    })
  }, 
  methods: {
    requestDiffSizeImage(url, size = 700) {
      if(!url || url === 'N/A') {
        this.imageLoading = false
        return '' // 하나의 문자데이터를 반환해서 백그라운드이미지로 사용해야되기 때문에 undefined를 반환하지 않게 '' 빈문자열 반환 설정
      } // 영화 포스터가 없거나 해당 사항이 없을 경우 로딩 아이콘이 계속 돌기 때문에 예외처리 과정
      const src = url.replace('SX300', `SX${size}`) // 화면에 노출되는 300px의 해상도를 700px의 고해상도로 맞추는 작업
      this.$loadImage(src) // async/await를 쓰지 않는 이유 : 로딩이 끝나고 나서야 src라는 이미지 주소가 반환되는 문제가 생김
        .then(() => {
          this.imageLoading = false
        })
      return src
    }
  } 
}
</script>

<style lang='scss' scoped>
@import '../scss/main';

.container {
  padding-top: 40px; 
}
.skeletons {
  display: flex;
  .poster{
    flex-shrink: 0; // 감소너비 사용 X -> (화면이 줄어들더라도 포스터는 줄어들지 않음)
    width: 500px;
    height: 500px * 3 / 2;
    margin-right: 70px;
  }
  .specs {
    flex-grow: 1; // 증가너비를 최대한 사용
  }
  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}
.movie-details {
  display: flex;
  color: $gray-600;
  .poster {
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3 / 2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .specs {
    flex-grow: 1;
    .title {
      color: $black;
      font-family: 'Oswald', sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels {
      color: $primary;
      span {
        &::after {
          content: "\00b7"; // 가운데 점 표시방법 표기
          margin: 0 6px
        }
        &:last-child::after {
          display: none;
        } // 마지막 span에 오른쪽부분의 점 표시는 안보이게 설정
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: 'Oswald', sans-serif;
      font-size: 20px;
    }
  }  
  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: 300px * 3 / 2;
      margin-right: 40px;
    }
  } // 반응형 만들기
  @include media-breakpoint-down(lg) {
    display: block;
    .poster {
      margin-bottom: 40px;
    }
  } // 반응형 만들기
  @include media-breakpoint-down(md) {
    .specs {
      .title {
        font-size: 50px;
      }
      .ratings {
        .rating-wrap {
          display: block;
          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  } // 반응형 만들기
}

</style>
