import { bindActionCreators } from 'redux'
import * as userDataAction from '../reducers/userData'
import * as articleDataAction from '../reducers/articleData'

import { store } from '../store'

const { dispatch } = store

export const UserDataAction = bindActionCreators(userDataAction, dispatch)
export const ArticleDataAction = bindActionCreators(articleDataAction, dispatch)