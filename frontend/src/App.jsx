import {Routes , Route} from 'react-router-dom'
import Base from './components/Base'
import UserSignUp from './Pages/UserSignUp'
import UserLogin from './Pages/UserLogin'
import {Flip,ToastContainer } from 'react-toastify'
import CaptionSignUp from './Pages/CaptionSignUp'
import CaptionLogin from './Pages/CaptionLogin'
import Home from './components/Home'
import { UserProtectedRoute } from './utils/UserProtected'
import UserLogout from './Pages/UserLogOut'
import ForgotPassword from './components/ForgotPassword'
import CaptionHomePage from './Pages/CaptionHomePage'
import CaptionProctected from './utils/CaptionProctected'



function App() {

  return (
    <>
    <Routes>
        <Route path='/' element={<Base />}/>
        <Route path='/signup' element={ <UserSignUp/>}/>
        <Route path='/login' element={ <UserLogin/>   } />
        <Route path='/caption-signup' element={<CaptionSignUp />} />
        <Route path='/caption-login' element={<CaptionLogin/>} />
        <Route path='/home-page' element={
          <UserProtectedRoute>
            <Home />
          </UserProtectedRoute>
        } />
        <Route />
        <Route path='/users/logout' element={
          <UserProtectedRoute>
            <UserLogout />
          </UserProtectedRoute>
        } />
        <Route path='/caption/home-page' element={
          <CaptionProctected>
            <CaptionHomePage/>
          </CaptionProctected>
          } />
        <Route path='/user/forgot-password' element={<ForgotPassword/>} />
    </Routes>
    <ToastContainer
        autoClose={4000}
        hideProgressBar={true}
        transition={Flip}
    />
    
    
    </>
  )
}

export default App
