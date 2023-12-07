import React from "react";
import { useTasks } from "../context/taskContext";
import { Link } from "react-router-dom";
import utc from "dayjs/plugin/utc";
import days from "dayjs";

days.extend(utc);

export const TaskCard = ({ task }) => {
  const { deleteTasks } = useTasks();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-8 rounded-md">
      <header className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          <button
            className="bg-red-500 hover:bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => deleteTasks(task._id)}
          >
            DELETE
          </button>
          <Link
            className="bg-blue-500 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
            to={`/tasks/${task._id}`}
          >
            EDIT
          </Link>
        </div>
      </header>
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p className="text-slate-300">{task.description}</p>

      <p>{days(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  );
};
