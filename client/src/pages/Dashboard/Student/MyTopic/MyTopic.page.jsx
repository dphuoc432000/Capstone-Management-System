import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Body from "../../../../components/Dashboard/Body/Body.component";
import Header from "../../../../components/Dashboard/Header/Header.component";
import TopicForm from "../../../../components/Dashboard/MyTopic/TopicForm/TopicForm.component";
import TopicTypeModel from "../../../../models/TopicTypeModel";
import AdvancedTable from "../../../../ui/Table/AdvancedTable/AdvancedTable.component";
import styles from "./MyTopic.module.scss";

function MyTopic() {
    const [topics, setTopics] = useState([
        {
            id: 1,
            title: "Snow1",
            description: "Jon1",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 2,
            title: "Snow2",
            description: "Jon2",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 3,
            title: "Snow3",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 4,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 5,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 6,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 7,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 8,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 9,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 11,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 12,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 13,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 14,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 15,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 16,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 17,
            title: "Snow",
            description: "Jon5",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 18,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 19,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 20,
            title: "Snow",
            description: "Jon3",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 111,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 122,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 133,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 144,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 155,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 166,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 177,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            id: 1333,
            title: "Snow",
            description: "Jon",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
    ]);
    const dispatch = useDispatch();
    const currentDeletedTopic = useSelector(s => s.currentDeletedTopic);

    const addTopic = () => {
        let newTopics = [{
            id: topics.length,
            title: "Untitled",
            description: "",
            type: "",
            leader: "",
            groupId: "",
            groupTitle: "",
            isApproved: "",
            isNew: true
        }].concat(topics);
        setTopics([...newTopics]);
        dispatch({ type: "ACTIVE_STATUS_TOPIC_FORM" })
    }

    const updateTopic = (topic) => {

    };

    const deleteTopic = () => {
        let { topicIndex } = currentDeletedTopic;
        topics.splice(topicIndex,1);
        setTopics([...topics]);
    };

    return (
        <div className={styles["my-topic"]}>

            <Header>
                <h5>My Topic</h5>
                <div className="d-flex justify-content-end">
                    <input
                        type="text"
                        className="form-control w-50 mr-2"
                        placeholder="Search topics"
                    />
                    <Button onClick={addTopic} variant="contained">Add</Button>
                </div>
            </Header>
            <Body>
                <AdvancedTable
                    title="List Topics"
                    data={topics}
                    cellType={TopicTypeModel}
                >
                    <TopicForm onUpdate={updateTopic} onDelete={deleteTopic} />
                </AdvancedTable>
            </Body>
        </div>
    );
}

export default MyTopic;
