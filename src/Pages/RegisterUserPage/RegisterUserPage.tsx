import React from 'react';
import Header from '../../Components/Header/Header'; // Ajuste o caminho do Header
import Footer from '../../Components/Footer/Footer'; // Ajuste o caminho do Footer
import RegisterUser from '../../Components/RegisterUser/RegisterUser'; // Ajuste o caminho do Register

function RegisterUserPage() {
    return (
        <div>
            <Header />
            <main>
                <RegisterUser />
            </main>
            <Footer />
        </div>
    );
}

export default RegisterUserPage;