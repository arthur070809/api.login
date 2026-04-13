const app = require('./app');
const express = require('express');
require('dotenv').config();
const port = process.env.PORT;
const userRoutes = require('./routes/users');
const corridaRoutes = require('./routes/corredores');
const voltaRoutes = require('./routes/voltas');
app.use(express.json());

const dashboardRoutes = require('./dashboard');

app.use('/dashboard', dashboardRoutes);


app.use('/users', userRoutes);
app.use('/corredores', corridaRoutes);
app.use('/voltas', voltaRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});