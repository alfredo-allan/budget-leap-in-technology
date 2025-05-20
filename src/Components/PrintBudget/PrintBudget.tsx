import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { buscarTodosBudgets, buscarBudget } from './api'; // Novo método para pegar todos os orçamentos
import styles from './PrintBudget.module.css';
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

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const PrintBudget: React.FC = () => {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [filteredBudgets, setFilteredBudgets] = useState<Budget[]>([]);
    const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
    const [filterId, setFilterId] = useState('');
    const [filterCliente, setFilterCliente] = useState('');
    const [filterProjeto, setFilterProjeto] = useState('');
    const componentRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        // Carrega todos os orçamentos no início
        const fetchAllBudgets = async () => {
            try {
                const allBudgets = await buscarTodosBudgets(); // você precisa criar essa função na API que retorna todos
                setBudgets(allBudgets);
                setFilteredBudgets(allBudgets);
            } catch (error) {
                console.error('Erro ao buscar todos orçamentos:', error);
                setModalTitle('Erro');
                setModalMessage('Não foi possível carregar os orçamentos.');
                setShowModal(true);
            }
        };
        fetchAllBudgets();
    }, []);

    // Função para filtrar com base nos inputs
    const handleFilter = () => {
        let filtered = budgets;

        if (filterId.trim()) {
            filtered = filtered.filter(b => b.id === Number(filterId));
        }
        if (filterCliente.trim()) {
            filtered = filtered.filter(b => b.cliente.toLowerCase().includes(filterCliente.toLowerCase()));
        }
        if (filterProjeto.trim()) {
            filtered = filtered.filter(b => b.nomeProjeto.toLowerCase().includes(filterProjeto.toLowerCase()));
        }

        if (filtered.length === 0) {
            setModalTitle('Nenhum resultado');
            setModalMessage('Nenhum orçamento encontrado com os filtros informados.');
            setShowModal(true);
        }

        setFilteredBudgets(filtered);
        setSelectedBudget(null); // limpa seleção
    };

    const handleSelectBudget = (id: number) => {
        const budget = budgets.find(b => b.id === id) || null;
        setSelectedBudget(budget);
    };

    const handlePrint = useReactToPrint({
        documentTitle: `Orçamento-${selectedBudget?.id}`,
    });

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container className={styles['container-print']}>
            <Row>
                <Col className={styles['content-print']}>
                    <h2 className={styles['container-print-title']}>Imprimir Orçamento</h2>
                    <Form className={styles['content-form']} onSubmit={e => { e.preventDefault(); handleFilter(); }}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="filterId" >
                                    <Form.Label>Número do Orçamento</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={filterId}
                                        onChange={e => setFilterId(e.target.value)}
                                        placeholder="ID do orçamento"
                                        className={styles['table-view-input']}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="filterCliente">
                                    <Form.Label>Nome do Cliente</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={filterCliente}
                                        onChange={e => setFilterCliente(e.target.value)}
                                        placeholder="Cliente"
                                        className={styles['table-view-input']}

                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="filterProjeto">
                                    <Form.Label>Nome do Projeto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={filterProjeto}
                                        onChange={e => setFilterProjeto(e.target.value)}
                                        placeholder="Projeto"
                                        className={styles['table-view-input']}

                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button className={styles['btn-subit-view']} type="submit">Filtrar</Button>
                    </Form>

                    <hr />

                    {/* Lista dos orçamentos filtrados */}
                    {filteredBudgets.length > 0 && (
                        <div className={styles['table-wrapper']}>
                            <Table striped bordered hover size="sm" className={styles['table-view']} >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Cliente</th>
                                        <th>Projeto</th>
                                        <th>Data</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBudgets.map(budget => (
                                        <tr key={budget.id}>
                                            <td>{budget.id}</td>
                                            <td>{budget.cliente}</td>
                                            <td>{budget.nomeProjeto}</td>
                                            <td>{formatDate(budget.data)}</td>
                                            <td>
                                                <Button size="sm" className={styles['btn-subit-table']} onClick={() => handleSelectBudget(budget.id)}>Visualizar</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}

                    {/* Orçamento selecionado para imprimir */}
                    {selectedBudget && (
                        <div ref={componentRef} className={styles['print-container']}>
                            {/* Mesma estrutura que você tinha pra mostrar o orçamento */}
                            <div className={styles['header-print']}>
                                <div className={styles['header-info']}>
                                    <p><strong>Empresa:</strong> {selectedBudget.empresa}</p>
                                    <p><strong>Cliente:</strong> {selectedBudget.cliente}</p>
                                    <p><strong>Data:</strong> {formatDate(selectedBudget.data)}</p>
                                    <p><strong>Validade:</strong> {selectedBudget.validade}</p>
                                </div>
                                <div className={styles['project-info']}>
                                    <p><strong>Dados do Projeto</strong></p>
                                    <p><strong>Nome do Projeto:</strong> {selectedBudget.nomeProjeto}</p>
                                    <p><strong>Descrição:</strong> {selectedBudget.descricao}</p>
                                </div>
                            </div>
                            <div className={styles['items']}>
                                <p><strong>ITENS ORÇADOS:</strong> {selectedBudget.orcados}</p>
                                <p><strong>Valor Total:</strong> {selectedBudget.total}</p>
                            </div>
                            <div className={styles['total']}>
                                <p><strong>TOTAL:</strong> {selectedBudget.total} (sem frete)</p>
                            </div>
                            <div className={styles['frete']}>
                                <p><strong>FRETE:</strong> {selectedBudget.frete}</p>
                            </div>
                            <div className={styles['condicoes']}>
                                <p><strong>CONDIÇÕES:</strong></p>
                                <p><strong>Pagamento:</strong> {selectedBudget.pagamento}</p>
                                <p><strong>Revisões:</strong> [Inclui até 3 alterações gratuitas]</p>
                                <p><strong>Formato de Entrega:</strong> [Arquivos em .PDF, .AI, .JPG]</p>
                                <p><strong>Observações:</strong> Custos com frete ou urgência não inclusos</p>
                            </div>
                            <div className={styles['content-footer-print']}>
                                <div className={styles['info-adicionais']}>
                                    <p className={styles['info-adicionais-title']}>INFORMAÇÕES ADICIONAIS</p>
                                    <p><strong>Contato:</strong> 11-912109424</p>
                                    <p><strong>EMAIL:</strong> mathrepresentante@gmail.com</p>
                                </div>
                                <div className={styles['footer']}>
                                    <p>A data de entrega é válida desde que o prazo para envio das informações seja respeitado e o pagamento esteja aprovado.</p>
                                    <p>O valor total corresponde à soma dos preços dos produtos. Para itens com múltiplas quantidades, todos os valores são somados.</p>
                                    <p>Os valores estão sujeitos a alterações sem aviso prévio.</p>
                                    <p>Este orçamento tem validade de 72 horas.</p>
                                    <p className={styles['return-budgets-cnpj']}>CNPJ: 43.755.274/0001-01</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedBudget && (
                        <div >
                            <Button variant="primary" onClick={() => handlePrint(() => componentRef.current)} className={styles['print-button']}>Imprimir</Button>
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
