import React, { useState } from 'react';
import styles from './RegisterUser.module.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { criarCliente } from './api';
import ModalResponse from '../ModalResponse/ModalResponse';

function Register() {
    const [formData, setFormData] = useState({
        cliente: '',
        empresa: '',
        endereco: '',
        telefone: '',
        email: '',
        redesocial: '',
        informacoes: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = e.target.value;
        if (e.target.name === 'telefone') {
            value = formatPhoneNumber(value);
        }
        setFormData({ ...formData, [e.target.name]: value });
    };

    const formatPhoneNumber = (value: string) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 3) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
        }
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await criarCliente(formData);
            console.log('Cliente criado:', response);
            setModalTitle('Sucesso');
            setModalMessage('Cliente criado com sucesso!');
            setShowModal(true);
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            setModalTitle('Erro');
            setModalMessage('Erro ao criar cliente. Veja o console para mais detalhes.');
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container className={styles['content-container']}>
            <Row>
                <Col md={12}>
                    <h2 className={styles.title}>Registro de Clientes</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmpresa">
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control className={styles['container-register-input']} type="text" name="empresa" placeholder="Digite o nome da empresa" value={formData.empresa} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formCliente">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Control className={styles['container-register-input']} type="text" name="cliente" placeholder="Nome do cliente" value={formData.cliente} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formEndereco">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control className={styles['container-register-input']} type="text" name="endereco" placeholder="Digite o endereço" value={formData.endereco} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formNomeTelefone">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control className={styles['container-register-input']} type="text" name="telefone" placeholder="Digite o telefone" value={formData.telefone} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className={styles['container-register-input']} name="email" placeholder="Digite o email" value={formData.email} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formRedes">
                            <Form.Label>Rede Social</Form.Label>
                            <Form.Control className={styles['container-register-input']} name="redesocial" placeholder="Digite a rede social" value={formData.redesocial} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formInformacao">
                            <Form.Label>Informações Adicionais</Form.Label>
                            <Form.Control className={styles['container-register-input']} as="textarea" rows={3} name="informacoes" placeholder="Digite informações adicionais" value={formData.informacoes} onChange={handleChange} />
                        </Form.Group>

                        <Button className={styles['btn-submit-register']} variant="primary" type="submit">
                            Salvar Cadastro
                        </Button>
                    </Form>
                </Col>
            </Row>
            <ModalResponse show={showModal} onClose={handleCloseModal} title={modalTitle} message={modalMessage} />
        </Container>
    );
}

export default Register;