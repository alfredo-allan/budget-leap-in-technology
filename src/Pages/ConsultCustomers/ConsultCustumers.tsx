import React from 'react';
import Header from '../../Components/Header/Header'; // Ajuste o caminho do Header
import Footer from '../../Components/Footer/Footer'; // Ajuste o caminho do Footer
import ConsultCustomers from '../../Components/ConsultCustomers/ConsultCustomers'; // Ajuste o caminho do Register

function ConsultCustomersPage() {
    return (
        <div>
            <Header />
            <main>
                <ConsultCustomers />
            </main>
            <Footer />
        </div>
    );
}

export default ConsultCustomersPage;