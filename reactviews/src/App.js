import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import {withRouter} from 'react-router';
import Registration from './Registration.js';
import Login from './Login.js'
import Homepage from './Homepage.js'
function App() {
  return (
    <Router>
    <Route path="/registration" exact component={withRouter(Registration)}/>
    <Route path="/login" exact component={withRouter(Login)}/>
    <Route path="/homepage" exact component={withRouter(Homepage)}/>

    </Router>
  );
}

export default App;
