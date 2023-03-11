import {Routes, Route} from 'react-router-dom'

import Home from '../pages/Home'
import Register from '../pages/Register'
import Admin from '../pages/Admin'

import Private from '../pages/Admin/Private'

function Routesapp () {
   return(
    <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/register' element={ <Register/> } />
        <Route path='/admin' element={ <Private> <Admin/> </Private> } />
    </Routes>
   )
}
export default Routesapp