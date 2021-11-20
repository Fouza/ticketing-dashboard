
import {useState, useEffect} from 'react';
import { SwipeableDrawer } from '@mui/material';
import './Drawer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faTachometerAlt, faClipboardList, faStickyNote } from '@fortawesome/free-solid-svg-icons'
import TextNavLink from '../../commun/TextNavLink/TextNavLink.js';

function DrawerComponent({opened, onClose}){
	const [width, setWidth] = useState(0)
	const hasWindow = typeof window !== 'undefined';
	
	const isLoggedStorage = JSON.parse(localStorage.getItem('isLogged'))
	const user = JSON.parse(localStorage.getItem('user'))
	useEffect(() => {
		setWidth(hasWindow ? window.innerWidth : null)
	}, []);

	const sideBar = () => {
		if(isLoggedStorage){	
			return (
				<div className="flex fdc f1 fs14" onClick={onClose}>
					<TextNavLink icon={faTachometerAlt} iconSize={"xs"} text={"Dashboard"} to={"/dashboard"} textClassName="padh7" className={"link flex fdr aic padh5 padt10 raleway-medium first_grey txt_deco_none"}></TextNavLink>
					<TextNavLink icon={faClipboardList} iconSize={"xs"} text={"Tickets"} to={"/tickets"} textClassName="padh7" className={"link flex fdr aic padh5 padt10 raleway-medium first_grey txt_deco_none"}></TextNavLink>
					{ !!user && user.type==='agent' &&
						<TextNavLink icon={faUserCircle} iconSize={"xs"} text={"Mes Tickets"} to={"/mytickets"} textClassName="padh7" className={"link flex fdr aic padh5 padt10 raleway-medium first_grey txt_deco_none"}></TextNavLink>
					}
					{ !!user && user.type==='customer' &&
						<TextNavLink icon={faStickyNote} iconSize={"xs"} text={"Messages"} to={"/messages"} textClassName="padh7" className={"link flex fdr aic padh5 padt10 raleway-medium first_grey txt_deco_none"}></TextNavLink>
					}
				</div>
			)
		}else{
			return (
				<div className="sidebar flex fdc f1 ais padt20 padr35 gradient_bg medium__hide" >
					<div className="flex f2 fdr jcsb marr10 padl20">
						<div className="profile flex fdc f3">
							
						</div>
						<p className="flex fdc f9 title fs16 raleway-bold white">Ticketing App</p>
							
					</div>
					<div className="menu flex f2 fdr asfs">
						<div className="flex fdc f1 fs14">
						</div>
					</div>
					<div className="logout flex f4 fdr asfs">
						<div className="flex fdc f1 fs14 jcfe">
							
						</div>
					</div>
				</div>
			)
		}
	}

	return(
		<SwipeableDrawer 
			anchor={"left"}
			open={opened}
			onClose={onClose}
		>
			<div className="sidebar_drawer flex fdc f1 gradient_bg" >
				<div className="flex fdr f1">
					<div className="profile_mobile flex fdc f1 jcc">
						<FontAwesomeIcon className="asc" icon={faUserCircle} size="4x" color="white"  />
						<p className="profile_name_mobile fs14 padt10 raleway txtac white">User Name</p>
					</div>
				</div>
				<div className="flex fdr f1 aic">
					<div className="menu_mobile flex f1 fdr jcc">
						<div className="flex fdc f1 fs14 aic">
							{sideBar()}
						</div>
					</div>
				</div>
				<div className="flex fdr f1"></div>
			</div>
		</SwipeableDrawer>
	);
}


export default DrawerComponent