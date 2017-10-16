import { h } from 'hyperapp'
import cw from 'classwrap'

export default (props) => (
  <li class={cw(['todo', { 'completed': props.todo.done, 'editing': props.todo.editing }])}>
    <div className="view">
      <input 
        type="checkbox" 
        class="toggle" 
        checked={props.todo.done ? true : false} 
        onclick={e => props.actions.toggle({ uuid: props.todo.id })}/>
      <label ondblclick={e => props.actions.editEnter({ uuid: props.todo.id })}>{props.todo.value}</label>
      <button class="destroy" onclick={e => props.actions.remove({ uuid: props.todo.id })}></button>
    </div>
    <input
      type="text" 
      class="edit"
      onkeyup={e => e.keyCode === 13 ? props.actions.editUpdate({ uuid: props.todo.id, value: e.target.value }) : null}
      onblur={e => props.actions.editUpdate({ uuid: props.todo.id, value: e.target.value })} 
      value={props.todo.value}/>
  </li>
)