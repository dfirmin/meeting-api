import { Router } from 'express'
import actionItemRoutes from './action-item'
import idsRoutes from './ids'
import meetingOccurrenceRoutes from './meeting-occurrence'
import seriesRoutes from './series'
import userRoutes from './user'
import updateRoutes from './update'

const router = Router()

router.use('/action-items', actionItemRoutes)
router.use('/ids', idsRoutes)
router.use('/meeting-occurrences', meetingOccurrenceRoutes)
router.use('/series', seriesRoutes)
router.use('/user', userRoutes)
router.use('/udpates', updateRoutes)

export default router
