import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";
import {withRouter} from 'react-router';
import Registration from './Registration.js';
import Login from './Login.js'
import Homepage from './Homepage.js'
import NewListing from './NewListing.js'
import Item from './Item.js'
import ShoppingCart from './ShoppingCart.js'
import NavBar from './NavBar.js'
function App() {
  return (

    <Router>
     
      <Switch>

    <Route path="/registration" component={withRouter(Registration)}/>
    <Route path="/login"  component={withRouter(Login)}/>
    <Route path="/homepage" component={withRouter(Homepage)}/>
    <Route path="/newListing"  component={withRouter(NewListing)}/>
    <Route path="/item/:id" component={Item}/>
    <Route path="/shoppingCart" component={ShoppingCart}/>
    <Route exact path="/" > 
    
    {sessionStorage.getItem("SID") ? <Redirect to="/homepage"/> : <Redirect to="/login"/>}
    </Route>
    <Route path="*" component={()=>{return <div>Page Unvailable</div>}} status={404}/>
    </Switch>
  
    </Router>
    
  );
}

export default App;
