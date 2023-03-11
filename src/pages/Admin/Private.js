import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../../firebaseConnection'

//   o que tem dentro da tag 'Private' (admin) - parametro passado
function Private ( {children} ) {
  const [loading, setLoading] = useState(true) // começa a veirificação de usuário
  const [sigIn, setSigIn] = useState(false) // confirma se há usuário logado

  useEffect(()=>{
    async function checkLogin(user){
        const userOnline = onAuthStateChanged(auth, (user)=>{
            if(user){ // se há usuário -->
                const userData = {
                    uid: user.uid,
                    email: user.email
                }
                const json = JSON.stringify(userData)
                localStorage.setItem('@detailsUser', json)
                setLoading(false) // pare a execução
                setSigIn(true) // passa a ser true, há usuário

            } else { // se não há usuário -->
                setLoading(false)
                setSigIn(false) // não há usuário
            }
        })
    }
    checkLogin()
  },[])

  if(loading){
    return(
        <div></div>
    )
  }
  if(!sigIn){ // se não há usuário logado, navegue-o para home
     return <Navigate to='/'/>
    
  }
    return children
}

export default Private