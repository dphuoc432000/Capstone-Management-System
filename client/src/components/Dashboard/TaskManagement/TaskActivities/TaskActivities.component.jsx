import React, { useState } from 'react';
import styles from './TaskActivities.module.scss';
import TaskActivity from '../TaskActivity/TaskActivity.component';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
function TaskActivities(props) {
    var [activities, setActivities] = useState(
        [
            {
                fullName: "Truong Kha",
                activity: "Da tham gia vao the",
                tag: 'code tag',
                time: '2022-02-24 15:15:41.781+07'
            },
            {
                fullName: "Truong Vinh",
                activity: "Da tham gia vao the",
                tag: 'code tag sdss sdpg',
                time: '2022-02-24 15:15:41.781+07'
            },
            {
                fullName: "Truong Dat",
                activity: "Da tham gia vao the as sdg sdg asf ",
                tag: 'code tag',
                time: '2022-02-24 15:15:41.781+07'
            },
            {
                fullName: "Truong Huy",
                activity: "Da tham gia vao the",
                tag: 'code tag sdgsd sdg ',
                time: '2022-02-24 15:15:41.781+07'
            },
            {
                fullName: "Truong Huy Dat",
                activity: "Da tham gia vao the",
                tag: 'code tag',
                time: '2022-02-24 15:15:41.781+07'
            }
        ]
    )
    return (
        <div className={styles["activities"]}>
            <div className={styles['activities_header']}>
                <NoteAltOutlinedIcon className={styles['activities_icon']}></NoteAltOutlinedIcon>
                <h5>Tasks Activities</h5>
            </div>
            {
                activities.map(function(activity, index){
                    return <TaskActivity key = {index} fullName = {activity.fullName} activity = {activity.activity} tag = {activity.tag} time = {activity.time}></TaskActivity>
                })
            }
        </div>
    );
}

export default TaskActivities;