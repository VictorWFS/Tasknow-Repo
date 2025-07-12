import React from "react";
import {useState, useEffect} from 'react';
import api from "../services/api";
import { useNavigate } from "react-router-dom";

//criando uma forma padrão para tarefas
interface Task {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

//criando componente react da pagina de dashboard
export const DashboardPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        //buscando as tarefas do backend e exibir na tela usando useEffect
        const fetchTasks = async () => {
            try {
                const response = await api.get<Task[]>('/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error("Erro ao buscar tarefas: ", error);
                navigate('/login');
            }
        };
        fetchTasks();
    }, [navigate]);

    //função para criar uma nova tarefa
    const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) {
            return;
        }

        try {
            const response = await api.post<Task>('/tasks', {title: newTaskTitle });
            setTasks([...tasks, response.data]);
            setNewTaskTitle('');
        } catch (error) {
            console.error("Erro ao criar tarefa:", error);
            alert("Não foi possível criar a tarefa");
            
        }
    };
    //função que marca uma tarefa como concluída/não concluída
    const handleToggleTask = async (id: number) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        if (!taskToUpdate) {
            return;
        }

        try {
            const updatedTaskData = {...taskToUpdate, completed: !taskToUpdate.completed};
            const response = await api.put<Task>(`/tasks/${id}`, updatedTaskData);   
            setTasks(tasks.map(task => task.id === id ? response.data : task));
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
            alert("Não foi possível atualizar a tarefa.");
        }
    };

    const handleDeleteTask = async (id: number) => {
        if (!window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
            return;
        }
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error);
            alert("Não foi possível deletar a tarefa");
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container p-5 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="dashboard-title-color">Meu Painel de Tarefas</h2>
                <button onClick={handleLogout} className="btn btn-danger">Sair</button>
            </div>

            {/* formulário para criar uma tarefa nova*/}
            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={handleCreateTask} className="d-flex">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Adicionar nova tarefa..."
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">Adicionar</button>
                    </form>
                </div>
            </div>

            {/* aqui está sendo exibida a lista de tarefas */}
            <ul className="list-group">
                {tasks.map(task => (
                    <li 
                        key={task.id} 
                        className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'list-group-item-success' : ''}`}
                    >
                        <span 
                            onClick={() => handleToggleTask(task.id)}
                            style={{ 
                                textDecoration: task.completed ? 'line-through' : 'none',
                                cursor: 'pointer' 
                            }}
                        >
                            {task.title}
                        </span>
                        <button onClick={() => handleDeleteTask(task.id)} className="btn btn-sm btn-outline-danger">
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}