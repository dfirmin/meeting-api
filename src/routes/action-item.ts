import { Router } from 'express'
import { getActionItem, getActionItems, postActionItems, putActionItem } from '../controllers/action-item'

const router = Router()

router.route('/').get(getActionItems).post(postActionItems).put(putActionItem)
router.route('/:id').get(getActionItem)

export default router
