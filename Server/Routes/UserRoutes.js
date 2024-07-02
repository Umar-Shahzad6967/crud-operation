import express from 'express'
import { create, getAll, getone, update, deleteuser } from '../Controllers/CrudContoller.js'
const router = express.Router()

router.post('/create', create)
router.get('/getAll', getAll)
router.get('/getone/:id', getone)
router.put('/update/:id', update)
router.delete('/delete/:id', deleteuser)

export default router;