import { h, text } from 'hyperapp'
import { FILTERINFO } from '../utils'
import store from '../store'

const ClearCompleted = (state) => {
	const todos = state.todos.filter((t) => !t.done)
	store.save(todos)
	const newState = { ...state, todos }
	return newState
}

const FilterTodo = (state, filter) => {
	const newState = { ...state, filter }
	return newState
}

export default (props) =>
	h('footer', { class: 'footer' }, [
		h(
			'span',
			{ class: 'todo-count' },
			text(`${props.todos.filter((t) => !t.done).length} item left`),
		),
		h(
			'ul',
			{ class: 'filters' },
			Object.keys(FILTERINFO).map((key) =>
				h(
					'li',
					{},
					h(
						'a',
						{
							class: props.filter === FILTERINFO[key] ? 'selected' : '',
							onclick: (state, e) => FilterTodo(state, FILTERINFO[key]),
						},
						text(key),
					),
				),
			),
		),
		props.todos.filter((t) => t.done).length > 0
			? h(
					'button',
					{ class: 'clear-completed', onclick: ClearCompleted },
					text('Clear completed'),
				)
			: text(''),
	])
