import React from 'react';

export const TodoItems = (props) => {
	const {todos, handleEditClick, handleDeleteClick} = props;
	return (
		<ul className='todo-list'>
		{todos.map((todo) => {
			return (
				<li key={todo.id}>
					{todo.text}
					<button onClick={() => {handleEditClick(todo)}}>Edit</button>
					<button onClick={() => {handleDeleteClick(todo.id)}}>X</button>
				</li>
			)
		})}
	</ul>
	);
};