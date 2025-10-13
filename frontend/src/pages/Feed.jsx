import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'

const Feed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:8081/api/posts/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setPosts(res.data)
    }
    fetchPosts();
  }, [])

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      gap={2} 
      width="60%" 
      margin="auto"
      bgcolor={"beige"}
      borderRadius={"30px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
        <Typography variant='h4'>~ Feed ~</Typography>
      {posts.map((p, id) => (
        <PostCard key={id} post={p} />
      ))}
    </Box>
  )
}

export default Feed
