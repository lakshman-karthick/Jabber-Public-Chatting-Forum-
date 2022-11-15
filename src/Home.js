import React from 'react'
import Logo from './Components/logo'
import './Home.css'
import Front from './Front'
function Home() {
  return (
    <div className='home'>
      <Front/>
      <Logo/>
    </div>
  )
}

export default Home
