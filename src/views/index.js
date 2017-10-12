import { h } from 'hyperapp'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

export default (state, actions) => (
  <div class="container">
    <section class="todoapp">
      <Header />
      <div className="row">
        <input 
        type="text" 
        class="new-todo"
        onkeyup={e => e.keyCode === 13 && e.target.value !== '' ? actions.add() : null}
        oninput={actions.input}
        value={state.input}
        placeholder={state.placeholder} />
      </div>
      <section className="main">
        <input type="checkbox" className="toggle-all"/>
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          {
            state.todos.map(todo => (
              <li class="todo">
                <div className="view">
                  <input type="checkbox" class="toggle"/>
                  <label>{todo.value}</label>
                  <button class="destroy"></button>
                </div>
              </li>
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
    <Footer/>
  </div>
)