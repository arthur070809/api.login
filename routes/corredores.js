const express = require('express');
const router = express.Router();
const db = require('../db');

// GET corredores
router.get('/', (req, res) => {
    db.query('SELECT * FROM corredores', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar corredores' });
        } else {
            res.json(results);
        }
    });
});

// CREATE corredores
router.post('/create', (req, res) => {
    const { nome} = req.body;

    db.query(
        'INSERT INTO corredores (nome) VALUES (?)',
        [nome],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });

            res.status(201).json({
                id: result.insertId,
                nome
            });
        }
    );
});

// UPDATE corredores
router.put('/edit/:id', (req, res) => {
    console.log("PARAMS:", req.params);
    console.log("BODY:", req.body);

    const { id } = req.params;
    const { nome } = req.body;

    db.query(
        'UPDATE corredores SET nome = ? WHERE id = ?',
        [nome, id],
        (err, result) => {
            if (err) {
                console.log("SQL ERROR:", err);
                return res.status(500).json({ error: 'Erro ao atualizar corredores' });
            }

            res.json({ message: 'Corredor atualizado com sucesso' });
        }
    );
});

// DELETE corredores
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM corredores WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao deletar corrida' });
        } else {
            res.json({ message: 'Corrida deletada com sucesso' });
        }
    });
});

module.exports = router;