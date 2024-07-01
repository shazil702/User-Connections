
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import AddUser from './Components/AddUser';
import EditUser from './Components/EditUser';

function App() {


  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/addUser' element={<AddUser/>}/>
    <Route path='/editUser' element={<EditUser/>}/>
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
