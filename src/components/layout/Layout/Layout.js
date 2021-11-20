import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import './Layout.scss';
import Dashboard from '../../../pages/app/Dashboard/Dashboard';
import Tickets from '../../../pages/app/Tickets/Tickets';
import Navbar from '../../../components/layout/Navbar/Navbar';
import ticketsActions from '../../../redux/tickets/actions';
import TextNavLink from '../../commun/TextNavLink/TextNavLink.js';
import { dispatchAction } from '../../../utils/general/dispatch.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faTachometerAlt, faClipboardList, faArrowLeft, faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';	
import { Button, Modal, Input, DatePicker } from 'antd';
import moment from 'moment';

import Login from '../../AuthPages/Login/Login.js';
import userActions from '../../../redux/user/actions';
import { createBrowserHistory } from "history";
import MyTickets from '../../../pages/app/MyTickets/MyTickets';
import Messages from '../../../pages/app/Messages/Messages';
import Drawer from '../Drawer/DrawerComponent';

function Layout({ user, t, path}){
	const { isLogged, loading, loadingPart} = useSelector(state => state.users)
	const { error } = useSelector(state => state.tickets)
	const history = createBrowserHistory();
	
	const isLoggedStorage = JSON.parse(localStorage.getItem('isLogged'))

	const [isModalVisible, setIsModalVisible] = useState(false)


	const [name, setName] = useState(!!user ? user.name + ' ' + user.lastname : "")
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [notes, setNotes] = useState('')
	const [deadline, setDeadline] = useState('')
	const [opened,open] = useState(false)

	const [height, setHeight] = useState(0)
	const hasWindow = typeof window !== 'undefined';
	
	const dispatch = useDispatch()

	useEffect(() => {
		setHeight(hasWindow ? window.innerHeight : null)
	}, []);

	useEffect(() => {
		if(isLogged){
			history.go(0)
		}
	},[isLogged])

//New Modal
	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		
		if(title.length === 0) toast.error("Veuillez entrer un titre")
		else if(description.length === 0) toast.error("Veuillez entrer une description")
		else if(deadline.length ===0) toast.error("Veuillez entrer un délai")
		else{
			dispatch(dispatchAction(ticketsActions.CREATE_TICKET,
				{
					title:title,
					description:description,
					notes:notes,
					deadline:deadline
				}
			))
			if(error && error.length > 0){
				toast.error(error)
				dispatch(dispatchAction(userActions.SET_STATE,{error:""}))
			}else{
				setTitle('')
				setDescription('')
				setNotes('')
				setDeadline('')
				toast.success("Ticket crée avec succès")
				if(!loading) setIsModalVisible(false)
			}
		}
	};	

	const disabledDate = (current) => {
		// Can not select days before today and today
		return current && current < moment().endOf('day');
	}


	useEffect(() => {
		if(!loading && loadingPart==='create-ticket') setIsModalVisible(false)
	},[loading])

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleOnChange = (value,name) => {
		// dispatch(dispatchAction(userActions.SET_STATE,{[name]:value}))
		if(name=="title"){
			setTitle(value)
		}else if(name == "description"){
			setDescription(value)
		}else if(name == "notes"){
			setNotes(value)
		}else if(name == "deadline"){
			setDeadline(value)
		}
	}

	const handleOnChangeDate = (date, dateString) => {
		setDeadline(dateString.slice(8,18))
	}	

	const sideBarLarge = () => {
		if(isLoggedStorage){	
			return (
				<div className="sidebar flex fdc f1 ais padt20 padr35 gradient_bg medium__hide" >
					<div className="flex f2 fdr jcsb marr10 padl20">
						<div className="profile flex fdc f3">
							<FontAwesomeIcon className="asc" icon={faUserCircle} size="4x" color="white"  />
							<p className="profile-name fs14 padt10 raleway txtac white">{name}</p>
						</div>
						<p className="flex fdc f9 title fs16 raleway-bold white">Ticketing App</p>
							
					</div>
					<div className="menu flex f2 fdr asfs">
						<div className="flex fdc f1 fs14">
							<TextNavLink icon={faTachometerAlt} iconSize={"xs"} text={"Dashboard"} to={"/dashboard"} textClassName="padh7" className={"link flex fdr aic padh5 padt10 raleway-medium first_grey txt_deco_none"}></TextNavLink>
							<TextNavLink icon={faClipboardList} iconSize={"xs"} text={"Tickets"} to={"/tickets"} textClassName="padh7" className={"link flex fdr aic padh5 padt10 raleway-medium first_grey txt_deco_none"}></TextNavLink>
							{ !!user && user.type==='agent' &&
								<TextNavLink icon={faUserCircle} iconSize={"xs"} text={"Mes Tickets"} to={"/mytickets"} textClassName="padh7" className={"link flex fdr aic padh5 padt10 raleway-medium first_grey txt_deco_none"}></TextNavLink>
							}
							{ !!user && user.type==='customer' &&
								<TextNavLink icon={faStickyNote} iconSize={"xs"} text={"Messages"} to={"/messages"} textClassName="padh7" className={"link flex fdr aic padh5 padt10 raleway-medium first_grey txt_deco_none"}></TextNavLink>
							}
						</div>
					</div>
					<div className="logout flex f4 fdr asfs">
						<div className="flex fdc f1 fs14 jcfe">
							<TextNavLink icon={faArrowLeft} iconSize={"xs"} text={"Déconnexion"} 
										to={"/"} textClassName="padh7" 
										className={"link flex fdr aic padh5 padt10 raleway-medium first_grey txt_deco_none"}
										action={"logout"}
										loading={loading}
										loadingPart={loadingPart}
							></TextNavLink>
						</div>
					</div>
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
	
	const loginComponent = () => {
		return (
			<div className="content flex fdc jcc fs20 pad30 padl40">
				<Login />
			</div>
		)
	}
	
	const ProtectedRoute = ({Component, redirectTo, path, key}) => {
		if (isLoggedStorage) return <Route exact path={path} component={Component} key={key} ></Route>;
		else return <Redirect to={redirectTo}/>
	};
	
	const LoginRoute = ({Component, redirectTo, path, key}) => {
		if (!isLoggedStorage) return <Route exact path={path} component={Component} key={key}></Route>;
		else return <Redirect to={redirectTo}/>
	}

	const newTicketComponent = () => {
		const { TextArea } = Input;
		const dateFormat = 'DD/MM/YYYY';
		const customFormat = value => `Délai : ${value.format(dateFormat)}`;
		if(isLoggedStorage){
			return (
				<Modal title="Créer un nouveau ticket" visible={isModalVisible}  onCancel={handleCancel}
							// onOk={handleOk} 
							// onCancel={handleCancel}
							footer={[
								<Button key="back" onClick={handleCancel}>
									Return
								</Button>,
								<Button
									type="primary"
									loading={loading && loadingPart==="create-ticket"}
									onClick={handleOk}
								>Ok</Button>
							]}>
							<div className="flex fdr f1 marv20">
								<Input size="large" placeholder="Titre *" name="title" value={title}
										onChange={e => handleOnChange(e.currentTarget.value,'title')} />
							</div>
							<div className="flex fdr f1 marv20">
								<TextArea size="large" rows={2} placeholder="Description *" name="description" value={description}
										onChange={e => handleOnChange(e.currentTarget.value,'description')}/>
							</div>
							<div className="flex fdr f1 marv20">
								<TextArea size="large" rows={2} placeholder="Remarques" name="notes" value={notes}
										onChange={e => handleOnChange(e.currentTarget.value,'notes')}/>
							</div>
							<div className="flex fdr f1 marv20">
								<DatePicker defaultValue={moment('2015/01/01', dateFormat)} 
											format={customFormat} 
											disabledDate={disabledDate}
											defaultValue={moment().add(1,'days')}
											onChange={handleOnChangeDate}
											/>
							</div>

					</Modal>
			)
		}else{
			return ( <></>)
		}
	}
	const closeDrawer = () => {
		open(false)
	}

	const openDrawer = () => {
		open(true)
	}
	return(
		<Router history={history}>
			<Drawer onClose={closeDrawer} opened={opened}/>

			<div className="flex fdc container" style={{ height:height }}>
				<ToastContainer />	
				{newTicketComponent()}
				<Navbar showModal={showModal} open={openDrawer} user={user} />
				<div className="second_container flex fdr">
					{sideBarLarge()}
					<Switch>
						<Route exact path="/">
							<Redirect to="/dashboard" />
						</Route>
						<LoginRoute path="/login" Component={loginComponent} redirectTo="/dashboard" key="login" />
						<ProtectedRoute path={"/dashboard"} Component={Dashboard} redirectTo="/login" key="dashboard"/>
						<ProtectedRoute path={"/tickets"} Component={Tickets} redirectTo="/login" key="tickets"/>
						{!!user && user.type==='agent' &&	
							<ProtectedRoute path={"/mytickets"} Component={MyTickets} redirectTo="/login" key="mytickets"/>
						}
						{!!user && user.type==='customer' &&	
							<ProtectedRoute path={"/messages"} Component={Messages} redirectTo="/login" key="mytickets"/>
						}
					</Switch>
				</div>
			</div>
		</Router>
	)
}

export default Layout;