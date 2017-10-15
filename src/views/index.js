import { h } from 'hyperapp'
import TodoHeader from './todo-header'
import TodoFooter from './todo-footer'
import TodoInput from './todo-input'
import TodoList from './todo-list'
import TodoFilter from './todo-filter'

export default (state, actions) => (
  <div class="container">
    <section class="todoapp">
      <TodoHeader/>
      <TodoInput state={state} actions={actions} />
      <section className="main">
        <input type="checkbox" className="toggle-all" id="toggle-all"/>
        <label htmlFor="toggle-all" onclick={actions.toggleAll}>Mark all as complete</label>
        <TodoList todos={state.todos} actions={actions} filter={state.filter} />
      </section>
      <TodoFilter state={state} actions={actions} />
    </section>
    <TodoFooter/>
    {JSON.stringify(state.todos)}
  </div>
)