import React, { useEffect, useState } from "react";
import Dashboard from "components/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "components/Authentication/Login";
import { registerIntercepts } from "apis/axios";
import { ToastContainer } from "react-toastify";
import NavBar from "components/NavBar";
import NavItem from "./components/NavBar/NavItem";
import usersApi from "apis/users";
import authApi from "apis/auth";
import EditQuiz from "./components/Quiz/EditQuiz";
import SingleQuiz from "./components/Quiz/SingleQuiz/SingleQuiz";
import Edit from "./components/Quiz/SingleQuiz/Edit";
import Public from "./components/Public/Public";
import PrivateRoute from "./components/Common/PrivateRoute";

const App = props => {
  const [userDetails, setUserDetails] = useState({});
  const isLoggedIn = userDetails !== "";

  const fetchUserDetails = async () => {
    try {
      const users = await usersApi.list();
      setUserDetails(users.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    registerIntercepts();
    fetchUserDetails();
  }, []);

  return (
    <Router>
      <ToastContainer />
      {userDetails?.user ? (
        <AuthHeader firstName={userDetails.user.first_name} />
      ) : (
        <NavBar />
      )}
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/public/:slug/attempts/new" component={Public} />
        <PrivateRoute
          exact
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
        <PrivateRoute
          path="/quizzes/:id/edit"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={EditQuiz}
        />
        <PrivateRoute
          path="/quizzes/:id/show"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={SingleQuiz}
        />
        <PrivateRoute
          exact
          path="/quizzes/:quiz_id/questions/:id/edit"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Edit}
        />
      </Switch>
    </Router>
  );
};

const AuthHeader = ({ firstName }) => {
  const handleLogout = async () => {
    try {
      await authApi.logout();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex text-3xl">
              <NavItem name="Quizzy" path="/" />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <NavItem name="Reports" path="/login" />
            <NavItem name={firstName} path="#" />
            <a
              className="inline-flex items-center px-1 pt-1 text-sm
             font-semibold leading-5 text-bb-gray-600 text-opacity-50
             transition duration-150 ease-in-out border-b-2
             border-transparent hover:text-bb-gray-600 focus:outline-none
             focus:text-bb-gray-700 cursor-pointer"
              onClick={handleLogout}
            >
              LogOut
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default App;
