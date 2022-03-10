import { Button } from "@mui/material";
import React, { useState } from "react";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import Group from "../../../../components/MyGroup/Group/Group.component";
import styles from "./MyGroup.module.scss";

function MyGroup() {
    const [groups, setGroups] = useState([
        {
            projectId: "1",
            projectTitle: "Timesheet App",
            desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ullam dignissimos velit maiores officia vitae praesentium exercitationem ad quibusdam quia.",
            type: "Capstone 1",
            groupId: "asdf-basdf",
            groupTitle: "CS1.SE31",
            startDate: "2022-02-24 15:15:41.781+07",
            endDate: "2022-02-25 15:15:41.781+07",
            mentors: [
                {
                    lecturerId: "1",
                    fullName: "Nguyen Long",
                    email: "nglong@gmail.com",
                },
            ],
            members: [
                {
                    lecturerId: "1",
                    fullName: "Le Viet",
                    email: "leviet@gmail.com",
                },
                {
                    lecturerId: "2",
                    fullName: "Phan Huy",
                    email: "phuy@gmail.com",
                },
            ],
        },
        {
            projectId: "1",
            projectTitle: "Timesheet App",
            desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ullam dignissimos velit maiores officia vitae praesentium exercitationem ad quibusdam quia.",
            type: "Capstone 2",
            groupId: "asdf-basdf",
            groupTitle: "CS1.SE31",
            startDate: "2022-01-11 15:15:41.781+07",
            endDate: "2022-02-06 15:15:41.781+07",
            mentors: [
                {
                    lecturerId: "1",
                    fullName: "Le Long",
                    email: "lelong@gmail.com",
                },
            ],
            members: [
                {
                    lecturerId: "1",
                    fullName: "Nguyen Tien",
                    email: "ntien@gmail.com",
                },
                {
                    lecturerId: "1",
                    fullName: "Do Viet",
                    email: "dviet@gmail.com",
                },
            ],
        },
    ]);

    return (
        <div className={styles["my-group"]}>
            <Header>
                <h5>My Group</h5>
                <div className="w-50 d-flex justify-content-end">
                    <input
                        type="text"
                        className="form-control w-50 mr-2"
                        placeholder="Search groups"
                    />
                </div>
            </Header>
            <Body>
                <div className={styles["my-group_item"]+" d-flex p-5"}>
                    {groups.map((group, groupIndex) => (
                        <div className={styles["my-group_item_sub"]+" w-50 p-2"}>
                            <Group
                                key={groupIndex}
                                projectTitle={group.projectTitle}
                                desc={group.desc}
                                type={group.type}
                                groupTitle={group.groupTitle}
                                startDate={group.startDate}
                                endDate={group.endDate}
                                mentors={group.mentors}
                                members={group.members}
                            />
                        </div>
                    ))}
                </div>
            </Body>
        </div>
    );
}

export default MyGroup;
