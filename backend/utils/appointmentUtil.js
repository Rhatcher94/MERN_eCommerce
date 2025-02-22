import Appointment from '../models/appointmentModel.js'
import SystemSettings from '../models/systemSettingsModel.js'
import asyncHandler from 'express-async-handler'
/**
 * Return the available appointments on the passed date.
 * @param {year, month, day} newDate
 */
const getAvailableTimes = asyncHandler(async (newDate, length) => {
	const BOOKING = await SystemSettings.findOne({name: 'booking'})
	let availableSlots = 'Returned without data.'
	await Appointment.find({
		date: {
			year: newDate.year,
			month: newDate.month,
			day: newDate.day,
		},
	})
		.exec()
		.then((timeSlots) => {
			availableSlots = []
			//Loop through all times on the passed date date
			for (let time = BOOKING.data.start; time < BOOKING.data.end; time += length) {
				let timeTaken = false
				let timesNeeded = []

				//Fill an array with times that would be required by the new appointment
				for (
					let currTime = time;
					currTime < time + length;
					currTime += BOOKING.data.increment
				) {
					timesNeeded.push(currTime)
				}

				//Loop through all taken times to determine what is available
				for (let index = 0; index < timeSlots.length; index++) {
					if (
						timesNeeded.includes(timeSlots[index].startTime) ||
						timesNeeded.includes(timeSlots[index].endTime - BOOKING.data.increment) ||
						time + length > BOOKING.data.end
					) {
						timeTaken = true
					}
				}

				if (!timeTaken) {
					availableSlots.push({
						startTime: time,
						endTime: time + length,
					})
				}
			}
		})
		.catch((err) => {
			return 'error occured'
		})

	return availableSlots
})

export {getAvailableTimes}

/**
 *  @NOTES
 *  time + length > BOOKING.data.end
 *  needed to be added to ensure we dont go over the end of the day
 *
 */
