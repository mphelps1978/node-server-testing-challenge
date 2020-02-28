require('dotenv').config({
  directory: './config/'
})

const server = require ('./api/server')

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`\n*** Listening better than my kids on ${PORT} ***\n` );

})