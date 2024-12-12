import React from "react";
import Styles from "./TaskItem.module.css";

const TaskItem = ({ task, onComplete, onDelete, onEdit }) => {


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };
  return (
    <div className={Styles.card}>
          <div className={Styles.createdDate}>
        Created on: <span>{formatDate(task.createdAt)}</span>
      </div>

      <h3 className={Styles.title}>{task.title}</h3>
      <p className={Styles.description}>{task.description}</p>
      <div className={Styles.buttonContainer}>
        {!task.completed ? (
          <>
            <button
              onClick={() => onComplete(task._id)}
              className={`${Styles.button} ${Styles.completeButton}`}
            >
              Complete
            </button>
            <button
              onClick={() => onEdit(task)}
              className={`${Styles.button} ${Styles.editButton}`}
            >
              Edit
            </button>
          </>
        ) : (
          <button
            onClick={() => onComplete(task._id)}
            className={`${Styles.button} ${Styles.completedButton}`}
          >
            Undo
          </button>
        )}
        <button
          onClick={() => onDelete(task._id)}
          className={`${Styles.button} ${Styles.deleteButton}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
