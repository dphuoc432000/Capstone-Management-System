import React from "react";
import styles from "./IconCombobox.module.scss";

const IconCombobox = ({ Icon, defaultValues, list, onChange }) => {
  return (
    <div className={styles["icon-combobox"]}>
      <span className={styles["icon-combobox_icon"]}>
        <Icon></Icon>
      </span>
      <select className="form-select" onChange = {(event) => onChange(event)}>
        <option selected>Open this select menu</option>
        {list.map((value) => (
          <option value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default IconCombobox;
