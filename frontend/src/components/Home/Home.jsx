import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/Footer'
import Heroes from '../Hero/Heroes'
import All_User_Profile from '../User/All_User_Profile'

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Heroes></Heroes>
      <All_User_Profile/>
      <Footer></Footer>
    </div>
  )
}
