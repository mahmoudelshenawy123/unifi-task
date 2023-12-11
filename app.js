require('dotenv').config()
require('rootpath')();
const express = require('express')
const app =express()

const config = process.env
const path =require('path')
const cors = require('cors')
const winston = require('winston');
var compression = require('compression');
app.use(compression());

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
// if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
//   }
// const mongoose = require('mongoose')
const authJwt = require('./src/middleware/auth')
const errorHandlers = require("./src/helper/ErrorHandler");

const TodosRoutes = require('./src/componets/Todos/TodosRoutes');

// connect database
require('./src/config/DBConfig.js')
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.options('*',cors())
app.use(authJwt())
app.use(errorHandlers.checkAuthorization);

app.use('/public',express.static(path.join(__dirname,'public')))
app.use(express.static('public'));

// routes
app.use('/todos', TodosRoutes);

//Setup Error Handlers
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
    app.use(errorHandlers.developmentErrors);
} else {
    app.use(errorHandlers.productionErrors);
}
app.use(errorHandlers.notFound);


app.listen(config.PORT,()=>{
    console.log(`server run http://localhost:${config.PORT}`)
})