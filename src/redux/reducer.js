import { GET_USERS, DELETE_USER, ADD_USER } from "./actionType";


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
    case ADD_USER:
    default:
      return state
  }
}

export default usersReducer;