import React from 'react';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import styles from "./Stage.module.scss";
import { Link } from 'react-router-dom';

const Stage = ({ stageId, title, desc, editedAt }) => {
    return (
        <Link to={"stage-" + stageId}>
            <div className={styles["stage"]}>
                <div className="my-auto">
                    <div className={styles["stage_box"] + " light-bg mb-4"}>
                        <AssignmentOutlinedIcon className={styles["stage_icon"] + " default-text"} />
                    </div>
                    <h5>{title}</h5>
                    <p >{desc}</p>
                    <div className={styles["stage_line"]}></div>
                    <div>
                        <span style={{ color: "#64748b" }}>Edited : </span>
                        <span>{editedAt}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Stage;