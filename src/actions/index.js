export default {
  input: (state, actions, e) => ({
    input: e.target.value
  }),
  add: (state) => ({
    input: '',
    todos: state.todos.concat({ done: false, value: state.input })
  })
}