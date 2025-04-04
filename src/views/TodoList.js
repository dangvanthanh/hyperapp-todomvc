import { h } from 'hyperapp'
import { FILTERINFO } from '../utils'
import TodoItem from './TodoItem'

export default ({ todos, filter }) =>
	h(
		'ul',
		{ class: 'todo-list' },
		todos
			.filter((t) =>
				filter === FILTERINFO.Completed
					? t.done
					: filter === FILTERINFO.Active
						? !t.done
						: filter === FILTERINFO.All,
			)
			.map((todo) => TodoItem(todo)),
	)
