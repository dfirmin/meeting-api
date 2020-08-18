import { Router } from 'express'
import { postMeetingSeries, putMeetingSeries } from '../controllers/series'

const router = Router()

router.route('/').post(postMeetingSeries).put(putMeetingSeries)

export default router
