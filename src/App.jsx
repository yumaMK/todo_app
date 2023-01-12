import React, { useEffect, useState } from 'react';
import './style.css';
import { TodoItems } from './components/TodoItems';
import { AddTodoForm} from './components/AddTodoForm';
import { EditForm } from './components/EditForm';

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
				<EditForm
					handleEditFormSubmit={handleEditFormSubmit}
					currentTodo={currentTodo}
					handleEditInputChange={handleEditInputChange}
					setIsEditing={setIsEditing}
				/>
			) : (
				<AddTodoForm
					todo={todo}
					handleFormSubmit={handleFormSubmit}
					handleInputChange={handleInputChange}
				/>
			)}
			<TodoItems
				todos={todos}
				handleEditClick={handleEditClick}
				handleDeleteClick={handleDeleteClick}
			/>
		</div>
	)
};