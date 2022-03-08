import React from 'react';
import styles from "./Body.module.scss";

function Body({ children, className }) {

    return (
        <div className={styles["body"] + " " + className}>
            {children}
        </div>
    );
}

export default Body;