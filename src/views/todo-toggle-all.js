import { h } from 'hyperapp';
import actions from '../actions'

export default props => (
  <div>
    <input type="checkbox" className="toggle-all" id="toggle-all" />
    <label htmlFor="toggle-all" onclick={e => actions.toggleAll(e)}>
      Mark all as complete
    </label>
  </div>
);
