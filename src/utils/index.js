export const ENTER_KEY = 13

export const FILTERINFO = { All: 0, Active: 1, Completed: 2 }

export const uuid = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0
		const v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

export const assignTodoById = (todos, id, ...todo) => {
	const todoItem = todo[0]
	return todos.map((t) => (id === t.id ? Object.assign({}, t, todoItem) : t))
}
