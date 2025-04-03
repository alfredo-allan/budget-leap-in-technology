import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import PrintBudget from '../../Components/PrintBudget/PrintBudget';

function PrintBudgetPage() {
    return (
        <div>
            <Header />
            <main>
                <PrintBudget />
            </main>
            <Footer />
        </div>
    );
}

export default PrintBudgetPage;