import React from "react";
import DateConverter from "../../../services/Converter/DateConverter";
import styles from "./Notification.module.scss";

function Notification({ title, content, createdAt }) {
    return (
        <div className={styles["notification"]}>
            <div className={styles["notification_title"]}>
                <h5 className="mb-0">{title}</h5>
            </div>
            <div className={styles["notification_content"]}>
                <p className="my-2">
                    <div dangerouslySetInnerHTML={{ __html: content }}/>
                </p>
            </div>
            <div className={styles["notification_time"]}>
                <span className="bold-light-text">
                    {DateConverter.parseShortDateTime(createdAt)}
                </span>
            </div>
        </div>
    );
}

export default Notification;
