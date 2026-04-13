const express = require('express');
const router = express.Router();
const db = require('../db');

// GET voltas
router.get('/', (req, res) => {
    db.query('SELECT * FROM voltas', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar voltas' });
        } else {
            res.json(results);
        }
    });
});

// CREATE volta
router.post('/create', (req, res) => {
    const { corredor_id, tempo } = req.body;

    db.query(
        'INSERT INTO voltas (corredor_id, tempo) VALUES (?, ?)',
        [corredor_id, tempo],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: err });
            }

            res.status(201).json({
                id: result.insertId,
                corredor_id,
                tempo
            });
        }
    );
});
// UPDATE volta
router.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { tempo } = req.body;

    db.query(
        'UPDATE voltas SET tempo = ? WHERE id = ?',
        [tempo, id],
        (err) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao atualizar volta' });
            } else {
                res.json({ id, tempo });
            }
        }
    );
});

// DELETE volta
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM voltas WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao deletar volta' });
        } else {
            res.json({ message: 'Volta deletada com sucesso' });
        }
    });
});

module.exports = router;