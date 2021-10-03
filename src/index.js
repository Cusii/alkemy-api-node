const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

//import from /routes
var authRouter = require("./routes/authRouter");
var characterRouter = require("./routes/characterRouter")

//settings
app.set("port", process.env.PORT || 3000);
app.set("json space", 2);

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/auth', authRouter);
app.use('/characters', characterRouter);
/* app.use('/movies', characterRouter); */

//starting server
app.listen(app.get('port')), () => {
    console.log(`Server on port ${app.get('port')}`);
}
