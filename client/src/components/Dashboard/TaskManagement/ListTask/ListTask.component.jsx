import React from "react";
import styles from "./ListTask.module.scss";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Task from "../Task/Task.component";
import ItemButton from "../ItemButton/ItemButton.component";

function ListTask({ listId, title, tasks, openTaskDetail, addTask, listIndex, moveTask, removeList }) {

  return (
    <div className={styles["list-task"] + " js-list-task"}>
      <div
        className={
          styles["list-task_header"] +
          " d-flex justify-content-between align-items-center"
        }
      >
        <div>
          <span className={styles["list-task_header_title"]}>{title}</span>
        </div>
        <div className="d-flex align-items-center">
          <span className={styles["list-task_header_number"]}>
            {tasks.length}
          </span>
          <BorderColorOutlinedIcon
            className="mx-2"
            sx={{ color: "#64748b", fontSize: "20px" }}
          />
          <DeleteOutlineOutlinedIcon
            sx={{ color: "#64748b", fontSize: "20px" }}
            onClick={() => removeList(listId, listIndex)}
          />
        </div>
      </div>
      <div className={styles["list-task_body"]}>
        {tasks.map((task, taskIndex) => (
          <div
            onClick={() => openTaskDetail(task)}
            key={taskIndex}
            className={taskIndex > 0 ? "mt-3" : ""}
          >
            <Task
              taskId={task.taskId}
              taskIndex={taskIndex}
              title={task.title}
              tag={task.tag}
              endDate={task.endDate}
              members={task.members}
              listIndex={listIndex}
              moveTask={moveTask}
            />
          </div>
        ))}
        <div className="mt-2"><ItemButton addItem={(title) => addTask(title, listIndex)} text="Add another card" /></div>
      </div>
    </div>
  );
}

export default ListTask;
