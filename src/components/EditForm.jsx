import React from 'react';

export const EditForm = (props) => {
	const {handleEditFormSubmit, currentTodo, handleEditInputChange, setIsEditing} = props;
	return (
		<form onSubmit={handleEditFormSubmit}>
		<h2>Edit Todo</h2>
		<label htmlFor='editTodo'>Edit todo: </label>
		<input
			name="editTodo"
			type="text"
			placeholder='Edit todo'
			value={currentTodo.text}
			onChange={handleEditInputChange}
		/>
		<button type="submit" onClick={handleEditFormSubmit}>Update</button>
		<button onClick={() => setIsEditing(false)}>Cancel</button>
	</form>
	);
};