import { app } from 'hyperapp'
import actions from './actions'
import state from './state'
import view from './views'
import store from './store'

const init = (state) => {
  state.todos = store.fetch()
}

app({ init, state, actions, view }, document.getElementById('app'))