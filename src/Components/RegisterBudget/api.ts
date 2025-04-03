import axios from "axios";

const API_BASE_URL = "https://LeapBudget.pythonanywhere.com"; // Ajuste a URL base da sua API

interface BudgetData {
  empresa: string;
  cliente: string;
  data: Date;
  validade?: string;
  nomeProjeto?: string;
  descricao?: string;
  orcados?: string;
  total?: string;
  prazo?: string;
  frete?: string;
  observacao?: string;
  cnpj?: string;
  pagamento?: string;
}

export const criarBudget = async (budgetData: BudgetData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/budgets`, budgetData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar budget:", error);
    throw error;
  }
};

export const listarBudgets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/budgets`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar budgets:", error);
    throw error;
  }
};

export const atualizarBudget = async (id: number, budgetData: BudgetData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/budgets/${id}`,
      budgetData
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar budget com ID ${id}:`, error);
    throw error;
  }
};

export const deletarBudget = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/budgets/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar budget com ID ${id}:`, error);
    throw error;
  }
};
