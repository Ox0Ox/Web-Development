import React from 'react'

const Navbar = (props) => {
  return (
    <div>
      <div className="logo">{props.logotext}</div>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact Us</li>
        </ul>
    </div>
  )
}

export default Navbar