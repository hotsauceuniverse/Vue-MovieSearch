export default {
  install(app) {
    app.config.globalProperties.$loadImage = src => {
      return new Promise(resolve => {
        const img = document.createElement('img')
        img.src = src
        img.addEventListener('load', () => {
          // 완료
          resolve()
        })
      })
    } 
  }
}

// loadImage라는 플러그인은 비동기로 동작하게 만듬
// loadImage를 실행했을 때, 약속의 객체가 반환되는데 image의 load가 끝나면 다음 상태를 보장하는 약속

 