import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { listarBudgets } from './api';
import styles from './ConsultBudgets.module.css';
import ModalResponse from '../ModalResponse/ModalResponse';

interface Budget {
    id: number;
    empresa: string;
    cliente: string;
    data: string;
    validade: string;
    nomeProjeto: string;
    descricao: string;
    orcados: string;
    total: string;
    prazo: string;
    frete: string;
    observacao: string;
    cnpj: string;
    pagamento: string;
}

const ConsultBudgets: React.FC = () => {
    const [allBudgets, setAllBudgets] = useState<Budget[]>([]);
    const [filteredBudgets, setFilteredBudgets] = useState<Budget[]>([]);
    const [cliente, setCliente] = useState('');
    const [nomeProjeto, setNomeProjeto] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listarBudgets();
                setAllBudgets(response);
                setFilteredBudgets(response);
            } catch (error) {
                console.error('Erro ao listar budgets:', error);
            }
        };

        fetchData();
    }, []);

    const handleBuscar = () => {
        const filtered = allBudgets.filter(budget => {
            const clienteMatch = cliente ? budget.cliente.toLowerCase().includes(cliente.toLowerCase()) : true;
            const projetoMatch = nomeProjeto ? budget.nomeProjeto.toLowerCase().includes(nomeProjeto.toLowerCase()) : true;
            return clienteMatch && projetoMatch;
        });

        if (filtered.length === 0 && (cliente || nomeProjeto)) {
            setModalTitle('Nenhum resultado encontrado');
            setModalMessage('Nenhum orçamento encontrado com os critérios fornecidos.');
            setShowModal(true);
            setFilteredBudgets([]);
        } else {
            setFilteredBudgets(filtered);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <Container className={styles['content-container-consult']}>
            <Row className={styles['content-container-consult-row']}>
                <Col>
                    <h2 className={styles['container-consult-title']}>Consultar Orçamentos</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label className={styles['container-consult-label']}>Cliente</Form.Label>
                            <Form.Control className={styles['container-consult-input']} type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={styles['container-consult-label']}>Nome do Projeto</Form.Label>
                            <Form.Control className={styles['container-consult-input']} type="text" value={nomeProjeto} onChange={(e) => setNomeProjeto(e.target.value)} />
                        </Form.Group>
                        <Button className={styles['container-consult-btn']} variant="primary" onClick={handleBuscar}>Buscar</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {filteredBudgets.map((budget) => (
                        <div key={budget.id} className={styles['return-budgets']}>
                            <p><strong className={styles['return-budgets-strong']}>ID:</strong> {budget.id}</p>
                            <p><strong className={styles['return-budgets-strong']}>Empresa:</strong> {budget.empresa}</p>
                            <p><strong className={styles['return-budgets-strong']}>Cliente:</strong> {budget.cliente}</p>
                            <p><strong className={styles['return-budgets-strong']}>Data:</strong> {formatDate(budget.data)}</p>
                            <p><strong className={styles['return-budgets-strong']}>Validade:</strong> {budget.validade}</p>
                            <p><strong className={styles['return-budgets-strong']}>Nome do Projeto:</strong> {budget.nomeProjeto}</p>
                            <p><strong className={styles['return-budgets-strong']}>Descrição:</strong> {budget.descricao}</p>
                            <p><strong className={styles['return-budgets-strong']}>Itens Orçados:</strong> {budget.orcados}</p>
                            <p><strong className={styles['return-budgets-strong']}>Total:</strong> {budget.total}</p>
                            <p><strong className={styles['return-budgets-strong']}>Prazo:</strong> {budget.prazo}</p>
                            <p><strong className={styles['return-budgets-strong']}>Frete:</strong> {budget.frete}</p>
                            <p><strong className={styles['return-budgets-strong']}>Observação:</strong> {budget.observacao}</p>
                            <p><strong className={styles['return-budgets-strong']}>CNPJ:</strong> {budget.cnpj}</p>
                            <p><strong className={styles['return-budgets-strong']}>Pagamento:</strong> {budget.pagamento}</p>
                        </div>
                    ))}
                </Col>
            </Row>
            <ModalResponse show={showModal} onClose={handleCloseModal} title={modalTitle} message={modalMessage} />
        </Container>
    );
};

export default ConsultBudgets;