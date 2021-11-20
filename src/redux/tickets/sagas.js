import ticketActions from "./actions";
import {all, takeEvery,takeLatest,put,call, take} from "redux-saga/effects"
import { useDispatch } from "react-redux";
import * as ticketService from "../../services/tickets.service"
import {requestLoading, succes, failure} from '../../utils/general/dispatch.util';
import {requestService} from "../../utils/general/request.util"
import sentence from '../../constants/constants';
import cookie from 'js-cookie';
import { API_URL } from "../../network";
import { dispatchAction } from "../../utils/general/dispatch.util";


export function* GET_TICKETS() {
    yield put(requestLoading(ticketActions.SET_STATE,true,'refresh'))
    const response = yield call(requestService.getRequest,
		`${API_URL}/api/tickets`,
		{protect : true, authUser : cookie.get('tokenCookie'), typeContent : null}
	)
    if(response) {
        yield put(succes({tickets: response.data.tickets},ticketActions.SET_STATE))
    }
    else yield put(failure({error : response.data.message, errorAction:'get-tickets'}, ticketActions.SET_STATE))
    yield put(requestLoading(ticketActions.SET_STATE,false))
}

export function* GET_MY_TICKETS() {
    yield put(requestLoading(ticketActions.SET_STATE,true,'refresh'))
    const response = yield call(requestService.getRequest,
		`${API_URL}/api/my-tickets`,
		{protect : true, authUser : cookie.get('tokenCookie'), typeContent : null}
	)
    if(response) {
        yield put(succes({myTickets: response.data.tickets},ticketActions.SET_STATE))
    }
    else yield put(failure({error : response.data.message, errorAction:'my-tickets'}, ticketActions.SET_STATE))
    yield put(requestLoading(ticketActions.SET_STATE,false))
}

export function* GET_MESSAGES() {
    yield put(requestLoading(ticketActions.SET_STATE,true,',messqges'))
    const response = yield call(requestService.getRequest,
		`${API_URL}/api/my-messages`,
		{protect : true, authUser : cookie.get('tokenCookie'), typeContent : null}
	)
    if(response) {
        yield put(succes({messages: response.data.messages},ticketActions.SET_STATE))
    }
    else yield put(failure({error : response.data.message, errorAction:'my-messages'}, ticketActions.SET_STATE))
    yield put(requestLoading(ticketActions.SET_STATE,false))
}


export function* CREATE_TICKET({payload}) {
    yield put(requestLoading(ticketActions.SET_STATE,true,'create-ticket'))
	//let email = JSON.parse(localStorage.getItem('email'))
	let title = payload.title
	let description = payload.description
	let notes = payload.notes
	let day = payload.deadline.slice(0,2)
	let month = payload.deadline.slice(3,5)
	let year = payload.deadline.slice(6,11)

    const response = yield call(requestService.postRequest,
		`${API_URL}/api/create-ticket`,
		{title,description,notes,day,month,year},
		{protect : true, authUser : cookie.get('tokenCookie'), typeContent : null},
	)
    if(!response.error) {
        yield put(succes({tickets: response.data.tickets},ticketActions.SET_STATE))
    }
    else yield put(failure({error : sentence.ticketCreationError}, ticketActions.SET_STATE))
    yield put(requestLoading(ticketActions.SET_STATE,false))
}

export function* ASSIGN_TICKET({payload}) {
    yield put(requestLoading(ticketActions.SET_STATE,true,'assign-ticket'))
	//let email = JSON.parse(localStorage.getItem('email'))
	let id = payload.id
    const response = yield call(requestService.postRequest,
		`${API_URL}/api/assign-ticket`,
		{id_ticket:id},
		{protect : true, authUser : cookie.get('tokenCookie'), typeContent : null},
	)
    if(!response.error) {
		console.log(response.data.tickets)
        yield put(succes({tickets: response.data.tickets, secondLoad: false, successPris:true},ticketActions.SET_STATE))
    }
    else{
		console.log(response.data.message)
		yield put(failure({error : response.data.message, errorAction:'assign-ticket'}, ticketActions.SET_STATE))
	}

    yield put(requestLoading(ticketActions.SET_STATE,false))
}

export function* FINISH_TICKET({payload}) {
    yield put(requestLoading(ticketActions.SET_STATE,true,'finish-ticket'))

	// let id = payload.id
	// let fichier = payload.file
	// let notes = payload.notes
	let formData = new FormData()
	formData.append('id_ticket', payload.id)
	formData.append('fichier', payload.file)
	formData.append('notes',payload.notes)
    const response = yield call(requestService.postRequest,
		`${API_URL}/api/finish-ticket`,
		formData,
		{protect : true, authUser : cookie.get('tokenCookie'), typeContent : 'multipart/form-data'},
	)
    if(!response.error) {
        yield put(succes({myTickets: response.data.tickets, idTerminer:response.data.id_ticket, secondLoad: false, successTerminer:true},ticketActions.SET_STATE))
    }
    else{
		console.log(response.data.message)
		yield put(failure({error : response.data.message, errorAction:'finish-ticket'}, ticketActions.SET_STATE))
	}

    yield put(requestLoading(ticketActions.SET_STATE,false))
}


export default function* rootSaga() {
    yield all([
		takeLatest(ticketActions.GET_TICKETS, GET_TICKETS),
		takeEvery(ticketActions.GET_MY_TICKETS, GET_MY_TICKETS),
		takeLatest(ticketActions.CREATE_TICKET, CREATE_TICKET),
		takeLatest(ticketActions.ASSIGN_TICKET, ASSIGN_TICKET),
		takeLatest(ticketActions.FINISH_TICKET, FINISH_TICKET),
		takeLatest(ticketActions.GET_MESSAGES, GET_MESSAGES)

    ])
}