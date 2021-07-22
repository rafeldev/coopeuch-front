import { GET_USERS, DELETE_USER, ADD_USER, GET_SINGLE_USER, UPPDATE_USER } from './actionType';

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

export const userUpdated = () => ({
  type: UPPDATE_USER
})

export const getUser = (user) => ({
  type: GET_SINGLE_USER,
  payload: user
})

