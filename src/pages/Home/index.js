import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebaseConnection'
import './home.css' 
 
function Home () {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()

async function Acess (e) {
    e.preventDefault()
    if(email !== '' || password !== ''){
        await signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
          navigate('/admin', {replace:true})
        })
        .catch(()=>{
          console.log("ERRO AO FAZER LOGIN")
        })
    } else {
     alert('PREENCHA CORRETAMENTE AS INFORMÇÕES DE LOGIN')
    }
}

    return(
        <div className='home-container'>
            <h1>Lista de Tarefas</h1>
            <span>Gerencie aqui suas tarefas</span>

            <form className='form'>
             <input type='text' 
             placeholder='Digite seu email'
             onChange={(e)=>{ setEmail(e.target.value)}}/>

             <input type='password'
             placeholder='Digite sua senha'
             onChange={(e)=>{ setPassword(e.target.value)}}/>
            </form>
            <button onClick={Acess}>Acessar</button>

            <Link to='/register' className='button-link'>
                Não possui uma conta? Cadastre-se
            </Link>
        </div>
    )
}
export default Home