import React from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import styles from './Sidebar.module.scss';

function Sidebar({ children }) {
    return (
        <div className={styles["sidebar"] + " llight-right-border"}>
            <div className={styles["sidebar_header"] + " d-flex light-bg llight-bottom-border"}>
                <div className="w-100 d-flex justify-content-between m-auto">
                    <h5 className="mb-0">Notification</h5>
                    <MoreVertOutlinedIcon />
                </div>
            </div>
            <div className={styles["sidebar_body"]}>
                {children[0]}
            </div>
            <div className={styles["sidebar_footer"] + " d-flex light-bg llight-top-border"}>
                {children[1]}
            </div>
        </div>
    );
}

export default Sidebar;