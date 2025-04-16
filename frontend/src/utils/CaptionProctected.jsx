import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptionProctected = ({children}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isCaptioner = role === "caption";

  useEffect(() => {
    if (!token || !isCaptioner) {
      navigate('/caption-login');
    }
  }, [token, navigate]);

  if(!token && !isCaptioner) {  
    return null;
  }
  return <>{children}</>
}

export default CaptionProctected