import { GET_USERS } from './actionType';
import axios from 'axios'


export const getUsers = (users) => ({
  type: GET_USERS,
  payload: users,
})

export const loadUsers = () => {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_API}`)
    .then((res) => dispatch(getUsers(res.data)))
    .catch((error) => console.log(error))
  }
}

