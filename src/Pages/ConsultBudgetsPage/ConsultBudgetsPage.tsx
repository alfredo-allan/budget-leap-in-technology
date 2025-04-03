import React from 'react';
import Header from '../../Components/Header/Header'; // Ajuste o caminho do Header
import Footer from '../../Components/Footer/Footer'; // Ajuste o caminho do Footer
import ConsultBudgets from '../../Components/ConsulBudgets/ConsultBudgets'; // Ajuste o caminho do Register

function ConsultBudgetsPage() {
    return (
        <div>
            <Header />
            <main>
                <ConsultBudgets />
            </main>
            <Footer />
        </div>
    );
}

export default ConsultBudgetsPage;