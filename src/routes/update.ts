import { Router } from 'express'
import { postUpdate, putUpdate } from '../controllers/update'

const router = Router()

router.route('/').post(postUpdate).put(putUpdate)

export default router
