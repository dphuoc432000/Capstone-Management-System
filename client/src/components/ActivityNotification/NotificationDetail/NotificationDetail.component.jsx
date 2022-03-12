import React from "react";
import styles from "./NotificationDetail.module.scss";
import ItemImage from "../../../ui/Avatar/ItemImage/ItemImage.component";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { Box } from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DateConverter from "../../../services/Converter/DateConverter";
import OptionalDialog from "../../../ui/DialogMessage/OptionalDialog/OptionalDialog.component";

function NotificationDetail({
    title,
    content,
    createdAt,
    onClose,
    onUpdate,
    onDelete,
}) {
    return (
        <div
            className={
                styles["notification-detail"] +
                (window.pageXOffset < 550 ? " light-bg" : "")
            }
        >
            <div
                className={
                    styles["notification-detail_header"] +
                    " d-flex justify-content-between align-items-center light-bg px-4 llight-bottom-border"
                }
            >
                <div>
                    <h5 className="hlight-text mb-0">Notification Detail</h5>
                </div>
                <div className="d-flex align-items-center">
                    <LocalOfferOutlinedIcon className="hlight-text" />
                    <BorderColorOutlinedIcon
                        onClick={onUpdate}
                        className="hlight-text"
                    />
                    <OptionalDialog
                        title="Message"
                        content="Are you sure that you want to delete this notification ?"
                        onAgree={onDelete}
                        onDisagree={() => {}}
                    >
                        <DeleteOutlineOutlinedIcon className="hlight-text" />
                    </OptionalDialog>
                    <ClearOutlinedIcon
                        onClick={onClose}
                        className="hlight-text"
                    />
                </div>
            </div>
            <div className={styles["notification-detail_body"] + ""}>
                <div>
                    <h5 className="mb-1"> {title}</h5>
                    <p style={{ fontSize: "13px", color: "#777" }}>
                        {DateConverter.parseShortDateTime(createdAt)}
                    </p>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
            <div className={styles["notification-detail_footer"] + " mt-4"}>
                <div>
                    <div className="d-flex align-items-center mb-3">
                        <AttachFileOutlinedIcon
                            style={{ fontSize: "18px" }}
                            className="light-text mr-2"
                        />
                        <h5 className="mb-0" style={{ fontSize: "14px" }}>
                            3 Attachments
                        </h5>
                    </div>
                    <Box sx={{ display: { md: "flex", xs: "block" } }}>
                        <div className="mr-3">
                            <ItemImage
                                src="https://3.bp.blogspot.com/-eilZTdgbWPA/XFUltCS4Z1I/AAAAAAAABz0/feDxTa3Emtsb3Wx4xxu0hWnFrohqtwQfwCKgBGAs/w3440-h1440-c/mountain-lake-scenery-nature-cottage-25-4K.jpg"
                                title="mystery.jpg"
                                content="15.05 KB"
                            />
                        </div>
                        <div className="mr-3">
                            <ItemImage
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyl26w6fi0tD0MOYeWfU8fhppEMNDoqBkHaJsrHYtWf2e1N7kR1s5VgnJuNy__lTt82i8&usqp=CAU"
                                title="mystery.jpg"
                                content="15.05 KB"
                            />
                        </div>
                        <div className="mr-3">
                            <ItemImage
                                src="https://wallpaperaccess.com/full/31201.jpg"
                                title="mystery.jpg"
                                content="15.05 KB"
                            />
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default NotificationDetail;
