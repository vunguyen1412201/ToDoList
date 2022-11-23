import style from "./ToDoList.css";
import Axios from "axios";
import React, { Component } from "react";

export default class ToDoListRCC extends Component {
  state = {
    taskList: [],
    values: { taskName: "" },
    errors: { taskName: "" },
  };
  renderTaskToDo = () => {
    return this.state.taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons"></div>
          </li>
        );
      });
  };
  renderTaskToDoDone = () => {
    return this.state.taskList
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
                  this.delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => {
                  this.rejectTask(item.taskName);
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

  handleChange = (e) => {
    let { value, name } = e.target;
    // console.log(value);
    let newValues = { ...this.state.values };
    // console.log(newValues);
    newValues = { newValues, [name]: value };
    let newErrors = { ...this.state.errors };
    let regexString = /^[a-z A-Z]+$/;
    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + "invalid";
    } else {
      newErrors[name] = "";
    }
    this.setState({
      ...this.state,
      values: newValues,
      errors: newErrors,
    });
  };
  getTaskList = () => {
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    promise.then((result) => {
      this.setState({
        taskList: result.data,
      });
    });
    promise.catch((err) => {
      console.log("That bai");
      alert("that bai");
    });
  };
  //addTask
  addTask = (e) => {
    e.preventDefault();
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: { taskName: this.state.values.taskName },
    });
    promise.then((result) => {
      alert("da lay dc");
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  };

  //delTask
  delTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise.then((result) => {
      this.getTaskList();
    });
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };

  //checkTask
  checkTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      this.getTaskList();
    });
  };
  rejectTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((res) => {
      this.getTaskList();
    });
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
  componentDidMount() {
    this.getTaskList();
  }
  render() {
    return (
      <form onSubmit={this.addTask}>
        <div className="card">
          <div className="card__header">
            <img src={require("./bg.png")} alt="" />
          </div>
          <div className="card__body">
            <div className="card__content">
              <div className="form-group">
                <div className="card__title">
                  <h2>My tasks</h2>
                  <p>September 9, 2020</p>
                </div>
                <div className="card__add">
                  <input
                    type="text"
                    placeholder="Enter an activity....."
                    name="taskName"
                    id="newTask"
                    onChange={this.handleChange}
                  />
                  <button id="addItem" onClick={this.addTask}>
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
                <span className="text text-danger"></span>
              </div>
              <div className="card__todo form-group">
                <ul className="todo" id="todo">
                  {this.renderTaskToDo()}
                </ul>
                <ul className="todo" id="conpleted">
                  {this.renderTaskToDoDone()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
