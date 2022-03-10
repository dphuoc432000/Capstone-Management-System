import React, { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import styles from "./ItemButton.module.scss";
import { Button } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function ItemButton({ text, addItem }) {
    const [isActive, setIsActive] = useState(false);
    const [title, setTitle] = useState("");
    const add = () => {
        addItem(title);
        setIsActive(false);
        setTitle("");
    };

    return (
        <div className={styles["item-button"]}>
            {isActive ? (
                <div>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter a item"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <div className="d-flex align-items-center">
                        <Button onClick={add} variant="contained">
                            Add Item
                        </Button>
                        <CloseOutlinedIcon onClick={() => setIsActive(false)} className="ml-2" />
                    </div>
                </div>
            ) : (
                <div className="d-flex align-items-center" onClick={() => setIsActive(true)}>
                    <AddCircleOutlineOutlinedIcon />
                    <span className="ml-2">{text}</span>
                </div>
            )}
        </div>
    );
}

export default ItemButton;