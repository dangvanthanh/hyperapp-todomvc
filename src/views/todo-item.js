import { h } from 'hyperapp'
import cc from 'classcat'

export default props => (
  <li
    class={cc([
      'todo',
      { completed: props.todo.done, editing: props.todo.editing }
    ])}
    key={props.todo.id}
  >
    <div className='view'>
      <input
        type='checkbox'
        class='toggle'
        checked={!!props.todo.done}
        onclick={e => props.actions.toggle({ uuid: props.todo.id })}
      />
      <label
        ondblclick={e => props.actions.editEnter({ uuid: props.todo.id, e: e })}
      >
        {props.todo.value}
      </label>
      <button
        class='destroy'
        onclick={e => props.actions.remove({ uuid: props.todo.id })}
      />
    </div>
    <input
      type='text'
      class='edit'
      onkeyup={e =>
        e.keyCode === 13
          ? props.actions.editUpdate({
            uuid: props.todo.id,
            value: e.target.value
          })
          : null
      }
      onblur={e =>
        props.actions.editUpdate({ uuid: props.todo.id, value: e.target.value })
      }
      value={props.todo.value}
    />
  </li>
)