import { Router } from 'express'
import { createIds, updateIds } from '../controllers/ids'

const router = Router()

router.route('/').post(createIds)
router.route('/:id').put(updateIds)

export default router
