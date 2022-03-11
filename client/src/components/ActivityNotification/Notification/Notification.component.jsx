import React from 'react';
import styles from './Notification.module.scss';

function Notification({ children }) {
    return (
        <div className={styles["notification"]}>
            <div className={styles["notification_title"]}>
                {children[0]}
            </div>
            <div className={styles["notification_content"]}>
                {children[1]}
            </div>
            <div className={styles["notification_time"]}>
                {children[2]}
            </div>
        </div>
    );
}

export default Notification;