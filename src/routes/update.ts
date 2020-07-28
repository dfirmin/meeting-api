import { Router } from 'express'
import { postUpdate, putUpdate, deleteUpdate } from '../controllers/update'

const router = Router()

router.route('/').post(postUpdate).put(putUpdate)
router.route('/:id').delete(deleteUpdate)
export default router
