import React from "react";
import RoundedAvatar from "../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
import styles from "./TaskActivity.module.scss";
import DateConverter from "../../../services/Converter/DateConverter";

function TaskActivity({ fullName, activity, tag, time }) {
  return (
    <div className={styles["activity"]}>
      <div className={styles["activity_left"]}>
        <RoundedAvatar name={fullName}></RoundedAvatar>
      </div>
      <div className={styles["activity_right"]}>
          <div className> <b>{fullName + ' '}</b> {activity + ' ' + tag + ' '}</div>
          <div className={styles["activity-right_time"]}>{DateConverter.parseShortDateTime(time) + ' '}</div>
      </div>
    </div>
  );
}

export default TaskActivity;
