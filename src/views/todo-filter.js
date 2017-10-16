import { h } from 'hyperapp'
import { FILTERINFO } from '../utils'
import TodoClearButton from './todo-clear-button'

export default (props) => (
  <footer className="footer">
    <span className="todo-count">{props.state.todos.filter(t => !t.done).length} item left</span>
    <ul className="filters">
      {Object.keys(FILTERINFO).map(key => (
        <li>
          <a 
            href="#" 
            class={props.state.filter === FILTERINFO[key] ? 'selected' : ''}
            onclick={() => props.actions.filter({ value: FILTERINFO[key] })}>
            {key}
          </a>
        </li>
      ))}
    </ul>
    {props.state.todos.filter(t => t.done).length > 0 ? <TodoClearButton clearCompleted={props.actions.clearCompleted} /> : ''}
  </footer>
)