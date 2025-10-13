import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    category: "Programming",
  })

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value })
  }
  const userId = localStorage.getItem("userId")
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const add = await axios.post("http://localhost:8081/api/courses/create",course,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(()=>alert("Course Added Successfully "))
    .then(()=>navigate("/instructor-course"))

  }

  return (
    <Box
      height={"90vh"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
     
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          padding: "30px",
          border: "4px solid grey",
          height: "400px",
          width: "400px",
           borderRadius:"40px"
           
        }}
      >
        <Typography variant="h5">Course</Typography>

        <TextField
          value={course.title}
          onChange={handleChange}
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
        />

        <TextField
          value={course.description}
          name="description"
          onChange={handleChange}
          label="Description"
          variant="outlined"
          fullWidth
        />

        <TextField
          value={course.price}
          name="price"
          onChange={handleChange}
          label="Price"
          variant="outlined"
          fullWidth
        />

        <Select
          fullWidth
          name="category"
          value={course.category}
          onChange={handleChange}
        >
          <MenuItem value="Programming">Programming</MenuItem>
          <MenuItem value="Academics">Academics</MenuItem>
          <MenuItem value="AI-ML">AI-ML</MenuItem>
        </Select>

        <Button type="submit" variant="contained">
          Add Course
        </Button>
      </form>
    </Box>
  )
}

export default AddCourse
