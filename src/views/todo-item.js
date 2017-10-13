import { h } from 'hyperapp'

export default (props) => (
  <li class="todo">
    <div className="view">
      <input type="checkbox" class="toggle" data-uuid={props.id} onclick={props.toggle}/>
      <label>{props.value}</label>
      <button class="destroy" data-uuid={props.id} onclick={props.remove}></button>
    </div>
  </li>
)