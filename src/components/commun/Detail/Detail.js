import { Modal, Button, List, Tag } from "antd"
import {API_URL} from "../../../network"

function Detail({ticket, isDetailModalVisible, handleDetailOk, handleCancel}){

	const filePath = !!ticket.fichier && ticket.fichier.length > 0 
						?`${API_URL}/storage/${ticket.fichier}`
						: ''
	const fileUpload = () => {
		if(!!ticket.fichier && ticket.fichier.length > 0){
			return (
				<>
					<span className="raleway-bold marr10 txtac wh-nowrap">Fichier associé :</span>
					<a href={filePath} download>Fichier du Ticket {ticket.id}</a>
				</>
			)
		}else{
			return (
				<></>
			)
		}
	}

	const data = [
		<><span className="raleway-bold marr10 txtac wh-nowrap">Titre :</span>{`${ticket.title}`}</>,
		<><span className="raleway-bold marr10 txtac wh-nowrap">Description :</span>{`${ticket.description}`}</>,
		<><span className="raleway-bold marr10 txtac wh-nowrap">Délai :</span>{`${!ticket.deadline ? 'Non précisé' : ticket.deadline}`}</>,
		<><span className="raleway-bold marr10 txtac wh-nowrap">Remarques :</span>{`${!ticket.notes ? '/' : ticket.notes}`}</>,
		<Tag color={ticket.etat == "done" ? "blue" : "red"}>{ticket.etat === 'todo' ? 'Non effectué' : 'Effectué'}</Tag>,
		<><span className="raleway-bold marr10 txtac wh-nowrap">Pris par :</span>{`${!ticket.agent ? '/' : ticket.agent.name + ' ' + ticket.agent.lastname}`}</>,
		<><span className="raleway-bold marr10 txtac wh-nowrap">Crée par :</span>{`${!ticket.customer ? '/' : ticket.customer.name + ' ' + ticket.customer.lastname}`}</>,
		<>{!!ticket.fichier && ticket.fichier.length > 0 ?
			<div className="flex fdr jcsb">
				<span className="raleway-bold marr10 txtac wh-nowrap">Fichier associé :</span>
				<a href={filePath} download>Fichier du Ticket {ticket.id}</a>
			</div>
			:
		<span className="raleway marr10 txtac wh-nowrap">Ticket non effectué : Aucun fichier associé</span>

		}</>
	]

	return (
		<Modal title={`Détail du Ticket numéro ${ticket.id}`} visible={isDetailModalVisible}
				onCancel={handleCancel} 
				footer={[
					<Button
						type="primary"
						onClick={handleDetailOk}
					>Ok</Button>
				]}>
			<List
				bordered
				dataSource={data}
				renderItem={item => (
					<List.Item>
						{item}
					</List.Item>
				)}
			/>
		</Modal>
	);
}

export default Detail