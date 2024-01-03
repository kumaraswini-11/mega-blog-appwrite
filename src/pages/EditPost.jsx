// Importing React library and necessary hooks/components
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postService from "../appwrite/PostService";
import { Container, PostForm } from "../components";

function EditPost() {
  // State to store the post data
  const [post, setPost] = useState(null);
  // Accessing the 'slug' parameter from the route
  const { slug } = useParams();
  // Access to the navigation object to programmatically navigate between routes
  const navigate = useNavigate();

  // useEffect hook to fetch the post data based on the 'slug' parameter
  useEffect(() => {
    // Checking if 'slug' is available
    if (slug) {
      // Fetching the post data using the appwrite service
      postService.getPost(slug).then((post) => {
        // Updating the state with the fetched post data
        if (post) setPost(post);
      });
    } else {
      // If 'slug' is not available, navigate to the home page
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      {/* Container component for layout styling */}
      <Container>
        {/* Rendering PostForm component with the current post data */}
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
