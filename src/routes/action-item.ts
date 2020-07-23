import { Router } from 'express'
import { getActionItems, postActionItems, putActionItem } from '../controllers/action-item'

const router = Router()

router.route('/').get(getActionItems).post(postActionItems).put(putActionItem)

export default router
