import { Router } from 'express'
import { createMeetingSeries, updateMeetingSeries } from '../controllers/series'

const router = Router()

router.route('/').post(createMeetingSeries).put(updateMeetingSeries)

export default router
