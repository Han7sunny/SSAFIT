import * as types from './ActionTypes'

export const add = () => ({
    type : types.ADD
})
export const remove = () => ({
    type : types.REMOVE
})
export const increment = () => ({
    type : types.INCREMENT,
    index
})
export const decrement = () => ({
    type : types.DECREMENT,
    index
})