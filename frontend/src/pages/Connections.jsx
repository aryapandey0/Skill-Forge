import { Avatar, Box, Button, Card, CardContent, Typography, Divider } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Connections = () => {
  const [connection, setConnection] = useState([])
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchConnections = async () => {
      const res = await axios.get(
        `http://localhost:8081/api/connection/mine/${userId}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      setConnection(res.data)
    }
    fetchConnections()
  }, [userId])

  return (
    <Box 
    position={"relative"}
left={"300px"}
    display="grid" 
      gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
      gap={3}
      p={3}
    >
      {connection.map((c) => {
        const otherUser = c.sender.id == userId ? c.receiver : c.sender

        return (
          <Card 
            key={c.id} 
            sx={{ 
              p: 2, 
              borderRadius: "20px", 
              boxShadow: 3,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
              textAlign: "center"
            }}
          >
            <Button 
              onClick={() => navigate(`/profile/${otherUser.id}`)} 
              sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <Avatar 
                src={otherUser.profileUrl || "https://via.placeholder.com/150"} 
                alt={otherUser.name} 
                sx={{ 
                  width: 100, 
                  height: 100, 
                  border: "3px solid orange",
                  mb: 2 
                }} 
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {otherUser.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {otherUser.email}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography 
                  variant="caption" 
                  sx={{ color: otherUser.role === "INSTRUCTOR" ? "green" : "blue" }}
                >
                  {otherUser.role}
                </Typography>
              </CardContent>
            </Button>
          </Card>
        )
      })}
    </Box>
  )
}

export default Connections
