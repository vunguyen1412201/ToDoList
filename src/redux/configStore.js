import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import ToDoListReducers from "./reducers/ToDoListReducers";
// import { ModalReducer } from "./reducers/ModalReducer";
import { configureStore } from "@reduxjs/toolkit";
import reduxthunk from "redux-thunk";
import { rootSaga } from "./sagas/rootSaga";
import createMiddlewareSaga from "redux-saga";

const middleWareSaga = createMiddlewareSaga();
const rootReducer = combineReducers({
  //reducer khai bao o day
  ToDoListReducers,
  // ModalReducer,
});

const store = legacy_createStore(
  rootReducer,
  applyMiddleware(reduxthunk, middleWareSaga)
);

//Goi Saga
middleWareSaga.run(rootSaga);

export default store;
