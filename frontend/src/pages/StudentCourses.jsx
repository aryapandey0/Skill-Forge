import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/enrollment/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCourses(res.data); // yahan array aa rahi hai
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchMyCourses();
  }, [userId]);

  return (
    <Box display="flex" flexWrap="wrap" gap={2} ml={30}>
      {courses.map((course) => (
        <Card key={course.enrollmentId} sx={{ maxWidth: 300, bgcolor: "beige" }}>
          {/* Agar backend thumbnail nahi bhej raha toh placeholder */}
          <img
            src={course.thumbnailUrl || "https://via.placeholder.com/300"}
            alt={course.courseTitle}
            style={{ height: 250, width: "100%", borderRadius: "20px" }}
          />

          <CardContent>
            <Typography variant="h5" mt={2}>
              {course.courseTitle}
            </Typography>
            <Typography variant="body2">{course.enrolledAt}</Typography>
            {/* Price aur instructor info abhi API me nahi aa raha hai, 
                toh jab backend se milega tab use kar lena */}
            {/* <Typography variant="body2" mt={1} color="blue">₹{course?.price}</Typography> */}
            {/* <Typography variant="body2">{course?.instructor?.name}</Typography> */}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default StudentCourses;
