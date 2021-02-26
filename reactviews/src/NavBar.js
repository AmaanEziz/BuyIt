import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import './CSS/navbarStyles.css'
export default function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">BuyIt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
          <NavLink className="navbar-item" activeClassName="active" to="/homepage" exact>
	      Homepage
          </NavLink>
          <NavLink className="navbar-item" activeClassName="active" to="/profile" exact>
	      Profile
          </NavLink>
          <NavLink className="navbar-item" activeClassName="active" to="/shoppingCart" exact>
	      Shopping Cart
          </NavLink>
          <NavLink className="navbar-item" activeClassName="active" to="/newListing" exact>
	      New Listing
          </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}
