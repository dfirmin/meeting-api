import { Router } from 'express'
import { postUpdate, putUpdate } from '../controllers/update'

const router = Router()

router.route('/').post(postUpdate)
router.route('/:id').put(putUpdate)

export default router
