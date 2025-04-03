import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import RegisterPage from '../Pages/RegisterBudgetPage/RegisterBudgetPage';
import RegisterUser from '../Pages/RegisterUserPage/RegisterUserPage'
import ConsultBudgets from '../Pages/ConsultBudgetsPage/ConsultBudgetsPage';
import UpdateBudgets from '../Pages/UpdateBudgetPage/UpdateBudget';
import ConsultCustomersPage from '../Pages/ConsultCustomers/ConsultCustumers';
import PrintBudgetPage from '../Pages/PrintBudgetPage/PrintBudgetPage';
interface RoutesComponentProps { }

const RoutesComponent: React.FC<RoutesComponentProps> = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} /> {/* Ajuste o caminho */}
                <Route path="/register-user" element={<RegisterUser />} />{/* Ajuste o caminho */}
                <Route path="/consult-budgets" element={<ConsultBudgets />} />{/* Ajuste o caminho */}
                <Route path="/update-budgets" element={<UpdateBudgets />} />{/* Ajuste o caminho */}
                <Route path="/consult-customers" element={<ConsultCustomersPage />} />{/* Ajuste o caminho */}
                <Route path="/print-budget/:budgetId" element={<PrintBudgetPage />} />


            </Routes>
        </BrowserRouter>
    );
};

export default RoutesComponent;