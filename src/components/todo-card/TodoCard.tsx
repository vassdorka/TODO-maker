import React, { Component, useState } from "react";
import "./TodoCard.scss";
import { motion } from "framer-motion";
import shoppingCart from "../../assets/shopping-cart.png";
import studyImg from "../../assets/study.png";
import phoneCall from "../../assets/phone-call.png";
import service from "../../assets/service.png";
import gift from "../../assets/gift.png";
import ModifyDialog from "../modify-dialog/ModifyDialog";

const TodoCard = ({ todo, onFinalizeTodo, onImportantClick, openDialog }) => {

  const imgObj = {
    shopping: shoppingCart,
    study: studyImg,
    phoneCall: phoneCall,
    service: service,
    gift: gift,
  };

  return (
    <>
      <div className="card">
        <div className="header-logos">
          <div className="date">{todo.time}</div>
          <div
            className={
              todo.important
                ? "icon full-exclamation-mark"
                : "icon exclamation-mark"
            }
            onClick={() => {
              onImportantClick(todo);
            }}
          />
        </div>
        <img src={imgObj[todo.type]} className="logo" />
        <div className="card-body">
          <h5 className="card-title">{todo.title}</h5>
          <p className="card-text">{todo.description}</p>
          <div className="logos">
            <div
              className="icon edit"
              onClick={() => openDialog(todo)}
            ></div>
            <div
              className="icon done"
              onClick={() => onFinalizeTodo(todo.id)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoCard;
