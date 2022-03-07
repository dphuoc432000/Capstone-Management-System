import React from "react";
import { Route } from "react-router-dom";

export default function MorderatorRouter() {
  return (
    <>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/users">
        <Users />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </>
  );
}
