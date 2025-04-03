import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { listarClientes } from './api';
import ModalResponse from '../ModalResponse/ModalResponse';
import styles from './ConsultCustomers.module.css'

interface Cliente {
    id: number;
    cliente: string;
    empresa: string;
    endereco: string;
    telefone: string;
    email: string;
    redesocial: string;
    informacoes: string;
}

const ConsultClientes: React.FC = () => {
    const [allClientes, setAllClientes] = useState<Cliente[]>([]);
    const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
    const [clienteNome, setClienteNome] = useState('');
    const [empresaNome, setEmpresaNome] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listarClientes();
                setAllClientes(response);
                setFilteredClientes(response);
            } catch (error) {
                console.error('Erro ao listar clientes:', error);
            }
        };

        fetchData();
    }, []);

    const handleBuscar = () => {
        const filtered = allClientes.filter(cliente => {
            const clienteMatch = clienteNome ? cliente.cliente.toLowerCase().includes(clienteNome.toLowerCase()) : true;
            const empresaMatch = empresaNome ? cliente.empresa.toLowerCase().includes(empresaNome.toLowerCase()) : true;
            return clienteMatch && empresaMatch;
        });

        if (filtered.length === 0 && (clienteNome || empresaNome)) {
            setModalTitle('Nenhum resultado encontrado');
            setModalMessage('Nenhum cliente encontrado com os critérios fornecidos.');
            setShowModal(true);
            setFilteredClientes([]);
        } else {
            setFilteredClientes(filtered);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleClienteNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClienteNome(e.target.value.toUpperCase());
    };

    const handleEmpresaNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmpresaNome(e.target.value.toUpperCase());
    };

    return (
        <Container className={styles['content-container-consult-customers']}>
            <Row className={styles['content-container-consult-customers-row']} >
                <Col>
                    <h2 className={styles['content-container-consult-label']}>Consultar Clientes</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label className={styles['content-container-consult-label']}>Nome do Cliente</Form.Label>
                            <Form.Control className={styles['content-container-consult-input']} type="text" value={clienteNome} onChange={handleClienteNomeChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={styles['content-container-consult-label']}>Nome da Empresa</Form.Label>
                            <Form.Control className={styles['content-container-consult-input']} type="text" value={empresaNome} onChange={handleEmpresaNomeChange} />
                        </Form.Group>
                        <Button className={styles['container-consult-btn']} variant="primary" onClick={handleBuscar}>Buscar</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {filteredClientes.map((cliente) => (
                        <div key={cliente.id} className={styles['return-budgets']}>
                            <p><strong className={styles['return-budgets-strong']}>ID:</strong> {cliente.id}</p>
                            <p><strong className={styles['return-budgets-strong']}>Cliente:</strong> {cliente.cliente}</p>
                            <p><strong className={styles['return-budgets-strong']}>Empresa:</strong> {cliente.empresa}</p>
                            <p><strong className={styles['return-budgets-strong']}>Endereço:</strong> {cliente.endereco}</p>
                            <p><strong className={styles['return-budgets-strong']}>Telefone:</strong> {cliente.telefone}</p>
                            <p><strong className={styles['return-budgets-strong']}>Email:</strong> {cliente.email}</p>
                            <p><strong className={styles['return-budgets-strong']}>Rede Social:</strong> {cliente.redesocial}</p>
                            <p><strong className={styles['return-budgets-strong']}>Informações:</strong> {cliente.informacoes}</p>
                        </div>
                    ))}
                </Col>
            </Row>
            <ModalResponse show={showModal} onClose={handleCloseModal} title={modalTitle} message={modalMessage} />
        </Container>
    );
};

export default ConsultClientes;