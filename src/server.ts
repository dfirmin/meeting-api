import express, { ErrorRequestHandler } from 'express'
import helmet from 'helmet'
import createError from 'http-errors'
import morgan from 'morgan'
import cors from 'cors'
import routes from './routes/index'
import winston, { stream } from './middleware/winston'

//To Dos:
//yup - request validation
//file system based routing
//activity digest - library?

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('combined', { stream }))

app.get('/', (req, res) => res.send('Server running!'))

app.use('/', routes)

const PORT = process.env.PORT || 8080

app.use(function (req, res, next) {
  next(createError(404))
})

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  //include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
  res.send(`${err.status} - ${err.message}`)
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
