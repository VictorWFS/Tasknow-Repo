const express = require('express');
const Task = require('../models/Task');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
    const {title, description} = req.body;
    try {
        if (!title) {
            return res.status(401).json({message: "A tarefa deve possuir um título!"});
        }
        const task = await Task.create({title, description, UserId: req.userId});
         res.status(201).json(task); 
    } catch (error) {
        res.status(500).json({message: 'Erro ao criar tarefa', error});
    }
});

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll({where: {UserId: req.userId}});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({message: 'Erro ao buscar tarefas', error})
    }
});

router.put('/:id', async (req, res) => {
    const {title, description, completed} = req.body;

    try {
        const task = await Task.findOne({where: {id: req.params.id, UserId: req.userId}});
        if (!task) {
            return res.status(404).json({message: "Tarefa não encontrada"});
        }    

        task.title = title;
        task.description = description;
        task.completed = completed;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({message: "Erro ao atualizar tarefa", error})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({where: {id: req.params.id, UserId: req.userId}});
        if (!task) {
            return res.status(404).json({message: "Tarefa não encontrada"});
        }
        await task.destroy();
        res.status(204).send()
    } catch (error) {
        res.status(500).json({message: "Erro ao deletar tarefa", error});
    }
});

module.exports = router;