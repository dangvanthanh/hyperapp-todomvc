import { h } from 'hyperapp'

export default (props) => (
  <li class="todo">
    <div className="view">
      <input type="checkbox" class="toggle" data-uuid={props.todo.id} onclick={props.actions.toggle}/>
      <label>{props.todo.value}</label>
      <button class="destroy" data-uuid={props.todo.id} onclick={props.actions.remove}></button>
    </div>
  </li>
)