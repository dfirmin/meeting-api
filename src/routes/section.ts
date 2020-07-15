import { Router } from 'express'
import { getSections, putSection } from '../controllers/section'

const router = Router()

router.route('/').get(getSections).put(putSection)

export default router
