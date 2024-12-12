import React, { useState, useEffect } from "react";
import Styles from "./TaskForm.module.css"; 
import axios from "axios";

const TaskForm = ({ task, setShowForm, fetchTasks }) => {
  // Determine if editing based on whether `task` prop exists
  const isEditing = !!task;

  // Initialize form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending", 
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isEditing && task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "pending",
      });
    }
  }, [isEditing, task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = isEditing
        ? `${process.env.REACT_APP_PATH}/task/${task._id}/`
        : `${process.env.REACT_APP_PATH}/task/`;

      const method = isEditing ? "put" : "post"; 

      await axios({
        method,
        url,
        data: formData,
      });

      setSuccessMessage(isEditing ? "Task updated successfully!" : "Task added successfully!");
      fetchTasks(); 
      setTimeout(() => setShowForm(false), 1500);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className={Styles.overlay}></div>
      <div className={Styles.container}>
        <h2 className={Styles.h2}>{isEditing ? "Edit Task" : "Add New Task"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={Styles.formGroup}>
            <label className={Styles.label}>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={Styles.inputField}
              required
            />
          </div>

          <div className={Styles.formGroup}>
            <label className={Styles.label}>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={Styles.textarea}
              required
            />
          </div>

  

          <button className={Styles.submitButton} disabled={isLoading}>
            {isLoading ? "Submitting..." : isEditing ? "Update Task" : "Add Task"}
          </button>
        </form>

        <button className={Styles.cancelButton} onClick={handleClose}>
          Cancel
        </button>

        {successMessage && <p className={Styles.successMessage}>{successMessage}</p>}
      </div>
    </>
  );
};

export default TaskForm;
