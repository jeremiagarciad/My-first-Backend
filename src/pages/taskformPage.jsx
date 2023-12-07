import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/taskContext";
import { useNavigate, useParams } from "react-router-dom";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);

const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function LoadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", task.date);
      }
    }

    LoadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, {
        ...data,
        date: dayjs.utc(data.date).format(),
      });
    } else {
      createTask({
        ...data,
        date: dayjs.utc(data.date).format(),
      });
    }
    navigate("/tasks");
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">title</label>
        <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="text"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        <label htmlFor="title">description</label>
        <textarea
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          rows="3"
          placeholder="Description"
          {...register("description")}
        >
          {" "}
        </textarea>

        <label htmlFor="title">Date</label>
        <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="date"
          {...register("date")}
        />
        <button className="bg-indigo-500 px-3 py-2 rounded-md">
          {" "}
          Save Tasks
        </button>
      </form>
    </div>
  );
};

export default TaskFormPage;
