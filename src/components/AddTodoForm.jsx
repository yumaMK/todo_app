import React from 'react';

export const AddTodoForm = (props) => {
	const {todo, handleFormSubmit, handleInputChange} = props;
	return (
		<form onSubmit={handleFormSubmit}>
		<h2>Add Todo</h2>
		<input
			name='todo'
			type='text'
			placeholder="Create a new todo"
			value={todo}
			onChange={handleInputChange}
		/>
		</form>
	)
}