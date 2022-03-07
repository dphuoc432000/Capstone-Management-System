import React, { Component } from "react";
import { active } from "./Demo.feature";
import styles from "./Demo.module.scss";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className={styles.demo}>
        <p className={styles.demo1}>demo1</p>
        <p className={styles.demo2}>demo2</p>
        {this.props.state.count}
        <button
          onClick={() => {
            this.props.handleIncrementClick();
          }}
          type="button"
        >
          Count23
        </button>

        <button onClick={() => active()} type="button">
          Active223
        </button>
        <Stack spacing={2} direction="row">
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "12px",
              boxShadow: 1,
              fontWeight: "bold",
            }}
            variant="contained"
          >
            Contained
          </Button>
        </Stack>
      </div>
    );
  }
}

export default Demo;
