import React from "react";
import { Card, CardBody, Button, Input } from "@windmill/react-ui";

const ToDoCard = ({ toDo, handleDelete, toggleCompleted, isCompleted }) => {
  return (
    <Card>
      <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
          {toDo.title}
        </p>
        <p className="text-gray-600 dark:text-gray-400">{toDo.description}</p>
        <br></br>
        <p>
          {" "}
          completed?{" "}
          {toDo.completed ? (
            <Input
              onChange={() => toggleCompleted(toDo)}
              type="checkbox"
              checked
            />
          ) : (
            <Input onChange={() => toggleCompleted(toDo)} type="checkbox" />
          )}
        </p>
        <br></br>
        <Button onClick={() => handleDelete(toDo.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </Button>
      </CardBody>
    </Card>
  );
};

export default ToDoCard;
