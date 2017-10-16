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
      editing: false,
      value: state.input
    })
  }),
  editUpdate: (state, actions, { uuid, value }) => ({
    todos: state.todos.map(t => uuid === t.id ? Object.assign({}, t, { editing: false, value: value }) : t)
  }),
  editEnter: (state, actions, { uuid }) => ({
    todos: state.todos.map(t => uuid === t.id ? Object.assign({}, t, { editing: true }) : t)
  }),
  remove: (state, actions, { uuid }) => ({
    todos: state.todos.filter(t => uuid !== t.id)
  }),
  toggle: (state, actions, { uuid }) => ({
    todos: state.todos.map(t => uuid === t.id ? Object.assign({}, t, { done: !t.done }) : t)
  }),
  toggleAll: (state) => ({
    todos: state.todos.map(t => {
      t.done = !t.done
      return t
    })
  }),
  filter: (state, actions, { value }) => ({ filter: value }),
  clearCompleted: (state) => ({
    todos: state.todos.filter(t => !t.done)
  })
}