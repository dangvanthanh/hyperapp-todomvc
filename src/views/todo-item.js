import { h } from 'hyperapp';
import cc from 'classcat';
import actions from '../actions';

const TodoItem = ({ todo }) => (
  <li
    class={cc([
      'todo',
      { completed: todo.done, editing: todo.editing },
    ])}
    key={todo.id}
  >
    <div className="view">
      <input
        type="checkbox"
        class="toggle"
        checked={!!todo.done}
        onclick={(e) => actions.toggle({ uuid: todo.id })}
      />
      <label
        ondblclick={(e) => actions.editEnter({ uuid: todo.id, e: e })}
      >
        {todo.value}
      </label>
      <button
        class="destroy"
        onclick={(e) => actions.remove({ uuid: todo.id })}
      />
    </div>
    <input
      type="text"
      class="edit"
      onKeyup={(e) =>
        e.keyCode === 13
          ? actions.editUpdate({
              uuid: todo.id,
              value: e.target.value,
            })
          : null
      }
      onblur={(e) =>
        actions.editUpdate({ uuid: todo.id, value: e.target.value })
      }
      value={todo.value}
    />
  </li>
);

export default TodoItem;
