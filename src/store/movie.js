// 영화 검색과 관련된 데이터를 취급하는 용도

import axios from 'axios' // http요청을 날릴 수 있는 패키지
import _uniqBy from 'lodash/uniqBy' // 영화 중복값 제거 _uniqBy

const _defaultMessage = 'Search for the movie title!'

export default {
  // module! - 현재 파일(movie.js)을 Store 모듈로 활용하려면 다음 옵션이 필요합니다
  namespaced: true,
  // data! - 상태(State)는 함수로 만들어서 객체 데이터를 반환해야 가변 이슈(데이터 불변성)가 발생하지 않습니다!
  state: () => ({ 
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  // computed!
  getters: {},
  // methods!
  // 변이(변경) - mutations에서만 데이터를 수정할 수 있다.
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading'] 배열데이터로 만듬
      Object.keys(payload).forEach(key => { // 객체데이터의 속성의 이름들을 가지고 새로운 배열 데이터를 만들어줌
        state[key] = payload[key]
      }) 
    },
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    } // 메인으로 왔을 때 상태 초기화 코드
  },
  // 비동기처리 - 변이(Mutations)가 아닌 나머지 모든 로직을 관리합니다.
  actions: {
    async searchMovies({ state, commit }, payload) {
      if(state.loading) {
        return 
      } // 최초 searchMovies라는 액션을 실행 -> loading값은 false -> 조건문 실행 X -> 아래의 로직 실행
        // 사용자가 enter키를 여러번 누르거나 해서 searchMovies라는 액션을 또 동작 시킬 때 -> loading값은 true의 상태 ->return문 실행
        // 사용자가 searchMovies를 여러번 실행하는 것을 방지
        commit('updateState', {
        message: '', // 검색을 하기 시작하면 빈문자열로 시작하게 만듬(메세지 초기화)
        loading: true
      }) 

      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID') // 영화 중복값 제거 _uniqBy
        })
        console.log(totalResults) 
        console.log(typeof totalResults) // String
  
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)
  
        // 추가요청!
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page +=1) {
            if(page > (payload.number / 10)) break 
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
            })
          }
        }
      } catch(message) {
        commit('updateState', {
          movies:[],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({ state, commit}, payload) {
      if(state.loading) return

      commit('updateState', {
        theMovie: {},
        loading: true
      })
      
      try {
        const res = await _fetchMovie(payload) 
        commit('updateState', {
          theMovie: res.data
        })
      } catch(error) {
        commit('updateState', {
          thieMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}
// context: state, getters, mutations를 활용할 수 있는 내용
// payload: searchMovies가 실행 될 때 인수로 들어온 특정한 데이터를 받아줌

function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id  // 삼항연산자
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios.get(url)
    .then(res => {
      if (res.data.Error) {
        reject(res.data.Error)
      } // 예외처리
      resolve(res)
    })
    .catch(err => {
      reject(err.message)
    })
  })
}
