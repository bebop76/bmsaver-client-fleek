import React, { useContext } from "react";
import { useLogout } from '../hooks/useLogout'
import { BookmarksContext } from "../context/BookmarksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BsBookmarkPlus,  } from "react-icons/bs";
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const MenuNav = ({ isLog }) => {
    const { setShow, setModalAction, setDisplayAccount, filteredTag, setFilteredTag } = useContext(BookmarksContext)
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const openDialog = () => {
        setShow(true)
        setModalAction('new')
    }
    const handleLogout = () => {
        logout()
    }

    const openAccount = () => {
        setDisplayAccount(true)
    }

    const removeFilter = e => {
        e.preventDefault()
        setFilteredTag('off')
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Click to remove filter!
        </Tooltip>
    );

    return (
        <Navbar bg="success" expand="lg">
            <Container>
                <Navbar.Brand href="/">BookMarkSaver</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {user && (
                        <React.Fragment>
                            <Nav className="me-auto">
                                <Nav.Link href="#" onClick={openAccount}>Account</Nav.Link>
                                <Nav.Link href="#link">Search</Nav.Link>
                                <Nav.Link href="#link">Filter</Nav.Link>
                                <Nav.Link href="" onClick={removeFilter}>
                                    {filteredTag !== 'off'
                                        ? <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltip}
                                        >
                                            <Badge bg="danger">{filteredTag} </Badge>
                                        </OverlayTrigger>
                                        : <Badge id="info-badge" bg="info">{"NO TAG FILTER"}</Badge>}
                                </Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link onClick={openDialog}><BsBookmarkPlus /></Nav.Link>
                                <Nav.Link href="#">Customize</Nav.Link>
                                <Nav.Link href="#" onClick={handleLogout}>Logout</Nav.Link>
                            </Nav>
                        </React.Fragment>
                    )}
                    {!user && (
                        <React.Fragment>
                            <Nav>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/signup">Signup</Nav.Link>
                            </Nav>
                        </React.Fragment>
                    )}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MenuNav