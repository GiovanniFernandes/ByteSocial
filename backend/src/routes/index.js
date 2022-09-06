const bodyParser = require('body-parser');
const user = require("./userRoutes");

module.exports = app => {

    app.get('/', (req,res)=> {
        res.status(200).json({mensagem:'Hello World'});
    })
    .use(
        bodyParser.json(),
        user
        
    )
}