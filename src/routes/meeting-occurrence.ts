import { Router } from 'express'
import { getMeetingOccurrences, getMeetingOccurrence, putMeetingOccurrence } from '../controllers/meeting-occurrence'

const router = Router()

router.route('/').get(getMeetingOccurrences).put(putMeetingOccurrence)
router.route('/:id').get(getMeetingOccurrence)

export default router
