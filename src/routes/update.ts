import { Router } from 'express'
import { postUpdate, putUpdate, deleteUpdate, getUpdates } from '../controllers/update'

const router = Router()

router.route('/').post(postUpdate).put(putUpdate).get(getUpdates)
router.route('/:id').delete(deleteUpdate)
export default router
