import { h } from 'hyperapp'

export default (state, actions) => (
  <div>
    <section class="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input 
        type="text" 
        class="new-todo"
        oninput={actions.input}
        value={state.input}
        placeholder={state.placeholder} />
      </header>
      <section className="main">
        <input type="checkbox" className="toggle-all"/>
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul class="todo-list"></ul>
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
    <footer className="info">
      <p>Double-click to edit a todo</p>
      <p>Written by <a href="http://dangthanh.org">Dang Van Thanh</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </div>
)