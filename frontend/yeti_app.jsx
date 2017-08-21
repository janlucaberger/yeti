import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store'

document.addEventListener("DOMContentLoaded", () => {
  let preloadedState = { session: { current_user: null}}
  if (window.current_user) {
    preloadedState.session.current_user = window.current_user
    delete window.current_user
  }

  const store = configureStore(preloadedState)
  window.store = store
  const root = document.getElementById('root')
  ReactDOM.render(<Root store={store} />, root)
})
