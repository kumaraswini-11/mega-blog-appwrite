import React from "react";
import { Link } from "react-router-dom";
import postService from "../appwrite/PostService";

function PostCard({ $id, title, featuredImage }) {
  return (
    // Link - The full address isn't required; it will take the path from here.
    // $id (postId) - This $ is not significant; it's just a syntax of Appwrite, unrelated to React or JavaScript.
    <Link
      to={`/post/${$id}`}
      className="block w-full bg-gray-100 rounded-xl p-4"
    >
      {/* Figure element containing an image and a caption */}
      <figure className="mb-4">
        <img
          //src={postService.getFilePreview(featuredImage)}
          src={postService.getFilePreview(featuredImage)}
          alt={`Featured image for post: ${title}`}
          className="w-full h-auto rounded-xl"
        />
        {/* Caption for the image */}
        <figcaption className="text-center mt-2 text-sm text-gray-500">
          {title}
        </figcaption>
      </figure>
    </Link>
  );
}

export default PostCard;

/*
const urlPromise = postService.getFilePreview(featuredImage);
let modifiedUrl = "";
urlPromise
  .then((url) => {
    console.log("Resolved URL:", url); // Log the resolved URL
    const baseUrl = `${url.origin}${url.pathname.split("/files")[0]}`;
    modifiedUrl = `${baseUrl}/files/${featuredImage}/view/?project=6586bf1e78d7b6c5f012`;
    console.log(modifiedUrl);
  })
  .catch((error) => {
    console.error("Error resolving URL Promise:", error);
  });
*/
