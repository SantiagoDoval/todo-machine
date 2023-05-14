import React from "react";
import { TodoForm } from "../../UI/TodoForm";
import { useTodos } from "../useTodos";
import { useLocation, useParams } from "react-router-dom";

const EditTodoPage = () => {
  const location = useLocation();

  const { stateUpdaters, state } = useTodos();
  const { editTodo } = stateUpdaters;
  const { loading, getTodo } = state;
  const params = useParams();
  const id = Number(params.id);

  let todoText;

  if (location.state?.todo) {
    todoText=location.state.todo.text;
  }else if (loading) {
    return <p>Cargando...</p>;
  } else {
    const todo = getTodo(id);
    todoText=todo.text;  
  }

  return (
    <TodoForm
      label={"Edita tu TODO"}
      defaultTodoText={todoText}
      submitText={"Editar"}
      submitEvent={(newText) => {
        editTodo(id, newText);
      }}
    />
  );
};

export { EditTodoPage };
