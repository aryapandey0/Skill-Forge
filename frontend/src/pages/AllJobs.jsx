import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import JobCard from '../components/JobCard'
import axios from 'axios'

const AllJobs = () => {
    const [jobs,setJobs] = useState([])
    const [applied,setApplied] = useState(false)
    const userId = localStorage.getItem("userId")
    useEffect(()=>{
        const fetchJobs = async()=>{
const res = await axios.get("http://localhost:8081/api/jobs/all",{
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
    
})
setJobs(res.data)
        }
        fetchJobs()

    },[])
  return (
    <Box display={"flex"} justifyContent={"center"} >
        <Box>
{jobs.map((j)=>(
    <JobCard job={j} key={j.id}/>
))}
        </Box>
    </Box>
  )
}

export default AllJobs
