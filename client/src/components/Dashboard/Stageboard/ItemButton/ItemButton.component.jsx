import React, { useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import styles from "./ItemButton.module.scss";
import { Button } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const ItemButton = ({ addItem }) => {

    const [isActive, setIsActive] = useState(false);
    const [item, setItem] = useState({});

    const onChange = (event,name) => {
        let { value } = event.target;
        setItem({ ...item, [name]: value });
    }

    const add = () => {
        addItem(item);
        setIsActive(false);
        setItem({});
    };

    return (
        <div className={styles["item-button"]}>
            {isActive ? (
                <form>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter a title"
                        onChange={(event) => onChange(event, "title")}
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter a description"
                        onChange={(event) => onChange(event, "desc")}
                    />
                    <div className="d-flex align-items-center">
                        <Button onClick={add} variant="contained">
                            Add Item
                        </Button>
                        <CloseOutlinedIcon onClick={() => setIsActive(false)} className="ml-2" />
                    </div>
                </form>
            ) : (
                <div className={styles["item-button_add"] + " d-flex align-items-center"} onClick={() => setIsActive(true)}>
                    <AddOutlinedIcon className="m-auto" />
                </div>
            )}

        </div>
    );
};

export default ItemButton;