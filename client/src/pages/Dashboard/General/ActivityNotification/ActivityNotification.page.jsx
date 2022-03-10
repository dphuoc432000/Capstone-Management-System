import React, { useState } from "react";
import Notification from "../../../../components/ActivityNotification/Notification/Notification.component";
import Sidebar from "../../../../components/ActivityNotification/Sidebar/Sidebar.component";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import Pagination from "@mui/material/Pagination";
import styles from "./ActivityNotification.module.scss";
import DateConverter from "../../../../services/Converter/DateConverter";
import NotificationDetail from "../../../../components/ActivityNotification/NotificationDetail/NotificationDetail.component";
import ItemImage from "../../../../ui/Avatar/ItemImage/ItemImage.component";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { Box } from "@mui/material";

function ActivityNotification() {
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
        setNotifications(notifications);
    }

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
                <div className={styles["activity-notification_body"] + " d-flex w-100 h-100 llight-top-border"}>
                    <Sidebar addNotification={addNotification}>
                        {notifications.map((notification, notificationIndex) => {
                            let currentPage = page - 1;
                            if (
                                notificationIndex >= currentPage * 5 &&
                                notificationIndex < currentPage * 5 + 5
                            ) {
                                return (
                                    <div
                                        key={notificationIndex}
                                        className="llight-bottom-border mb-2"
                                        onClick={() => openNotificationDetail(notification)}
                                    >
                                        <Notification>
                                            <h5 className="mb-0">{notification.title}</h5>
                                            <p className="my-2">{notification.content}</p>
                                            <span className="bold-light-text">
                                                {DateConverter.parseShortDateTime(
                                                    notification.createdAt
                                                )}
                                            </span>
                                        </Notification>
                                    </div>
                                );
                            }
                        })}
                        <Pagination
                            onChange={(e, value) => setPage(value)}
                            page={page}
                            className="m-auto"
                            count={parseInt(notifications.length / 5) + 1}
                            color="primary"
                        />
                    </Sidebar>
                    {notificationDetail.title ? <NotificationDetail>
                        <div>
                            <h5 className="mb-2">Lorem ipsum dolor sit amet.</h5>
                            <p style={{ fontSize: "13px", color: "#777" }}>Mar 11, 2022 11:50</p>
                        </div>
                        <div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                                fugiat dicta nihil placeat impedit excepturi aperiam eius
                                labore dignissimos dolor odio dolores eos asperiores unde
                                alias maiores recusandae quasi harum quaerat illum modi
                                laudantium eaque quos. Quibusdam velit voluptatem quaerat.
                                Nostrum labore facere, explicabo ipsam eveniet officiis cum
                                natus mollitia dolore nobis quis culpa debitis aut eius non
                                soluta. Consequuntur voluptatibus ratione placeat,
                                recusandae excepturi porro quae? Explicabo ex quasi
                                perferendis enim porro, illum maiores voluptas, minus at
                                iste architecto tempora impedit earum assumenda quia
                                laudantium quos quidem. Itaque deserunt eos omnis nulla
                                cumque, laboriosam eius id sunt repellat quo.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                                fugiat dicta nihil placeat impedit excepturi aperiam eius
                                labore dignissimos dolor odio dolores eos asperiores unde
                                alias maiores recusandae quasi harum quaerat illum modi
                                laudantium eaque quos. Quibusdam velit voluptatem quaerat.
                                Nostrum labore facere, explicabo ipsam eveniet officiis cum
                                natus mollitia dolore nobis quis culpa debitis aut eius non
                                soluta. Consequuntur voluptatibus ratione placeat,
                                recusandae excepturi porro quae? Explicabo ex quasi
                                perferendis enim porro, illum maiores voluptas, minus at
                                iste architecto tempora impedit earum assumenda quia
                                laudantium quos quidem. Itaque deserunt eos omnis nulla
                                cumque, laboriosam eius id sunt repellat quo.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                                fugiat dicta nihil placeat impedit excepturi aperiam eius
                                labore dignissimos dolor odio dolores eos asperiores unde
                                alias maiores recusandae quasi harum quaerat illum modi
                                laudantium eaque quos. Quibusdam velit voluptatem quaerat.
                                Nostrum labore facere, explicabo ipsam eveniet officiis cum
                                natus mollitia dolore nobis quis culpa debitis aut eius non
                                soluta. Consequuntur voluptatibus ratione placeat,
                                recusandae excepturi porro quae? Explicabo ex quasi
                                perferendis enim porro, illum maiores voluptas, minus at
                                iste architecto tempora impedit earum assumenda quia
                                laudantium quos quidem. Itaque deserunt eos omnis nulla
                                cumque, laboriosam eius id sunt repellat quo.
                            </p>
                        </div>
                        <div>
                            <div className="d-flex align-items-center mb-3">
                                <AttachFileOutlinedIcon
                                    style={{ fontSize: "18px" }}
                                    className="light-text mr-2"
                                />
                                <h5 className="mb-0" style={{ fontSize: "14px" }}>
                                    3 Attachments
                                </h5>
                            </div>
                            <Box sx={{ display: { md: "flex", xs: "block" } }}>
                                <div className="mr-3">
                                    <ItemImage src="https://3.bp.blogspot.com/-eilZTdgbWPA/XFUltCS4Z1I/AAAAAAAABz0/feDxTa3Emtsb3Wx4xxu0hWnFrohqtwQfwCKgBGAs/w3440-h1440-c/mountain-lake-scenery-nature-cottage-25-4K.jpg" title="mystery.jpg" content="15.05 KB" />
                                </div>
                                <div className="mr-3">
                                    <ItemImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyl26w6fi0tD0MOYeWfU8fhppEMNDoqBkHaJsrHYtWf2e1N7kR1s5VgnJuNy__lTt82i8&usqp=CAU" title="mystery.jpg" content="15.05 KB" />
                                </div>
                                <div className="mr-3">
                                    <ItemImage src="https://wallpaperaccess.com/full/31201.jpg" title="mystery.jpg" content="15.05 KB" />
                                </div>
                            </Box>
                        </div>
                    </NotificationDetail> : ""}
                </div>
            </Body>
        </div>
    );
}

export default ActivityNotification;
