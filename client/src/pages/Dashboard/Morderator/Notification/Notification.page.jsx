import React, { useState } from "react";
import Notification from "../../../../components/ActivityNotification/Notification/Notification.component";
import Sidebar from "../../../../components/ActivityNotification/Sidebar/Sidebar.component";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import Pagination from "@mui/material/Pagination";
import styles from "./Notification.module.scss";
import NotificationDetail from "../../../../components/ActivityNotification/NotificationDetail/NotificationDetail.component";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

function Notification() {
    const [notifications, setNotifications] = useState([
        {
            notificationId: "1",
            title: "Lorem ipsum dolor sit amet.1",
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque obcaecati impedit perferendis accusantium eius vero deserunt iusto, veniam expedita vitae.",
            createdAt: "2022-02-24 15:15:41.781+07",
        },
        {
            notificationId: "1",
            title: "Lorem ipsum dolor sit amet.2",
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque obcaecati impedit perferendis accusantium eius vero deserunt iusto, veniam expedita vitae.",
            createdAt: "2022-02-24 15:15:41.781+07",
        },
        {
            notificationId: "1",
            title: "Lorem ipsum dolor sit amet.3",
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque obcaecati impedit perferendis accusantium eius vero deserunt iusto, veniam expedita vitae.",
            createdAt: "2022-02-24 15:15:41.781+07",
        },
        {
            notificationId: "1",
            title: "Lorem ipsum dolor sit amet.4",
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque obcaecati impedit perferendis accusantium eius vero deserunt iusto, veniam expedita vitae.",
            createdAt: "2022-02-24 15:15:41.781+07",
        },
        {
            notificationId: "1",
            title: "Lorem ipsum dolor sit amet.5",
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque obcaecati impedit perferendis accusantium eius vero deserunt iusto, veniam expedita vitae.",
            createdAt: "2022-02-24 15:15:41.781+07",
        },
        {
            notificationId: "1",
            title: "Lorem ipsum dolor sit amet.6",
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque obcaecati impedit perferendis accusantium eius vero deserunt iusto, veniam expedita vitae.",
            createdAt: "2022-02-24 15:15:41.781+07",
        },
        {
            notificationId: "1",
            title: "Lorem ipsum dolor sit amet.7",
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque obcaecati impedit perferendis accusantium eius vero deserunt iusto, veniam expedita vitae.",
            createdAt: "2022-02-24 15:15:41.781+07",
        },
        {
            notificationId: "1",
            title: "Lorem ipsum dolor sit amet.8",
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque obcaecati impedit perferendis accusantium eius vero deserunt iusto, veniam expedita vitae.",
            createdAt: "2022-02-24 15:15:41.781+07",
        },
        {
            notificationId: "1",
            title: "Lorem ipsum dolor sit amet.9",
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque obcaecati impedit perferendis accusantium eius vero deserunt iusto, veniam expedita vitae.",
            createdAt: "2022-02-24 15:15:41.781+07",
        },
        {
            notificationId: "1",
            title: "Lorem ipsum dolor sit amet.10",
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque obcaecati impedit perferendis accusantium eius vero deserunt iusto, veniam expedita vitae.",
            createdAt: "2022-02-24 15:15:41.781+07",
        },
        {
            notificationId: "1",
            title: "Lorem ipsum dolor sit amet.11",
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque obcaecati impedit perferendis accusantium eius vero deserunt iusto, veniam expedita vitae.",
            createdAt: "2022-02-24 15:15:41.781+07",
        },
    ]);

    const [page, setPage] = useState(1);
    const [notificationDetail, setNotificationDetail] = useState({ title: "" });

    const openNotificationDetail = (notification) => {
        setNotificationDetail(notification);
    };

    const addNotification = (notification) => {
        notifications.push(notification);
        setNotifications([...notifications]);
    };

    return (
        <div className={styles["activity-notification"]}>
            <Header>
                <h5>Activity Notification</h5>
                <div className="w-50 d-flex justify-content-end">
                    <input
                        type="text"
                        className="form-control w-75 mr-2"
                        placeholder="Search notifications"
                    />
                </div>
            </Header>
            <Body>
                <div
                    className={
                        styles["activity-notification_body"] +
                        " d-flex w-100 h-100 llight-top-border"
                    }
                >
                    <Sidebar addNotification={addNotification}>
                        {notifications.map(
                            (notification, notificationIndex) => {
                                let currentPage = page - 1;
                                if (
                                    notificationIndex >= currentPage * 5 &&
                                    notificationIndex < currentPage * 5 + 5
                                ) {
                                    return (
                                        <div
                                            key={notificationIndex}
                                            className="llight-bottom-border mb-2"
                                            onClick={() =>
                                                openNotificationDetail(
                                                    notification
                                                )
                                            }
                                        >
                                            <Notification
                                                title={notification.title}
                                                content={notification.content}
                                                createdAt={
                                                    notification.createdAt
                                                }
                                            />
                                        </div>
                                    );
                                }
                            }
                        )}
                        <Pagination
                            onChange={(e, value) => setPage(value)}
                            page={page}
                            className="m-auto"
                            count={parseInt(notifications.length / 5) + 1}
                            color="primary"
                        />
                    </Sidebar>
                    {notificationDetail.title ? (
                        <NotificationDetail
                            title={notificationDetail.title}
                            content={notificationDetail.content}
                            createdAt={notificationDetail.createdAt}
                        />
                    ) : (
                        <div className="d-flex w-75">
                            <div className="m-auto light-text">
                                <div className="d-flex justify-content-center mb-3">
                                    <NotificationsActiveOutlinedIcon
                                        style={{ fontSize: "70px" }}
                                    />
                                </div>
                                <h5 className="mb-0">
                                    Choose a notification to read
                                </h5>
                            </div>
                        </div>
                    )}
                </div>
            </Body>
        </div>
    );
}

export default Notification;
