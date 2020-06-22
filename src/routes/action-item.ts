import { Router } from 'express'
import { getActionItem, getActionItems, postActionItem, putActionItem } from '../controllers/action-item'

const router = Router()

router.route('/').get(getActionItems).post(postActionItem)
router.route('/:id').get(getActionItem).put(putActionItem)

export default router
