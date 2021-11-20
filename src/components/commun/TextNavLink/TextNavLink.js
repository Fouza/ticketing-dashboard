import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom'
import {Button} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './TextNavLink.scss'
import { dispatchAction } from '../../../utils/general/dispatch.util';
import userActions from '../../../redux/user/actions';
import { useHistory } from 'react-router-dom';

function TextNavLink({action, text, className, textClassName,to, icon, iconSize, onClick, loading, loadingPart}){
	const {logout, isLogged} = useSelector(state => state.users)
	const dispatch = useDispatch()
	let history = useHistory()
	const handleLogout = () => {
		dispatch(dispatchAction(userActions.LOGOUT_USER))
	}
	useEffect(() => {
		if(logout){
			if(JSON.parse(localStorage.getItem('isLogged')) && !isLogged) localStorage.removeItem('isLogged')
			history.replace(history.location.pathname)
		}
	},[logout])

	if(icon=="none"){
		return(
			<NavLink to={to} className={className} activeClassName="selected">
				{text}
			</NavLink>
		)
	}else if(action != 'logout'){
		return(
			<NavLink to={to} className={className} activeClassName="selected">
				<p><FontAwesomeIcon icon={icon} size={iconSize} /></p>
				<p className={textClassName}>{text}</p>
			</NavLink>
		)
	}else{	
		return (
			<Button type="link" className={className} icon={<p><FontAwesomeIcon icon={icon} className="flex asc"/></p>} onClick={() => handleLogout()} loading={loading && loadingPart=='logout'}>
				<p className={textClassName}>{text}</p>
			</Button>
		)
	}
}

export default TextNavLink;