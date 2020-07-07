import { h, app } from 'hyperapp';
import appState from './state';
import appStore from './store';
import App from './views';

appState.todos = appStore.fetch();
appState.todos = appState.todos.map(todo => {
  todo.editing = false;
  return todo;
});

const InitApp = state => state;

app({
  init: InitApp(appState),
  view: <App />,
  node: document.getElementById('app')
});
