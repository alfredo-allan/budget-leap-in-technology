import axios from "axios";

const API_BASE_URL = "https://LeapBudget.pythonanywhere.com"; // Ajuste a URL base da sua API

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

export const listarClientes = async (): Promise<Cliente[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clientes`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    throw error;
  }
};
