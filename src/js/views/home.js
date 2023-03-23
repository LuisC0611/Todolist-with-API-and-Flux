//IMPORTS
import React from "react";
import "../../styles/home.css";
import { useContext, createContext, useState } from "react";
import { Context } from "../store/appContext";
import Inputs from "./Inputs.js";


export const Home = () => {
  //Set Context
  const { store, actions } = useContext(Context);

  //Initialize States
  const [textEntered, setTextEntered] = useState("");
  const [tasks, setTasks] = useState(store.list);
  

  //Update Input value
  function inputValue(e) {
    const itemValue = e.target.value;
    setTextEntered(itemValue);
  }

  //Add a new task
  function addNewTask(e) {
    if (e.key === "Enter") {
      setTasks(actions.todoList(textEntered))
      setTextEntered("");
    }
  }

  //Delete task by id value
  function deleteTask(id) {
    setTasks(actions.deleteTask(id))
  }

  return (
    <Context.Provider
      value={{textEntered, tasks, deleteTask, addNewTask, inputValue }}
    >
      <ToDos />
    </Context.Provider>
  );
};

const ToDos = () => {
  const value = useContext(Context);

  return (
    <div>
      <h1 className="todo-header">Todos</h1>
      <div className="todos-container d-flex flex-column">
        <div className="todos-container-header d-flex flex-row">
          <span className="me-3">Tasks</span>
          <input
            type="text"
            onChange={value.inputValue}
            onKeyDown={value.addNewTask}
            value={value.textEntered}
          />
        </div>

        <div className="todos-container-body flex-grow-1">
          <ul>
            {value.tasks.map((task, index) => (
              <Inputs
                key={index}
                id={index}
                task={task}
                onDelete={value.deleteTask}
              />
            ))}
          </ul>
        </div>

        <div className="flex-grow-1">
           {value.tasks.length === 0
        ? "No tasks, add a task"
        : `Number of Tasks: ${value.tasks.length}`}
        </div>
      </div>
    </div>
  );
};