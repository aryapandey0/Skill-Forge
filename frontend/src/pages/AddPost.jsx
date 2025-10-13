import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent
} from "@mui/material";

const AddPost = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const myId = localStorage.getItem("userId");

  const handleAdd = async () => {
    if (!caption || !image) {
      alert("Caption and Image are required!");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `http://localhost:8081/api/posts/create/${myId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("✅ Post uploaded:", response.data);
      alert("Post created successfully!");
      setCaption("");
      setImage(null);
    } catch (error) {
      console.error("❌ Error uploading post:", error);
      alert("Failed to create post.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ width: 400, borderRadius: 3, boxShadow: 3 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" align="center" fontWeight="bold">
            Create a Post
          </Typography>

          {/* Upload Image Button */}
          <Button
            variant="outlined"
            component="label"
            sx={{ borderRadius: 2 }}
          >
            {image ? "Change Image" : "Upload Image"}
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>

          {/* Caption */}
          <TextField
            label="Write a caption"
            variant="outlined"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            onClick={handleAdd}
            sx={{ borderRadius: 2 }}
          >
            Post
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddPost;
