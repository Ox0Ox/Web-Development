import React, { useEffect } from 'react'

const Navbar = ({color}) => {
    useEffect(() => {
        alert("Color was changed")
    }, [color])
  return (
    <div>
        I am Navbar of {color}
    </div>
  )
}

export default Navbar