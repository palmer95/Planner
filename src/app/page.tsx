"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const today = new Date().toLocaleDateString('en-US', {weekday: "long"});

  type Todo = {
    id: number;
    text: string;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");


  const addTodo = () => {
    if(newTodo.trim() !== ""){
      const newItem: Todo = {
        id: Date.now(),
        text: newTodo.trim()
      };
      setTodos([...todos, newItem]);
      setNewTodo("");
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  return (
    <div className={styles.page}>
      <header className={styles.header}><h1>{today}</h1></header>
      
      <main className={styles.main}>
        <div className={styles.columns}>
          <div className={styles.left}>
            <h2>SCHEDULE</h2>
          </div>
          <div className={styles.right}>
            <h2>To-Do List</h2>
            <ul>
              {todos.map((todo, index) => (
                <li key={index}>
                  <label>
                    <input type="checkbox" /> {todo.text} <button onClick={() => setEditingTodoId(todo.id)} >Edit</button> <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </label>
                </li>
              ))}
            </ul>
            <div className={styles.todoInput}>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
              />
              <button onClick={addTodo}>Add</button>
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
