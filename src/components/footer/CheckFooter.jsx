import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const CheckFooter = ({children}) => {
    const location = useLocation();
    const [showFooter, setShowFooter] = useState(false);

    // listening to every change in the location
    useEffect(() => {
        const hideRoutes = ['/signin', '/register', '/verify'];
        if (hideRoutes.includes(location.pathname)) 
           setShowFooter(false) 
        else 
            setShowFooter(true)
    }, [location]);


  return (
    <div>{showFooter && children}</div>
  )

}

export default CheckFooter