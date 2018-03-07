import { uuid, assignTodoById } from '../utils'
import store from '../store'

export default {
  input: ({ value }) => state => ({
    input: value
  }),
  add: () => state => {
    const todos = state.todos.concat({
      id: uuid(),
      done: false,
      editing: false,
      value: state.input
    })
    store.save(todos)
    return {
      input: '',
      todos: todos
    }
  },
  editUpdate: ({ uuid, value }) => (state, actions) => {
    const todos = assignTodoById(state.todos, uuid, {
      editing: false,
      value: value
    })
    store.save(todos)
    return {
      todos: todos
    }
  },
  editEnter: ({ uuid, e }) => (state, actions) => {
    actions.editEnterDbClick(uuid)
    actions.editEnterFocus(e)
  },
  editEnterDbClick: uuid => (state, actions) => {
    const todos = assignTodoById(state.todos, uuid, { editing: true })
    store.save(todos)
    return {
      todos: todos
    }
  },
  editEnterFocus: e => (state, actions) => {
    const input = e.target.parentNode.parentNode.querySelector('.edit')
    input.focus()
  },
  remove: ({ uuid }) => (state, actions) => {
    const todos = state.todos.filter(t => uuid !== t.id)
    store.save(todos)
    return {
      todos: todos
    }
  },
  toggle: ({ uuid }) => (state, actions) => {
    const todos = state.todos.map(
      t => (uuid === t.id ? Object.assign({}, t, { done: !t.done }) : t)
    )
    store.save(todos)
    return {
      todos: todos
    }
  },
  toggleAll: e => (state, actions) => {
    let isCheckedAll = e.target.previousSibling.checked
    isCheckedAll = !isCheckedAll
    const todos = state.todos.map(t => {
      t.done = isCheckedAll
      return t
    })
    store.save(todos)
    return {
      todos: todos
    }
  },
  filter: ({ value }) => (state, actions) => ({ filter: value }),
  clearCompleted: () => state => {
    const todos = state.todos.filter(t => !t.done)
    store.save(todos)
    return {
      todos: todos
    }
  }
}