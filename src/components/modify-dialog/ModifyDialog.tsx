import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../add-dialog/AddDialog.scss";
import shoppingCart from "../../assets/shopping-cart.png";
import studyImg from "../../assets/study.png";
import phoneCall from "../../assets/phone-call.png";
import service from "../../assets/service.png";
import gift from "../../assets/gift.png";
import toast from "react-hot-toast";
import "./ModifyDialog.scss";
import arrowRight from "../../assets/arrowRight.png";
import closeIcon from "../../assets/close.png";
import { updateTodo } from "../../slices/todoSlice";

const ModifyDialog = ({
  modifyDialogVisibility,
  setModifyDialogVisibility,
  todo
}) => {

  useEffect(() => {
    setSelectedIcon(todo.type);
    setTitle(todo.title);
    setDescription(todo.description);
    setImportant(todo.important);
  }, [todo])
  const imgObjs = [
    { key: "shopping", name: shoppingCart },
    { key: "study", name: studyImg },
    { key: "phoneCall", name: phoneCall },
    { key: "service", name: service },
    { key: "gift", name: gift },
  ];
  const [selectedIcon, setSelectedIcon] = useState(todo.type);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [important, setImportant] = useState(todo.important);
  const [iconListVisible, setIconListVisible] = useState(false);
  const dispatch = useDispatch();

  const handleCheck = (e) => {
    if (e.target.checked) {
      setImportant(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title for your TODO!");
      return;
    }
    let newTodo = {
      id: todo.id,
      type: selectedIcon,
      title: title,
      description: description,
      important: important,
      time: todo.time,
    };
    if (todo !== newTodo) {
      dispatch(
        updateTodo({
          ...todo,
          type: selectedIcon,
          title,
          description,
          important,
        })
      );
      toast.success("TODO was successfully updated!");
      setModifyDialogVisibility(false);
    } else {
      toast.error("No changes made");
    }
  };

  return (
    <>
      {modifyDialogVisibility && (
        <div className="wrapper">
          <form className="add-dialog" onSubmit={(e) => handleSubmit(e)}>
            <div className="dialog-header">
              <h1>Update TODO</h1>
              <button
                type="button"
                className="btn-close"
                onClick={() => setModifyDialogVisibility(false)}
              ></button>
            </div>
            <div className="dialog-body">
              <div className="icons">
                <label className="icon-label">TODO's icon</label>
                <div className={iconListVisible ? "hide" : "show"}>
                  <div className="icon-holder">
                    <img
                      src={
                        imgObjs.find((img) => img.key === selectedIcon)?.name
                      }
                    />
                  </div>
                  <div
                    className="more-icons-div"
                    onClick={() => setIconListVisible(true)}
                  >
                    <h6>More icons ... </h6>
                  </div>
                </div>
                <div
                  className={
                    iconListVisible ? "show position-up" : "hide position-up"
                  }
                >
                  <div className="close-icons">
                    <img
                      src={closeIcon}
                      onClick={() => setIconListVisible(false)}
                    />
                  </div>
                  <div className="icon-selector">
                    {imgObjs
                      .filter((img) => img.key !== selectedIcon)
                      .map((img) => (
                        <div
                          key={img.key}
                          className={
                            selectedIcon === img.key
                              ? "icon-card selected-icon"
                              : "icon-card"
                          }
                          onClick={() => {
                            setSelectedIcon(img.key);
                            setIconListVisible(false);
                          }}
                        >
                          <img src={img.name} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="inputs">
                <div className="mb-3">
                  <label htmlFor="nameFormControl" className="form-label">
                    TODO's title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameFormControl"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="descFormControl" className="form-label">
                    TODO's description
                  </label>
                  <textarea
                    className="form-control"
                    id="descFormControl"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={important}
                    id="flexCheckDefault"
                    onChange={(e) => handleCheck(e)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Mark as important
                  </label>
                </div>
              </div>
            </div>
            <div className="dialog-footer">
              <button className="save-button" type="submit">
                UPDATE
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ModifyDialog;
