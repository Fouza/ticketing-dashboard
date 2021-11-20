import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import './Dashboard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'antd';
import CreateUser from '../../../components/commun/CreateUser/CreateUser';

function Dashboard(){

	const isLogged = JSON.parse(localStorage.getItem('isLogged'))
	const user = JSON.parse(localStorage.getItem('user'))
	const [isModalVisible, setIsModalVisible] = useState(false)


	const newUserButton = () => {
		if(isLogged && !!user && user.type==='admin'){	
			return(
				<Button className="new_button main_green_bg" 
					onClick={showModal}
					icon={<FontAwesomeIcon 
							color={"#3D336B"} 
							icon={faPlus} 
							color="white" 
							className="new_icon main_green_bg marr10" 
						/>}
				>Nouveau utilisateur</Button>
			)
		}else{
			return <></>
		}
	}

	const handleOk = () => {
		console.log('ok')
	}

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	
	return(
		<div className="content flex fdc fs20 padh40">
			<div className="flex fdr jcsb padt20">
				<p>Dashboard</p>
				{newUserButton()}
				<CreateUser isModalVisible={isModalVisible} 
							handleCancel={handleCancel} 
							handleOk={handleOk}
							/>
			</div>
		</div>
	)

}

export default Dashboard