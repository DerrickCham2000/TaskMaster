import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { createTodo, removeTodo} from './firebase';
import "./ToDo.css"

const ToDo = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [user, loading, error] = useAuthState(auth);
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleAddTodo = () => {
      if (inputValue.trim() !== '') {
        createTodo(user, inputValue);
        setTodos([...todos, {uid: user.uid, todo: inputValue}]);
        setInputValue('');
      }
    };
  
    const handleDeleteTodo = (index, entryId) => {
      removeTodo(user, entryId);
      const updatedTodos = [...todos];
      updatedTodos.splice(index, 1);
      setTodos(updatedTodos);
    };

    const fetchToDo = async () => {
        try {
          const q = query(collection(db, "todo"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc?.docs.map((entry) => {return{...entry.data(), entryId: entry.id}});
          setTodos(data);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
      };

    useEffect(() => {
        if (!user) return;
        fetchToDo();
    }, [user, loading]);
  
    return (
      <div className="todo-app">
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a task"
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index}>
              {todo.todo}
              <button onClick={() => handleDeleteTodo(index, todo.entryId)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default ToDo;