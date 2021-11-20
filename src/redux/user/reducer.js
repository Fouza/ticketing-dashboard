import userActions from './actions'

const initialState = {
	email:'',
	//password:'',
	name:'',
	lastname:'',
	type:'',
    image:'',
    isLogged : false,
	remebered:false,
    loading: false,
	loadingPart:'',
	createUser:false,
    error:null,
	logout:false,
	targetError:[]
}

export default function userReducers(state = initialState, action) {
    switch (action.type) {
        case userActions.SET_STATE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}