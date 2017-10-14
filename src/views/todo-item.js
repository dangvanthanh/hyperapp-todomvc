import { h } from 'hyperapp'

export default (props) => (
  <li class={props.todo.done ? 'todo completed' : 'todo'}>
    <div className="view">
      <input 
        type="checkbox" 
        class="toggle" 
        checked={props.todo.done ? true : false} 
        onclick={e => props.actions.toggle({ uuid: props.todo.id })}/>
      <label>{props.todo.value}</label>
      <button class="destroy" onclick={e => props.actions.remove({ uuid: props.todo.id })}></button>
    </div>
  </li>
)