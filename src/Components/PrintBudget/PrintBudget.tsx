import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { buscarBudget } from './api';
import styles from './PrintBudget.module.css';
import ModalResponse from '../ModalResponse/ModalResponse'; // Ajuste o caminho se necessário

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

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const PrintBudget: React.FC = () => {
    const [budgetId, setBudgetId] = useState<number | null>(null);
    const [budget, setBudget] = useState<Budget | null>(null);
    const componentRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        if (budgetId) {
            const fetchData = async () => {
                try {
                    const response = await buscarBudget(budgetId);
                    setBudget(response);
                } catch (error) {
                    console.error('Erro ao buscar budget:', error);
                    setModalTitle('Erro ao buscar orçamento');
                    setModalMessage('Não foi possível encontrar o orçamento com o ID fornecido.');
                    setShowModal(true);
                }
            };
            fetchData();
        }
    }, [budgetId]);

    const handlePrint = useReactToPrint({
        documentTitle: `Orçamento-${budgetId}`,
    });

    const handleSearch = () => {
        const inputElement = document.getElementById('budgetIdInput') as HTMLInputElement | null;
        const inputId = parseInt(inputElement?.value || '0', 10);
        if (!isNaN(inputId) && inputId > 0) {
            setBudgetId(inputId);
        } else {
            setModalTitle('Erro de entrada');
            setModalMessage('Por favor, insira um número de orçamento válido.');
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container className={styles['container-print']}>
            <Row>
                <Col>
                    <h2 className={styles['container-print-title']}>Imprimir Orçamento</h2>
                    <Form className={styles['content-form']} >
                        <Form.Group>
                            <Form.Label className={styles['container-print-label']}>Número do Orçamento</Form.Label>
                            <Form.Control className={styles['input-print']} id="budgetIdInput" type="number" />
                        </Form.Group>
                        <Button className={styles['btn-submit-register']} variant="primary" onClick={handleSearch}>Buscar</Button>
                    </Form>

                    {budget && (
                        <div ref={componentRef} className={styles['print-container']}>
                            {/* Conteúdo do orçamento (como antes) */}
                            <div className={styles['header-print']}>
                                {/* <img src="/leap-in-logo.png" alt="Leap In Technology Logo" className={styles['logo']} /> */}
                                <div className={styles['header-info']}>
                                    <p><strong className={styles['return-budgets-strong']}>Empresa:</strong> {budget.empresa}</p>
                                    <p><strong className={styles['return-budgets-strong']}>Cliente:</strong> {budget.cliente}</p>
                                    <p><strong className={styles['return-budgets-strong']}>Data:</strong> {formatDate(budget.data)}</p>
                                    <p><strong className={styles['return-budgets-strong']}>Validade:</strong> {budget.validade}</p>
                                </div>
                                <div className={styles['project-info']}>
                                    <p><strong className={styles['return-budgets-strong']}>Dados do Projeto</strong></p>
                                    <p><strong className={styles['return-budgets-strong']}>Nome do Projeto:</strong> {budget.nomeProjeto}</p>
                                    <p><strong className={styles['return-budgets-strong']}>Descrição:</strong> {budget.descricao}</p>
                                </div>
                            </div>
                            <div className={styles['items']}>
                                <p><strong className={styles['return-budgets-strong']}>ITENS ORÇADOS:</strong> {budget.orcados}</p>

                                {/* <p className={styles['return-budgets-strong']}>ITENS ORÇADOS:</p>
                                <p >{budget.orcados}</p> */}
                                <p className={styles['return-budgets-text']}><strong className={styles['return-budgets-strong-value']}>Valor Total:</strong> {budget.total}</p>
                            </div>
                            <div className={styles['total']}>
                                <p><strong className={styles['return-budgets-strong']}>TOTAL:</strong> {budget.total} (sem frete)</p>
                            </div>
                            <div className={styles['frete']}>
                                <p><strong className={styles['return-budgets-strong']}>FRETE:</strong> {budget.frete}</p>
                            </div>
                            <div className={styles['condicoes']}>
                                <p className={styles['return-budgets-strong']}>CONDIÇÕES:</p>
                                <p><strong className={styles['return-budgets-strong']}>Pagamento:</strong> {budget.pagamento}</p>
                                <p><strong className={styles['return-budgets-strong']}>Revisões:</strong> [Inclui até 3 alterações gratuitas]</p>
                                <p><strong className={styles['return-budgets-strong']}>Formato de Entrega:</strong> [Arquivos em .PDF, .AI, .JPG]</p>
                                <p><strong className={styles['return-budgets-strong']}>Observações:</strong> Custos com frete ou urgência não inclusos</p>
                            </div>
                            <div className={styles['content-footer-print']}>
                                <div className={styles['info-adicionais']}>
                                    <p className={styles['info-adicionais-title']}>INFORMAÇÕES ADICIONAIS</p>
                                    <p><strong className={styles['return-budgets-strong']}>Contato:</strong> 11-912109424</p>
                                    <p><strong className={styles['return-budgets-strong']}>EMAIL:</strong> mathrepresentante@gmail.com</p>
                                </div>
                                <div className={styles['footer']}>
                                    <p className={styles['footer-content']}>A data de entrega é válida desde que o prazo para envio das informações seja respeitado e o pagamento esteja aprovado.</p>
                                    <p className={styles['footer-content']}>O valor total corresponde à soma dos preços dos produtos. Para itens com múltiplas quantidades, todos os valores são somados.</p>
                                    <p className={styles['footer-content']}>Os valores estão sujeitos a alterações sem aviso prévio.</p>
                                    <p className={styles['footer-content']}>Este orçamento tem validade de 72 horas.</p>
                                    {/* <img src="/leap-in-logo.png" alt="Leap In Technology Logo" className={styles['footer-logo']} /> */}
                                    <p className={styles['return-budgets-cnpj']}>CNPJ: 43.755.274/0001-01</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {budget && (
                        <div className={styles['print-buttons']}>
                            <Button className={styles['btn-submit-register']} variant="primary" onClick={() => handlePrint(() => componentRef.current)}>Imprimir</Button>
                        </div>
                    )}
                </Col>
            </Row>
            <ModalResponse
                show={showModal}
                onClose={handleCloseModal}
                title={modalTitle}
                message={modalMessage}
            />
        </Container>
    );
};

export default PrintBudget;