import './output.css';
import Login from './Register-Login/Login';
import Signup from './Register-Login/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Home/Layout'
import Homepage from './Home/Homepage'
import { UserContextProvider } from './UserContext'
import CreatePost from './Post/CreatePost';
import Article from './Post/PostPage';
import EditPost from './Post/EditPost';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Homepage />}/>
            <Route path="login" element={<Login />}/>
            <Route path="signup" element={<Signup />}/>
            <Route path="post" element={<CreatePost />}/>
            <Route path="article/:id" element={<Article />} />
            <Route path="edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;