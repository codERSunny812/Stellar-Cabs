import { Routes, Route } from 'react-router-dom'
import { Flip, ToastContainer } from 'react-toastify'
import Base from './components/Base'
import UserSignUp from './Pages/UserSignUp'
import UserLogin from './Pages/UserLogin'
import CaptionSignUp from './Pages/CaptionSignUp'
import CaptionLogin from './Pages/CaptionLogin'
import Home from './components/Home'
import { UserProtectedRoute } from './utils/UserProtected'
import UserLogout from './Pages/UserLogOut'
import ForgotPassword from './components/ForgotPassword'
import CaptionHomePage from './Pages/CaptionHomePage'
import CaptionProctected from './utils/CaptionProctected'
import BookedRide from './components/BookedRide'
import CaptionAccount from './Pages/CaptionAccount'
import UserAccount from './Pages/UserAccount'

function App() {
  return (
    // app-shell: phone par poori screen, laptop par beech mein phone jaisa frame (index.css)
    <div className="app-shell">
      <Routes>
        <Route path='/' element={<Base />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/caption-signup' element={<CaptionSignUp />} />
        <Route path='/caption-login' element={<CaptionLogin />} />
        <Route path='/booked-ride' element={<BookedRide />} />
        <Route
          path='/home-page'
          element={
            <UserProtectedRoute>
              <Home />
            </UserProtectedRoute>
          }
        />
        <Route
          path='/user/account'
          element={
            <UserProtectedRoute>
              <UserAccount />
            </UserProtectedRoute>
          }
        />
        <Route
          path='/users/logout'
          element={
            <UserProtectedRoute>
              <UserLogout />
            </UserProtectedRoute>
          }
        />
        <Route
          path='/caption/home-page'
          element={
            <CaptionProctected>
              <CaptionHomePage />
            </CaptionProctected>
          }
        />
        <Route
          path='/caption/account'
          element={
            <CaptionProctected>
              <CaptionAccount />
            </CaptionProctected>
          }
        />
        <Route path='/user/forgot-password' element={<ForgotPassword />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeButton={false}
        transition={Flip}
        toastClassName="!rounded-xl !font-sans !text-sm"
      />
    </div>
  );
}

export default App