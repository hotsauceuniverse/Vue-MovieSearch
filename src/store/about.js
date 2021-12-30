// 개발자 정보, 사용자 정보를 취급하는 용도
export default {
  namespaced: true,
  state: () => ({
    name: 'Seyoung',
    email: 'jangse8931@google.com',
    github: 'https://github.com/hotsauceuniverse',
    phone: '010-5063-6976',
    image: 'https://raw.githubusercontent.com/hotsauceuniverse/My-Portfolio/main/image/my%20image.jpg'
    }) // 상태부분을 함수로 만들어야 되는 이유 : 객체데이터는 배열데이터와 동일하게 참조형데이터이며, 데이터의 불변성을 유지하기 위해 함수로 만듬 
  }
