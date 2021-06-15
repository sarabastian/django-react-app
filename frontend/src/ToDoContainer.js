import React, { useEffect } from "react";
import ToDoCard from "./ToDoCard";

const ToDoContainer = () => {
  useEffect(() => {
    fetch("http://localhost:2000/api/todos/")
      .then((r) => r.json())
      .then((t) => setToDos(t));
  }, []);

  const [toDos, setToDos] = React.useState([]);
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  var csrftoken = getCookie("csrftoken");

  const handleDelete = (id) => {
    fetch(`http://localhost:2000/api/todos/${id}/`, {
      method: "DELETE",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    }).then(refreshList());
  };

  const refreshList = () => {
    fetch("http://localhost:2000/api/todos/")
      .then((r) => r.json())
      .then((t) => setToDos(t));
  };

  //   const addToDo = () => {
  //     fetch("http://localhost:2000/api/todos/", {
  //         method: 'POST',
  //         body:
  //     })
  //   }
  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      {toDos.map((t) => (
        <ToDoCard toDo={t} key={t.id} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ToDoContainer;
