import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.css';
import jsIco from '../../Assets/Img/js(2).png';
import rectIco from '../../Assets/Img/structure.png';
import botstrapIco from '../../Assets/Img/bootstrap.png';
import gitIco from '../../Assets/Img/github.png';
import pyIco from '../../Assets/Img/python.png';
import linuxIco from '../../Assets/Img/linux.png';

const Footer = () => {
    return (
        <footer className={`${styles.footer} ${styles.stickyFooter}`}>
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} className="text-center">
                        <p className={styles.footerText}>&copy; {new Date().getFullYear()} Leap In Technology. Todos os direitos reservados.</p>
                    </Col>
                    <Col xs={12} md={6} className="d-flex justify-content-end">
                        <div className={styles.imagesContainer}>
                            <img src={jsIco} alt="JavaScript" className={styles.footerImage} />
                            <img src={rectIco} alt="React" className={styles.footerImage} />
                            <img src={botstrapIco} alt="Bootstrap" className={styles.footerImage} />
                            <img src={gitIco} alt="GitHub" className={styles.footerImage} />
                            <img src={pyIco} alt="Python" className={styles.footerImage} />
                            <img src={linuxIco} alt="Linux" className={styles.footerImage} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;