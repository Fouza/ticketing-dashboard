import userActions from './actions';
import {all, takeEvery,put,call, select, takeLatest} from "redux-saga/effects"
import {requestLoading, succes, failure} from '../../utils/general/dispatch.util';
import {setCookie, createDate} from '../../utils/user.util';
import {requestService} from "../../utils/general/request.util"
import { API_URL } from "../../network";
import { authenticate } from '../../utils/general/auth.util';
import { signout } from '../../utils/general/auth.util';
import cookie from 'js-cookie'

export function* LOGIN_USER({payload}) {
	console.log("login user")
	yield put(requestLoading(userActions.SET_STATE,true,"login"))
	let email = payload.email
	let password = payload.password
    const response = yield call(requestService.postRequest,
		`${API_URL}/api/login`,
		{email,password},
		{protect : null,authUser : null,typeContent : null}
		)
				
    if(!response.error) {
		const user = response.data.user
        yield put(succes({isLogged: true},userActions.SET_STATE))
		setCookie("tokenCookie",response.data.access_token)
		authenticate(response.data.access_token, response.data.user)
    }
    else {
		yield put(failure({error : "Erreur, réessayer !"},userActions.SET_STATE))
	}
    yield put(requestLoading(userActions.SET_STATE,false))
}

export function* LOGOUT_USER(){
	yield put(requestLoading(userActions.SET_STATE,true,"logout"))
	let email = JSON.parse(localStorage.getItem('email'))

	const response = yield call(requestService.postRequest,
		`${API_URL}/api/logout`,
		{email:email},
		{protect : true, authUser : cookie.get('tokenCookie'), typeContent : null}
	)
	if(!response.error) {
		yield put(succes({isLogged: false, logout: true},userActions.SET_STATE))
		signout();
	}else {
		yield put(failure({error : "Erreur ..."},userActions.SET_STATE))
	}
    yield put(requestLoading(userActions.SET_STATE,false))
	
}

export function* CREATE_USER({payload}) {
	console.log("create user")
	yield put(requestLoading(userActions.SET_STATE,true,"create-user"))
	
    const response = yield call(requestService.postRequest,
		`${API_URL}/api/create-agent`,
		payload,
		{protect : true,authUser : cookie.get('tokenCookie'),typeContent : null}
		)
				
    if(!response.error) {
        yield put(succes({createUser:true},userActions.SET_STATE))
    }
    else {
		yield put(failure({error : "Erreur, réessayer !"},userActions.SET_STATE))
	}
    yield put(requestLoading(userActions.SET_STATE,false))
}

export default function* rootSaga() {
    yield all([
		takeLatest(userActions.LOGIN_USER, LOGIN_USER),
		takeLatest(userActions.LOGOUT_USER, LOGOUT_USER),
		takeLatest(userActions.CREATE_USER, CREATE_USER)
    ])
}