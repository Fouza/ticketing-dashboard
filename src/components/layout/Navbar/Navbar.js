


import IconButton from '@mui/material/IconButton';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons'
import './Navbar.scss'


function Navbar({showModal, open, user}){
	
	const isLogged = JSON.parse(localStorage.getItem('isLogged'))

	const drawerButton = () => {
		return (
			<div className="drawer_button mediumOnly aic">
				<IconButton className="icon_button" variant="contained" onClick={open}>
					<FontAwesomeIcon icon={faBars} color={"white"} />
				</IconButton>
			</div>
		)
	}

	const newButton = () => {
		if(isLogged && !!user && user.type==='customer'){	
			return(
				<Button className="new_button main_green_bg" 
					onClick={showModal}
					icon={<FontAwesomeIcon 
							color={"#3D336B"} 
							icon={faPlus} 
							color="white" 
							className="new_icon main_green_bg marr10" 
						/>}
				>Nouveau</Button>
			)
		}else{
			return <></>
		}
	}

	return(
		<div className="navbar flex fdr jcfe aic padh30 mob__padl10 main_purple_bg">
			{drawerButton()}
			{newButton()}
		</div>
	)
}


export default Navbar