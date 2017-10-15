import { h } from 'hyperapp'
import { FILTERINFO } from '../utils'
import TodoItem from './todo-item'

export default (props) => (
  <ul class="todo-list">
    {props.todos.filter(t => 
        props.filter === FILTERINFO.Completed 
        ? t.done : props.filter === FILTERINFO.Active 
        ? !t.done : props.filter === FILTERINFO.All)
      .map(todo => (
      <TodoItem todo={todo} actions={props.actions} />
    ))}
  </ul>
)