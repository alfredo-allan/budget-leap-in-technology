import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import RegisterPage from '../Pages/RegisterBudgetPage/RegisterBudgetPage';
import RegisterUser from '../Pages/RegisterUserPage/RegisterUserPage'
interface RoutesComponentProps { }

const RoutesComponent: React.FC<RoutesComponentProps> = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} /> {/* Ajuste o caminho */}
                <Route path="/register-user" element={<RegisterUser />} />{/* Ajuste o caminho */}
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesComponent;