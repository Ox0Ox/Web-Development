import React from 'react'
import Button from './Button'
import { memo } from 'react'
const Navbar = ({adjective, getAdjective}) => {
  return (
    <>
    <div>
    I am a {adjective} Navbar
    <button onClick={()=>{getAdjective()}}>{getAdjective()}</button>
    </div>
    <Button/>
    </>
  )
}

export default memo(Navbar)