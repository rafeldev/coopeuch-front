import { GET_TASKS, DELETE_TASK, ADD_TASK, GET_SINGLE_TASK, UPPDATE_TASK, OPEN_TASK } from "./actionType";


const initialState = {
  tasks: [],
  task: {},
  loading: true
}

const tasksReducer = (state = initialState, action) => {
  const { payload, type } = action

  switch(type){
    case GET_TASKS: 
      return { 
        ...state,
        tasks: payload,
        loading: false
      }
    case OPEN_TASK: {
      let newArray = state.tasks.map((task) => { 
        // eslint-disable-next-line eqeqeq
        if(task.id == payload.id){
          task.open = !task.open
        }
        return task
      })
      return {
        ...state,
        tasks: newArray
      }
    }
    case DELETE_TASK:
    case ADD_TASK:
    case UPPDATE_TASK:
      return {
        ...state,
        loading: false,

      }
    case GET_SINGLE_TASK: 
      return {
        ...state,
        task: payload,
        loading: false
      }
    default:
      return state
  }
}

export default tasksReducer;