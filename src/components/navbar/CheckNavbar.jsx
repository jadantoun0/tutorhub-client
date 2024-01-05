import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// this component is used to check the page route and based on it decide whether to show the 
// the navbar or not
const CheckNavbar = ({children}) => {

    const location = useLocation();
    const [showNavbar, setShowNavbar] = useState(false);

    // listening to every change in the location
    useEffect(() => {
        const hideRoutes = ['/signin', '/register', '/verify'];
        if (hideRoutes.includes(location.pathname)) 
           setShowNavbar(false) 
        else 
            setShowNavbar(true)
    }, [location]);


  return (
    <div>{showNavbar && children}</div>
  )
}

export default CheckNavbar