import { h } from 'hyperapp'
import TodoHeader from './todo-header'
import TodoFooter from './todo-footer'
import TodoItem from './todo-item'

export default (state, actions) => (
  <div class="container">
    <section class="todoapp">
      <TodoHeader />
      <div>
        <input 
        type="text" 
        class="new-todo"
        onkeyup={e => e.keyCode === 13 && e.target.value !== '' ? actions.add() : null}
        oninput={actions.input}
        value={state.input}
        placeholder={state.placeholder} 
        autofocus/>
      </div>
      <section className="main">
        <input type="checkbox" className="toggle-all"/>
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          {
            state.todos.map(todo => (
              <TodoItem id={todo.id} value={todo.value} remove={actions.remove} toggle={actions.toggle} />
            ))
          }
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count"></span>
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