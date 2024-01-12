import React, { useState } from "react";
import TodoCard from "../todo-card/TodoCard";
import "./CardList.scss";
import WarningDialog from "../warning-dialog/WarningDialog";
import toast from "react-hot-toast";
import importantLogo from "../../assets/important-large.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, updateTodoImportance } from "../../slices/todoSlice";
import ModifyDialog from "../modify-dialog/ModifyDialog";

const CardList = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [modifyDialogVisibility, setModifyDialogVisibility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});
  const dispatch = useDispatch();

  const markTodoAsReady = (id) => {
    setDialogVisibility(true);
    setCurrentCardId(id);
  };

  const finalizeTodo = () => {
    setDialogVisibility(false);
    dispatch(deleteTodo(currentCardId));
    toast("TODO is successfully finished!", {
      className: "toaster",
    });
  };

  const changeTodoImportance = (todo) => {
    dispatch(
      updateTodoImportance({
        ...todo,
        important: !todo.important,
      })
    );
    if (!todo.important) {
      toast.success("TODO was marked as important!");
    }
  };

  const openDialog = (todo) => {
    setModifyDialogVisibility(true);
    setSelectedTodo(todo);
  }

  const simpleList = todoList
    .filter((todo) => !todo.important)
    .map((todo) => (
      <TodoCard
        todo={todo}
        key={todo.id}
        onFinalizeTodo={markTodoAsReady}
        onImportantClick={changeTodoImportance}
        openDialog = {openDialog}
      />
    ));

  const importantList = todoList
    .filter((todo) => todo.important)
    .map((todo) => (
      <TodoCard
        todo={todo}
        key={todo.id}
        onFinalizeTodo={markTodoAsReady}
        onImportantClick={changeTodoImportance}
        openDialog = {openDialog}
      />
    ));

  return (
    <>
    {(importantList.length == 0 && simpleList.length == 0) ? (
       <div className="empty">list is still empty, let's make some TODO &#127881;</div>
    ) : (
      <>
           <div
           className={importantList.length > 0 ? "cardList important" : "cardList"}
         >
           <img className="important-logo" src={importantLogo} />
           <div className="list">{importantList}</div>
         </div>
         <div className="grid">{simpleList}</div>
       </>
   )}
      <ModifyDialog
        modifyDialogVisibility={modifyDialogVisibility}
        setModifyDialogVisibility={setModifyDialogVisibility}
        todo={selectedTodo}
      />
      <WarningDialog
        dialogVisibility={dialogVisibility}
        setDialogVisibility={setDialogVisibility}
        onFinalizeTodo={finalizeTodo}
      />
    </>
  );
};

export default CardList;
