const express = require("express");
const morgan = require("morgan");
/* const bodyParser = require('body-parser') */

const app = express();

//import from /routes
var indexRoute = require("./routes/indexRoute");
var authRouter = require("./routes/authRouter");

//settings
app.set("port", process.env.PORT || 3000);
app.set("json space", 2);

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})) */

// routes
app.use('/api', indexRoute)
app.use('/auth', authRouter);

//starting server
app.listen(app.get('port')), () => {
    console.log(`Server on port ${app.get('port')}`);
}
