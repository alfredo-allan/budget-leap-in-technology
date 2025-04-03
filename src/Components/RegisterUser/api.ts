import axios from "axios";

const API_BASE_URL = "https://LeapBudget.pythonanywhere.com"; // Substitua pela URL da sua API

interface ClienteData {
  cliente: string;
  empresa: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  redesocial?: string;
  informacoes?: string;
}

export const criarCliente = async (clienteData: ClienteData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/clientes`, clienteData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
};

export const listarClientes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clientes`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    throw error;
  }
};

export const atualizarCliente = async (
  id: number,
  clienteData: ClienteData
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/clientes/${id}`,
      clienteData
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar cliente com ID ${id}:`, error);
    throw error;
  }
};

export const deletarCliente = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/clientes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar cliente com ID ${id}:`, error);
    throw error;
  }
};
