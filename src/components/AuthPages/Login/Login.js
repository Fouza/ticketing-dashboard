import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './Login.scss';
import { dispatchAction } from '../../../utils/general/dispatch.util';
import userActions from '../../../redux/user/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css'; 


function Login(){

	const { error, loading, loadingPart} = useSelector(state => state.users)
	// const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged'))
	const [email,setEmail] = useState("")
	const [password, setPassword] = useState("")
	const dispatch = useDispatch()
	
	// useEffect(()=>{
	// 	if(isLogged==='true'){
	// 		localStorage.setItem('isLogged',true)
	// 		console.log("gotodashboard")
	// 		console.log(history)
	// 		history.push("/dashboard")
	// 		console.log(history)
	// 		//dispatch(dispatchAction(userActions.SET_STATE,{isLogged:false}))
	// 	}
	// },[isLogged])

	useEffect(() => {
		if(error && error.length > 0){
			toast.error(error)
			dispatch(dispatchAction(userActions.SET_STATE,{error:""}))
		}
	}, [error]);


	// useEffect(()=>{
	// 	if(isLogged) {
	// 		history.push('/dashboard')
	// 	}
	// },[isLogged])

	const handleOnChange = (value,name) => {
		// dispatch(dispatchAction(userActions.SET_STATE,{[name]:value}))
		if(name=="email"){
			setEmail(value)
		}else if(name == "password"){
			setPassword(value)
		}
	}

	const handleEnter = (e) => {
		if(e.keyCode === 13){
			handleLogin()
		}
	}

	const handleLogin = () => {
		const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
		if(email.length === 0 || !regexEmail.test(email)){
			toast.error("Entrez un e-mail valide")
		}else if(password.length === 0){
			toast.error("Entrez un mot de passe")
		}else{
			dispatch(dispatchAction(userActions.LOGIN_USER,{email:email, password:password}))
		}
	}


	return(
		<div className="login_form flex fdc aic jcsa" >
			<div className="login_box flex fdc pad30 padh40 relw50 mob__relw90 box_shadow_light">
				<div className="flex fdr f1 jcc marv20">
					<p className="">Connectez-vous</p>
				</div>
				<div className="flex fdr f1 marv20">
					<Input size="large" placeholder="email" type="email" 
							onChange={e => handleOnChange(e.currentTarget.value,'email')} />
				</div>
				<div className="flex fdr f1 marv20">
					<Input size="large" placeholder="Password" type="password" 
							onKeyDown={(e) => handleEnter(e)}
							onChange={e => handleOnChange(e.currentTarget.value,'password')}/>
				</div>
				<div className="flex fdr f1 jcc marv20">
					<Button type="primary" 
						size="large" 
						onClick={handleLogin} 
						loading={loading && loadingPart=='login'}
						>Valider</Button>
				</div>
			</div>
		</div>

	)
}

export default Login;

