import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { Container } from 'react-bootstrap';
import styles from './HomePage.module.css';


const HomePage = () => {
    return (
        <div className={styles.ContentHomePage}>
            <Header />
            <Container>
                {/* Adicione o conteúdo da sua página aqui */}
            </Container>
            <Footer />
        </div>
    );
};

export default HomePage;