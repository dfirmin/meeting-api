import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import meeting from './handlers/meeting'

//To Dos:
//logger middleware - morgan/winston...
//yup - request validation
//activity digest - library?
//file system based routing
//dockerization

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send('Server running!'))

app.use('/meeting', meeting)

const PORT =  process.env.PORT  || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))