import store from '../store';
import { text } from 'hyperapp';
import { div, input, label } from '@hyperapp/html';

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

export default () =>
  div({}, [
    input({ type: 'checkbox', class: 'toggle-all', id: 'toggle-all' }),
    label(
      { for: 'toggle-all', onclick: (state, e) => ToggleAllTodo(state, e) },
      text('Mark all as complete')
    ),
  ]);
