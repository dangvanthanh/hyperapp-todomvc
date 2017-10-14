import { h } from 'hyperapp'
import TodoHeader from './todo-header'
import TodoFooter from './todo-footer'
import TodoInput from './todo-input'
import TodoList from './todo-list'

export default (state, actions) => (
  <div class="container">
    <section class="todoapp">
      <TodoHeader />
      <TodoInput state={state} actions={actions} />
      <section className="main">
        <input type="checkbox" className="toggle-all"/>
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList todos={state.todos} actions={actions} />
      </section>
      <footer className="footer">
        <span className="todo-count">{state.todos.length} item left</span>
        <ul className="filters">
          <li><a href="#/" class="selected">All</a></li>
          <li><a href="#/active">Active</a></li>
          <li><a href="#/completed">Completed</a></li>
        </ul>
        <button className="clear-completed">Clear completed</button>
      </footer>
    </section>
    <TodoFooter/>
  </div>
)