import React from 'react';
import RoundedAvatar from '../../Avatar/RoundedAvatar/RoundedAvatar.component';
import styles from './Notification.module.scss';

function Notification({ fullName, time, message }) {
    return (
        <div className={styles["notification"] + " d-flex align-items-center"}>
            <RoundedAvatar src="" name={fullName} />
            <div className="ml-3">
                <div>
                    <span className={styles["notification_name"]}>{fullName}</span>
                    <span className={styles["notification_time"] + " ml-2"}>{time}</span>
                </div>
                <div className={styles["notification_action"]}>{message}</div>
            </div>
        </div>
    );
}

export default Notification;