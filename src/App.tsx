import TodoCard from "./components/todo-card/TodoCard";
import "./App.scss";
import CardList from "./components/card-list/CardList";
import { useState } from "react";
import AddDialog from "./components/add-dialog/AddDialog";
import { Toaster } from "react-hot-toast";

function App() {
  const [theme, setTheme] = useState("primary");
  const [addDialogVisibility, setAddDialogVisibility] = useState(false);
  return (
    <div className={theme === "primary" ? "app primary" : "secondary app"}>
      <div className="header">
        <button
          className="add-btn"
          onClick={() => setAddDialogVisibility(true)}
        ></button>
        <div className="theme-btns">
          <button
            className="primary-btn"
            onClick={() => setTheme("primary")}
          ></button>
          <button
            className="secondary-btn"
            onClick={() => setTheme("secondary")}
          ></button>
        </div>
      </div>
      <AddDialog
        addDialogVisibility={addDialogVisibility}
        setAddDialogVisibility={setAddDialogVisibility}
      />
      <CardList />
      <Toaster />
    </div>
  );
}

export default App;
