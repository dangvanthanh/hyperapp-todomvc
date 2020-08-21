import { text } from 'hyperapp';
import { footer, span, ul, li } from '@hyperapp/html';
import { FILTERINFO } from '../utils';
import TodoClearButton from './todo-clear-button';
import store from '../store';

const ClearCompleted = (state) => {
  const todos = state.todos.filter((t) => !t.done);
  store.save(todos);
  const newState = { ...state, todos };
  return newState;
};

const FilterTodo = (state, filter) => {
  const newState = { ...state, filter };
  return newState;
};

// const TodoFilter = (props) => (
//   <footer className="footer">
//     <span className="todo-count">
//       {props.state.todos.filter((t) => !t.done).length} item left
//     </span>
//     <ul className="filters">
//       {Object.keys(FILTERINFO).map((key) => (
//         <li>
//           <a
//             href="#"
//             class={props.state.filter === FILTERINFO[key] ? 'selected' : ''}
//             onclick={(state, e) => FilterTodo(state, FILTERINFO[key])}
//           >
//             {key}
//           </a>
//         </li>
//       ))}
//     </ul>
//     {props.state.todos.filter((t) => t.done).length > 0 ? (
//       <TodoClearButton clearCompleted={ClearCompleted} />
//     ) : (
//       ''
//     )}
//   </footer>
// );

const TodoFilter = (props) =>
  footer({ class: 'footer' }, [
    span(
      { class: 'todo-count' },
      text(`${props.todos.filter((t) => !t.done).length} item left`)
    ),
    ul({ class: 'filters' }, [
      Object.keys(FILTERINFO).map(key => li({}, text(key)))
    ]),
  ]);

export default TodoFilter;
