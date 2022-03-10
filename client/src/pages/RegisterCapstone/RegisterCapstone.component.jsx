import React, { useState } from "react";
import IconTextbox from "../../ui/Form/IconTextbox/IconTextbox.component";
import styles from "./RegisterCapstone.module.scss";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconCombobox from "../../ui/Form/IconCombobox/IconCombobox.component";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import Filter1OutlinedIcon from "@mui/icons-material/Filter1Outlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import NumberBox from "../../ui/Form/NumberBox/NumberBox.component";

function RegisterCapstone() {
  var [account, setAccount] = useState({
    email: "",
    level: "",
    gpa: "",
    credits: "",
    type: "",
  });
  var [error, setError] = useState({
    email: "",
    level: "",
    gpa: "",
    credits: "",
    type: "",
  });
  var [submit, setSubmit] = useState(false);
  function checkFields() {
    setSubmit(true);
  }
  function handleOnChange(event, name) {
    var value = event.target.value;
    account[name] = value;
    setAccount({ ...account });
    // if(!value.includes('@') && name === 'email') setError({email: "Email must include @"});
    // else setError("");
    // if((Number.isInteger(parseInt(value)) === false || parseInt(value) < 0) && name === 'gpa') setError({gpa: "GPA must be a number and more than 0"});
    // else setError("");
    // if((Number.isInteger(parseInt(value)) === false || parseInt(value) < 0) && name === 'credits') setError({credits: "Credits must be a number and more than 0"});
    // else setError("");
  }
  return (
    <div className={styles["register"]}>
      <div className="row">
        <div className="col-xl-6 w-100 h-100">
          <div
            className={
              styles["register_left"] +
              " d-flex justify-content-center align-items-center w-100 h-100"
            }
          >
            <img src="assets/images/login_image.svg" alt="SVG" />
          </div>
        </div>
        <div className="col-xl-6 w-100 h-100 pl-5">
          <div
            className={
              styles["register_right"] +
              " d-flex align-items-center w-100 h-100"
            }
          >
            <div className={styles["register_right_form"]}>
              <h3>Sign Up</h3>
              <p className="light-text">
                Lorem ipsum dolor sit amet elit. Sapiente sit aut eos
                consectetur adipisicing.
              </p>
              <div className={styles["register_right_textbox"]}>
                <IconTextbox
                  placeholder="Email"
                  Icon={() => <EmailOutlinedIcon sx={{ fontSize: "1.3rem" }} />}
                  type="text"
                  onChange={function (event) {
                    handleOnChange(event, "email");
                  }}
                ></IconTextbox>
                <p className="error-text">{error.email}</p>
                <p className="error-text">
                  {submit && account.email === ""
                    ? "This field can't be blank"
                    : ""}
                </p>
                <p>{account.email}</p>
              </div>
              <div className={styles["register_right_textbox"]}>
                <IconCombobox
                  list={[
                    "Level 1 : Not Good",
                    "Level 2 : Medium",
                    "Level 3 : Good",
                    "Level 4 : Very Good",
                  ]}
                  defaultValues="2"
                  Icon={() => (
                    <SchoolOutlinedIcon sx={{ fontSize: "1.3rem" }} />
                  )}
                  onChange={function (event) {
                    handleOnChange(event, "level");
                  }}
                ></IconCombobox>
                <p className="error-text">{error.level}</p>
                <p className="error-text">
                  {submit && account.level === ""
                    ? "This field can't be blank"
                    : ""}
                </p>
                <p>{account.level}</p>
              </div>
              <div className={styles["register_right_textbox"]}>
                <NumberBox
                  placeholder="GPA"
                  Icon={() => <p>ok</p>}
                  type="text"
                  onChange={function (event) {
                    handleOnChange(event, "gpa");
                  }}
                  min = {0}
                  max = {4}
                  message = "GPA must be a number and from 0 to 4"
                ></NumberBox>
                <p className="error-text">{error.gpa}</p>
                <p className="error-text">
                  {submit && account.gpa === ""
                    ? "This field can't be blank"
                    : ""}
                </p>
                <p>{account.gpa}</p>
              </div>
              <div className={styles["register_right_textbox"]}>
                <IconTextbox
                  placeholder="Course Creadits"
                  Icon={() => (
                    <Filter1OutlinedIcon sx={{ fontSize: "1.3rem" }} />
                  )}
                  type="text"
                  onChange={function (event) {
                    handleOnChange(event, "credits");
                  }}
                ></IconTextbox>
                <p className="error-text">{error.credits}</p>
                <p className="error-text">
                  {submit && account.credits === ""
                    ? "This field can't be blank"
                    : ""}
                </p>
                <p>{account.credits}</p>
              </div>
              <div className={styles["register_right_textbox"]}>
                <IconCombobox
                  list={["Capstone 1", "Capstone 2"]}
                  defaultValues="2"
                  Icon={() => <ClassOutlinedIcon sx={{ fontSize: "1.3rem" }} />}
                  onChange={function (event) {
                    handleOnChange(event, "type");
                  }}
                ></IconCombobox>
                <p className="error-text">{error.type}</p>
                <p className="error-text">
                  {submit && account.type === ""
                    ? "This field can't be blank"
                    : ""}
                </p>
                <p>{account.type}</p>
              </div>
              <div className={styles["register_right_undertb"]}>
                <span>
                  <Checkbox defaultChecked />
                  <span className="light-text">Remember me</span>
                </span>
                <span className="light-text">Forgot password ?</span>
              </div>
              <Button
                className="w-100"
                variant="contained"
                onClick={checkFields}
              >
                Register
              </Button>

              <div className={styles["register_right_undertb"] + " mt-5"}>
                <span className="default-text d-flex align-items-center">
                  <ArrowBackIcon
                    className="mr-1"
                    sx={{ fontSize: ".9rem" }}
                  ></ArrowBackIcon>{" "}
                  Home
                </span>
                <span className="default-text">Had a account ?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterCapstone;
