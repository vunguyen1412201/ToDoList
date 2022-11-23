import logo from "./logo.svg";
import "./App.css";
import ToDoListRCC from "./components/ToDoListRCC";
import ToDoListRedux from "./components/ToDoListRedux";

function App() {
  return (
    <div className="App">
      {/* <ToDoListRCC /> */}
      <ToDoListRedux />
    </div>
  );
}

export default App;
