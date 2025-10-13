import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const [applied, setApplied] = useState(false); // ✅ boolean rakha

  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const handleApply = () => {
    navigate(`/apply-job/${job.id}`);
  };

  const seeApplications = async()=>{
    navigate(`/job-applications/${job.id}`)
  }


  useEffect(() => {
    const fetchAppliedStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/api/application/check/${userId}/${job.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setApplied(res.data); // ✅ true/false
      } catch (err) {
        console.error("Error checking applied status:", err);
      }
    };

    fetchAppliedStatus();
  }, [userId, job.id]); // ✅ dependency array

  return (
    <Card sx={{ borderRadius: "30px", m: "20px", bgcolor: "#1f2a38" }}>
      <CardContent sx={{ gap: "20px" }}>
        {
          console.log(job)
        }
        <Typography variant="h5" color="white">{job.title}</Typography>
        <Divider sx={{ m: "2px" }} />
        <Typography variant="body1" color="white">{job.description}</Typography>
        <Typography color="white">🏳️ {job.location}</Typography>
        <Typography variant="h6" color="white">{job.company}</Typography>

        {role === "STUDENT" && !applied && (
          <Button variant="contained" onClick={handleApply}>
            Apply
          </Button>
        )}

        {role === "STUDENT" && applied && (
          <Typography color="success.main">Applied</Typography>
        )}
        {role === "RECRUITER" && job.recruiterId === Number(userId) && (
  <Button
    variant="contained"
    sx={{ mt: "3px" }}
    onClick={() => seeApplications()}
  >
    See Applications
  </Button>
)}

      </CardContent>
    </Card>
  );
};

export default JobCard;
