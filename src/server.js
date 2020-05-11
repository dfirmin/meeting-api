import express from 'express'
import levelTen from './handlers/level-ten-handler'

//To Dos:
//logger middleware
//express Helmet - security
//yup - request validation
//activity digest - library?
//file system based routing
//dockerization

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send('Server running!'))

app.use('/level-10', levelTen)

const PORT =  process.env.PORT  || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))