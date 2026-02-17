import React from 'react'
import CreateCourse from './Create_Courses_form'
import Navbar from '../../Navbar/Navbar'
import Footer from '../../footer/Footer'

export default function Page_Create_Courses() {
  return (
    <div>
      <Navbar></Navbar>
      <CreateCourse></CreateCourse>
      <Footer></Footer>
    </div>
  )
}
