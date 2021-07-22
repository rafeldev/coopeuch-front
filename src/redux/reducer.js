import { GET_USERS, DELETE_USER } from "./actionType";


const initialState = {
  users: [],
  user: {},
  loading: true
}

const usersReducer = (state = initialState, action) => {
  const { payload, type } = action

  switch(type){
    case GET_USERS: 
      return { 
        ...state,
        users: payload,
        loading: false
      }
    case DELETE_USER:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default usersReducer;