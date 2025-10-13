import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CourseCard = ({ course }) => {
  const [settingThumbnail, setSettingThumbnail] = useState(false)
  const [thumbnail, setThumbnail] = useState(null)
  const role = localStorage.getItem("role")
  const userId = localStorage.getItem("userId")
  const [isEnrolled,setIsEnrolled] = useState(false)

  useEffect(()=>{
    const fetchEnrollments=async()=>{
const res =await axios.get(`http://localhost:8081/enrollment/check/${userId}/${course.id}`,{
  headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`
  }
})
setIsEnrolled(res.data)
    }
    fetchEnrollments()
  },[])

  // File change handler
  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0])
  }

  // Thumbnail update
  const changeThumbnail = async (id) => {
    try {
      if (!thumbnail) {
        alert("Please select a file first ❌")
        return
      }

      const formData = new FormData()
      formData.append("thumbnail", thumbnail)

      await axios.post(
        `http://localhost:8081/api/courses/upload-thumbnail/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      alert("Thumbnail changed successfully ✅")
      setSettingThumbnail(false)
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Unknown error occurred"
      alert(`Error uploading thumbnail ❌\n${errorMsg}`)
      console.error("Thumbnail upload error:", err)
    }
  }

  // Enroll + Razorpay
  const handleEnroll = async (courseId) => {
    try {
      // 1. Order create
      const { data } = await axios.get(
  `http://localhost:8081/create-order?amount=${course.price}`,
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
)

      const order = typeof data === "string" ? JSON.parse(data) : data

      // 2. Razorpay checkout config
      const options = {
        key: "rzp_test_R8o5ZlgND8jf8k",
        amount: order.amount,
        currency: order.currency,
        name: "SkillForge",
        description: `Enroll in ${course.title}`,
        order_id: order.id,
        handler: async function (response) {
          alert("Payment successful ✅ ID: " + response.razorpay_payment_id)

          // 3. Backend ko enroll karna
          try {
            await axios.post(
  `http://localhost:8081/enrollment/dummy-success?userId=${userId}&courseId=${course.id}`,
  {},
  { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
)
            alert("Enrollment successful 🎉")
            window.location.reload();
          } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "Unknown error occurred"
            alert(`Enrollment error ❌\n${errorMsg}`)
            console.error("Enrollment error:", err)
          }
        },
        prefill: {
          name: "Arya Pandey",
          email: "arya@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Unknown error occurred"
      alert(`Payment error ❌\n${errorMsg}`)
      console.error("Payment error:", err)
    }
  }

  return (
    <Box>
      <Card sx={{ maxWidth: 300, bgcolor: "beige" }}>
        {settingThumbnail ? (
          <Box display="flex" flexDirection="column" justifyContent="center" p={2}>
            <TextField type="file" onChange={handleFileChange} />
            <Button
              variant="contained"
              color="success"
              onClick={() => changeThumbnail(course.id)}
              sx={{ mt: 1 }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setSettingThumbnail(false)}
              sx={{ mt: 1 }}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Button onClick={() => setSettingThumbnail(true)}>
            <CardMedia
              component="img"
              height={250}
              image={course?.thumbnailUrl || "https://via.placeholder.com/300"}
              alt={course?.title}
              sx={{ borderRadius: "20px" }}
            />
          </Button>
        )}

        <CardContent>
          <Typography variant="h5" mt={2}>{course?.title}</Typography>
          <Typography variant="body2">{course?.description}</Typography>
          <Typography variant="body2" mt={1} color="blue">₹{course?.price}</Typography>
          {userId == course.instructor?.id ? (
            <Typography variant="body2" color="success">You</Typography>
          ) : (
            <Typography variant="body2">{course?.instructor?.name}</Typography>
          )}
          {role == "STUDENT" &&  !isEnrolled &&(
            <Button fullWidth variant="contained" sx={{ mt: "6px" }} onClick={()=>handleEnroll(course.id)}>
              Enroll
            </Button>
          )}
          {role == "STUDENT" &&  isEnrolled &&(
            <Typography variant='h6' color='success'>Enrolled</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default CourseCard
