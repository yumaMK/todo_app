import React, { useEffect, useState } from 'react';
import './style.css';

export const App = () => {
	const [todos, setTodos] = useState(() => {
		const savedTodos = localStorage.getItem('todos');
		if(savedTodos) {
			return JSON.parse(savedTodos);
		} else {
			return [];
		}
	});
	const [todo, setTodo] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [currentTodo, setCurrentTodo] = useState({});

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);


	const handleInputChange = (e) => {
		setTodo(e.target.value);
	}

	function handleFormSubmit(e) {
		e.preventDefault();

		if (todo !== "") {
			setTodos([
				...todos,
				{
					id: todos.length + 1,
					text: todo.trim()
				}
			]);
		}
		setTodo('');
	}

	const handleDeleteClick = (id) => {
		const removeItem = todos.filter((todo) => {
			return todo.id !== id;
		});
		setTodos(removeItem);
	}

	const handleEditInputChange = (e) => {
		setCurrentTodo({
			...currentTodo,
			text: e.target.value,
		});
		console.log(currentTodo);
	}

	const handleEditClick = (todo) => {
		setIsEditing(true);
		setCurrentTodo({...todo});
	}

	const handleUpdateTodo = (id, updatedTodo) => {
		const updateItem = todos.map((todo) => {
			return todo.id === id ? updatedTodo : todo;
		});
		setIsEditing(false);
		setTodos(updateItem);
	}

	const handleEditFormSubmit = (e) => {
		e.preventDefault();
		handleUpdateTodo(currentTodo.id, currentTodo);
	}

	return (
		<div className='App'>
			<h1>Todo App</h1>
			{isEditing ? (
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
			) : (
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
			)}

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
		</div>
	)
};