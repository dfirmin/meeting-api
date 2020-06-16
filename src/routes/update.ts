import { Router } from 'express'
import { createUpdate, updateUpdate } from '../controllers/update'

const router = Router()

router.route('/').post(createUpdate)
router.route('/:id').put(updateUpdate)

export default router
