import { useEffect, useState } from "react";
import { Todo } from "../model/Todo";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

interface ModalProps {
  todo: Todo | undefined;
  show: boolean;
  closeModal: () => void;
  update: (todo: Todo) => void;
  create: (todo: Todo) => void;
}

const TodoModal = (props: ModalProps): JSX.Element => {

  const [title, setTitle] = useState<string>("");
  const [dueBy, setDueBy] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (props.todo?.id) {
      setTitle(props.todo.title);
      setDueBy(props.todo?.dueBy ?? "");
      setDescription(props.todo?.description ?? "");
    }
  }, [props.todo, props.show])

  const update = () => {
    let todo: Todo = {
      title: title,
      dueBy: dueBy,
      description: description
    }
    if (props.todo) {
      todo.id = props.todo?.id;
      props.update(todo);
    } else {
      props.create(todo);
    }
    props.closeModal();
  }

  return (<>
    <Modal
      id="edit-modal"
      show={props.show}
      onHide={props.closeModal}
    >
      <Container>
        <div className="input-container">
          <Row>
            <label>Title</label>
            <input 
              value={title}
              onInput={(e: any) => { setTitle(e.target.value) }}
            />
          </Row>
          <Row>
            <label>Due By</label>
            <input
              value={dueBy}
              onInput={(e: any) => { setDueBy(e.target.value) }}
            />
          </Row>
          <Row>
            <label>Description</label>
            <input
              value={description}
              onInput={(e: any) => { setDescription(e.target.value) }}
            />
          </Row>
          <Row>
            <Button onClick={() => { update() }}>Save</Button>
          </Row>
        </div>
      </Container>
    </Modal>
  </>)
}

export default TodoModal;