import React, { useState } from "react";
import HeaderButton from "../../../../components/TaskManagement/HeaderButton/HeaderButton.component";
import ItemButton from "../../../../components/TaskManagement/ItemButton/ItemButton.component";
import ListTask from "../../../../components/TaskManagement/ListTask/ListTask.component";
import TaskDetail from "../../../../components/TaskManagement/TaskDetail/TaskDetail.component";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import styles from "./TaskManagement.module.scss";
import { Link, useParams } from "react-router-dom";
import ItemHeaderButton from "../../../../components/Stageboard/ItemHeaderButton/ItemHeaderButton.component";
import OptionalDialog from "../../../../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
import Header from "../../../../components/Header/Header.component";
import Body from "../../../../components/Body/Body.component";
import Box from "@mui/material/Box";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

function TaskManagement() {
    const [listsTask, setListsTask] = useState([
        {
            listId: "1",
            title: "To do",
            tasks: [
                {
                    taskId: "1",
                    title: "Example that showcase all of the available bits on 1",
                    desc: "asdfasdf",
                    members: [
                        {
                            userId: "1",
                            firstName: "Nguyen",
                            lastName: "Long",
                        },
                        {
                            userId: "2",
                            firstName: "Le",
                            lastName: "Viet",
                        },
                    ],
                    comments: [
                        {
                            userId: "1",
                            firstName: "Nguyen",
                            lastName: "Long",
                            content: "That's good!",
                            createdAt: "2022-02-24 15:15:41.781+07",
                        },
                        {
                            userId: "2",
                            firstName: "Le",
                            lastName: "Viet",
                            content: "Ok, I will finish in 2 days.",
                            createdAt: "2022-02-24 15:15:41.781+07",
                        },
                    ],
                    tag: "Research",
                    startDate: "2022-03-07",
                    endDate: "2022-03-11",
                },
                {
                    taskId: "2",
                    title: "Example that showcase all of the available bits 2",
                    desc: "asdfasdf",
                    members: [
                        {
                            userId: "1",
                            firstName: "Nguyen",
                            lastName: "Long",
                        },
                        {
                            userId: "3",
                            firstName: "Truong",
                            lastName: "Huy",
                        },
                    ],
                    tag: "Research",
                    startDate: "2022-03-07",
                    endDate: "2022-03-11",
                },
            ],
        },
        {
            listId: "2",
            title: "To do",
            tasks: [
                {
                    taskId: "3",
                    title: "Example that showcase all of the available bits on 3",
                    desc: "asdfasdf",
                    members: [
                        {
                            userId: "1",
                            firstName: "Nguyen",
                            lastName: "Long",
                        },
                        {
                            userId: "2",
                            firstName: "Le",
                            lastName: "Viet",
                        },
                    ],
                    comments: [
                        {
                            userId: "1",
                            firstName: "Nguyen",
                            lastName: "Long",
                            content: "That's good!",
                            createdAt: "2022-02-24 15:15:41.781+07",
                        },
                        {
                            userId: "2",
                            firstName: "Le",
                            lastName: "Viet",
                            content: "Ok, I will finish in 2 days.",
                            createdAt: "2022-02-24 15:15:41.781+07",
                        },
                    ],
                    tag: "Research",
                    startDate: "2022-03-07",
                    endDate: "2022-03-11",
                },
                {
                    taskId: "4",
                    title: "Example that showcase all of the available bits on 4",
                    desc: "asdfasdf",
                    members: [
                        {
                            userId: "1",
                            firstName: "Nguyen",
                            lastName: "Long",
                        },
                        {
                            userId: "3",
                            firstName: "Truong",
                            lastName: "Huy",
                        },
                    ],
                    tag: "Research",
                    startDate: "2022-03-07",
                    endDate: "2022-03-11",
                },
            ],
        },
    ]);
    const [isOpenedTaskDetail, setIsOpenedTaskDetail] = useState(false);
    const [task, setTask] = useState({});
    const { stageName } = useParams();
    const [currentIndex, setCurrentIndex] = useState({});

    const openTaskDetail = (currentTask, clistIndex, ctaskIndex) => {
        setTask(currentTask);
        setIsOpenedTaskDetail(true);
        currentIndex.listIndex = clistIndex;
        currentIndex.taskIndex = ctaskIndex;
    };

    const closeTaskDetail = () => {
        setIsOpenedTaskDetail(false);
        setTask({});
    };

    const addList = (title) => {
        listsTask.push({ title: title, tasks: [] });
        setListsTask([...listsTask]);
    };

    const removeList = (listId, listIndex) => {
        listsTask.splice(listIndex, 1);
        setListsTask([...listsTask]);
    };

    const addTask = (title, listIndex) => {
        listsTask[listIndex].tasks.push({
            title: title,
            members: [],
            comments: [],
        });
        setListsTask([...listsTask]);
    };

    const moveTask = (listIndex, taskIndex, newListIndex, taskId) => {
        if (listIndex !== newListIndex) {
            listsTask[newListIndex].tasks.push(listsTask[listIndex].tasks[taskIndex]);
            listsTask[listIndex].tasks.splice(taskIndex, 1);
            setListsTask([...listsTask]);
        }
    };

    const addComment = (content) => {
        let { listIndex, taskIndex } = currentIndex;
        listsTask[listIndex].tasks[taskIndex].comments.push({
            userId: "bas-basd2",
            firstName: "Nguyen",
            lastName: "Viet",
            content: content,
        });
        setListsTask([...listsTask]);
    };

    return (
        <div className={styles["task-management"]}>
            <Header>
                <h5>{stageName.replace("-", " ")}</h5>
                <div
                    className={
                        styles["task-management_tool"] + " d-flex align-items-center"
                    }
                >
                    <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                        <Link to="/dashboard/task-management">
                            <HeaderButton
                                text="Boards"
                                Icon={() => <BarChartOutlinedIcon />}
                            />
                        </Link>
                        <div className="ml-3">
                            <ItemHeaderButton
                                addItem={() => { }}
                                CustomButton={() => (
                                    <HeaderButton
                                        text="Activity"
                                        Icon={() => <BorderColorOutlinedIcon />}
                                    />
                                )}
                            />
                        </div>
                        <div className="mx-3">
                            <ItemHeaderButton
                                addItem={() => { }}
                                CustomButton={() => (
                                    <HeaderButton
                                        text="Edit"
                                        Icon={() => <BorderColorOutlinedIcon />}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <OptionalDialog
                                title="Message"
                                content="Are you sure that you want to delete this stage ?"
                                onAgree={() => { }}
                                onDisagree={() => { }}
                            >
                                <HeaderButton
                                    text="Delete"
                                    Icon={() => <DeleteOutlineOutlinedIcon />}
                                />
                            </OptionalDialog>
                        </div>
                    </Box>
                    <Box sx={{ display: { xs: "block", sm: "none" } }}>
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle d-flex align-items-center"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                            >
                                <ListOutlinedIcon />
                            </button>
                            <div
                                className="dropdown-menu dropdown-menu-right p-2"
                                aria-labelledby="dropdownMenuButton"
                            >
                                <Link to="/dashboard/task-management">
                                    <HeaderButton
                                        text="Boards"
                                        Icon={() => <BarChartOutlinedIcon />}
                                    />
                                </Link>
                                <div className="my-2">
                                    <ItemHeaderButton
                                        addItem={() => { }}
                                        CustomButton={() => (
                                            <HeaderButton
                                                text="Edit"
                                                Icon={() => <BorderColorOutlinedIcon />}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="d-flex">
                                    <OptionalDialog
                                        title="Message"
                                        content="Are you sure that you want to delete this stage ?"
                                        onAgree={() => { }}
                                        onDisagree={() => { }}
                                    >
                                        <HeaderButton
                                            text="Delete"
                                            Icon={() => <DeleteOutlineOutlinedIcon />}
                                        />
                                    </OptionalDialog>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </Header>
            <Body>
                <div className={styles["task-management_list"] + " d-flex p-5"}>
                    {listsTask.map((list, listIndex) => (
                        <div className={" mb-5"}>
                            <ListTask
                                openTaskDetail={openTaskDetail}
                                key={listIndex}
                                listIndex={listIndex}
                                listId={list.listId}
                                title={list.title}
                                tasks={list.tasks}
                                addTask={addTask}
                                removeList={removeList}
                                moveTask={moveTask}
                            />
                        </div>
                    ))}
                    <div style={{ width: "300px" }}>
                        <ItemButton addItem={addList} text={"Add another list"} />
                    </div>
                    {isOpenedTaskDetail ? (
                        <div
                            className={
                                styles["task-management_task-detail"] +
                                " d-flex justify-content-center align-items-center"
                            }
                        >
                            <TaskDetail
                                title={task.title}
                                desc={task.desc}
                                startDate={task.startDate}
                                tag={task.tag}
                                endDate={task.endDate}
                                members={task.members}
                                comments={task.comments}
                                closeTaskDetail={closeTaskDetail}
                                addComment={addComment}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </Body>
        </div>
    );
}

export default TaskManagement;
