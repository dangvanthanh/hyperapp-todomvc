import { h, text } from 'hyperapp';
import store from '../store';
import { ENTER_KEY, assignTodoById } from '../utils';

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

const OnKeyUp = (state, e, todoId) => {
  if (e.keyCode === ENTER_KEY) {
    return EditUpdateTodo(state, e, todoId);
  }
  return state;
};

export default (todo) =>
  h(
    'li',
    { class: ['todo', { completed: todo.done, editing: todo.editing }] },
    [
      h('div', { class: 'view' }, [
        h('input', {
          type: 'checkbox',
          class: 'toggle',
          checked: !!todo.done,
          onclick: [ToggleTodo, todo.id],
        }),
        h(
          'label',
          { ondblclick: (state, e) => EditEnterTodo(state, e, todo.id) },
          text(todo.value)
        ),
        h(
          'button',
          { class: 'destroy', onclick: [RemoveTodo, todo.id] },
          text('')
        ),
      ]),
      h('input', {
        type: 'text',
        class: 'edit',
        value: todo.value,
        onkeyup: (state, e) => OnKeyUp(state, e, todo.id),
        onblur: (state, e) => EditUpdateTodo(state, e, todo.id),
      }),
    ]
  );
