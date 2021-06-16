import React from "react";
import {
  Modal,
  ModalHeader,
  Textarea,
  ModalFooter,
  Button,
  Input,
  Label,
} from "@windmill/react-ui";

const AddTask = ({
  isModalOpen,
  closeModal,
  addTask,
  handleTitle,
  handleDescription,
}) => {
  return (
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
  );
};

export default AddTask;
