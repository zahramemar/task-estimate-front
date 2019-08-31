import React, { useReducer } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";

const initialState = {
  login: !!localStorage.getItem("AUTH_TOKEN")
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { login: true };
    case "logout":
      localStorage.removeItem("AUTH_TOKEN");
      return { login: false };
    default:
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="center w85">
      <Header isLogin={state.login} dispatch={dispatch} />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route
            exact
            path="/login"
            render={() => <Login dispatch={dispatch} />}
          />
        </Switch>
      </div>
    </div>
  );
}
