import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';


//firebase
import { onAuthStateChanged } from 'firebase/auth';// mapeia se a autenticação do usuário foi feita com sucesso

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

//useContext
import { AuthContextProvider } from './context/AuthContext';

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import CreatePost from './pages/CreatePost/CreatePost';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';


function App() {

  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined
  
  useEffect(()=>{

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  },[auth])
  
  if(loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthContextProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/posts/:id' element={<Post/>}/>
            
              <Route path='/register' element={ !user ? <Register/> : <Navigate to="/"/>}/>
              <Route path='/login' element={ !user ? <Login/> : <Navigate to="/"/>}/>

              <Route path='/posts/edit/:id' element={ user ? <EditPost/> : <Navigate to="/login"/> }/>
              <Route path='/posts/create' element={ user ? <CreatePost/> : <Navigate to="/login"/> }/>
              <Route path='/dashboard' element={ user ? <Dashboard/> : <Navigate to="/login"/>} />


              <Route path='*' element={
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100'}}>
                  <h1>Not Found</h1>
                </div>}
              />

            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      </AuthContextProvider>

    </div>
  );
}

export default App;
