import { Router } from 'express'
import {
  getJoyasController,
  getFiltrosController
} from '../controllers/joyasController.js'
import validateJoyasQueryParams from '../middlewares/joyasMiddleware.js'

const router = Router()
router.get('/joyas', validateJoyasQueryParams, getJoyasController)
router.get('/joyas/filtros', validateJoyasQueryParams, getFiltrosController)

export default router
