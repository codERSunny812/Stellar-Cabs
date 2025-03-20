import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserSignUp from './pages/user.signup'
import UserLogin from './pages/user.login'
import CaptionSignUp from './pages/Caption.signup'
import CaptionLogin from './pages/caption.login'
import HomePage from './pages/HomePage'
import { UserProtectedRoute } from './utils/UserProctected'
import UserLogout from './pages/user.logout'

function App() {
  

  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/signup' element={<UserSignUp/>} />
      <Route path='/login' element={<UserLogin/>  } />
      <Route  path='/caption-signup' element={<CaptionSignUp/>}  />
      <Route path='/caption-login' element={<CaptionLogin/>} />
      <Route path='/home-page' element={
        <UserProtectedRoute>
          <HomePage />
        </UserProtectedRoute>
        } />
      <Route />
      <Route  path='/users/logout' element={
        <UserProtectedRoute>
          <UserLogout/>
        </UserProtectedRoute>
         } />

     </Routes>
    </>
  )
}

export default App
