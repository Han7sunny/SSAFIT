// 액션 타입 정의
const MODIFY_USERDATA = 'userData/MODIFY_USERDATA'
const INIT_USERDATA = 'userData/INIT_USERDATA'

// 액션 생성함수
export const modifyUserData = (data) => ({
  data: data,
  type: MODIFY_USERDATA
})
export const initUserData = () => ({type:INIT_USERDATA})

// 초기값 설정
const initialState = {
  name: "",
  id: "",
  email: "",
  token: "",
}

// 리듀서 선언
export default function userData(state=initialState, action) {
  switch(action.type) {
    case MODIFY_USERDATA:
      return {...action.data}
    case INIT_USERDATA:
      return initialState
    default:
      return state
  }
}