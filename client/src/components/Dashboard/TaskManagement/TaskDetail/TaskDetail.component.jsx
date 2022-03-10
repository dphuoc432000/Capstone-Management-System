import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Textbox from "../../../../ui/Form/Textbox/Textbox.component";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import Comment from "../../../../ui/Communication/Comment/Comment.component";
import styles from "./TaskDetail.module.scss";
import ListCheckbox from "../../../../ui/Form/ListCheckbox/ListCheckbox.component";
import RoundedAvatar from "../../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
import Textarea from "../../../../ui/Form/Textarea/Textarea.component";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import OptionalDialog from "../../../../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
function TaskDetail({
    closeTaskDetail,
    title,
    desc,
    startDate,
    endDate,
    tag,
    members,
    comments,
}) {
    let group = [
        {
            userId: "1",
            firstName: "Nguyen",
            lastName: "Long",
        },
        {
            userId: "2",
            firstName: "Le",
            lastName: "Viet",
        },
        {
            userId: "3",
            firstName: "Truong",
            lastName: "Huy",
        },
    ];

    const filterGroup = () => {
        var result = group.map((groupMember) => {
            var isSame = members.some(
                (member) => member.userId === groupMember.userId
            );
            return {
                itemId: groupMember.userId,
                name: groupMember.firstName + " " + groupMember.lastName,
                checked: isSame,
            };
        });

        console.log(result);

        return result;
    };

    return (
        <div className={styles["task-detail"]}>
            <div
                className={
                    styles["task-detail_header"] +
                    " d-flex justify-content-between default-bg align-items-center"
                }
            >
                <div className="d-flex justify-content-between align-items-center w-25">
                    <TodayOutlinedIcon />
                    <AccountCircleOutlinedIcon />
                    <OptionalDialog
                        title="Message"
                        content="Are you sure that you want to delete this task ?"
                        onAgree={() => { }}
                        onDisagree={() => { }}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </OptionalDialog>
                    <AttachmentOutlinedIcon />
                    <CheckBoxOutlinedIcon />
                </div>
                <div>
                    <CloseOutlinedIcon onClick={closeTaskDetail} />
                </div>
            </div>
            <div className={styles["task-detail_body"]}>
                <form>
                    <div className="form-group">
                        <label>Title</label>
                        <Textbox
                            onChange={(event) => { }}
                            placeholder="Title"
                            regex={/^[A-Za-z\d\s]{3,}$/}
                            defaultValue={title}
                            message="Title is minimum 3 characters"
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <Textarea
                            onChange={(event) => { }}
                            regex={/^[A-Za-z\d\s]{3,}$/}
                            defaultValue={desc}
                            message="Description is minimum 3 characters"
                        />
                    </div>
                    <div className="form-group">
                        <label>Start</label>
                        <input
                            type="date"
                            defaultValue={startDate}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Due</label>
                        <input
                            type="date"
                            defaultValue={endDate}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Members</label>
                        <ListCheckbox
                            list={filterGroup()}
                            Label={({ name }) => (
                                <div className="d-flex align-items-center">
                                    <RoundedAvatar
                                        src=""
                                        name={name}
                                        style={{ width: "30px", height: "30px", fontSize: "16px" }}
                                    />
                                    <span className="ml-2">{name}</span>
                                </div>
                            )}
                            onChange={(event) => { }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tag</label>
                        <select value={tag} class="form-control">
                            <option>Choose a tag</option>
                            <option value="Research">Research</option>
                            <option value="Design">Design</option>
                            <option value="Code">Code</option>
                            <option value="Architecture">Architecture</option>
                            <option value="Test">Test</option>
                        </select>
                    </div>
                </form>
                <div className="mt-5">
                    <div
                        className={
                            styles["task-detail_body_activity"] +
                            " d-flex align-items-center mb-3"
                        }
                    >
                        <InsertCommentOutlinedIcon />
                        <h5 className="mb-0 ml-2">Activity</h5>
                    </div>
                    <textarea
                        class="form-control"
                        rows="1"
                        defaultValue="Enter a comment"
                    ></textarea>
                    <div className="py-3">
                        <div>
                            {comments.map((comment, commentIndex) => (
                                <Comment
                                    fullname={comment.firstName + " " + comment.lastName}
                                    content={comment.content}
                                    createdAt={comment.createdAt}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskDetail;
