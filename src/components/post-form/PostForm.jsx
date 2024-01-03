import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import postService from "../../appwrite/PostService";
import { Button, Input, RTE, Select } from "..";

export default function PostForm({ post }) {
  // Destructuring functions from useForm hook
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      // Providing default form values based on the post (if available)
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  // Access to the navigation object to programmatically navigate between routes
  const navigate = useNavigate();
  // Extracting user data from the Redux store using useSelector
  const userData = useSelector((state) => state.auth.userData);

  // Function to handle form submission
  const submit = async (data) => {
    // Logic for updating an existing post
    if (post) {
      const file = data.image[0]
        ? await postService.uploadFile(data.image[0])
        : null;

      if (file) {
        postService.deleteFile(post.featuredImage);
      }

      const dbPost = await postService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
    // Logic for creating a new post
    else {
      const file = await postService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await postService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  // Function to transform a string into a slug
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  // useEffect hook to watch changes in the 'title' and update the 'slug' accordingly
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        {/* Input for the title */}
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        {/* Input for the slug */}
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        {/* Rich Text Editor for the content */}
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        {/* File input for the featured image */}
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {/* Displaying the current featured image for an existing post */}
        {post && (
          <div className="w-full mb-4">
            <img
              src={postService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        {/* Dropdown for selecting the status */}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        {/* Submit button */}
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
