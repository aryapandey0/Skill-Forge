import { Badge, Box, Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);

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

    if (token && role === "STUDENT") {
      fetchRequests();
    }
  }, [userId, token, role]);

  return (
    <Box
      width="200px"
      height="90vh"
      bgcolor="beige"
      display="flex"
      flexDirection="column"
      pt={6}
      position="absolute"
      left={0}
      gap={2}
      borderRadius="20px"
    >
      {/* ✅ STUDENT SIDEBAR */}
      {token && role === "STUDENT" && (
        <Box>
          <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={() => navigate("/feed")}
          >
            Feed
          </Button>

          <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={() => navigate(`/profile/${userId}`)}
          >
            Profile
          </Button>

          <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={() => navigate("/all-users")}
          >
            All Users
          </Button>



          <Badge badgeContent={requests.length} color="error" overlap="circular">
            <Button
              fullWidth
              sx={{
                justifyContent: "flex-start",
                mb: "10px",
                "&:hover": {
                  border: "2px solid black",
                  bgcolor: "azure",
                },
              }}
              onClick={() => navigate("/requests")}
            >
              Requests
            </Button>
          </Badge>

          <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={() => navigate("/connections")}
          >
            Connections
          </Button>

            
          <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={() => navigate("/all-courses")}
          >
            All Courses
          </Button>

          <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={()=>navigate("student-courses")}

          >
            My Courses
          </Button>
           <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={() => navigate("/all-jobs")}
          >
            All Jobs
          </Button>
        </Box>
      )}

      {/* ✅ ADMIN SIDEBAR */}
      {token && role === "ADMIN" && (
        <Box>
          <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={() => navigate("/all-users")}
          >
            All Users
          </Button>
          <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={() => navigate("/all-courses")}
          >
            All Courses
          </Button>
        </Box>
      )}

      {/* ✅ INSTRUCTOR SIDEBAR */}
      {token && role === "INSTRUCTOR" && (
        <Box>
          <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={() => navigate("/feed")}
          >
            Feed
          </Button>
          <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={() => navigate("/all-courses")}
          >
            All Courses
          </Button>

          <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={() => navigate("/all-users")}
          >
            All Users
          </Button>

          <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={() => navigate("/instructor-course")}
          >
            My Courses
          </Button>

          <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={() => navigate("/add-course")}
          >
            Add Course
          </Button>
        </Box>
      )}
      {
        role == "RECRUITER" &&
        <Box>
          <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={() => navigate("/add-job")}
          >
            Add Job
          </Button>
          <Button
            fullWidth
            sx={{
              justifyContent: "flex-start",
              mb: "10px",
              "&:hover": {
                border: "2px solid black",
                bgcolor: "azure",
              },
            }}
            onClick={() => navigate("/my-jobs")}
          >
            My Jobs
          </Button>

          


          </Box>
      }
    </Box>
  );
};

export default SideBar;
