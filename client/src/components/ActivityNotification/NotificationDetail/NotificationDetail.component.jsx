import React from 'react';
import styles from './NotificationDetail.module.scss';

function NotificationDetail({ children }) {
    return (
        <div className={styles["notification-detail"] + (window.pageXOffset < 550 ? " light-bg p-4" : "")}>
            <div className={styles["notification-detail_header"]}>
                {children[0]}
            </div>
            <div className={styles["notification-detail_body"] + ""}>
                {children[1]}
            </div>
            <div className={styles["notification-detail_footer"] + ""}>
                {children[2]}
            </div>
        </div>
    );
}

export default NotificationDetail;