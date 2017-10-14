import { h } from 'hyperapp'
import TodoItem from './todo-item'

export default (props) => (
  <ul class="todo-list">
    {props.todos.map(todo => (
      <TodoItem todo={todo} actions={props.actions} />
    ))}
  </ul>
)