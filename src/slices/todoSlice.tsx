import { createSlice } from "@reduxjs/toolkit";

const getInitialTodos = () => {
  //lekérjük az alap todo listát
  const localTodoList = window.localStorage.getItem("todoList");
  if (localTodoList) {
    return JSON.parse(localTodoList);
  } else {
    window.localStorage.setItem("todoList", JSON.stringify([]));
    return [];
  }
};

const initialValue = {
  todoList: getInitialTodos(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    //új todo hozzáadása
    addTodo: (state, action) => {
      //itt szerezzük meg a begyűjtött mezők értékét
      state.todoList.push(action.payload);
      //megnézzük hogy megvan-e  todoList-ünk a localStorage-ban
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        //ha megvan, akkor csinálunk belőle egy újat és abba belerakjuk már az újat is
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        //berakjuk a friss tömböt
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          "todoList",
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload.id) {
            todo.type = action.payload.type;
            todo.title = action.payload.title;
            todo.description = action.payload.description;
            todo.important = action.payload.important;
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateTodoImportance: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload.id) {
            todo.important = action.payload.important;
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
  },
});

//pluszban ki kell exportálni az action-t is amit akarunk majd használni
export const { addTodo, deleteTodo, updateTodo, updateTodoImportance } =
  todoSlice.actions;
export default todoSlice.reducer;
