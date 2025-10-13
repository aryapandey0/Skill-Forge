import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import JobCard from '../components/JobCard'

const ReruiterJobs = () => {
    const [jobs,setJobs] = useState([])
    const userId = localStorage.getItem("userId")
    useEffect(()=>{
        const fetchJobs = async() =>{
const res = await axios.get(`http://localhost:8081/api/jobs/recruiter/${userId}`,{
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
    
})
setJobs(res.data)
        }
        fetchJobs()
    },[])
  return (
    <Box display={"grid"} justifyContent={"center"} >
        <Typography textAlign={"center"} variant='h4' mt={2}> Your Jobs </Typography>
{jobs.map((j)=>(
<JobCard job={j} key={j.id} />
))}
    </Box>
  )
}

export default ReruiterJobs
