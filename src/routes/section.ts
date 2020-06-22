import { Router } from 'express'
import { getSections, updateSection } from '../controllers/section'

const router = Router()

router.route('/').get(getSections)
router.route('/:id').put(updateSection)

export default router
