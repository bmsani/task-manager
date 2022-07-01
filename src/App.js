import './App.css';
import Header from './Components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import AddItem from './Components/AddItem/AddItem';
import RequireAuth from './Components/RequireAuth/RequireAuth';
import ToDo from './Components/ToDo/ToDo';
import Completed from './Components/Completed/Completed';
import Calender from './Components/Calender/Calender';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <div className='h-[93vh]'>
        <Header></Header>
        <Routes>
          <Route path='/' element={<RequireAuth><Home></Home></RequireAuth>}></Route>
          <Route path='/additem' element={<RequireAuth><AddItem></AddItem></RequireAuth>}></Route>
          <Route path='/todo' element={<RequireAuth> <ToDo></ToDo> </RequireAuth>}></Route>
          <Route path='/completed' element={<RequireAuth> <Completed></Completed> </RequireAuth>}></Route>
          <Route path='/calender' element={<RequireAuth> <Calender></Calender> </RequireAuth>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
      </div>
        <Footer></Footer>
    </div>
  );
}

export default App;
