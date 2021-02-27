import axios from 'axios'
import {
	AVAILABLE_APPOINTMENTS_REQUEST,
	AVAILABLE_APPOINTMENTS_SUCCESS,
	AVAILABLE_APPOINTMENTS_FAIL,
	APPOINTMENT_CREATE_REQUEST,
	APPOINTMENT_CREATE_SUCCESS,
	APPOINTMENT_CREATE_FAIL,
} from '../constants/appointmentConstants'
import {logout} from './userActions'

export const getAvailableAppointments = (date, length) => async (dispatch, getState) => {
	try {
		dispatch({type: AVAILABLE_APPOINTMENTS_REQUEST})

		const {
			userLogin: {userInfo},
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const {data} = await axios.post(
			`/api/appointments/available`,
			{date: {year: date.year, month: date.month, day: date.day}, length: length},
			config
		)

		dispatch({
			type: AVAILABLE_APPOINTMENTS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: AVAILABLE_APPOINTMENTS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const createAppointment = (appointment) => async (dispatch, getState) => {
	try {
		dispatch({
			type: APPOINTMENT_CREATE_REQUEST,
		})

		const {
			userLogin: {userInfo},
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const {data} = await axios.post(`/api/appointments`, appointment, config)

		dispatch({
			type: APPOINTMENT_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: APPOINTMENT_CREATE_FAIL,
			payload: message,
		})
	}
}
