import React from "react";
import { Routes, Route } from "react-router-dom";
import MyGroup from "../../pages/Dashboard/General/MyGroup/MyGroup.page";
import ActivityNotification from "../../pages/Dashboard/General/ActivityNotification/ActivityNotification.page";

export default function GeneralRouter() {
    return (
        <Routes>
            <Route path="activity-notification" element={<ActivityNotification />} />
            <Route path="my-group" element={<MyGroup />} />
        </Routes>
    );
}
