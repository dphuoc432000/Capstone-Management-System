import React from "react";
import styles from "./Sidebar.module.scss";
// components
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
// icon
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupIcon from "@mui/icons-material/Group";
import NoteIcon from "@mui/icons-material/Note";
import DescriptionIcon from "@mui/icons-material/Description";
import TimelineIcon from "@mui/icons-material/Timeline";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ChatIcon from "@mui/icons-material/Chat";
import QrCodeIcon from "@mui/icons-material/QrCode";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TodayIcon from "@mui/icons-material/Today";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

// stylesheet

// sidebar for employee
const EmployeeSidebar = () => {
  return (
    <List
      className="dashboard_sidebar_main"
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Sidebar
        </ListSubheader>
      }
    >
      <NavLink className="base-link" to="/">
        <ListItemButton>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Introduction" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/task-management">
        <ListItemButton>
          <ListItemIcon>
            <AssignmentOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Task Management" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/timesheet-report">
        <ListItemButton>
          <ListItemIcon>
            <NoteIcon />
          </ListItemIcon>
          <ListItemText primary="Timesheet Report" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/expense-report">
        <ListItemButton>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Expense Report" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/my-team">
        <ListItemButton>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="My Team" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/chat">
        <ListItemButton>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/timesheet-code">
        <ListItemButton>
          <ListItemIcon>
            <QrCodeIcon />
          </ListItemIcon>
          <ListItemText primary="Timesheet Code" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/task-board">
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Taskboard" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/task-list">
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText primary="Task List" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/calendar">
        <ListItemButton>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItemButton>
      </NavLink>
    </List>
  );
};

function Sidebar() {
  return (
    <div className={styles["sidebar"]}>
      <EmployeeSidebar />
    </div>
  );
}

export default Sidebar;
