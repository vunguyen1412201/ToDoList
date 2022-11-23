import Axios from "axios";
import { GET_TASK_API } from "../redux/constant/ToDoListConstant";
import React, { useState, useEffect } from "react";
import style from "./ToDoList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addTaskApi,
  checkTaskApi,
  delTaskApi,
  getTaskListApi,
  rejectTaskApi,
} from "../redux/actions/ToDoListAction";
export default function ToDoListRedux(props) {
  const dispatch = useDispatch();
  const { taskList } = useSelector((state) => state.ToDoListReducers);
  let [state, setState] = useState({
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });
  const getTaskList = () => {
    dispatch(getTaskListApi());
  };

  const renderTaskToDo = () => {
    return taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => {
                  checkTask(item.taskName);
                }}
              >
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  const renderTaskToDoDone = () => {
    return taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => {
                  rejectTask(item.taskName);
                }}
              >
                {/* <i className="far fa-check-circle" /> */}
                <i className="fas fa-undo" />
              </button>
            </div>
          </li>
        );
      });
  };

  const handleChange = (e) => {
    let { value, name } = e.target;
    console.log(value);
    let newValues = { ...state.values };
    newValues = { ...newValues, [name]: value };
    let newErrors = { ...state.errors };
    let regexString = /^[a-z A-Z]+$/;
    if (!regexString.test(newValues) || value.trim() === "") {
      newErrors[name] = name + " invalid";
    } else {
      newErrors[name] = "";
    }

    setState({
      ...state,
      values: newValues,
      errors: newErrors,
    });
  };
  const addTask = (e) => {
    e.preventDefault(); //
    dispatch(addTaskApi(state.values.taskName));
  };
  //Xoa task
  const delTask = (taskName) => {
    dispatch(delTaskApi(taskName));
  };

  //checktask
  const checkTask = (taskName) => {
    dispatch(checkTaskApi(taskName));
  };
  //reject task
  const rejectTask = (taskName) => {
    dispatch(rejectTaskApi(taskName));
  };
  useEffect(() => {
    getTaskList();
    return () => {};
  }, []);

  return (
    <div className="card">
      <div className="card__header">
        <img src={require("./bg.png")} />
      </div>
      {/* <h2>hello!</h2> */}
      <form onSubmit={addTask} className="card__body">
        <div className="card__content">
          <div className="card__title">
            <h2>My Tasks</h2>
            <p>September 9,2020</p>
          </div>
          <div className="card__add">
            <input
              name="taskName"
              id="newTask"
              type="text"
              placeholder="Enter an activity..."
              onChange={handleChange}
            />
            <button id="addItem" type="button" onClick={addTask}>
              <i className="fa fa-plus" />
            </button>
          </div>
          <div className="card__todo">
            {/* Uncompleted tasks */}
            <ul className="todo" id="todo">
              {renderTaskToDo()}
            </ul>
            {/* Completed tasks */}
            <ul className="todo" id="completed">
              {renderTaskToDoDone()}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}
