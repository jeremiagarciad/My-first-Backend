import { useContext, useState } from "react";
import { createContext } from "react";
import {
  createTaskRequest,
  deleteTasksRequest,
  getSingleTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/task";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    // setTasks(res);
    console.log(res);
  };

  const getTheListOfTasks = async (task) => {
    try {
      const responseTaskQuery = await getTasksRequest(task);
      setTasks(responseTaskQuery.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTasks = async (id) => {
    try {
      const res = await deleteTasksRequest(id);
      if (res.status === 204) tasks.filter((task) => task._id !== id);
    } catch (error) {
      console.error(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getSingleTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTask = async (taskId, task) => {
    try {
      await updateTaskRequest(taskId, task);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTheListOfTasks,
        deleteTasks,
        getTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
