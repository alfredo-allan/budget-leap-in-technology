// api.ts
import axios from "axios";

const API_BASE_URL = "https://LeapBudget.pythonanywhere.com";

export interface Budget {
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

export const buscarBudget = async (id: number): Promise<Budget> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/budgets/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar budget:", error);
    throw error;
  }
};

// Aqui a função que você precisa adicionar:
export const buscarTodosBudgets = async (): Promise<Budget[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/budgets`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos budgets:", error);
    throw error;
  }
};
