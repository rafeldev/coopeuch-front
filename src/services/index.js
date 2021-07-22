import axios from 'axios'
import { getUser, getUsers, userAdded, userDelete, userUpdated } from '../redux/actions';


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

export const getSingleUser = (id) => {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_API}/${id}`)
    .then((res) => {
      dispatch(getUser(res.data))
    })
    .catch((error) => console.log(error))
  }
}

export const updateUser = (user, id) => {
  return function(dispatch) {
    axios.put(`${process.env.REACT_APP_API}/${id}`, user)
    .then((res) => {
      dispatch(userUpdated())
    })
    .catch((error) => console.log(error))
  }
}