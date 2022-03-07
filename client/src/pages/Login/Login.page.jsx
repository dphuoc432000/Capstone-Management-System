import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

import styles from "./Login.module.scss";
import { useDispatch } from "react-redux";
import ObjectChecker from "../../services/Object/ObjectChecker";
import FormValidator from "../../services/FormServices/FormValidator";
import IconTextbox from "../../ui/Form/IconTextbox/IconTextbox.component";
import RegexValidation from "../../ui/DataValidation/RegexValidation/RegexValidation.component";
import RequiredValidation from "../../ui/DataValidation/RequiredValidation/RequiredValidation.component";

function Login() {
  const [account, setAccount] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
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
    var isValidError = ObjectChecker.isEmptyKeys(error);
    setIsSubmitted(true);

    console.log(isValidError);
    console.log(isValidAccount);

    if (isValidAccount && !isValidError) {
      dispatch({ type: "UPDATE_SESSION" });
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 1000);
    }
  };

  const handleError = (regex, name, value, message) => {
    if (value) {
      var isValid = FormValidator.checkRegex(regex, value);
      error[name] = !isValid ? message : "";
    } else
      error[name] =
        name[0].toUpperCase() + name.substring(1, name.length) + " is required";
    setError({ ...error });
  };

  return (
    <div className={styles["login"]}>
      <div className="row">
        <div className="col-6 w-100 h-100">
          <div
            className={
              styles["login_left"] +
              " d-flex justify-content-center align-items-center w-100 h-100"
            }
          >
            <img src="assets/images/login_image.svg" alt="SVG" />
          </div>
        </div>
        <div className="col-6 w-100 h-100 pl-5">
          <div
            className={
              styles["login_right"] + " d-flex align-items-center w-100 h-100"
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
                  <IconTextbox
                    onChange={(event) => {
                      onChange(event, "email");
                      handleError(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        "email",
                        event.target.value,
                        "Your email is invalid."
                      );
                    }}
                    placeholder="Email"
                    Icon={() => (
                      <EmailOutlinedIcon sx={{ fontSize: "1.3rem" }} />
                    )}
                    type="text"
                  ></IconTextbox>
                  <RegexValidation message={error.email} />
                  <RequiredValidation
                    text={account.email}
                    message="Email is required"
                    isSubmitted={isSubmitted}
                  />
                </div>
                <div className={styles["login_right_textbox"]}>
                  <IconTextbox
                    onChange={(event) => {
                      onChange(event, "password");
                      handleError(
                        /^(?=[A-Za-z])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/,
                        "password",
                        event.target.value,
                        "Password must include at least a-z A-Z 0-9 and minimum 8 characters."
                      );
                    }}
                    placeholder="Password"
                    Icon={() => <LockIcon sx={{ fontSize: "1.3rem" }} />}
                    type="password"
                  ></IconTextbox>
                  <RegexValidation message={error.password} />
                  <RequiredValidation
                    text={account.password}
                    message="Password is required"
                    isSubmitted={isSubmitted}
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
                <span className="default-text d-flex align-items-center">
                  <ArrowBackIcon
                    className="mr-1"
                    sx={{ fontSize: ".9rem" }}
                  ></ArrowBackIcon>{" "}
                  Home
                </span>
                <span className="default-text">Need a capstone ?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
