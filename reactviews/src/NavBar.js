import React from 'react'
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import { Link} from 'react-router-dom'
import './CSS/navbarStyles.css'
export default function NavBar({username}) {

async function logOut(){
    sessionStorage.removeItem("SID")

}
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="#home">BuyIt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
          <Link className="navbar-item" activeClassName="active" to="/homepage" exact>
	      Homepage
          </Link>
          <NavDropdown title="My Account" id="basic-nav-dropdown" style={{minWidth:"12vw",maxWidth:"15vw"}}>
          <Link to="/myProfile">My Profile</Link><br/>
          <Link to="/shoppingCart">Shopping Cart</Link><br/>
          <Link to="/newListing">Create New Listing</Link><br/>
         <NavDropdown.Divider />
        <Link to="/login"><div className="dropItem">Logout</div></Link>
      </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}
