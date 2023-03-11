import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {auth} from '../../firebaseConnection'
import {createUserWithEmailAndPassword} from 'firebase/auth'  
import './register.css' 
 
function Register () {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()

async function newUser (e) {
    e.preventDefault()
    if(email !== '' || password !== ''){
     await createUserWithEmailAndPassword(auth, email, password)
     .then(()=>{
       navigate('/admin', {replace:true})
       
     })
     .catch(()=>{
        console.log("ERRO AO CADASTRAR NOVO USUÁRIO")
     })
    } else {
     alert('TESTE')
    }
}

    return(
        <div className='home-container'>
            <h1>Cadastre-se</h1>
            <span>Crie um conta e gerencie suas tarefas</span>

            <form className='form'>
             <input type='text' 
             placeholder='Digite seu email'
             onChange={(e)=>{ setEmail(e.target.value)}}/>

             <input type='password'
             placeholder='Digite sua senha'
             onChange={(e)=>{ setPassword(e.target.value)}}/>
            </form>
            <button onClick={newUser}>Cadastrar</button>

            <Link to='/' className='button-link'>
                Já possui uma conta? Faça Login
            </Link>
        </div>
    )
}
export default Register