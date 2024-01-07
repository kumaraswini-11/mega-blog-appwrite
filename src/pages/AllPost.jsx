import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import postService from "../appwrite/PostService";

function AllPost() {
  // State to store the list of posts
  const [posts, setPosts] = useState([]);

  // useEffect hook to fetch and update the list of posts on component mount
  useEffect(() => {
    // Fetching the list of posts using the post service
    postService.listPosts([]).then((posts) => {
      // Updating the state with the fetched posts
      if (posts) setPosts(posts.documents);
    });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div className="w-full py-8">
      {/* Container component for layout styling */}
      <Container>
        <div className="flex flex-wrap">
          {/* Mapping through the list of posts and rendering PostCard component for each post */}
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/2">
              {/* Rendering PostCard component with the current post data */}
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
