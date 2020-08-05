import { Router } from 'express'
import { getSections, putSection, postSections } from '../controllers/section'

const router = Router()

router.route('/').post(postSections).get(getSections).put(putSection)

export default router
