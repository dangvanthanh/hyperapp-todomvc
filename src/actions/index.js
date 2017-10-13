import { uuid } from '../utils'

export default {
  input: (state, actions, e) => ({
    input: e.target.value
  }),
  add: (state) => ({
    input: '',
    todos: state.todos.concat({ 
      id: uuid(), 
      done: false, 
      value: state.input 
    })
  }),
  remove: (state, actions, e) => ({
    todos: state.todos.filter(t => e.target.dataset.uuid !== t.id)
  }),
  toggle: (state, actions, e) => ({
    todos: state.todos.map(t => e.target.dataset.uuid === t.id ? Object.assign({}, t, {
      done: !t.done
    }) : t)
  })
}