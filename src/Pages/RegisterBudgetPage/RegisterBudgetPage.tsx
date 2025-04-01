import React from 'react';
import Header from '../../Components/Header/Header'; // Ajuste o caminho do Header
import Footer from '../../Components/Footer/Footer'; // Ajuste o caminho do Footer
import Register from '../../Components/RegisterBudget/RegisterBudget'; // Ajuste o caminho do Register

function RegisterPage() {
    return (
        <div>
            <Header />
            <main>
                <Register />
            </main>
            <Footer />
        </div>
    );
}

export default RegisterPage;