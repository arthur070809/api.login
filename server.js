const app = require('./app');
const port = process.env.PORT;
app.listem(port, () =>{
    console.log(`servidor rodando em http://localhost:${port}`);
});