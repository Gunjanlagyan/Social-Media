import React, { useEffect, useState } from "react";
import PostForm from "./Post-Form/PostForm";
import { useNavigate, useParams } from "react-router-dom";
import service from "../Appwrite/Config";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const onePost = await service.getPost(id);
          if (onePost) {
           
            setPost(onePost);
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  return post ? (
    <div className="py-8">
      <PostForm post={post} />
    </div>
  ) : null;
};

export default EditPost;
