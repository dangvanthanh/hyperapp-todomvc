import { app } from 'hyperapp'
import actions from './actions'
import state from './state'
import view from './views'
import store from './store'

const init = (state) => {
  state.todos = store.fetch()
  state.todos = state.todos.map(todo => {
    todo.editing = false
    return todo
  })
}

app({ init, state, actions, view }, document.getElementById('app'))