import { Component, For } from 'solid-js';
import { createStore } from 'solid-js/store';

import styles from './styles/App.module.css';

const App: Component = () => {
	let input: HTMLInputElement | undefined = undefined;
	const [todos, setTodos] = createStore<
		{ id: number; text: string; isCompleted: boolean }[]
	>([{ id: 1, text: 'Learn Solid', isCompleted: false }]);

	const addTodo = () => {
		if (!input) return;
		setTodos([
			...todos,
			{ id: todos.length + 1, text: input.value, isCompleted: false },
		]);
	};

	const toggleTodo = (id: number) => {
		setTodos(
			(todo) => todo.id === id,
			'isCompleted',
			(isCompleted) => !isCompleted,
		);
	};

	const removeTodo = (id: number) => {
		setTodos([...todos.filter((todo) => todo.id !== id)]);
	};

	return (
		<div class={styles.app}>
			<h1>Todo List!</h1>
			<header class={styles.header}>
				<input
					type="text"
					ref={input}
					class={styles.input__text}
					placeholder="What needs to be done?"
				/>
				<button
					class={styles.input__button}
					onClick={() => {
						if (!input || !input.value.trim()) return;
						addTodo();
						input.value = '';
					}}
				>
					+
				</button>
			</header>
			<ul class={styles.todo__list}>
				<For each={todos}>
					{(todo) => (
						<div class={styles.todo__item}>
							<input
								class={styles.todo__checkbox}
								type="checkbox"
								checked={todo.isCompleted}
								onChange={() => toggleTodo(todo.id)}
							/>
							<span class={styles.todo__text}>{todo.text}</span>
							<button
								class={styles.todo__remove}
								onClick={() => removeTodo(todo.id)}
							>
								X
							</button>
						</div>
					)}
				</For>
			</ul>
		</div>
	);
};

export default App;
