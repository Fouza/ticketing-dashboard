
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { dispatchAction } from "../../../utils/general/dispatch.util"
import userActions from "../../../redux/user/actions"
import { Modal, Button, Input, Select } from "antd"
import { toast } from "react-toastify"

function CreateUser({isModalVisible, handleCancel}){

	const { createUser } = useSelector(state => state.users) 

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')
	const [name, setName] = useState('')
	const [lastname, setLastName] = useState('')
	const [type, setType] = useState('agent')

	const { Option } = Select;

	let dispatch = useDispatch()

	useEffect(() => {
		if(createUser){
			toast.success("Création de l'utilisateur avec succès")
			dispatch(dispatchAction(userActions.SET_STATE, {createUser:false}))
		}
	}, [createUser])

	const handleOnChange = (value,name) => {
		if(name=="name"){
			setName(value)
		}else if(name=="lastname"){
			setLastName(value)
		}else if(name=="email"){
			setEmail(value)
		}else if(name == "password"){
			setPassword(value)
		}else if(name == "confirm"){
			setConfirm(value)
		}
	}

	const handleOnSelect = (value) => {
		setType(value)
	}
	const handleCreateUser = () => {
		const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
		if(lastname.length === 0){
			toast.error("Entrez un nom")		
		}else if(name.length === 0){
			toast.error("Entrer un prénom")
	
		}else if(email.length === 0 || !regexEmail.test(email)){
			toast.error("Entrez un e-mail valide")
		}else if(password.length <= 6){
			toast.error("Le mot de passe doit contenir plus de 6 caractères")
		}else if(confirm.length <= 6 || confirm != password){
			toast.error("Les mots de passe sont différents")
			toast.error("Le mot de passe doit contenir plus de 6 caractères")
		}else if(type.length === 0){
			toast.error("Séléctionner un type pour l'utilisateur")
		}else{
			dispatch(dispatchAction(userActions.CREATE_USER,{name:name, lastname:lastname,email:email, password:password,password_confirmation:password, type:type}))
		}
	}

	const handleOk = () => {
		handleCreateUser()
	}

	return(
		<Modal title="Créer un nouveau utilisateur" 
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={[
					<Button key="back" onClick={handleCancel}>
						Return
					</Button>,
					<Button
						type="primary"
							// loading={loading && loadingPart==="create-user"}
						onClick={handleOk}
					>Ok</Button>]} >
					<div className="flex fdr f1 marv20">
						<Input size="large" placeholder="Nom"
								onChange={e => handleOnChange(e.currentTarget.value,'lastname')} />
					</div>
					<div className="flex fdr f1 marv20">
						<Input size="large" placeholder="Prénom"
								onChange={e => handleOnChange(e.currentTarget.value,'name')} />
					</div>
					<div className="flex fdr f1 marv20">
						<Input size="large" placeholder="email" type="email" 
								onChange={e => handleOnChange(e.currentTarget.value,'email')} />
					</div>
					<div className="flex fdr f1 marv20">
						<Input size="large" placeholder="Mot de passe" type="password" 
								onChange={e => handleOnChange(e.currentTarget.value,'password')}/>
					</div>
					<div className="flex fdr f1 marv20">
						<Input size="large" placeholder="Confirmation du mot de passe" type="password" 
								onChange={e => handleOnChange(e.currentTarget.value,'confirm')}/>
					</div>
					<div className="flex fdr f1 marv20">
						<Select defaultValue="agent" style={{ width: 150 }} onChange={handleOnSelect}>
							<Option value="agent" key="agent">Assistante DZ</Option>
							<Option value="customer" key="customer">Assistante FR</Option>
						</Select>
					</div>
		</Modal>
	)
}

export default CreateUser