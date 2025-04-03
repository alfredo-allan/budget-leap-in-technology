import React from 'react';
import Header from '../../Components/Header/Header'; // Ajuste o caminho do Header
import Footer from '../../Components/Footer/Footer'; // Ajuste o caminho do Footer
import UpdateBudget from '../../Components/UpdateBudget/UpdateBudget'; // Ajuste o caminho do Register

function UpdateBudgetPage() {
    return (
        <div>
            <Header />
            <main>
                <UpdateBudget />
            </main>
            <Footer />
        </div>
    );
}

export default UpdateBudgetPage;