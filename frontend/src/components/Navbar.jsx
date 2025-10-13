import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClickAwayListener } from '@mui/material';

const Navbar = () => {

    const [user,setUser] = useState();
    const token = localStorage.getItem("token")
const userId = localStorage.getItem("userId");
const [searching,setSearching]=useState(false);
const [searchResults,setSearchResults] = useState([])

const [keyword,setKeyword] = useState("")
    useEffect(()=>{
    const fetchUser=async()=>{
      if (!userId) return;
        const getUser =await axios.get(`http://localhost:8081/api/auth/${userId}`)
        setUser( getUser.data)
    }
    fetchUser();
},[token])
const navigate = useNavigate()
const handleLogout = ()=>{
  localStorage.removeItem("token")
  localStorage.clear();
  navigate("/")
}
useEffect(()=>{
  const fetchSearchResults=async()=>{
    if(keyword.trim() === "")setSearchResults([])
const results = await axios.get(`http://localhost:8081/api/courses/search?title=${keyword}`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
})
setSearchResults(results.data)
  }

const timeoutId = setTimeout(fetchSearchResults, 500);

    return () => clearTimeout(timeoutId);

},[keyword])


  return (
    <AppBar position="static" sx={{ backgroundColor: '#1f2a38' }}> 
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
        
     
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          SkillForge
        </Typography>

        {token &&
        <ClickAwayListener onClickAway={() => setSearching(false)}>
        <Box>
          <TextField type='search' value={keyword} placeholder='search...' onChange={(e)=>setKeyword(e.target.value)}  sx={{borderRadius:"50px",width:"500px", bgcolor:"white" ,'&:hover':{bgcolor:"beige"}}} onClick={()=>setSearching(true)}/>

            {searching && 
            <Box position={"absolute"} top={"60px"} height={"auto"} width={"500px"} display={"flex"} flexDirection={"column"} bgcolor={"white"} borderRadius={3} sx={{zIndex:1000}}>
{searchResults.map((s)=>(
  <li key={s.id} style={{display:"flex", flexDirection:"column", margin:"20px"}}><Typography variant='body1' color='black'>{s.title}</Typography>
  <Typography variant='body2' color='black'>{s.instructor?.name}</Typography>
  <Typography color='blue'>{s.price}</Typography>
  </li>
))}
            </Box>
            }
        </Box></ClickAwayListener> 
        }
        

        {token && 
        <Box display="flex" alignItems="center" gap={1}>
        <Button onClick={()=>navigate("/add-post")} sx={{ color:"white", borderRadius:"50%", fontSize:"30px"}}>+</Button>
          <Typography variant="body1">{user?.name }</Typography>
          <Button onClick={()=>navigate(`/profile/${userId}`)}>
          <Avatar 
            src={user?.profileUrl || "https://via.placeholder.com/40"} 
            alt={user?.name || "User"} 
            sx={{ width: 40, height: 40, border: '2px solid orange' }}
            
          /></Button>
          <Button onClick={handleLogout}>Logout</Button>
        </Box>}

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
