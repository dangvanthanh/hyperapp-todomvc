import { uuid } from '../utils'

export default {
  input: (state, actions, { value }) => ({
    input: value
  }),
  add: (state) => ({
    input: '',
    todos: state.todos.concat({ 
      id: uuid(), 
      done: false, 
      value: state.input 
    })
  }),
  remove: (state, actions, { uuid }) => ({
    todos: state.todos.filter(t => uuid !== t.id)
  }),
  toggle: (state, actions, { uuid }) => ({
    todos: state.todos.map(t => uuid === t.id ? Object.assign({}, t, { done: !t.done }) : t)
  }),
  clearCompleted: (state) => ({
    todos: state.todos.filter(t => !t.done)
  })
}