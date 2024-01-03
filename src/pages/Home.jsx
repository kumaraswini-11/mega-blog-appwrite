import React, { useEffect, useState } from "react";
import postService from "../appwrite/PostService";
import { Container, PostCard } from "../components";

function Home() {
  // State to store the list of posts
  const [posts, setPosts] = useState([]);

  // useEffect hook to fetch and update the list of posts on component mount
  useEffect(() => {
    // Fetching the list of posts using the post service
    postService.listPosts().then((posts) => {
      // Updating the state with the fetched posts
      if (posts) setPosts(posts.documents);
    });
  }, []);

  // Function to render the empty state when there are no posts
  const renderEmptyState = () => (
    <div className="w-full py-8 mt-4 text-center">
      {/* Container component for layout styling */}
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              Login to read posts
            </h1>
          </div>
        </div>
      </Container>
    </div>
  );

  // Function to render the list of posts
  const renderPosts = () => (
    <div className="w-full py-8">
      {/* Container component for layout styling */}
      <Container>
        <div className="flex flex-wrap">
          {/* Mapping through the list of posts and rendering PostCard component for each post */}
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              {/* Rendering PostCard component with the current post data */}
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );

  // JSX structure for the Home component
  return posts.length === 0 ? renderEmptyState() : renderPosts();
}

export default Home;
