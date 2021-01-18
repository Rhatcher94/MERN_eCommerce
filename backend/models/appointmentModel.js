import mongoose from 'mongoose'

const appointmentSchema = mongoose.Schema(
	{
		date: {
			year: {type: Number, required: false},
			month: {type: Number, required: false},
			day: {type: Number, required: false},
		},
		startTime: {type: Number, required: false},
		endTime: {type: Number, required: false},
		confirmed: {type: Boolean, required: true},
		details: {
			type: {type: String, required: false},
			user: {
				type: mongoose.Schema.Types.ObjectId,
				required: false,
				ref: 'User',
			},
			paid: {type: Boolean, required: false},
			complete: {type: Boolean, required: false},
		},
	},
	{
		timestamps: true,
	}
)

const Appointment = mongoose.model('Appointment', appointmentSchema)

export default Appointment
