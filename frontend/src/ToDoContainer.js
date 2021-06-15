import React, { useEffect } from "react";
import ToDoCard from "./ToDoCard";
import {
  Modal,
  ModalHeader,
  Textarea,
  ModalFooter,
  Button,
  Input,
  Label,
} from "@windmill/react-ui";

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
    }).then((r) => refreshList());
  };

  const refreshList = () => {
    fetch("http://localhost:2000/api/todos/")
      .then((r) => r.json())
      .then((t) => setToDos(t));
  };

  const addTask = (e) => {
    e.preventDefault();
    fetch("http://localhost:2000/api/todos/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        title: newTaskTitle,
        description: newTaskDesc,
        completed: false,
      }),
    })
      .then((r) => r.json())
      .then((r) => refreshList());
  };
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [newTaskTitle, setNewTaskTitle] = React.useState("");
  const [newTaskDesc, setNewTaskDesc] = React.useState("");
  console.log(newTaskDesc);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTitle = (e) => {
    setNewTaskTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setNewTaskDesc(e.target.value);
  };

  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      {toDos.map((t) => (
        <ToDoCard toDo={t} key={t.id} handleDelete={handleDelete} />
      ))}
      <div>
        <Button onClick={openModal}>Open modal</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>New Task</ModalHeader>
        <form onSubmit={addTask}>
          <Label>
            <span className="ml-2">Title</span>
            <Input onChange={handleTitle} type="text"></Input>
          </Label>
          <Label>
            <span className="ml-2"></span>
            <Textarea
              onChange={handleDescription}
              className="mt-1"
              rows="3"
              placeholder="More about this task."
              type="text"
            />
          </Label>

          <ModalFooter>
            <Button
              className="w-full sm:w-auto"
              layout="outline"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <button onClick={closeModal} className="w-full sm:w-auto">
              Submit
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default ToDoContainer;
