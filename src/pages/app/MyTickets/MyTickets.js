
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchAction } from '../../../utils/general/dispatch.util'
import ticketActions from '../../../redux/tickets/actions'
import Detail from '../../../components/commun/Detail/Detail'
import Terminer from '../../../components/commun/Terminer/Terminer'
import { Table, Tag, Button } from 'antd'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';	
import './MyTickets.scss'
import userActions from '../../../redux/user/actions'

function MyTickets(){

	const { secondLoadMyTicket, error, errorAction, successTerminer } = useSelector(state => state.tickets)
	const {myTickets} = useSelector(state => state.tickets)

	const [notes, setNotes] = useState("");
	const [file, setFile] = useState({})

	const [data, setData] = useState([])
	const [ticket, setTicket] = useState({})
	const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
	const [isTerminerModalVisible, setIsTerminerModalVisible] = useState(false)
	const dispatch = useDispatch()

	useEffect(()=>{
		if(myTickets != undefined && myTickets.length == 0 && !secondLoadMyTicket){
			dispatch(dispatchAction(ticketActions.SET_STATE, {secondLoadMyTicket:true}))
			dispatch(dispatchAction(ticketActions.GET_MY_TICKETS))
		}	
	},[])

	useEffect(() => {
		if(error && error.length > 0 && errorAction==='my-tickets'){
			toast.error(error)
			dispatch(dispatchAction(ticketActions.SET_STATE, {error:"", errorAction:""}))
		}
	},[error])

	useEffect(()=>{
		if(myTickets != undefined && myTickets.length > 0){
			setData(getData())
		}
	},[myTickets])

	const columns = [
		{
			title : 'Id',
			dataIndex : 'id',
			width: '10%',
			sorter: (a, b) => a.id - b.id,
	        sortDirections: ['descend', 'ascend'],
		},
		{
			title : 'Titre',
			dataIndex : 'title',
			width: '20%',
			render : title => {
				if(title.length > 50 ) return title.slice(0,30) + "..."
				else return title
			}
		},
		// {
		// 	title : 'Délai',
		// 	dataIndex : 'deadline',
		// 	width: '10%',
		// },
		{
			title : 'Etat',
			dataIndex : 'etat',
			width: '10%',
			filters:[
				{
					text:'Effectué',
					value:'done'
				},
				{
					text:'Non effectué',
					value:'todo'
				}
			],
			onFilter: (value, record) =>  {
				value = (value=='done' ? 'Effectué' : 'Non effectué')
				return record.etat.indexOf(value) === 0
			},
			render: etat => (
				<>
					<Tag color={etat == "Effectué" ? "blue" : "red"}>
						{etat}
					</Tag>
				</>
			)
		},
		{
			title : 'Crée par',
			dataIndex : 'customer',
			width: '20%',
			responsive: ['lg']
		},
		{
			title:'Actions',
			dataIndex:'actions',
			width:'20%',
			render : (text, record, index) => {
				return (
					<>
						<Button className="marr5" onClick={() => showDetailModal(record.id)}>Détails</Button>
						<Button className="" onClick={() => showTerminerModal(record.id)} >Terminer</Button>
					</>
				)
			}
		}
	]

	const getData = () =>{
		var data = []

		myTickets.forEach(ticket => {
			let obj = {
				item:0,
				id:0,
				title:'',
				//description:'',
				//notes:'',
				deadline:'',
				etat:'',
				agent:'',
				customer:'',
			}
			let agent = ticket.agent
			let customer = ticket.customer
			obj.id = ticket.id
			obj.title = ticket.title
			obj.deadline = ticket.deadline
			obj.etat = ticket.etat === 'done' ? 'Effectué' : 'Non effectué'
			obj.agent = !agent ? "/" :  agent.name + " " + agent.lastname
			obj.customer = !customer ? null : customer.name + " " + customer.lastname
			data.push(obj)

		});
		return data
	}


	const handleFinir = id => {
		//dispatch(dispatchAction(ticketActions.ASSIGN_TICKET, {id:id}))
	}

	//Detail Modal
	const getDetailTicket = (id) => {
		const array = myTickets.filter(ticket => ticket.id === id)
		setTicket(array[0])
	}

	const showDetailModal = (id) => {
		getDetailTicket(id)
		setIsDetailModalVisible(true);
	};

	const showTerminerModal = (id) => {
		getDetailTicket(id)
		setIsTerminerModalVisible(true);
	};

	const handleDetailOk = () => {
		setIsDetailModalVisible(false)
	};	

	useEffect(() => {
		if(successTerminer){
			toast.success(`Ticket effectué !`)
			dispatch(dispatchAction(ticketActions.SET_STATE, {successTerminer:false}))
		}
	},[successTerminer])	

	const handleTerminerOk = () => {
		if(!!notes && notes.length === 0){
			toast.error("Veuillez entrer vos remarques")
		}else if(!!file && Object.keys(file).length == 0){
			toast.error("Veuillez entrer un fichier zip")
		}else{
			dispatch(dispatchAction(ticketActions.FINISH_TICKET,{id:ticket.id, file:file, notes:notes}))
			setIsTerminerModalVisible(false)
		}
		
	};	

	const handleOnChange = (value,name) => {
		// dispatch(dispatchAction(userActions.SET_STATE,{[name]:value}))
		if(name=="notes"){
			setNotes(value)
		}else if(name == "file"){
			setFile(value)
		}
	}

	const handleCancel = () => {
		setIsDetailModalVisible(false);
		setIsTerminerModalVisible(false);
	};

	const onChange = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	}

	const handleRefresh = () => {
		dispatch(dispatchAction(ticketActions.GET_MY_TICKETS))
	}


	return(
		<div className="content flex fdc fs20 padh40">
			<div className="flex fdr jcsb padt20">
				<p>Mes Tickets</p>
			</div>

			<Detail ticket={ticket} isDetailModalVisible={isDetailModalVisible} handleDetailOk={handleDetailOk} handleCancel={handleCancel} />
			<Terminer ticket={ticket} file={file} notes={notes} handleOnChange={handleOnChange} isTerminerModalVisible={isTerminerModalVisible} handleTerminerOk={handleTerminerOk} handleCancel={handleCancel} />
			<Table columns={columns} 
				dataSource={data} 
				onChange={onChange} 
				pagination={{ pageSize: 5 }} 
				scroll={{ x: 1000 }} />
		</div>
	)
}

export default MyTickets