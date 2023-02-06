const GET_ARTICLEDATA = 'articleData/GET_ARTICLEDATA'
const INIT_ARTICLEDATA = 'articleData/INIT_ARTICLEDATA'

export const getArticleData = (data) => ({
  data: data,
  type: GET_ARTICLEDATA
})
export const initArticleData = () => ({type:INIT_ARTICLEDATA})

const initialState = {
  articleData: [],
}

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