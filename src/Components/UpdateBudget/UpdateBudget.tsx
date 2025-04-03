import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { pt } from 'date-fns/locale';
import styles from './UpdateBudget.module.css';
import { atualizarBudget, buscarBudget } from './api';
import ModalResponse from '../ModalResponse/ModalResponse'; // Importe o ModalResponse

registerLocale('pt', pt);

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

const UpdateBudget: React.FC = () => {
    const [budgetId, setBudgetId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Budget | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (budgetId) {
                try {
                    const response = await buscarBudget(budgetId);
                    setFormData(response);
                } catch (error) {
                    console.error('Erro ao buscar budget:', error);
                }
            }
        };

        fetchData();
    }, [budgetId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (formData) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleDateChange = (date: Date | null) => {
        if (formData && date) {
            setFormData({ ...formData, data: date.toISOString() });
        }
    };

    const handleAtualizar = async () => {
        if (formData) {
            try {
                const updatedFormData = {
                    ...formData,
                    data: formData.data + "T00:00:00.000Z"
                };
                await atualizarBudget(budgetId!, updatedFormData);
                console.log('Budget atualizado com sucesso!');
                setModalTitle('Sucesso');
                setModalMessage('Budget atualizado com sucesso!');
                setShowModal(true);
            } catch (error) {
                console.error('Erro ao atualizar budget:', error);
                setModalTitle('Erro');
                setModalMessage('Erro ao atualizar budget. Veja o console para mais detalhes.');
                setShowModal(true);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    

    return (
        <Container className={styles['container-update']}>
            <Row>
                <Col>
                    <h2>Atualizar Orçamento</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label>ID do Orçamento</Form.Label>
                            <Form.Control className={styles['container-update-input-text-center']} type="number" value={budgetId || ''} onChange={(e) => setBudgetId(Number(e.target.value))} />
                        </Form.Group>
                        {formData && (
                            <>
                                <Form.Group>
                                    <Form.Label>Empresa</Form.Label>
                                    <Form.Control className={styles['container-update-input']} type="text" name="empresa" value={formData.empresa} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Cliente</Form.Label>
                                    <Form.Control className={styles['container-update-input']} type="text" name="cliente" value={formData.cliente} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={styles['content-label-date']}>Data</Form.Label>
                                    <DatePicker className={styles['container-update-date']}
                                        selected={new Date(formData.data)} onChange={handleDateChange} dateFormat="dd/MM/yyyy" locale="pt" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Validade</Form.Label>
                                    <Form.Control className={styles['container-update-input']} type="text" name="validade" value={formData.validade} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nome do Projeto</Form.Label>
                                    <Form.Control className={styles['container-update-input']} type="text" name="nomeProjeto" value={formData.nomeProjeto} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control className={styles['container-update-input']} as="textarea" rows={3} name="descricao" value={formData.descricao} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Itens Orçados</Form.Label>
                                    <Form.Control className={styles['container-update-input']} as="textarea" rows={3} name="orcados" value={formData.orcados} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Total</Form.Label>
                                    <Form.Control className={styles['container-update-input']} type="text" name="total" value={formData.total} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Prazo</Form.Label>
                                    <Form.Control className={styles['container-update-input']} type="text" name="prazo" value={formData.prazo} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Frete</Form.Label>
                                    <Form.Control className={styles['container-update-input']} as="textarea" rows={3} name="frete" value={formData.frete} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Observação</Form.Label>
                                    <Form.Control className={styles['container-update-input']} as="textarea" rows={3} name="observacao" value={formData.observacao} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>CNPJ</Form.Label>
                                    <Form.Control className={styles['container-update-input']} type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Pagamento</Form.Label>
                                    <Form.Control className={styles['container-update-input']} as="textarea" rows={3} name="pagamento" value={formData.pagamento} onChange={handleChange} />
                                </Form.Group>
                                <Button className={styles['btn-submit-register']} variant="primary" onClick={handleAtualizar}>Atualizar</Button>
                            </>
                        )}
                    </Form>
                </Col>
            </Row>
            <ModalResponse show={showModal} onClose={handleCloseModal} title={modalTitle} message={modalMessage} />
        </Container>
    );
};

export default UpdateBudget;