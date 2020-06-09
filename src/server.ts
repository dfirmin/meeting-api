import express from 'express'
import helmet from 'helmet'
import createError from 'http-errors'
import morgan from 'morgan'
import cors from 'cors'
import meeting from './handlers/meeting'
import winston from './middleware/winston'

//To Dos:
//yup - request validation
//file system based routing
//activity digest - library?

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('combined', { stream: winston.stream }))

app.get('/', (req, res) => res.send('Server running!'))

app.use('/meeting', meeting)

const PORT = process.env.PORT || 8080

app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  //include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
  res.send(`${err.status} - ${err.message}`)
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
