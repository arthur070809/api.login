const express = require('express');
const router = express.Router();
const connection = require('./backend/db');

// melhor volta
router.get('/melhor-volta', (req, res) => {
    connection.query(`
        SELECT MIN(tempo) AS melhor_volta
        FROM voltas
    `, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao buscar melhor volta' });
        }

        res.json(result[0]);
    });
});

// tempo total por corredor
router.get('/tempo-total', (req, res) => {
    connection.query(`
        SELECT 
            corredores.nome,
            SUM(voltas.tempo) AS tempo_total
        FROM voltas
        JOIN corredores ON voltas.corredor_id = corredores.id
        GROUP BY corredores.id
    `, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao calcular tempo total' });
        }

        res.json(result);
    });
});

//quantidade de voltas
router.get('/quantidade-voltas', (req, res) => {
    connection.query(`
        SELECT 
            corredores.nome,
            COUNT(voltas.id) AS total_voltas
        FROM voltas
        JOIN corredores ON voltas.corredor_id = corredores.id
        GROUP BY corredores.id
    `, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao contar voltas' });
        }

        res.json(result);
    });
});

// ranking 
router.get('/ranking', (req, res) => {
    connection.query(`
        SELECT 
            corredores.nome,
            SUM(voltas.tempo) AS tempo_total
        FROM voltas
        JOIN corredores ON voltas.corredor_id = corredores.id
        GROUP BY corredores.id
        ORDER BY tempo_total ASC
    `, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao gerar ranking' });
        }

        res.json(result);
    });
});

module.exports = router;