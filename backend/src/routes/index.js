const bodyParser = require('body-parser');
const cors = require ('cors')
const user = require("./userRoutes.js");
const auth = require("./authRoutes.js");
const post = require("./postRoutes.js");
const like = require("./likeRoutes.js");

module.exports = app => {

    app.get('/', (req,res)=> {
        res.status(200).json({mensagem:'Hello World'});
    })
    .use(
        bodyParser.json(),
        cors(),
        user,
        auth,
        post,
        like
    )
}