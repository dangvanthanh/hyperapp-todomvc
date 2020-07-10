import { h } from 'hyperapp';
import cc from 'classcat';
import store from '../store';
import { assignTodoById } from '../utils';

const RemoveTodo = (state, uuid) => {
  const todos = state.todos.filter((t) => uuid !== t.id);
  store.save(todos);
  const newState = { ...state, todos };
  return newState;
};

const ToggleTodo = (state, uuid) => {
  const todos = state.todos.map((t) =>
    uuid === t.id ? Object.assign({}, t, { done: !t.done }) : t
  );
  store.save(todos);
  const newState = { ...state, todos };
  return newState;
};

const EditEnterTodo = (state, e, uuid) => {
  const todos = assignTodoById(state.todos, uuid, { editing: true });
  store.save(todos);
  const input = e.target.parentNode.parentNode.querySelector('.edit');
  input.focus();
  const newState = { ...state, todos };
  return newState;
};

const EditUpdateTodo = (state, e, uuid) => {
  const todos = assignTodoById(state.todos, uuid, {
    editing: false,
    value: e.target.value,
  });
  store.save(todos);
  const newState = { ...state, todos };
  return newState;
};

const TodoItem = ({ todo }) => (
  <li
    class={cc(['todo', { completed: todo.done, editing: todo.editing }])}
    key={todo.id}
  >
    <div className="view">
      <input
        type="checkbox"
        class="toggle"
        checked={!!todo.done}
        onclick={[ToggleTodo, todo.id]}
      />
      <label ondblclick={(state, e) => EditEnterTodo(state, e, todo.id)}>
        {todo.value}
      </label>
      <button class="destroy" onclick={[RemoveTodo, todo.id]} />
    </div>
    <input
      type="text"
      class="edit"
      onKeyup={(state, e) => {
        if (e.keyCode === 13) {
          return EditUpdateTodo(state, e, todo.id);
        }
        return state;
      }}
      onblur={(state, e) => EditUpdateTodo(state, e, todo.id)}
      value={todo.value}
    />
  </li>
);

export default TodoItem;
