import { Box, Typography, useScrollTrigger } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard';
import axios from 'axios';

const InstructorCourses = () => {
    const userId = localStorage.getItem("userId");
    const [user,setUser]=useState();
    const [courses,setCourses]=useState([])

    useEffect(() => {
    const fetchUser = async () => {
      const getUser = await axios.get(`http://localhost:8081/api/auth/${userId}`);
      setUser(getUser.data);
    };
    fetchUser();

    const fetchCourses =async()=>{
        const result =await axios.get(`http://localhost:8081/api/courses/instructor/${userId}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        setCourses(result.data)
    }

fetchCourses();

  }, [userId]);

  return (
   <Box height={"100%"} width={"100%"}  justifyContent={"center"} flexDirection={"column"}>
<Typography variant='h4' textAlign={'center'} m={5}>Courses By {user?.name}</Typography>
<Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} height={"100%"} width={"100%"} flexDirection={""} gap={3}>
    
    <Box></Box>



{courses.length===0 ? (<Typography variant='h4' color=''>No Courses By You 😓😓😓</Typography>):
courses.map((c)=>(
    <CourseCard course={c} key={c.id}/>
))}
</Box>


   </Box>
  )
}

export default InstructorCourses
