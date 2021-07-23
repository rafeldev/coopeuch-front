import axios from 'axios'
import { getTask, getTasks, taskAdded, taskDelete, taskUpdated } from '../redux/actions';


export const loadTasks = () => {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_API}`)
    .then((res) => dispatch(getTasks(res.data)))
    .catch((error) => console.log(error))
  }
}

export const deleteTask = (id) => {
  return function(dispatch) {
    axios.delete(`${process.env.REACT_APP_API}/${id}`)
    .then((res) => {
      dispatch(taskDelete())
      dispatch(loadTasks())
    })
    .catch((error) => console.log(error))
  }
}


export const addTaskAction = (user) => {
  return function(dispatch) {
    axios.post(`${process.env.REACT_APP_API}`, user)
    .then((res) => {
      dispatch(taskAdded())
      // dispatch(loadUsers())
    })
    .catch((error) => console.log(error))
  }
}

export const getSingleTask = (id) => {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_API}/${id}`)
    .then((res) => {
      dispatch(getTask(res.data))
    })
    .catch((error) => console.log(error))
  }
}

export const updateTask = (user, id) => {
  return function(dispatch) {
    axios.put(`${process.env.REACT_APP_API}/${id}`, user)
    .then((res) => {
      dispatch(taskUpdated())
    })
    .catch((error) => console.log(error))
  }
}