import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { IndexLink } from 'react-router'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

export default (props) => (
    <Navbar>
        <Navbar.Header>
        <Navbar.Brand>
            <IndexLink to="/">React-Bootstrap</IndexLink>
        </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <IndexLinkContainer to="/">
                <NavItem eventKey={1} href="/">Login</NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to="/dashboard">
                <NavItem eventKey={2} href="/dashboard">Dashboard</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/users">
                <NavItem eventKey={3} href="/users">Users</NavItem>
            </LinkContainer>
        </Nav>
    </Navbar>
)