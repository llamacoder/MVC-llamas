const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const port = process.env.PORT || 3000;

app.disable('x-powered-by')
app.use(bodyParser.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

const llamaRoutes = require('./src/routes/llamas')
app.use('/llamas', llamaRoutes)

app.use((err, req, res, next) => {
  // const status = err.status || 500
  res.status(err.status).json({  error: err   })
})

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found"   })
})

app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = app
