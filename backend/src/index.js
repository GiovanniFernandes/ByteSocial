const express = require('express');
const routes = require ('./routes');
require('dotenv').config();
const app = express();
const port = process.env.SERVER_PORT || 3000

routes(app);

app.listen(port, ()=> {
    console.log(`API rodando na porta ${port}`);
});

module.exports = app;