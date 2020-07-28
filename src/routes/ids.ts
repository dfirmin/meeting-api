import { Router } from 'express'
import { postIds, putIds, deleteIds } from '../controllers/ids'

const router = Router()

router.route('/').post(postIds).put(putIds)
router.route('/:id').delete(deleteIds)

export default router
