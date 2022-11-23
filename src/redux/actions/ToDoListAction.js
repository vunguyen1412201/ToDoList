import Axios from "axios";
import { GET_TASK_API } from "../constant/ToDoListConstant";
export const getTaskListApi = () => {
  return (dispatch) => {
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    promise.then((result) => {
      dispatch({
        type: GET_TASK_API,
        taskList: result.data,
      });
    });
    promise.catch((err) => {
      console.log(err.response.data);
    });
  };
};

export const addTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: { taskName: taskName },
    });
    console.log(promise);
    //Xử lý thành công
    promise.then((result) => {
      // alert(result.data);
      dispatch(getTaskListApi());
    });

    //Xử lý thất bại
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
};

export const checkTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      alert(result.data);
      dispatch(getTaskListApi());
    });
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
};

export const rejectTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((res) => {
      dispatch(getTaskListApi());
    });
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
};

export const delTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise.then((result) => {
      dispatch(getTaskListApi());
    });
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
};
