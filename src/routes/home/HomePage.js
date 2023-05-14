import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useTodos } from "../useTodos";
import { TodoHeader } from "../../UI/TodoHeader";
import { TodoCounter } from "../../UI/TodoCounter";
import { TodoSearch } from "../../UI/TodoSearch";
import { TodoList } from "../../UI/TodoList";
import { TodoItem } from "../../UI/TodoItem";
import { TodosError } from "../../UI/TodosError";
import { TodosLoading } from "../../UI/TodosLoading";
import { EmptyTodos } from "../../UI/EmptyTodos";
import { CreateTodoButton } from "../../UI/CreateTodoButton";
import { Modal } from "../../UI/Modal";
import { ChangeAlert } from "../../UI/ChangeAlert";

function HomePage() {
  const { state, stateUpdaters } = useTodos();
  const navigate = useNavigate();

  const {
    error,
    loading,
    searchedTodos,
    totalTodos,
    completeTodo,
    completedTodos,
    // openModal,
    searchValue,
  } = state;

  const {
    //setOpenModal,
    // addTodo,
    deleteTodo,
    setSearchValue,
    sincronizeTodos,
  } = stateUpdaters;

  return (
    <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter totalTodos={totalTodos} completedTodos={completedTodos} />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      </TodoHeader>

      <TodoList
        error={error}
        loading={loading}
        totalTodos={totalTodos}
        searchedTodos={searchedTodos}
        searchText={searchValue}
        onError={() => <TodosError />}
        onLoading={() => <TodosLoading />}
        onEmptyTodos={() => <EmptyTodos />}
        onEmptySearchResults={(searchText) => (
          <p>No hay resultados para {searchText}</p>
        )}>
        {(todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onEdit={() => {
              navigate("/edit/" + todo.id, { state: { todo } });
            }}
            onComplete={() => completeTodo(todo.id)}
            onDelete={() => deleteTodo(todo.text)}
          />
        )}
      </TodoList>

      {/* {!!openModal && (
        <Modal>
          <TodoForm
            addTodo={addTodo}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )} */}

      <CreateTodoButton
        onClick={() => navigate("/new")}
        // setOpenModal={setOpenModal}
      />

      <ChangeAlert sincronize={sincronizeTodos} />
    </React.Fragment>
  );
}

export { HomePage };
