import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import postService from "../appwrite/PostService";
import { useSelector } from "react-redux";
import { Button, Container } from "../components";

export default function Post() {
  // State to store the post data
  const [post, setPost] = useState(null);
  // Accessing the 'slug' parameter from the route
  const { slug } = useParams();
  // Access to the navigation object to programmatically navigate between routes
  const navigate = useNavigate();
  // Accessing user data from Redux state
  const userData = useSelector((state) => state.auth.userData);

  // Checking if the current user is the author of the post
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  // useEffect hook to fetch the post data based on the 'slug' parameter
  useEffect(() => {
    // Checking if 'slug' is available
    if (slug) {
      // Fetching the post data using the post service
      postService.getPost(slug).then((post) => {
        // Updating the state with the fetched post data or navigating to the home page if post is not found
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      // If 'slug' is not available, navigate to the home page
      navigate("/");
    }
  }, [slug, navigate]);

  // Function to handle post deletion
  const handleDeletePost = () => {
    // Deleting the post and associated featured image
    postService.deletePost(post.$id).then((status) => {
      if (status) {
        postService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      {/* Container component for layout styling */}
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          {/* Displaying the featured image of the post */}
          <img
            src={postService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {/* Buttons for editing and deleting the post (visible only to the author) */}
          {isAuthor && (
            <div className="absolute right-6 top-6">
              {/* Button to navigate to the edit post page */}
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              {/* Button to delete the post */}
              <Button bgColor="bg-red-500" onClick={handleDeletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          {/* Displaying the title of the post */}
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">
          {/* Parsing and displaying the HTML content of the post */}
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
