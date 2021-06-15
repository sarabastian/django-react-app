import "./App.css";
import React from "react";
import ToDoContainer from "./ToDoContainer";

function App() {
  return (
    <div className="App">
      <h1 className="mt-8 text-2xl">To Dos</h1>
      <ToDoContainer />
    </div>
  );
}

export default App;
