import { GET_TASKS, DELETE_TASK, ADD_TASK, GET_SINGLE_TASK, UPPDATE_TASK, OPEN_TASK } from './actionType';

export const getTasks = (users) => ({
  type: GET_TASKS,
  payload: users,
})

export const taskDelete = () => ({
  type: DELETE_TASK
})

export const taskAdded = () => ({
  type: ADD_TASK
})

export const taskUpdated = () => ({
  type: UPPDATE_TASK
})

export const getTask = (user) => ({
  type: GET_SINGLE_TASK,
  payload: user
})

export const openTask = (id) => ({
  type: OPEN_TASK,
  payload: {id}
})
