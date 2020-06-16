import { Router } from 'express'
import { getMeetingOccurrences, getMeetingOccurrence, updateMeetingOccurrence } from '../controllers/meeting-occurrence'

const router = Router()

router.route('/').get(getMeetingOccurrences)
router.route('/:id').get(getMeetingOccurrence).put(updateMeetingOccurrence)

export default router
