import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import PropTypes from "prop-types";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursePage from "./courses/CoursePage";
import ManageCoursePage from "./courses/ManageCoursePage"; //eslint-disable-line import/no-named-as-default
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "../auth/Auth";
import Callback from "./user/Callback";
import Profile from "./user/Profile";

function App(props) {
  const auth = new Auth(props.history);
  return (
    <div className="container-fluid">
      <Header auth={auth} />
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => <HomePage auth={auth} {...props} />}
        />
        <Route
          path="/callback"
          render={(props) => <Callback auth={auth} {...props} />}
        />
        <Route
          path="/profile"
          render={(props) => <Profile auth={auth} {...props} />}
        />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursePage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />

        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
