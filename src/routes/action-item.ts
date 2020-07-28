import { Router } from 'express'
import { getActionItems, postActionItems, putActionItem, deleteActionItem } from '../controllers/action-item'

const router = Router()

router.route('/').get(getActionItems).post(postActionItems).put(putActionItem)
router.route('/:id').delete(deleteActionItem)
export default router
