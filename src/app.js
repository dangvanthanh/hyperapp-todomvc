import { app } from 'hyperapp'
import appState from './state'
import appStore from './store'
import App from './views'

appState.todos = appStore.fetch()
appState.todos = appState.todos.map((todo) => {
	todo.editing = false
	return todo
})

const InitApp = (state) => state
const init = InitApp(appState)
const view = (state) => App(state)
const node = document.getElementById('app')

app({
	init,
	view,
	node,
})
