import { h } from 'hyperapp';
import { FILTERINFO } from '../utils';
import TodoItem from './todo-item';

const TodoList = ({ todos, filter }) => (
  <ul class="todo-list">
    {todos
      .filter((t) =>
        filter === FILTERINFO.Completed
          ? t.done
          : filter === FILTERINFO.Active
          ? !t.done
          : filter === FILTERINFO.All
      )
      .map((todo) => (
        <TodoItem todo={todo} />
      ))}
  </ul>
);

export default TodoList;
