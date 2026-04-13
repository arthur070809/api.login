const express = require('express');
const router = express.Router();
const db = require('../db');
const app = express();
app.use(express.json());

// GET usuários
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        } else {
            res.json(results);
        }
    });
});

// CREATE
router.post('/create', (req, res) => {
    const { nome, email, senha } = req.body;

    db.query(
        'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, senha],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err });
                console.log(err);
            } else {
                res.status(201).json({ id: results.insertId, nome, email });
            }
        }
    );
});

// UPDATE
router.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    console.log(req.body);
    

    db.query(
        'UPDATE users SET nome = ?, email = ?, senha = ? WHERE id = ?',
        [nome, email, senha, id],
        (err) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao atualizar usuário' });
            } else {
                res.json({ id, nome, email });
            }
        }
    );
});

// DELETE
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao deletar usuário' });
        } else {
            res.json({ message: 'Usuário deletado com sucesso' });
        }
    });
});

module.exports = router;