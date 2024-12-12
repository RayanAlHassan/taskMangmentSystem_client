import React, { useState, useEffect } from "react";
import TaskForm from "../TaskForm/TaskForm";
import TaskItem from "../TaskItem/TaskItem";
import axios from "axios";
import styles from "./TaskList.module.css";

const TaskList = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(null);
  const [filter, setFilter] = useState("all"); // State to store the filter value
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    // Filter tasks whenever the filter value changes
    filterTasks();
  }, [filter, tasks]); // Run filter when filter or tasks change

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_PATH}/task`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const filterTasks = () => {
    let filtered = tasks;

    if (filter === "completed") {
      filtered = tasks.filter((task) => task.completed);
    } else if (filter === "pending") {
      filtered = tasks.filter((task) => !task.completed);
    }

    setFilteredTasks(filtered);
  };

  const openAddForm = () => {
    setTask(null);
    setShowForm(true);
  };

  const openEditForm = (taskToEdit) => {
    setTask(taskToEdit);
    setShowForm(true);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_PATH}/task/${taskId}`);
      fetchTasks(); // Re-fetch tasks after deleting
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const handleComplete = async (taskId) => {
    try {
      await axios.put(`${process.env.REACT_APP_PATH}/task/${taskId}`, {
        completed: true,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error completing task:", error.message);
    }
  };

  const handleUndo = async (taskId) => {
    try {
      await axios.put(`${process.env.REACT_APP_PATH}/task/${taskId}`, {
        completed: false,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error undoing task:", error.message);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update filter state
  };

  return (
    <div>
      <button className={styles.button} onClick={openAddForm}>
        Add Task
      </button>

      {/* Dropdown for task filter */}
      <select 
        onChange={handleFilterChange}
        value={filter}
        className={styles.filterDropdown}
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>

      <ul className={styles.container}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onComplete={task.completed ? handleUndo : handleComplete}
              onDelete={handleDelete}
              onEdit={openEditForm}
            />
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ul>

      {showForm && (
        <TaskForm
          task={task}
          setShowForm={setShowForm}
          fetchTasks={fetchTasks}
        />
      )}
    </div>
  );
};

export default TaskList;
