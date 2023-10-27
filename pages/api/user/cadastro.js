import axios from 'axios';

export const cadastro = async (userData) => {
    const response = await axios.post('http://localhost:8080/api/usuarios', userData);
    return response.data;
};