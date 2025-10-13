// Usercard.jsx
import { Avatar, Box, Button, Card, CardContent, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'

const Usercard = ({ user }) => {
  
  const setAsInstructor = async (id) => {
    try {
      await axios.put(
        `http://localhost:8081/api/auth/changeRole/${id}`,
        "INSTRUCTOR",   // ✅ sirf string bhejna
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Successfully Set as Instructor ✅");
      window.location.reload();
    } catch (error) {
      console.error("Error changing role:", error);
      alert("Failed to set as Instructor ❌");
    }
  };

  const setAsRecruiter = async (id) => {
    try {
      await axios.put(
        `http://localhost:8081/api/auth/changeRole/${id}`,
        "RECRUITER",   // ✅ sirf string bhejna
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Successfully Set as Recruiter ✅");
      window.location.reload();
    } catch (error) {
      console.error("Error changing role:", error);
      alert("Failed to set as Recruiter ❌");
    }
  };

  const handleDelete = async(id)=>{
    try {
      await axios.delete(`http://localhost:8081/api/auth/delete/${id}`,{
          headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      });
      alert("Successfully deleted");
      window.location.reload();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "300px",
        width: "200px",
        p: 2,
      }}
    >
      <Avatar
        src={user?.profileUrl}
        alt={user?.name}
        sx={{ height: "60px", width: "60px" }}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" mt={1}>
          {user.name}
        </Typography>
        <Typography color="grey" fontSize={14}>
          {user.email}
        </Typography>

        {user.role === "STUDENT" && (
          <Box>
            <Button
              size="small"
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setAsInstructor(user.id)}
            >
              Set As Instructor
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setAsRecruiter(user.id)}
            >
              Set As Recruiter
            </Button>
          </Box>
        )}

        {(user.role === "INSTRUCTOR" || user.role === "ADMIN" || user.role === "RECRUITER") && (
          <Typography
            sx={{
              mt: 4,
              bgcolor: "green",
              color: "white",
              px: 1.5,
              py: 0.5,
              borderRadius: "6px",
              fontWeight: 500,
              display: "inline-block",
            }}
          >
            {user.role}
          </Typography>
        )}

        <Button 
          variant='outlined' 
          color='error' 
          sx={{m:"2px"}} 
          onClick={()=>handleDelete(user.id)}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default Usercard;
