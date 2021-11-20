import { combineReducers} from "redux"
import tickets from "./tickets/reducer";
import users from "./user/reducer"

export default ()=> combineReducers({
    tickets,
    users
})