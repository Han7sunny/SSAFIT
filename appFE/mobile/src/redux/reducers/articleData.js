// 액션 타입 정의
const GET_ARTICLEDATA = 'articleData/GET_ARTICLEDATA'
const INIT_ARTICLEDATA = 'articleData/INIT_ARTICLEDATA'

// 액션 생성 함수
export const getArticleData = (data) => ({
  data: data,
  type: GET_ARTICLEDATA
})
export const initArticleData = () => ({type:INIT_ARTICLEDATA})

// 초기값 설정
const initialState = {
  articleData: [],
}

// 리듀서 선언
export default function articleData(state=initialState, action) {
  switch(action.type) {
    case GET_ARTICLEDATA:
      return {...action.data}
    case INIT_ARTICLEDATA:
      return initialState
    default:
      return state
  }
}