const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

//rota de registro
router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try {
        if (!username || !password) {
            return res.status(401).json({error: "Todos os campos devem ser preenchidos"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password: hashedPassword});
        res.status(201).json({message: "Usuário criado com sucesso!", userId: user.id})
    } catch (error) {
        res.status(500).json({message: "Erro ao registrar usuário", error});
    }
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        if (!username || !password) {
            return res.status(401).json({error: "Todos os campos de login devem ser preenchidos"})
        }

        const existingUser = await User.scope('withPassword').findOne({where: {username} });
        if (!existingUser || !existingUser.dataValues) {
            return res.status(404).json({ message: "Usuário não encontrado ou dados inválidos." });
        }
        console.log('OBJETO DO USUÁRIO ENCONTRADO:', existingUser );
            if (!existingUser) {
                return res.status(404).json({message: "Usuário não encontrado" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.dataValues.password);
        if (!isMatch) {
            return res.status(401).json({message: "Credenciais inválidas" });
        }

        const token = jwt.sign({id: existingUser.id}, process.env.JWT_SECRET, {expiresIn: '1h'}); 
        res.json({token});
    } catch (error) {
        console.error('ERRO DETALHADO:', error); 
        res.status(500).json({message: "Erro ao fazer login", error});
    }
});

module.exports = router;


//rota de login