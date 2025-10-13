import { Avatar, Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Requests = () => {
  const userId = Number(localStorage.getItem("userId"));
  const [requests, setRequests] = useState([]);



const handleAccept =async(connectionId)=>{
const accepted = await axios.post(`http://localhost:8081/api/connection/accept/${connectionId}`,{},{
  headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`
  }
})
setRequests((prev) => prev.filter((r) => r.id !== connectionId));
}
const handleReject = async (connectionId) => {
  try {
    await axios.delete(
      `http://localhost:8081/api/connection/reject/${connectionId}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setRequests((prev) => prev.filter((r) => r.id !== connectionId));
  } catch (err) {
    console.error("Error rejecting request:", err);
  }
};



  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/api/connection/requests/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchRequests();
  }, [userId]);

  return (
    <Box sx={{ p: 2 }}>
      {requests.length === 0 ? (
        <Typography variant="h4" color="gray" position={"absolute"} left={500} >
          No pending requests......
        </Typography>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {requests.map((r) => (
            <li key={r.id}>
              <Box
                sx={{
                    position:"relative",
                    left:"200px",
                    
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  backgroundColor: "beige",
                  borderRadius: "8px",
                  p: 1.5,
                  mb: 1,
                  width:"400px"
                }}
              >
                <Avatar
                  src={r.sender?.profileUrl}
                  sx={{ height: 40, width: 40 }}
                />
                <Typography variant="body1" color="black">
                  {r.sender?.name}
                </Typography>
                <Button variant="contained" color="success" onClick={()=>handleAccept(r.id)}>Accept</Button>
                 <Button variant="outlined" color="error" onClick={()=>handleReject(r.id)}>Reject</Button>
              </Box>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default Requests;
