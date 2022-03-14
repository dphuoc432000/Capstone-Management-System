import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

import styles from "./Login.module.scss";
import { useDispatch } from "react-redux";
import ObjectChecker from "../../services/Object/ObjectChecker";
import ValidatedIconTextbox from "../../ui/Form/ValidatedIconTextbox/ValidatedIconTextbox.component";


function Login() {
  const [account, setAccount] = useState({ email: "", password: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (event, name) => {
    var { value } = event.target;
    account[name] = value;
    setAccount({ ...account });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    var isValidAccount = ObjectChecker.isEmptyKeys(account);
    setIsSubmitted(true);

    console.log(isValidAccount);

    if (isValidAccount) {
      dispatch({ type: "UPDATE_SESSION" });
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
        window.testName();
      }, 1000);
    }
  };

  return (
    <div className={styles["login"]}>
      <div className={styles["login_row"]+" row w-100"}>
        <div className="col-xl-6 col-md-12 w-100 h-100">
          <div
            className={
              styles["login_left"] +
              " d-flex justify-content-center align-items-center w-100 h-100"
            }
          >
            <img src="assets/images/login_image.svg" alt="SVG" />
          </div>
        </div>
        <div className="col-xl-6 col-md-12 w-100 h-100">
          <div
            className={
              styles["login_right"] +
              " d-flex align-items-center justify-content-end w-100 h-100"
            }
          >
            <div className={styles["login_right_form"]}>
              <form onSubmit={onSubmit}>
                <h3>Sign In</h3>
                <p className="light-text">
                  Lorem ipsum dolor sit amet elit. Sapiente sit aut eos
                  consectetur adipisicing.
                </p>
                <div className={styles["login_right_textbox"]}>
                  <ValidatedIconTextbox
                    isRequired={true}
                    isSubmitted={isSubmitted}
                    placeholder="Email"
                    Icon={() => (
                      <EmailOutlinedIcon sx={{ fontSize: "1.3rem" }} />
                    )}
                    type="text"
                    onChange={(event) => onChange(event, "email")}
                    regex={
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    }
                    regexMessage="Your email is invalid!"
                    requiredMessage="Email is required!"
                  />
                </div>
                <div className={styles["login_right_textbox"]}>
                  <ValidatedIconTextbox
                    isRequired={true}
                    isSubmitted={isSubmitted}
                    placeholder="Password"
                    Icon={() => (
                      <LockIcon sx={{ fontSize: "1.3rem" }} />
                    )}
                    type="password"
                    onChange={(event) => onChange(event, "password")}
                    regex={
                      /^(?=[A-Za-z])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/
                    }
                    regexMessage="Password include minimum 1 character in a-z A-Z 0-9 and at least 8 characters!"
                    requiredMessage="Password is required!"
                  />
                </div>
                <div className={styles["login_right_undertb"]}>
                  <span>
                    <Checkbox defaultChecked />
                    <span className="light-text">Remember me</span>
                  </span>
                  <span className="light-text">Forgot password ?</span>
                </div>
                <LoadingButton
                  type="submit"
                  loading={loading}
                  loadingPosition="start"
                  // loadingIndicator="Loading..."
                  variant="contained"
                  className="w-100"
                >
                  Login
                </LoadingButton>
              </form>
              <div className={styles["login_right_undertb"] + " mt-5"}>
                <Link to="/home">
                  <span className="default-text d-flex align-items-center">
                    <ArrowBackIcon
                      className="mr-1"
                      sx={{ fontSize: ".9rem" }}
                    ></ArrowBackIcon>{" "}
                    Home
                  </span>
                </Link>

                <Link to="/register-capstone">
                  <span className="default-text">Need a capstone ?</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
