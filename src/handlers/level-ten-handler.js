import data from '../../mock-data'
import express from 'express'
const uuid = require('uuid')
const router =  express.Router()

const MongoClient = require('mongodb').MongoClient

MongoClient.connect(process.env.connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('level-ten-db')
    const meetingsCollection = db.collection('meetings')
  })
  .catch(error => console.error(error))

// app.post('/quotes', (req, res) => {
//   quotesCollection.insertOne(req.body)
//     .then(result => {
//       console.log(result)
//     })
//     .catch(error => console.error(error))
// })

// Gets all meetings
router.get('/', (req, res) => res.json(data))

// Get single meeting
router.get('/:id', (req, res) => {
  const found = data.some(meeting => meeting.id === parseInt(req.params.id))
  if(found) {
    res.json(data.filter(meeting => meeting.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({ msg: `No meeting with the id of ${req.params.id}`})
  }
})

// Create meeting
router.post('/', (req, res) => {
  const newMeeting = {
    id: uuid.v4(),
    name: req.body.name,
    idsItem: req.body.idsItem,
    status: 'incomplete'
  }
  if(!newMeeting.name || !newMeeting.idsItem) {
    return res.status(400).json({ msg: 'Please include meeting name and IDS item'})
  }
  data.push(newMeeting)
  res.json(data)
})

// Update meeting
router.put('/:id', (req, res) => {
  const found = data.some(meeting => meeting.id === parseInt(req.params.id))
  if(found) {
    const updMeeting = req.body
    data.forEach(meeting => {
      if(meeting.id === parseInt(req.params.id)) {
        meeting.name = updMeeting.name ? updMeeting.name : meeting.name
        meeting.idsItem = updMeeting.idsItem ? updMeeting.idsItem : meeting.idsItem
        res.json({ msg: 'Meeting updated', meeting })
      }
    })
  } else {
    res.status(400).json({ msg: `No meeting with the id of ${req.params.id}`})
  }
})

// Delete meeting
router.delete('/:id', (req, res) => {
  const found = data.some(meeting => meeting.id === parseInt(req.params.id))
  if(found) {
    res.json({
      msg: 'Meeting deleted',
      data: data.filter(meeting => meeting.id !== parseInt(req.params.id))
    })
  } else {
    res.status(400).json({ msg: `No meeting with the id of ${req.params.id}`})
  }
})

module.exports = router