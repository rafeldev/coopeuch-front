

const initialState = {
  users: [],
  user: {},
  loading: false
}

const usersReducer = (state = initialState, action) => {
  const { payload, type } = action
  switch(type){
    default:
      return state
  }
}

export default usersReducer;