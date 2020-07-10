import { Router } from 'express'
import { postIds, putIds } from '../controllers/ids'

const router = Router()

router.route('/').post(postIds).put(putIds)

export default router
