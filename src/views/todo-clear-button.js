import { h } from 'hyperapp';

export default props => (
  <button className="clear-completed" onclick={props.clearCompleted}>
    Clear completed
  </button>
);
