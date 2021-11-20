import {all} from 'redux-saga/effects'
import ticket from "./tickets/sagas";
import user from "./user/sagas";

export default function* rootSaga(){
    yield all([
		ticket(),
		user()
    ])
}