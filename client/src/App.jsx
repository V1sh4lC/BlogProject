import './output.css';
import Login from './Register-Login/Login';
import Signup from './Register-Login/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Home/Layout'
import Homepage from './Home/Homepage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />}/>
          <Route path="login" element={<Login />}/>
          <Route path="signup" element={<Signup />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;