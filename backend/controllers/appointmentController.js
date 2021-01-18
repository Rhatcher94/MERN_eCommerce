import asyncHandler from 'express-async-handler'
import Appointment from '../models/appointmentModel.js'
import {getAvailableTimes} from '../utils/appointmentUtil.js'

/**
 * @desc    Create new appointment
 * @route   POST /api/appointments
 * @access  Private
 */
const addAppointment = asyncHandler(async (req, res) => {
	const {date, startTime, endTime, details} = req.body
	const appointment = new Appointment({
		date,
		startTime,
		endTime,
		confirmed: false,
		details: {
			type: details.type,
			user: details.user,
			paid: false,
			complete: false,
		},
	})

	const createdAppointment = await appointment.save()

	res.status(201).json(createdAppointment)
})

/**
 * @desc get available apoointments
 * @route GET /api/appointments/available
 * @access Private
 */
const getAvailableAppointments = asyncHandler(async (req, res) => {
	const {date} = req.body
	let times = await getAvailableTimes({year: date.year, month: date.month, day: date.day}, 1)
	res.json(times)
})

export {getAvailableAppointments, addAppointment}
