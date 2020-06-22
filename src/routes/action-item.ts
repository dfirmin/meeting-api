import { Router } from 'express'
import { getActionItem, getActionItems, createActionItem, updateActionItem } from '../controllers/action-item'

const router = Router()

router.route('/').get(getActionItems).post(createActionItem)
router.route('/:id').get(getActionItem).put(updateActionItem)

export default router
