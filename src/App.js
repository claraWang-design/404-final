import "./App.css";
import React from "react";
import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Detail from "./pages/home/Detail";
import Edit from "./pages/home/Edit";
import Upload from "./pages/upload/Upload";
import About from "./pages/about/About";
import Error from "./pages/error/Error";

import Navbar from "./components/Navbar";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/board/:postId/edit" component={Edit} />
            <Route path="/board/:postId" component={Detail} />
            <Route path="/upload" component={Upload} />

            <Route exact path="/">
              <Home />
            </Route>

            <Route path="*">
              <Error />
            </Route>
          </Switch>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    );
  }
}
