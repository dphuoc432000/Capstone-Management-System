import { connect } from "react-redux";
import Demo from "./Demo.component";

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleIncrementClick: () => dispatch({ type: "INCREMENT" }),
    handleDecrementClick: () => dispatch({ type: "DECREMENT" }),
  };
};

export const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Demo);