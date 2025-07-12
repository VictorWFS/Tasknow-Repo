import React from "react";
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import api from '../services/api';

export const RegisterPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit  = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', {username, password});
            alert('Usuário registrado com sucesso! Por favor faça o login.');
            navigate('/login');
        } catch (error: any) {
            console.error('Erro no registro', error);
            alert(error.response?.data?.message || 'Erro ao registrar. Tente novamente.');
        }
    };
    return (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">

            <h1 
                className="mb-4 text-center" 
                style={{ 
                    color: 'white', 
                    fontWeight: 'bold'
                }}
            >
                TASKNOW
            </h1>

            {/* box de registro */}
            <div className="card shadow-sm" style={{ width: '22rem', backgroundColor: 'white' }}>
                <div className="card-body p-4">
                    <h3 className="card-title text-center mb-4 ">Criar Conta</h3>
                    <form onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn btn-primary w-100 mt-2">Registrar</button>
                    </form>
                    <div className="text-center mt-3">
                        <p className="mb-0">Já tem uma conta? <Link to="/login">Faça Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}