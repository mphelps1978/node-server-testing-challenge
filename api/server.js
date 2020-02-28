require('dotenv').config

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('../users/router')
const authRouter = require('../auth/router')

const server = express()


//middleware
server.use(express.json())
server.use(cors())
server.use(helmet())


// routes

server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)

server.get('/', (req,res) => {
  res.send('<h2>Node Server Testing</h2><h3>Michael Phelps</h3>')
})






module.exports = server