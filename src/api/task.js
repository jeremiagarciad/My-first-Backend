import axiosInstance from "./axios";

export const getTasksRequest = () => axiosInstance.get("/tasks");

export const createTaskRequest = (task) => axiosInstance.post("/tasks", task);

export const updateTaskRequest = (id, task) =>
  axiosInstance.put(`/tasks/${id}`, task);

export const deleteTasksRequest = (id) => axiosInstance.delete(`/tasks/${id}`);

export const getSingleTaskRequest = (id) => axiosInstance.get(`/tasks/${id}`);
