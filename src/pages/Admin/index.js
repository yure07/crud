import './admin.css'
import {useState, useEffect} from 'react'
import {signOut,} from 'firebase/auth'
import {auth ,db} from '../../firebaseConnection'
import {addDoc, collection, query, where, onSnapshot, orderBy, doc, deleteDoc, updateDoc} from 'firebase/firestore'
import { async } from '@firebase/util'

export default function Admin() {
    const [task, setTask] = useState('')
    const [user, setUser] = useState({})
    const [editTarefa, setEditTarefa] = useState({})
    const [tarefasOn, setTarefasOn] = useState([])
    
    useEffect(()=>{
      async function loadTasks(){
        const userDetails = localStorage.getItem("@detailsUser")
        setUser(JSON.parse(userDetails))

        if(userDetails) {
          const data = JSON.parse(userDetails)

          const taskRef = collection(db, 'tasks')
       /*           buscar /aqui / por ordem decrescente de data / onde dado de 'usuário' seja igual ao uid do logado atual  */
          const q = query(taskRef, orderBy('data', 'desc'), where('usuário', '==', data?.uid))
          const snap = onSnapshot(q, (snapshot) => {
            let list = []

            snapshot.forEach((doc)=>{
              list.push({
                userUid: doc.data().usuário,
                tasks: doc.data().tarefa,
                id: doc.id
              })
            })
            setTarefasOn(list)
          })
        }

      }
      loadTasks()
    },[])
    
    async function handleRegistrer(e) {
     e.preventDefault()

     if(task === ''){
      alert('DIGITE UMA TAREFA')
      return;
     }

     if(editTarefa?.id){
      handleUpdate()
      return;
     }

     await addDoc(collection(db,'tasks'),{
      tarefa: task,
      data: new Date(),
      usuário: user?.uid
     })
     .then(()=>{
      console.log('TAREFA ADICIONADA')
      setTask('')
     })
     .catch((error)=>{
      console.log('ERRO AO ADICIONAR TAREFA' + error)
     })
    }
    
    async function handleLogOut() {
     await signOut(auth)
    }

    async function deleteTask(id) {
      const docRef = doc(db, 'tasks', id)
      deleteDoc(docRef)
    }

    function editTask(item) {
      setEditTarefa(item)
      setTask(item.tasks)
    }

    async function handleUpdate(){
      const docRef = doc(db, 'tasks', editTarefa?.id )
     await updateDoc(docRef, {
        tarefa: task
      })
      .then(()=>{
        console.log("TAREFA ATUALIZADA")
        setTask('')
        setEditTarefa({})
      })
      .catch((error)=>{
        console.log(error + "NÃO FOI POSSÍVEL ATUALIZAR")
      })
    }

    async function timeTask(id) {
      const docRef = doc(db, 'tasks', editTarefa?.id )
      deleteDoc(docRef)
    }

        return(
        <div className='admin-container'>
            <h1>Minhas Tarefas</h1>

          <form onSubmit={handleRegistrer} className='form'>
            <textarea placeholder='Digite sua Tarefa'
            value={task}
            onChange={(e)=> setTask(e.target.value)} 
            />
          
          {Object.keys(editTarefa).length > 0 ?(
            <button type='submit' className='btn-register'>Atualizar Tarefa</button>
          ) : (
            <button type='submit' className='btn-register'>Registrar Tarefa</button>
          )} 
          
          </form> 

          {tarefasOn.map( (item) =>(
          <article key={item.id} className='list'>
            <p>{item.tasks}</p>
            <div>
                <button onClick={()=> editTask(item) } className='btn-edit'>Editar</button>
                <button onClick={()=> deleteTask(item.id) } className='btn-checked'>Concluir</button>
            </div>
          </article>
          ))}
          <button className='btn-logout' onClick={handleLogOut}>Sair</button>
        </div>
    )
}
