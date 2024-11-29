import React, { useEffect } from 'react'
import './css/Login.css'
const Header2 = ({login}) => {

  return (
    <div className='header'>
    <h1>{login} Login</h1>
    </div>
  )
}

export default Header2