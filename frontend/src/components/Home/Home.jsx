import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/Footer'
import Heroes from '../Heroes/Heroes'
import All_User_Courses from '../All_Courses/All_User_Courses'

export default function Home() {
  return (
    <div >
      <Navbar></Navbar>
      <Heroes></Heroes>
      <All_User_Courses/>
      <Footer></Footer>
    </div>
  )
}
