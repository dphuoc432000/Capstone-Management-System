import React from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import styles from "./ItemButton.module.scss";
const ItemButton = () => {
    return (
        <div className={styles["item-button"]}>
            <AddOutlinedIcon className="m-auto" />
        </div>
    );
};

export default ItemButton;