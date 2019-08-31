import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

export default withRouter(({ isLogin, history, dispatch }) => (
  <div className="flex pa1 justify-between nowrap orange">
    <div className="flex flex-fixed black">
      <div className="fw7 mr1">Task Estimator</div>
    </div>
    <div className="flex flex-fixed">
      {isLogin ? (
        <div
          className="ml1 pointer black"
          onClick={() => {
            dispatch({ type: "logout" });
            history.push(`/`);
          }}
        >
          logout
        </div>
      ) : (
        <Link to="/login" className="ml1 no-underline black">
          login
        </Link>
      )}
    </div>
  </div>
));
