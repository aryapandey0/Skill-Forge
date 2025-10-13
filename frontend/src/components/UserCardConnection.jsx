import { Avatar, Box, Button, Card, CardContent, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserCardConnection = ({ user }) => {
  const [status, setStatus] = useState("NOT_CONNECTED")
  const navigate = useNavigate();
  const senderId = localStorage.getItem("userId");

  // ✅ check status when component mounts
  useEffect(() => {
    if (user?.id) {
      checkStatus(user.id);
    }
  }, [user]);

  const checkStatus = async (receiverId) => {
    const res = await axios.get(
      `http://localhost:8081/api/connection/status/${senderId}/${receiverId}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setStatus(res.data);
  };

  const handleClick = (id) => {
    navigate(`/profile/${id}`)
  }

  const handleConnect = async (receiverId) => {
    await axios.post(
      `http://localhost:8081/api/connection/${senderId}/${receiverId}`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setStatus("REQUESTED_BY_ME"); // ✅ update immediately
  }

  const handleAccept = async (connectionId) => {
    await axios.post(
      `http://localhost:8081/api/connection/accept/${connectionId}`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setStatus("CONNECTED"); // ✅ update immediately
  }

  return (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={3} minWidth={"300px"} minHeight={"300px"}>
      <Card sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "300px",
        width: "300px",
        p: 2,
        backgroundColor: '#1f2a38',
        borderRadius: "30px",
        justifyContent: "space-around",
      }}>
        <Button onClick={() => handleClick(user.id)}>
          <Avatar
            src={user?.profileUrl}
            alt={user?.name}
            sx={{ height: "120px", width: "120px", justifySelf: "center" }}
          />
        </Button>
        <CardContent sx={{ textAlign: "center", gap: "3px" }}>
          <Typography variant="h6" mt={1} color='white' >
            {user.name}
          </Typography>
          <Typography color="grey" fontSize={14}>
            {user.email}
          </Typography>

          {/* ✅ UI based on status */}
          {status === "NOT_CONNECTED" && (
            <Button variant='contained' color='primary' sx={{ m: "8px" }} onClick={() => handleConnect(user.id)}>
              Connect
            </Button>
          )}

          {status === "REQUESTED_BY_ME" && (
            <Typography variant='h6' color='warning.main'>Requested</Typography>
          )}

          {status === "REQUESTED_TO_ME" && (
            <Button variant='contained' color='success' sx={{ m: "8px" }} onClick={() => handleAccept(user.id)}>
              Accept
            </Button>
          )}

          {status === "CONNECTED" && (
            <Typography variant='h5' color='success.main'>Connected</Typography>
          )}

        </CardContent>
      </Card>
    </Box>
  )
}

export default UserCardConnection
