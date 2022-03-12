import React, { useState } from "react";
import Textbox from "../../../ui/Form/Textbox/Textbox.component";
import AdvancedEditor from "../../../ui/TextareaEditor/AdvancedEditor/AdvancedEditor.component";
import Button from "@mui/material/Button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styles from "./NotificationForm.module.scss";

function NotificationForm({
    onClose,
    onSubmit,
    text = "Notify",
    defaultNotification = { title: "", content: "" },
}) {
    const [notification, setNotification] = useState(defaultNotification);

    const handleChange = (value, name) => {
        notification[name] = value;
        setNotification({ ...notification });
    };

    return (
        <div className={styles["notification-form"]}>
            <div
                className={
                    styles["notification-form_header"] +
                    " default-bg d-flex justify-content-between"
                }
            >
                <span>New Notification</span>
                <CloseOutlinedIcon
                    onClick={onClose}
                    className="cursor-pointer"
                />
            </div>
            <div className={styles["notification-form_body"]}>
                <div className="form-group">
                    <Textbox
                        onChange={(event) =>
                            handleChange(event.target.value, "title")
                        }
                        placeholder="Title"
                        regex={/^.{3,}$/}
                        defaultValue={notification.title}
                        message="Title is minimum 3 characters"
                    />
                </div>
                <AdvancedEditor
                    defaultValue={notification.content}
                    onChange={(data) => handleChange(data, "content")}
                />
            </div>
            <div
                className={
                    styles["notification-form_footer"] +
                    " pt-0 d-flex justify-content-end"
                }
            >
                <Button
                    onClick={() => onSubmit(notification)}
                    variant="contained"
                >
                    {text}
                </Button>
            </div>
        </div>
    );
}

export default NotificationForm;
