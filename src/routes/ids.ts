import { Router } from 'express'
import { postIds, updateIds } from '../controllers/ids'

const router = Router()

router.route('/').post(postIds)
router.route('/:id').put(putIds)

export default router
