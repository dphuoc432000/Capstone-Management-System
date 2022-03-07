import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import MentorRouter from "./MentorRouter";
import MorderatorRouter from "./MorderatorRouter";
import StudentRouter from "./StudentRouter";

export default function Router() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
      <Switch>
        <AdminRouter></AdminRouter>
        <MentorRouter></MentorRouter>
        <StudentRouter></StudentRouter>
        <MorderatorRouter></MorderatorRouter>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}