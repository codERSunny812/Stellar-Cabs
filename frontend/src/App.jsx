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
import BookedRide from './components/BookedRide'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'



function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    if (!isMobile) {
      toast.error('Please open in mobile device');
    }

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  

  return (
    <>
      {isMobile ? (
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
          <Route path='/user/forgot-password' element={<ForgotPassword />} />
        </Routes>
      ) : (
        <div className='flex items-center justify-center h-screen text-center p-4'>
          <h1 className='text-2xl font-bold text-red-600'>Please open this website on a mobile device</h1>
        </div>
      )}

      <ToastContainer autoClose={4000} hideProgressBar={true} transition={Flip} />
    </>
  );
}

export default App
