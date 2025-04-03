import axios from "axios";

const API_BASE_URL = "https://LeapBudget.pythonanywhere.com"; // Ajuste a URL base da sua API

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

export const listarBudgets = async (): Promise<Budget[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/budgets`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar budgets:", error);
    throw error;
  }
};

export const buscarBudgets = async (
  cliente: string,
  nomeProjeto: string
): Promise<Budget[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/budgets/buscar?cliente=${cliente}&nomeProjeto=${nomeProjeto}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar budgets:", error);
    throw error;
  }
};
