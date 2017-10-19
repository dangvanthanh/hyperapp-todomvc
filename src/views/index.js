import { h } from 'hyperapp'
import TodoHeader from './todo-header'
import TodoFooter from './todo-footer'
import TodoInput from './todo-input'
import TodoList from './todo-list'
import TodoFilter from './todo-filter'
import TodoToggleAll from './todo-toggle-all'

export default (state, actions) => (
  <div class="container">
    <section class="todoapp">
      <TodoHeader/>
      <TodoInput state={state} actions={actions} />
      <section className="main">
        {state.todos.filter(t => !t.done).length > 0 ? <TodoToggleAll toggleAll={actions.toggleAll} /> : ''}
        <TodoList todos={state.todos} actions={actions} filter={state.filter} />
      </section>
      <TodoFilter state={state} actions={actions} />
    </section>
    <TodoFooter/>
  </div>
)