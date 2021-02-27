import React, {useState, useEffect} from 'react'
import DatePicker from 'react-datepicker'
import FormContainer from '../components/FormContainer'
import {Button, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getAvailableAppointments, createAppointment} from '../actions/appointmentActions'
import 'react-datepicker/dist/react-datepicker.css'

const AppointmentScreen = ({history}) => {
	const userLogin = useSelector((state) => state.userLogin)
	const {userInfo} = userLogin

	const [startDate, setStartDate] = useState(new Date())
	const [appointmentTime, setAppointmentTime] = useState(0)
	const [appointmentType, setAppointmentType] = useState(1)

	const dispatch = useDispatch()
	const availableAppointments = useSelector((state) => state.availableAppointments)
	const {appointments, loading, error} = availableAppointments

	const types = [
		{
			_id: 1,
			name: 'Hair',
			length: 1.0,
		},
		{
			_id: 2,
			name: 'Perm',
			length: 2.0,
		},
		{
			_id: 3,
			name: 'Dye',
			length: 3.0,
		},
	]

	const tConvert = (hours) => {
		let suffix
		let minutes = ':00'
		if (hours % 1 !== 0) {
			let newMins = hours % 1
			switch (newMins) {
				case 0.5:
					minutes = ':30'
					break
				case 0.25:
					minutes = ':15'
					break
				default:
					minutes = ':00'
			}
		}

		suffix = hours >= 12 ? 'pm' : 'am'
		hours = hours > 12 ? hours - 12 : hours
		hours = hours === '00' ? 12 : hours
		hours = ((hours + 11) % 12) + 1
		hours = Math.trunc(hours)
		return hours + minutes + suffix
	}

	const dateChangeHandler = (date) => {
		setStartDate(date)
	}
	const typeHandler = (e) => {
		setAppointmentType(Number(e.target.value))
	}

	const findAppointmentType = (id) => {
		let newAppointmentType = {}
		types.forEach((type) => {
			if (type._id === id) {
				newAppointmentType = type
			}
		})
		return newAppointmentType
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			createAppointment({
				date: {
					year: startDate.getFullYear(),
					month: startDate.getMonth() + 1,
					day: startDate.getDate(),
				},
				startTime: appointmentTime,
				endTime:
					Number(appointmentTime) + Number(findAppointmentType(appointmentType).length),
				confirmed: false,
				details: {
					type: appointmentType,
					user: userInfo._id,
				},
			})
		)
		history.push('/')
	}

	useEffect(() => {
		dispatch(
			getAvailableAppointments(
				{
					year: startDate.getFullYear(),
					month: startDate.getMonth() + 1,
					day: startDate.getDate(),
				},
				findAppointmentType(appointmentType).length
			)
		)
	}, [dispatch, startDate, appointmentType])

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<FormContainer>
					<h1>Book Appointment</h1>
					{loading ? (
						<Loader />
					) : error ? (
						<Message variant='danger'>{error}</Message>
					) : (
						<>
							<Form onSubmit={submitHandler}>
								<Form.Group controlId='exampleForm.ControlSelect1'>
									<Form.Label>Appointment Type</Form.Label>
									<Form.Control
										as='select'
										onChange={(e) => typeHandler(e)}
										defaultValue={appointmentType}
									>
										{types.map((type) => (
											<option key={type.name} value={type._id}>
												{type.name}
												{'  '}
												{type.length}
												{' hour(s) '}
											</option>
										))}
									</Form.Control>
								</Form.Group>
								{appointmentType === 0 ? (
									''
								) : (
									<>
										<Form.Group controlId='Date'>
											<Form.Label>Date</Form.Label>
											<div>
												<DatePicker
													selected={startDate}
													onChange={(date) => dateChangeHandler(date)}
													minDate={new Date()}
												/>
											</div>
										</Form.Group>
										<Form.Group controlId='exampleForm.ControlSelect1'>
											<Form.Label>Time</Form.Label>
											<Form.Control
												as='select'
												onChange={(e) => {
													setAppointmentTime(e.target.value)
												}}
											>
												{appointments.map((appointment) => (
													<option
														value={appointment.startTime}
														key={
															appointment.startTime +
															'/' +
															appointment.endTime
														}
													>
														{tConvert(appointment.startTime)} {' - '}
														{tConvert(appointment.endTime)}
													</option>
												))}
											</Form.Control>
										</Form.Group>
									</>
								)}
								<Button type='submit' variant='primary'>
									Create
								</Button>
							</Form>
						</>
					)}
				</FormContainer>
			)}
		</>
	)
}

export default AppointmentScreen
