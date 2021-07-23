import React from 'react';
import {screen, render} from '@testing-library/react' 
import Home from '../page/Home'
import App from '../App'

import { Provider } from 'react-redux'

describe('Home', () => {
  it('must display a title', () => {
    render(<Home />)
    expect(screen.queryByText(/Prueba/i)).toBeInTheDocument()
  })
})

describe('With React Testing Library', () => {
  const initialState = {output:10}
  let store,wrapper

  it('Shows "Hello world!"', () => {
    store = initialState
    const { getByText } = render(<Provider store={store}><App /></Provider>)

    expect(getByText('Hello Worldd!')).not.toBeNull()
  })
})