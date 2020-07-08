import { h } from 'hyperapp';
import store from '../store';

const ToggleAllTodo = (state, e) => {
  let isCheckedAll = e.target.previousSibling.checked;
  isCheckedAll = !isCheckedAll;
  const todos = state.todos.map((t) => {
    t.done = isCheckedAll;
    return t;
  });
  store.save(todos);
  const newState = { ...state, todos };
  return newState;
};

export default (props) => (
  <div>
    <input type="checkbox" className="toggle-all" id="toggle-all" />
    <label htmlFor="toggle-all" onclick={(state, e) => ToggleAllTodo(state, e)}>
      Mark all as complete
    </label>
  </div>
);
