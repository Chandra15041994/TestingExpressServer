import express from 'express'
import path from 'path'
import bodyparser from 'body-parser'
import http from 'http'
import logger from 'morgan'
import mongoose from 'mongoose'
import config from './config/config'
import schema from './model/schema'
import index from './routes/index'
import update from './routes/update'
import users from './routes/users'
import deletee from './routes/deletee'
import fs from 'fs'
let app = express()
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'server.log'), {flags: 'a'})

// setup the logger
app.use(logger('combined', {stream: accessLogStream}))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/', index);
app.use('/users', users);
app.use('/update', update);
app.use('/deletee', deletee);
mongoose.connect(config.dbUrl);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'error occured'));


console.log('server running');

export default app;