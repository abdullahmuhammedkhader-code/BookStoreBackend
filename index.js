// import necessary packages 
// Loads .env file contents into process.env by default.
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes/allroutes')
require('./config/db')

// create server using express package
const server = express()

// Enable Cors in the server
server.use(cors())
server.use(express.json())
server.use(routes)
// handling Static File or Folder
server.use('/uploads',express.static('./uploads'))
// Setup a port number to run server in the internet
const PORT = process.env.PORT
// Start server to listen client request to that port / Available server in the internet 
server.listen(PORT,()=>{
    console.log("Server started in the given port number & waiting for the client request");})
// handling global errors in the server using application specific middleware
server.use((err,req,res,next)=>{
    res.status(500).json(err.message)
})

// Resolve API (get Request to port 3000 ) using express
server.get('/',(req,res)=>{
    res.status(200).send(`<h1>Server started in the given port number & waiting for the client request</h1>`)
})

