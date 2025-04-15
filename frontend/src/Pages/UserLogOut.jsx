import axios from "axios";
import { useNavigate } from "react-router-dom";


const UserLogout = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        console.log("user logged out successfully", response.data)
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login')
    }).catch((error) => {
        console.log("error", error)
    })
    return (
        <>
            <h1>user logout</h1>
        </>

    )
}


export default UserLogout;