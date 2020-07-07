import { h } from 'hyperapp';
import { uuid } from '../utils';
import store from '../store';

const NewTodo = (value) => ({
  id: uuid(),
  done: false,
  editing: false,
  value,
});

const OnInput = (state, event) => {
  const input = event.target.value;
  const newState = { ...state, input };
  return newState;
};

const AddTodo = (state, e) => {
  const todos = state.todos.concat(NewTodo(e.target.value));
  store.save(todos);
  const newState = { ...state, input: '', todos };
  return newState;
};

const TodoInput = (props) => (
  <div>
    <input
      type="text"
      class="new-todo"
      onkeydown={(state, e) => {
        if (e.keyCode === 13 && e.target.value !== '') {
          return AddTodo(state, e);
        }
        return state;
      }}
      onInput={OnInput}
      value={props.state.input}
      placeholder={props.state.placeholder}
    />
  </div>
);

export default TodoInput;
