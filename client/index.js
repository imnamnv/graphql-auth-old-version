import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, hashHistory, Route, IndexRoute } from "react-router";
import App from "./components/App";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./components/Dashboard";
import requireAuth from "./components/requireAuth";

const networkInterface = createNetworkInterface({
  uri: "/graphql",
  opts: {
    credentials: "same-origin", //send the cookie
  },
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (o) => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Router path="login" component={LoginForm} />
          <Router path="signup" component={SignupForm} />
          <Router path="dashboard" component={requireAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
