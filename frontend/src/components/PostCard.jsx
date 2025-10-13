import { Avatar, Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PostCard = ({ post }) => {
  const navigate = useNavigate()
  const handleNavigate = async(userId)=>{
    navigate(`/profile/${userId}`)
  }
  return (
    <Card sx={{ maxWidth: 400, borderRadius: "16px", boxShadow: 3, mb: 2,}}>
      <CardContent>
       
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Button onClick={()=>handleNavigate(post.userId)}>
          <Avatar
            src={post.profile}
            sx={{ height: "30px", width: "30px" }}
          /></Button>
          <Typography variant="subtitle2" fontWeight="bold">
            {post?.userName}
          </Typography>
        </Box>

        {/* Post Image */}
        {post.image && (
          <CardMedia
            component="img"
            image={post.image}
            alt="post image"
            sx={{ borderRadius: "20px", maxHeight: "250px", objectFit: "contain" }}
          />
        )}

        {/* Caption */}
        <Typography variant="body1" mt={1}>
          {post.caption}
        </Typography>

        {/* Date */}
        <Typography color="grey" variant="caption">
          {new Date(post.createdAt).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PostCard
