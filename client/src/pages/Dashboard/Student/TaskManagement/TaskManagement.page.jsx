import React, { useState } from "react";
import HeaderButton from "../../../../components/Dashboard/TaskManagement/HeaderButton/HeaderButton.component";
import ItemButton from "../../../../components/Dashboard/TaskManagement/ItemButton/ItemButton.component";
import ListTask from "../../../../components/Dashboard/TaskManagement/ListTask/ListTask.component";
import TaskDetail from "../../../../components/Dashboard/TaskManagement/TaskDetail/TaskDetail.component";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import styles from "./TaskManagement.module.scss";
import { Link, useParams } from "react-router-dom";
import ItemHeaderButton from "../../../../components/Dashboard/Stageboard/ItemHeaderButton/ItemHeaderButton.component";
import OptionalDialog from "../../../../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
import Header from "../../../../components/Dashboard/Header/Header.component";
import Body from "../../../../components/Dashboard/Body/Body.component";

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

    const openTaskDetail = (currentTask) => {
        setTask(currentTask);
        setIsOpenedTaskDetail(true);
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

    return (
        <div className={styles["task-management"]}>
            <Header>
                <h5>
                    {stageName.replace("-", " ")}
                </h5>
                <div className="d-flex align-items-center">
                    <Link to="/dashboard/task-management">
                        <HeaderButton
                            text="Boards"
                            Icon={() => <BarChartOutlinedIcon />}
                        />
                    </Link>
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
                </div>
            </Header>
            <Body>
                <div className="d-flex p-5">
                    {listsTask.map((list, listIndex) => (
                        <div className=" mb-5">
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
