const express = require('express');
const routes = require ('./routes');
const app = express();
const port = 3021;

routes(app);

app.listen(port, ()=> {
    console.log(`API rodando na porta ${port}`);
});

module.exports = app;