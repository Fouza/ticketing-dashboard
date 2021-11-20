import ticketActions from './actions'

const initialState = {
	tickets:[],
	myTickets:[],
	messages:[],
    loading: false,
    error:null,
	secondLoad:false,
	secondLoadMyTicket:false,
	secondLoadMessages:false,
	successPris:false,
	successTerminer:false,
	idTerminer:0,
	errorAction:'',

	//pagination
	pageTicket:1,
}

export default function ticketsReducers(state = initialState, action) {
    switch (action.type) {
        case ticketActions.SET_STATE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}