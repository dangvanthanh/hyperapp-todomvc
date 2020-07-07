import { h } from 'hyperapp';
import TodoHeader from './todo-header';
import TodoFooter from './todo-footer';
import TodoInput from './todo-input';
import TodoList from './todo-list';
import TodoFilter from './todo-filter';
import TodoToggleAll from './todo-toggle-all';

const App = () => (state) => (
  <div class="container">
    <section class="todoapp">
      <TodoHeader />
      <TodoInput state={state} />
      <section className="main">
        {state.todos.filter((t) => !t.done).length > 0 ? (
          <TodoToggleAll />
        ) : (
          ''
        )}
        <TodoList todos={state.todos} filter={state.filter} />
      </section>
      <TodoFilter state={state} />
    </section>
    <TodoFooter />
  </div>
);

export default App;
