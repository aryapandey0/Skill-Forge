import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import AllUsers from './pages/AllUsers'
import AllCourses from './pages/AllCourses'
import InstructorCourses from './pages/InstructorCourses'
import AddCourse from './pages/AddCourse'
import Requests from './pages/Requests'
import Connections from './pages/Connections'
import StudentCourses from './pages/StudentCourses'
import Feed from './pages/Feed'
import AddPost from './pages/AddPost'
import AllJobs from './pages/AllJobs'
import JobApplicationPage from './pages/JobApplicationPage'
import ReruiterJobs from './pages/ReruiterJobs'
import JobForm from './pages/AddJob'
import AllApplications from './pages/AllApplications'


function App() {
const token = localStorage.getItem("token")

  return (
    <>

   <BrowserRouter>
   <Navbar />
  {token &&  <SideBar />  }
   <Routes>
    <Route path='/' element={<LoginPage />} />
     <Route path='/register' element={<RegisterPage />} />
     <Route path='/profile/:userId' element={<Profile />} />
     <Route path='/sidebar' element={<SideBar />} />
     <Route path='/all-users' element={<AllUsers />}/>  
     
      <Route path='/all-courses' element={<AllCourses />}/>
         <Route path='/add-course' element={<AddCourse />}/>
      <Route path='/instructor-course' element={<InstructorCourses />}/>
      <Route path='requests' element={<Requests />} />
          <Route path='connections' element={<Connections />} />
           <Route path='/student-courses' element={<StudentCourses />} />
<Route path='/feed' element={<Feed />} />
<Route path='/add-post' element={<AddPost />}/>
<Route path='/all-jobs' element={<AllJobs />}/>
<Route path='/apply-job/:id' element={<JobApplicationPage />}/>
<Route path='/my-jobs' element={<ReruiterJobs />}/>
<Route path='/add-job' element={<JobForm />}/>
<Route path='/job-applications/:id' element={<AllApplications />}/>
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
