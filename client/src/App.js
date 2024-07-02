// import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Create from './Component/Create/Create.js';
import Getall from './Component/Alluser/Alluser.js';
import Update from './Component/Updateuser/Updateuser.js';
import Signup from './Component/Signup/Signup.js';
import Login from './Component/Login/Login.js';
import Forgotpass from './Component/Forgot/Forgoot.js';
import Resetpass from './Component/Reset/Resetpassword.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/create' element={<Create />} />
          <Route path='/' element={<Getall />} />
          <Route path='/edit/:id' element={<Update />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot' element={<Forgotpass />} />
          <Route path='/resetpassword/:token' element={<Resetpass />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
