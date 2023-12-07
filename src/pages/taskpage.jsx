import React, { useEffect } from "react";
import { useTasks } from "../context/taskContext";
import { TaskCard } from "./../components/taskcard";

export const TaskPage = () => {
  const { getTheListOfTasks, tasks } = useTasks();

  useEffect(() => {
    getTheListOfTasks();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};
