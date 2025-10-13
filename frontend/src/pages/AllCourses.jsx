import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'

const AllCourses = () => {
  const [courses,setCourses] = useState([])

  useEffect(()=>{
    const fetchCourses = async()=>{
const all = await axios.get("http://localhost:8081/api/courses",{
  headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`
  }
})
setCourses(all.data);
    }
    fetchCourses()
  },[])
  return (
   <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} gap={3} m={2}>

{courses.map((c,id)=>(
  <CourseCard course={c} key={id}/>
))}

   </Box>
  )
}

export default AllCourses
