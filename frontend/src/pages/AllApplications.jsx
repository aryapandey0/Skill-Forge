import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import JobApplicationCard from '../components/JobApplicationCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const AllApplications = () => {
    const [apps,setApps] = useState([])
    const jobId = useParams().id;
    useEffect(()=>{
        const fetchApplications = async()=>{
const res = await axios.get(`http://localhost:8081/api/application/job-applications/${jobId}`,{
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
})
setApps(res.data)
        }
        fetchApplications()
    },[])
  return (
    <Box display={"grid"} justifyContent={"center"}>
        {
            apps.map((app)=>(
                <JobApplicationCard app={app} key={app.id} />
            ))
        }
    </Box>
  )
}

export default AllApplications
