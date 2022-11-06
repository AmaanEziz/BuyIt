import React from 'react'
import {Navbar,Nav,NavDropdown,Dropdown} from 'react-bootstrap'
import { Link} from 'react-router-dom'
import './CSS/navbarStyles.css'
export default function NavBar({username}) {

async function logOut(){
    sessionStorage.removeItem("SID")

}
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="/homepage">BuyIt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Dropdown.Item as={Link} to="/shoppingCart">Shopping Cart
</Dropdown.Item>

          <Dropdown.Item as={Link} to="/newListing">Create New Listing</Dropdown.Item>
         <Dropdown.Item as={Link} to="/login" onClick={logOut}>Logout</Dropdown.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}
