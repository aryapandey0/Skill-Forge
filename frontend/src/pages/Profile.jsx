import { Avatar, Box, Button, Container, Divider, Tab, Tabs, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import PostCard from '../components/PostCard';

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
const [name,setName] = useState("")


  const [courses, setCourses] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState(0);

  const [profileChange, setProfileChange] = useState(false);
  const [profile, setProfile] = useState();
  const [editing,setEditing] = useState(false);

  const myId = localStorage.getItem("userId");

  
const handleSave=async()=>{
  const res = await axios.put(`http://localhost:8081/api/auth/change-name/${myId}`, {name},{
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }

  }).then(()=>alert("Name Successfully changed"));
  window.location.reload();
}


  useEffect(() => {
    const fetchUser = async () => {
      const getUser = await axios.get(`http://localhost:8081/api/auth/${userId}`);
      setUser(getUser.data);
    };
    fetchUser();
  }, [userId]);

  // ✅ Fetch profile user's posts
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`http://localhost:8081/api/posts/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setPosts(res.data);
    };
    fetchPosts();
  }, [userId]);

  // ✅ Fetch profile user's courses (if instructor)
  useEffect(() => {
    if (user?.role === "INSTRUCTOR") {
      const fetchCourses = async () => {
        const result = await axios.get(
          `http://localhost:8081/api/courses/instructor/${userId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }
        );
        setCourses(result.data);
      };
      fetchCourses();
    }
  }, [user, userId]);

  const changeProfile = async () => {
    const formData = new FormData();
    formData.append("profilePic", profile);
    await axios.post(
      `http://localhost:8081/api/users/${myId}/upload-avatar`,
      formData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }
    );
    alert("Profile changed");
    window.location.reload();
  };

  const handleProfileChange = (e) => {
    setProfile(e.target.files[0]);
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Box display="flex" width="100%" p={2} ml={10} mt={-2}>
        <Box flex={1} p={2} m={0}>
          {/* Profile Header */}
          <Box width="100%" height="300px">
            <Box
              display="flex"
              gap={2}
              alignItems="center"
              justifyContent="flex-start"
              bgcolor="beige"
              p={2}
              borderRadius={"20px"}
            >
              {profileChange && (
                <Box display={"flex"}>
                  <TextField name="profile" onChange={handleProfileChange} type="file" />
                  <Button variant="contained" color="success" onClick={changeProfile}>
                    Save
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => setProfileChange(false)}>
                    Cancel
                  </Button>
                </Box>
              )}
              <Button onClick={() => setProfileChange(true)}>
                <Avatar
                  src={user?.profileUrl || "https://via.placeholder.com/60"}
                  alt={user?.name || ""}
                  sx={{
                    height: { xs: 120, md: 200 },
                    width: { xs: 120, md: 200 },
                    border: "3px solid orange"
                  }}
                />
              </Button>
               {editing ? <Box>

<TextField variant='filled' placeholder='Name' value={name} name='name' onChange={(e)=>setName(e.target.value)}/>
<Button variant='contained' color='success' onClick={handleSave}>Save</Button>
<Button variant='contained' color='error' onClick={()=>setEditing(false)}>Cancel</Button>
               </Box> :
              <Box>
               
                <Typography variant="h3">{user?.name}</Typography>
                <Typography variant="body1" color="grey">
                  {user?.email}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: user?.role === "STUDENT" ? "blue" : "green" }}
                >
                  {user?.role}
                </Typography>
                <Button variant='contained' sx={{mt:"4px"}}onClick={()=>setEditing(true)}>Edit</Button>
              </Box>}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Tabs Section */}
          <Box>
            <Tabs
              value={tab}
              onChange={(e, newValue) => setTab(newValue)}
              centered
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Posts" />
              {user?.role === "INSTRUCTOR" && <Tab label="Courses" />}
            </Tabs>

            {/* Posts Tab */}
            {tab === 0 && (
              <Box mt={3} display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
                {posts.map((p) => (
                  <PostCard post={p} key={p.id} />
                ))}
              </Box>
            )}

            {/* Courses Tab (only for Instructor) */}
            {user?.role === "INSTRUCTOR" && tab === 1 && (
              <Box mt={3} display="flex" flexWrap="wrap" gap={2}>
                {courses.length === 0 ? (
                  <Typography>No Courses By {user?.name}</Typography>
                ) : (
                  courses.map((c) => <CourseCard course={c} key={c.id} />)
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
