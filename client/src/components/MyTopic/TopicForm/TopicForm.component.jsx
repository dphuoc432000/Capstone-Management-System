import React, { useState } from "react";
import Textarea from "../../../ui/Form/Textarea/Textarea.component";
import Textbox from "../../../ui/Form/Textbox/Textbox.component";
import Combobox from "../../../ui/Form/Combobox/Combobox.component";
import styles from "./TopicForm.module.scss";
import { Button } from "@mui/material";

function TopicForm({ onUpdate, onDelete }) {
    const [topic, setTopic] = useState({
        title: "",
        desc: "",
        type: "",
        groupId: "",
        leader: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [groups, setGroups] = useState([
        {
            groupId: "1",
            title: "CS2421",
        },
        {
            groupId: "2",
            title: "CS231",
        },
    ]);

    const [members, setMembers] = useState([
        {
            userId: "1",
            fullName: "Nguyen Long",
        },
        {
            userId: "2",
            fullName: "Le Viet",
        },
    ]);

    const handleChange = (event, name) => {
        let { value } = event.target;
        topic[name] = value;
        setTopic({ ...topic });
    };

    const updateTopic = () => {
        setIsSubmitted(true);
        onUpdate(topic);
    }

    const deleteTopic = () => {
        onDelete(topic);
    }

    return (
        <form className={styles["topic-form"] + " w-50 p-3"}>
            <div className="row">
                <div className="col-xl-6">
                    <div className="form-group">
                        <label>Title</label>
                        <Textbox
                            onChange={(event) => handleChange(event, "title")}
                            placeholder="Title"
                            regex={/^[A-Za-z\d\s]{3,}$/}
                            defaultValue=""
                            message="Title is minimum 3 characters"
                            isSubmitted={isSubmitted}
                        />
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="form-group">
                        <label>Type</label>
                        <Combobox
                            defaultValue=""
                            onChange={(event) => handleChange(event, "type")}
                            message="Type is required"
                            list={[
                                {
                                    title: "NCKH",
                                },
                                {
                                    title: "Capstone",
                                },
                            ]}
                            shownName="title"
                            gettedName="title"
                            isSubmitted={isSubmitted}
                        />
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label>Description</label>
                <Textarea
                    onChange={(event) => handleChange(event, "desc")}
                    regex={/^[A-Za-z\d\s]{3,}$/}
                    defaultValue={""}
                    message="Description is minimum 3 characters"
                    isSubmitted={isSubmitted}
                />
            </div>
            <div className="row">
                <div className="col-xl-6">
                    <div className="form-group w-100 mr-5">
                        <label>Group</label>
                        <Combobox
                            defaultValue=""
                            onChange={(event) => handleChange(event, "groupId")}
                            message="Group is required"
                            list={groups}
                            shownName="title"
                            gettedName="groupId"
                            isSubmitted={isSubmitted}
                        />
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="form-group w-100">
                        <label>Leader</label>
                        <Combobox
                            defaultValue=""
                            onChange={(event) => handleChange(event, "leader")}
                            message="Leader is required"
                            list={members}
                            shownName="fullName"
                            gettedName="userId"
                            isSubmitted={isSubmitted}
                        />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="d-flex justify-content-end">
                    <Button onClick={updateTopic} className="mr-2" variant="contained">
                        Update
                    </Button>
                    <Button onClick={deleteTopic} color="error" variant="contained">
                        Delete
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default TopicForm;
