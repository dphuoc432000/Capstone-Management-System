import React from "react";
import styles from "./Group.module.scss";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import InfoAvatar from "../../../ui/Avatar/InfoAvatar/InfoAvatar.component";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import DateConverter from "../../../services/Converter/DateConverter";

function Group({
    projectTitle,
    desc,
    groupTitle,
    startDate,
    endDate,
    type,
    members,
    mentors,
}) {
    return (
        <div className={styles["group"]}>
            <div className={styles["group_header"]}>
                <h4>{projectTitle}</h4>
                <p className="mb-1">{type}</p>
                <span className="light-text">{desc}</span>
            </div>
            <div className="dropdown-divider py-2" />
            <div className={styles["group_body"]}>
                <div className="row">
                    <div className="col-xl-6">
                        <p>Mentors</p>
                        {mentors.map((mentor, mentorIndex) => (
                            <InfoAvatar
                                key={mentorIndex}
                                fullName={mentor.fullName}
                                email={mentor.email}
                            />
                        ))}
                    </div>
                    <div className="col-xl-6">
                        <p>Members - {groupTitle}</p>
                        {members.map((member, memberIndex) => (
                            <InfoAvatar
                                key={memberIndex}
                                fullName={member.fullName}
                                email={member.email}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="dropdown-divider py-2" />
            <div className={styles["group_footer"] + ""}>
                <div className="">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="w-75 d-flex align-items-center">
                                <ManageAccountsOutlinedIcon className="light-text" />{" "}
                                <span className="ml-2 light-text">{mentors.length} mentors</span>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="d-flex align-items-center">
                                <GroupOutlinedIcon className="light-text" />{" "}
                                <span className="ml-2 light-text">{members.length} members</span>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="mt-2">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="d-flex align-items-center">
                                <AccessTimeOutlinedIcon className="light-text" />{" "}
                                <span className="ml-2 light-text">
                                    {DateConverter.parseShortDate(startDate)} -{" "}
                                    {DateConverter.parseShortDate(endDate)}
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="d-flex align-items-center">
                                <HourglassBottomOutlinedIcon className="light-text" />{" "}
                                <span className="ml-2 light-text">3 months</span>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Group;
