const express = require('express');
const routes = express.Router();
const db = require('./db');
const { routes } = require('./app');


//Get em usuários
routes.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar usuários' })
        } else {
            res.json(results)
        }
    });
});

//Criar um novo usuario usuario
routes.post('/create', (req, res) => {
    const { nome, email, senha } = req.body;
    db.query('SELECT * FROM usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, senha], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        } else {
            res.status(201).json({ id: results.insertId, nome, email});
        }
    });
});

//Editar um usuario
routes.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    db.query('UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?',
        [nome, email, senha, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        } else {
            res.status(201).json({ id, nome, email});
        }
    });
});

//deletar um usuario
routes.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        } else {
            res.status(201).json({ message: 'Usuário deletado com sucesso' });
        }
    });
});

//Buscar um usuario por id
routes.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        } else {
            if (results.length === 0) {
                res.status(400).json({ error: 'Usuário não encontrado' });
            } else {
                res.status(201).json(results[0]);
            }
        }
    });
});

module.exports = routes;