import { h } from 'hyperapp';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';
import TodoInput from './TodoInput';
import TodoSection from './TodoSection';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';

const App = (state) =>
  h('div', { class: 'container' }, [
    h('section', { class: 'todoapp' }, [
      TodoHeader(),
      TodoInput(state),
      TodoSection(state),
      TodoList({ todos: state.todos, filter: state.filter }),
      TodoFilter(state),
    ]),
    TodoFooter(),
  ]);

export default App;
