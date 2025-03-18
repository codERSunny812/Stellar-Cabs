import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserSignUp from './pages/user.signup'
import UserLogin from './pages/user.login'
import CaptionSignUp from './pages/Caption.signup'
import CaptionLogin from './pages/caption.login'

function App() {
  

  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/signup' element={<UserSignUp/>} />
      <Route path='/login' element={<UserLogin/>  } />
      <Route  path='/caption-signup' element={<CaptionSignUp/>}  />
      <Route path='/caption-login' element={<CaptionLogin/>} />
      <Route />

     </Routes>
    </>
  )
}

export default App
