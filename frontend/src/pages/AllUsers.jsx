// AllUsers.jsx
import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Usercard from '../components/Usercard'
import axios from 'axios'
import UserCardConnection from '../components/UserCardConnection'

const AllUsers = () => {
  const [users,setUsers] = useState([])
  const [students,setStudents]= useState([]);
  const userId= localStorage.getItem("userId");

  useEffect(()=>{
    const fetchUsers = async ()=>{
      const all = await axios.get("http://localhost:8081/api/auth/all",{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      setUsers(all.data);
    }
const fetchStudents = async ()=>{
      const all = await axios.get("http://localhost:8081/api/auth/students",{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      setStudents(all.data);
    }
    fetchUsers();
    fetchStudents();
  },[])
const role = localStorage.getItem("role")
  return (
    <Container>
      {role == 'ADMIN' &&
        
      <Box 
        display="flex" 
        flexWrap="wrap" 
        justifyContent="center" 
        gap={3} // cards ke beech space
        mt={5}
      ><Typography variant='h3' textAlign={"center"}>All Users</Typography>
        {users.map((user)=>(
          <Usercard user={user} key={user.id} />
        ))}
      </Box>}

{
  (role =="STUDENT" || role == "INSTRUCTOR" ) &&
  (
    <Box display="flex" 
        flexWrap="wrap" 
        justifyContent="center" 
        gap={3} 
        mt={5}>

{
  students.length===0 ? 
  <h1>No Any Students</h1>
:
students
  .filter(u => String(u.id) !== String(userId))
  .map(user => (
    <UserCardConnection user={user} key={user.id} />
))}




    </Box>
  )
}

    </Container>
  )
}

export default AllUsers
