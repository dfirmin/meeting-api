import { Router } from 'express'
import { postIds, putIds, deleteIds, getIds } from '../controllers/ids'

const router = Router()

router.route('/').post(postIds).put(putIds).get(getIds)
router.route('/:id').delete(deleteIds)

export default router
