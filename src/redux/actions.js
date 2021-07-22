import { GET_USERS, DELETE_USER, ADD_USER } from './actionType';
import axios from 'axios'


export const getUsers = (users) => ({
  type: GET_USERS,
  payload: users,
})

export const userDelete = () => ({
  type: DELETE_USER
})

export const userAdded = () => ({
  type: ADD_USER
})

export const loadUsers = () => {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_API}`)
    .then((res) => dispatch(getUsers(res.data)))
    .catch((error) => console.log(error))
  }
}

export const deleteUser = (id) => {
  return function(dispatch) {
    axios.delete(`${process.env.REACT_APP_API}/${id}`)
    .then((res) => {
      dispatch(userDelete())
      dispatch(loadUsers())
    })
    .catch((error) => console.log(error))
  }
}


export const addUserAction = (user) => {
  return function(dispatch) {
    axios.post(`${process.env.REACT_APP_API}`, user)
    .then((res) => {
      dispatch(userAdded())
      // dispatch(loadUsers())
    })
    .catch((error) => console.log(error))
  }
}