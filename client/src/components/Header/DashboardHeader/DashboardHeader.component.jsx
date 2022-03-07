import React from "react";
import styles from "./DashboardHeader.module.scss";

function DashboardHeader() {
  return (
    <div className={styles["header"] + " d-flex align-items-center"}>
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-xl-4 h-100">
            {/* <h1 className={styles["header_logo"] + " m-0"}>CMS</h1> */}
          </div>
          <div className="col-xl-4 h-100">
            <div
              className={
                styles["header_clock"] +
                " d-flex align-items-center justify-content-center"
              }
            >
              <div>
                <div className="d-flex align-items-center">
                  <div
                    style={{ color: "#ef4444" }}
                    className={
                      styles["header_clock_number-box"] +
                      " d-flex align-items-center justify-content-center"
                    }
                  >
                    1
                  </div>
                  <div
                    style={{ color: "#ef4444" }}
                    className={
                      styles["header_clock_number-box"] +
                      " d-flex align-items-center justify-content-center"
                    }
                  >
                    5
                  </div>
                  <div className="px-2"> : </div>
                  <div
                    style={{ color: "#f59e0b" }}
                    className={
                      styles["header_clock_number-box"] +
                      " d-flex align-items-center justify-content-center"
                    }
                  >
                    3
                  </div>
                  <div
                    style={{ color: "#f59e0b" }}
                    className={
                      styles["header_clock_number-box"] +
                      " d-flex align-items-center justify-content-center"
                    }
                  >
                    0
                  </div>
                  <div className="px-2"> : </div>
                  <div
                    style={{ color: "#22c55e" }}
                    className={
                      styles["header_clock_number-box"] +
                      " d-flex align-items-center justify-content-center"
                    }
                  >
                    5
                  </div>
                  <div
                    style={{ color: "#22c55e" }}
                    className={
                      styles["header_clock_number-box"] +
                      " d-flex align-items-center justify-content-center"
                    }
                  >
                    3
                  </div>
                </div>
                <div style={{fontSize:"0.9rem"}} className="text-center mt-1">Monday, 23 March 2021</div>
              </div>
            </div>
          </div>
          <div className="col-xl-4"></div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
