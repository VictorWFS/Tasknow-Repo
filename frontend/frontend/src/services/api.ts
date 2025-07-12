//1º parte: importação
import axios from 'axios';


//2º parte: lógica
const api = axios.create( {
    baseURL: "http://localhost:5000/api"
});

api.interceptors.request.use(async config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//3º parte exportação:
export default api;

