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
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import GroupIcon from "@mui/icons-material/Group";
import DescriptionIcon from "@mui/icons-material/Description";
import TimelineIcon from "@mui/icons-material/Timeline";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ChatIcon from "@mui/icons-material/Chat";
import QrCodeIcon from "@mui/icons-material/QrCode";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TodayIcon from "@mui/icons-material/Today";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
// stylesheet

// sidebar for employee
const StudentSidebar = () => {
  return (
    <List
      className="dashboard_sidebar_main"
      sx={{ width: "100%", height: "100%", bgcolor: "background.paper" }}
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
      <NavLink className="base-link" to="/dashboard/my-topic">
        <ListItemButton>
          <ListItemIcon>
            <FormatListNumberedOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="My Topic" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/my-group">
        <ListItemButton>
          <ListItemIcon>
            <GroupOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="My Group" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/activity-notification">
        <ListItemButton>
          <ListItemIcon>
            <CampaignOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Notification" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/chat">
        <ListItemButton>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Template Topic" />
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
      <StudentSidebar />
    </div>
  );
}

export default Sidebar;
