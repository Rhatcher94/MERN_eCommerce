import {
	AVAILABLE_APPOINTMENTS_REQUEST,
	AVAILABLE_APPOINTMENTS_SUCCESS,
	AVAILABLE_APPOINTMENTS_FAIL,
	AVAILABLE_APPOINTMENTS_RESET,
} from '../constants/appointmentConstants'

export const availableAppointmentsReducer = (state = {appointments: []}, action) => {
	switch (action.type) {
		case AVAILABLE_APPOINTMENTS_REQUEST:
			return {loading: true, appointments: []}
		case AVAILABLE_APPOINTMENTS_SUCCESS:
			return {
				loading: false,
				appointments: action.payload,
			}
		case AVAILABLE_APPOINTMENTS_FAIL:
			return {loading: false, error: action.payload}
		case AVAILABLE_APPOINTMENTS_RESET:
			return {}
		default:
			return state
	}
}
