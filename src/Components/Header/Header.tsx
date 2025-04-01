import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import styles from './Header.module.css';
import menuIcon from '../../Assets/Img/menuIcon.png';
import { Link } from 'react-router-dom'; // Importe Link

const Header = () => {
    return (
        <Navbar expand="lg" className={`${styles.header}`}>
            <Container>
                <Navbar.Brand as={Link} to="/">Leap In Technology &copy;</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ color: '#a33da3' }} >
                    <img src={menuIcon} alt="Menu" style={{ width: '32px', height: '32px' }} />
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/register">Registar Orçamentos</Nav.Link>
                        <Nav.Link as={Link} to="/about">Consultar Orçamentos</Nav.Link>
                        <Nav.Link as={Link} to="/about">Editar Orçamento</Nav.Link>
                        <Nav.Link as={Link} to="/register-user">Cadastrar Clientes</Nav.Link>
                        <Nav.Link as={Link} to="/about">Consultar Clientes</Nav.Link>
                        <Nav.Link as={Link} to="/about">Imprimir Orçamento</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;