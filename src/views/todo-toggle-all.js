import { h } from 'hyperapp'

export default (props) => (
  <div>
  <input type="checkbox" className="toggle-all" id="toggle-all"/>
    <label htmlFor="toggle-all" onclick={e => props.toggleAll(e)}>Mark all as complete</label>
  </div>
)