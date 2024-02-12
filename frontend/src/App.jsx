import { Route,Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Send from './pages/Send'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Home from './components/Home'
function App() {
 

  return (
    <>
      
      
        <Routes>
          <Route path ="/" element={<Home/>} />
          <Route path="/signup" element={<Signup/>}  />
          <Route path="/signin" element={<Signin/>}  />
          <Route path="/dashboard" element={<Dashboard/>}  />
          <Route path="/send" element={<Send/>}  />
        </Routes>
        <ToastContainer></ToastContainer>
     
    </>
  )
}

export default App
