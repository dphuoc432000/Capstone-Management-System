import React from "react";
import styles from "./IconTextbox.module.scss";

const IconTextbox = ({ placeholder, Icon, type, onChange }) => {
  return (
    <div className={styles["icon-textbox"]}>
      <span className={styles["icon-textbox_icon"]}>
        <Icon></Icon>
      </span>
      <input onChange={onChange} type={type} placeholder={placeholder} />
    </div>
  );
};

export default IconTextbox;
