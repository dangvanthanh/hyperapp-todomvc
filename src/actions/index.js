import { uuid, assignTodoById } from '../utils'
import store from '../store'

export default {
  input: (state, actions, { value }) => ({
    input: value
  }),
  add: (state) => {
    const todos = state.todos.concat({ 
      id: uuid(), 
      done: false,
      editing: false,
      value: state.input
    })
    store.save(todos)
    return ({
      input: '',
      todos: todos
    })
  },
  editUpdate: (state, actions, { uuid, value }) => {
    const todos = assignTodoById(state.todos, uuid, { editing: false, value: value  })
    store.save(todos)
    return ({
      todos: todos
    })
  },
  editEnter: (state, actions, { uuid, e }) => {
    actions.editEnterDbClick(uuid)
    actions.editEnterFocus(e)
  },
  editEnterDbClick: (state, actions, uuid) => {
    const todos = assignTodoById(state.todos, uuid, { editing: true })
    store.save(todos)
    return ({
      todos: todos
    })
  },
  editEnterFocus: (state, actions, e) => {
    const input = e.target.parentNode.parentNode.querySelector('.edit')
    input.focus()
  },
  remove: (state, actions, { uuid }) => { 
    const todos = state.todos.filter(t => uuid !== t.id)
    store.save(todos)
    return ({
      todos: todos 
    })
  },
  toggle: (state, actions, { uuid }) => {
    const todos = state.todos.map(t => uuid === t.id ? Object.assign({}, t, { done: !t.done }) : t)
    store.save(todos)
    return ({
      todos: todos
    })
  },
  toggleAll: (state, actions, e) => {
    let isCheckedAll = e.target.previousSibling.checked
    isCheckedAll = !isCheckedAll
    const todos = state.todos.map(t => {
      t.done = isCheckedAll
      return t
    })
    store.save(todos)
    return ({
      todos: todos
    })
  },
  filter: (state, actions, { value }) => ({ filter: value }),
  clearCompleted: (state) => {
    const todos = state.todos.filter(t => !t.done)
    store.save(todos)
    return ({
      todos: todos
    })
  }
}