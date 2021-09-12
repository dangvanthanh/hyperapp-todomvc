import { h } from 'hyperapp'
import { ENTER_KEY, uuid } from '../utils'
import store from '../store'

const NewTodo = (value) => ({
  id: uuid(),
  done: false,
  editing: false,
  value,
})

const OnInput = (state, event) => {
  const input = event.target.value
  const newState = { ...state, input }
  return newState
}

const AddTodo = (state, event) => {
  const todos = state.todos.concat(NewTodo(event.target.value))
  store.save(todos)
  const newState = { ...state, input: '', todos }
  return newState
}

const OnKeyDown = (state, event) => {
  if (event.keyCode === ENTER_KEY && event.target.value !== '') {
    return AddTodo(state, event)
  }
  return state
}

export default (props) =>
  h('div', {}, [
    h('input', {
      type: 'text',
      class: 'new-todo',
      onkeydown: OnKeyDown,
      oninput: OnInput,
      value: props.input,
      placeholder: props.placeholder,
    }),
  ])
