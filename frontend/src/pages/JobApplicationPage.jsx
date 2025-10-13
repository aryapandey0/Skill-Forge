import { Box, Button, Card, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const JobApplicationPage = () => {
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);

  const { id: jobId } = useParams(); // recruiterId from URL
  const applicantId = localStorage.getItem("userId");
const [loading,setLoading] = useState(false)
  const applyJob = async () => {
      setLoading(true); 
    try {
      // FormData banani hai
      const formData = new FormData();

      // DTO ko JSON → Blob banake bhejna hoga
      const dto = {
        applicantId: applicantId,
       
        coverLetter: coverLetter
      };

      formData.append(
        "application",
        new Blob([JSON.stringify(dto)], { type: "application/json" })
      );

      if (resume) {
        formData.append("resume", resume);
      }

      const res = await axios.post(`http://localhost:8081/api/application/apply/${jobId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
          
        },
      });

      console.log("Applied Successfully:", res.data);
      alert("Application submitted!");
    } catch (error) {
      console.error("Error while applying:", error);
      alert("Failed to apply job!");
    }finally {
    setLoading(false);  // stop spinner
  }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Typography gutterBottom textAlign="center" variant="h4">
            Job Application Page
          </Typography>

          {/* Resume Upload */}
          <Button variant="contained" component="label">
            Upload Resume
            <input
              type="file"
              hidden
              onChange={(e) => setResume(e.target.files[0])}

            />
          </Button>

          {/* Cover Letter */}
          <TextField
            placeholder="Write your cover letter"
            multiline
            rows={4}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />

          <Button variant="contained" color="primary" onClick={applyJob} >
           {loading ? <CircularProgress /> : "Submit"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobApplicationPage;
