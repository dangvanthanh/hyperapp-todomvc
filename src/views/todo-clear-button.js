import { text } from 'hyperapp';
import { button } from '@hyperapp/html';

export default (props) =>
  button(
    { class: 'clear-completed', click: props.clearCompleted },
    text('Clear completed')
  );
