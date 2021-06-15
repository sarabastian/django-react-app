import React, { useEffect } from "react";
import ToDoCard from "./ToDoCard";

const ToDoContainer = () => {
  useEffect(() => {
    fetch("http://localhost:2000/api/todos/")
      .then((r) => r.json())
      .then((t) => setToDos(t));
  }, []);

  const [toDos, setToDos] = React.useState([]);

  const handleDelete = (id) => {
    fetch(`http://localhost:2000/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(refreshList());
  };

  const refreshList = () => {
    fetch("http://localhost:2000/api/todos/")
      .then((r) => r.json())
      .then((t) => setToDos(t));
  };
  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      {toDos.map((t) => (
        <ToDoCard toDo={t} key={t.id} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ToDoContainer;
