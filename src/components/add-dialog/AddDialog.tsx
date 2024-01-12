import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../slices/todoSlice";
import "./AddDialog.scss";
import shoppingCart from "../../assets/shopping-cart.png";
import studyImg from "../../assets/study.png";
import phoneCall from "../../assets/phone-call.png";
import service from "../../assets/service.png";
import gift from "../../assets/gift.png";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

const AddDialog = ({ addDialogVisibility, setAddDialogVisibility }) => {
  const imgObjs = [
    { key: "shopping", name: shoppingCart },
    { key: "study", name: studyImg },
    { key: "phoneCall", name: phoneCall },
    { key: "service", name: service },
    { key: "gift", name: gift },
  ];
  const [selectedIcon, setSelectedIcon] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);
  const dispatch = useDispatch();

  const handleCheck = (e) => {
    if (e.target.checked) {
      setImportant(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" && selectedIcon === "") {
      toast.error("Please enter a title and select an icon for your TODO!");
      return;
    } else if (title === "") {
      toast.error("Please enter a title for your TODO!");
      return;
    } else if (selectedIcon === "") {
      toast.error("Please select an icon for your TODO!");
      return;
    }
    if (title && selectedIcon) {
      dispatch(
        addTodo({
          id: uuid(),
          type: selectedIcon,
          title,
          description,
          important,
          time: new Date().toLocaleString(),
        })
      );
      toast.success("TODO is successfully added!", {
        className: "toaster",
      });
      setAddDialogVisibility(false);
      setSelectedIcon("");
      setTitle(""), setDescription(""), setImportant(false);
    }
  };

  return (
    <>
      {addDialogVisibility && (
        <div className="wrapper">
          <form className="add-dialog" onSubmit={(e) => handleSubmit(e)}>
            <div className="dialog-header">
              <h1>NEW TODO</h1>
              <button
                type="button"
                className="btn-close"
                onClick={() => setAddDialogVisibility(false)}
              ></button>
            </div>
            <div className="dialog-body">
              <div className="icons">
                <label className="icon-label">TODO's icon</label>
                <div className="icon-selector">
                  {imgObjs.map((img) => (
                    <div
                      key={img.key}
                      className={
                        selectedIcon === img.key
                          ? "icon-card selected-icon"
                          : "icon-card"
                      }
                      onClick={() => setSelectedIcon(img.key)}
                    >
                      <img src={img.name} />
                    </div>
                  ))}
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
                    value=""
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
                ADD
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddDialog;
