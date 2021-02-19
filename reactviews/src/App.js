import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {withRouter} from 'react-router';
import Registration from './Registration.js';
import Login from './Login.js'
import Homepage from './Homepage.js'
import NewListing from './NewListing.js'
function App() {
  return (
    <Router>
      <Switch>
    <Route path="/registration" component={withRouter(Registration)}/>
    <Route path="/login"  component={withRouter(Login)}/>
    <Route path="/homepage"  component={withRouter(Homepage)}/>
    <Route path="/newListing"  component={withRouter(NewListing)}/>
    <Route path="*" component={()=>{return <div></div>}} status={404}/>
    </Switch>
    </Router>
  );
}

export default App;
