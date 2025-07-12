import React from "react";
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import api from  '../services/api';

interface LoginResponse {
    token: string;
}

export const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', {username, password});
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Erro no login', error);
            alert(error.response?.data?.message || "Erro ao fazer login.")
        }
    };

    return (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">

            <h1 className="mb-4 text-center" style={{ color: 'white', fontWeight: 'bold' }}>
                TASKNOW
            </h1>

            {/* caixa de login */}
            <div className="card shadow-sm" style={{ width: '22rem', backgroundColor: 'white' }}>
                <div className="card-body p-4">
                    <h3 className="card-title text-center mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        {/* O formulário continua o mesmo */}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Nome de Usuário</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-2">Entrar</button>
                    </form>
                    <div className="text-center mt-3">
                        <p className="mb-0">Não tem uma conta? <Link to="/register">Registre-se</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;