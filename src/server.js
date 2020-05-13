import express from 'express'
import meeting from './handlers/meeting'

//To Dos:
//express Helmet - security
//logger middleware - morgan/winston...
//yup - request validation
//activity digest - library?
//file system based routing
//dockerization

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send('Server running!'))

app.use('/meeting', meeting)

const PORT =  process.env.PORT  || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))