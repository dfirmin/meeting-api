import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import meeting from './handlers/meeting'
import logger from './middleware/logger'

//To Dos:
//yup - request validation
//file system based routing
//activity digest - library?

const app = express()
const router =  express.Router()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send('Server running!'))

//Simulated error
app.get('/error', function(req, res, next) {
  return next(new Error("This is a simulated error!"));
})

app.use('/meeting', meeting)

const PORT =  process.env.PORT  || 8080

app.listen(PORT, () => logger.log('info', `Server started on port ${PORT}`))