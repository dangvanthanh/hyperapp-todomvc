import { h } from 'hyperapp'

export default (props) => (
  <div>
    <input 
    type="text" 
    class="new-todo"
    onkeyup={e => e.keyCode === 13 && e.target.value !== '' ? props.actions.add() : null}
    oninput={props.actions.input}
    value={props.state.input}
    placeholder={props.state.placeholder} 
    autofocus/>
  </div>
)