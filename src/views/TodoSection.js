import { h, text } from 'hyperapp';
import TodoToggleAll from './TodoToggleAll';

export default (props) =>
  h(
    'section',
    { class: 'main' },
    props.todos.filter((t) => !t.done).length > 0 ? TodoToggleAll() : text('')
  );
