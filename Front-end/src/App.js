
import './App.css';
import Nav from './components/Navabar/Navbar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Addproduct from './components/Add_student/Add_student';
import ProductList from './components/StudentList/StudentList';
import Update_product from './components/Update_student/Update_student';
import Profile from './components/Profile/profile';
import PrivateComponent from './components/PrivateComponent';
import {BrowserRouter, Route, Routes} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
    
     <Nav/>
     <Routes>

      <Route element={<PrivateComponent/>}>
      <Route path='/' element={<ProductList/>}/>
      <Route path='/add' element={<Addproduct/>}/>
      <Route path='/update/:id' element={<Update_product/>}/>
      <Route path='/logout' element={<h1>Logout</h1>}/>
      <Route path='/profile' element={<Profile/>}/>
      </Route>
      
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
