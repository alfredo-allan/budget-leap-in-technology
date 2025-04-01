import React, { useState } from 'react';
import styles from './RegisterBudget.module.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { pt } from 'date-fns/locale'; // Correção na importação

registerLocale('pt', pt);

function Register() {

    const [formData, setFormData] = useState({
        empresa: '',
        cliente: '',
        data: new Date(),
        validade: '',
        nomeProjeto: '',
        descricao: '',
        orcados: '',
        frete: '',
        total: '',
        prazo: '',
        observacao: 'A data de entrega é válida des de que o prazo para envio das informaçoes sejarespeitadoe o pagamento esteja aprovado.\nO valor total corresponde à soma dos preços dos produtos.\n Para itens com múltiplas quantidades,todos os valores são somados.\nOs valores estão sujeitos a alterações sem aviso prévio.\nEste orçamento tem validade de 72horas.',
        cnpj: 'CNPJ:43.755.274/0001-01',
        pagamento: 'CONDIÇÕES \nPagamento: [50% àvista + 50% na entrega]\nRevisões:[Inclui até 3 alterações gratuitas]\nFormato de Entrega:[Arquivosem.PDF,.AI,.JPG]\nObservações: Custos com frete ou urgência não inclusos\nNFORMAÇÕES ADICIONAIS:\nContato:(11) 9 1210-9424\nContato: (11) 9 1210-9424\nEMAIL: mathrepresentante@gmail.com'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date: Date | null) => { // Correção no tipo do parâmetro
        if (date) {
            setFormData({ ...formData, data: date });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        // Adicione aqui a lógica para enviar os dados para o backend
    };

    return (
        <Container className={styles['content-container']}>
            <Row>
                <Col md={12}>
                    <h2 className={styles.title}>Dados do Projeto</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmpresa">
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control className={styles['container-register-input']} type="text" name="empresa" placeholder="Digite o nome da empresa" value={formData.empresa} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formCliente">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Control className={styles['container-register-input']} type="text" name="cliente" placeholder="Nome do cliente" value={formData.cliente} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formData">
                            <Form.Label className={styles['content-label-date']}>Data</Form.Label>
                            <DatePicker
                                selected={formData.data}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                locale="pt"
                                className={styles['container-register-form-control']}
                            />
                        </Form.Group>

                        <Form.Group controlId="formValidade">
                            <Form.Label>Validade</Form.Label>
                            <Form.Control className={styles['container-register-input']} type="text" name="validade" placeholder="Digite a validade" value={formData.validade} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formNomeProjeto">
                            <Form.Label>Nome do Projeto</Form.Label>
                            <Form.Control className={styles['container-register-input']} type="text" name="nomeProjeto" placeholder="Nome do projeto" value={formData.nomeProjeto} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formDescricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control className={styles['container-register-input']} as="textarea" rows={3} name="descricao" placeholder="Digite a descrição" value={formData.descricao} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formOrcados">
                            <Form.Label>Itens Orçados</Form.Label>
                            <Form.Control className={styles['container-register-input']} as="textarea" rows={3} name="itens orçados" placeholder="Digite a descrição" value={formData.orcados} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formtotal">
                            <Form.Label>Valor total</Form.Label>
                            <Form.Control className={styles['container-register-input']} as="textarea" rows={3} name="valor total" placeholder="Digite a descrição" value={formData.total} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formtotal">
                            <Form.Label>Prazo de Entrega</Form.Label>
                            <Form.Control className={styles['container-register-input']} name="valor total" placeholder="Digite o prazo" value={formData.prazo} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formFrete">
                            <Form.Label>Frete</Form.Label>
                            <Form.Control className={styles['container-register-input']} as="textarea" rows={3} name="frete" value={formData.frete} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formPagamento">
                            <Form.Label>Condições de Pagamento</Form.Label>
                            <Form.Control className={styles['container-register-conditions']} as="textarea" rows={3} name="pagamento" value={formData.pagamento} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formObervacao">
                            <Form.Label>Observações</Form.Label>
                            <Form.Control className={styles['container-register-conditions']} as="textarea" rows={3} name="observação" value={formData.observacao} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formCnpj">
                            <Form.Label>CNPJ</Form.Label>
                            <Form.Control className={styles['container-register-cnpj']} name="cnpj" value={formData.cnpj} onChange={handleChange} />
                        </Form.Group>
                        <Button className={styles['btn-submit-register']} variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;