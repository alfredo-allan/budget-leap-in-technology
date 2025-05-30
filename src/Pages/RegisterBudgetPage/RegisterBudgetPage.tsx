import React from 'react';
import Header from '../../Components/Header/Header'; // Ajuste o caminho do Header
import Footer from '../../Components/Footer/Footer'; // Ajuste o caminho do Footer
import RegisterBudget from '../../Components/RegisterBudget/RegisterBudget'; // Ajuste o caminho do Register

function RegisterBudgetPage() {
    return (
        <div>
            <Header />
            <main>
                <RegisterBudget />
            </main>
            <Footer />
        </div>
    );
}

export default RegisterBudgetPage;