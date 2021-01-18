import express from 'express'
const router = express.Router()
import {getAvailableAppointments, addAppointment} from '../controllers/appointmentController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin, getAvailableAppointments).post(protect, addAppointment)
router.route('/available').get(protect, getAvailableAppointments)

export default router
