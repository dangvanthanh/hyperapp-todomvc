import { h } from 'hyperapp';
import { FILTERINFO } from '../utils';
import { ul } from '@hyperapp/html';
import TodoItem from './todo-item';

// const TodoList = ({ todos, filter }) => (
//   <ul class="todo-list">
//     {todos
//       .filter((t) =>
//         filter === FILTERINFO.Completed
//           ? t.done
//           : filter === FILTERINFO.Active
//           ? !t.done
//           : filter === FILTERINFO.All
//       )
//       .map((todo) => (
//         <TodoItem todo={todo} />
//       ))}
//   </ul>
// );

const TodoList = ({ todos, filter }) =>
  ul({ class: 'todo-list' }, [
    todos
      .filter((t) =>
        filter === FILTERINFO.Completed
          ? t.done
          : filter === FILTERINFO.Active
          ? !t.done
          : filter === FILTERINFO.All
      )
      .map((todo) => TodoItem({todo: todo})),
  ]);

export default TodoList;
