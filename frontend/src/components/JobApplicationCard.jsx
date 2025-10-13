import { Card, CardContent, Typography, Button } from '@mui/material'
import React from 'react'

const JobApplicationCard = ({ app }) => {
  const openResume = () => {
    if (app.resume) {
      window.open(app.resume, "_blank"); // ✅ Cloudinary URL new tab me khulega
    } else {
      alert("Resume not available");
    }
  };

  return (
    <Card sx = {{ m: 2, borderRadius: "16px" }}>
      <CardContent>
        <Typography variant='h5'>{app.applicantName}</Typography>
        <Typography variant='body1' color='grey'>{app.applicantEmail}</Typography>
        
        <Typography variant='subtitle1' sx={{ mt: 1 }}>Cover Letter:</Typography>
        <Typography>{app.coverLetter}</Typography>
        
        <Typography sx={{ mt: 1 }}>Status: {app.status}</Typography>
        <Typography>Applied on: {new Date(app.createdAt).toLocaleString()}</Typography>

        <Button 
          variant='contained' 
          sx={{ mt: 2 }}
          onClick={openResume}
        >
          View Resume
        </Button>
      </CardContent>  
    </Card>
  )
}

export default JobApplicationCard
