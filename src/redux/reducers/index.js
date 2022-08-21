import { combineReducers } from "redux";

import chat from './chat'

const createRootreducer = () => {
  return combineReducers({
    chat
  })
}

export default createRootreducer