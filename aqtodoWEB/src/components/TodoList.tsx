import { Todo } from "../model/Todo";
import { useCreateTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "../services/todoApi";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import TodoModal from "./TodoModal";
import { useState } from "react";

const TodoList: React.FC<{}> = () => {

  const { data } = useGetTodosQuery();
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const closeModal = () => {
    setSelectedTodo(undefined);
    setIsModalOpen(false);
  }

  const confirmCreate = (todo: Todo) => {
    createTodo(todo).unwrap().then(() => {
      alert(`Todo ${todo.title} was created!`);
      setSelectedTodo(undefined);
    })
  }

  const confirmUpdate = (todo: Todo) => {
    updateTodo(todo).unwrap().then(() => {
      alert(`Todo ${todo.title} was updated!`);
      setSelectedTodo(undefined);
    })
  }

  const confirmDelete = (todo: Todo) => {
    deleteTodo(todo.id!).unwrap().then(() => {
      alert(`Todo ${todo.title} was deleted!`);
    })
  }

  return (
  <div className="dashboard">
    <Container>
      <Button
        className="mx-auto w-100"
        variant="success"
        onClick={() => {
          setSelectedTodo(undefined);
          setIsModalOpen(true);
        }}
      >
        Add New
      </Button>
      {data?.map((todo: Todo) =>
        <Row className="p-2" key={todo.id}>
          <Col>
            <Card className="card">
            <Card.Header className="text-white bg-success">
                <strong>{todo.title}</strong>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>{todo.dueBy}</Col>
                </Row>
                <Row>
                  <Col>{todo.description}</Col>
                </Row>
               <Card.Footer>
                <Button
                      onClick={()=>{
                        setSelectedTodo(todo);
                        setIsModalOpen(true);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={()=>{
                        setSelectedTodo(undefined);
                        confirmDelete(todo);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                      </svg>
                    </Button>
               </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <TodoModal
        todo={selectedTodo}
        show={isModalOpen}
        closeModal={closeModal}
        update={confirmUpdate}
        create={confirmCreate}
      />
    </Container>
  </div>)
}

export default TodoList;