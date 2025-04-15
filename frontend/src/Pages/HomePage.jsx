import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'




const HomePage = () => {

    const data = useContext(UserContext);

    console.log("the global data is:", data)
    return (
        <>
            <h1>hello from the home page</h1>
        </>
    )
}

export default HomePage