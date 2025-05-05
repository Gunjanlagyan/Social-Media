import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import service from "../Appwrite/Config";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { MdModeEditOutline } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

const Post = () => {
  const [post, setPost] = useState(null);
  const [isAuthor, setAuthor] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (id) {
      service.getPost(id).then((post) => {
        if (post) {
          setPost(post);

          if (post && userData) {
            if (post.userId === userData.$id) {
              setAuthor(true);
            } else {
              setAuthor(false);
            }
          } else {
            setAuthor(false);
          }
        }
      });
    }
  }, [userData, id]);

  const deletePost = async () => {
    try {
      const data = await service.deletePost(post.$id);

      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  return post ? (
    <div className="flex justify-center py-10 px-4 bg-gray-50">
      <div className="max-w-4xl w-full h-full bg-white rounded-lg shadow-lg flex lg:flex-row flex-col">
        <div className="lg:w-full relative">
          <img
            src={service.getFileView(post.featuredImage)}
            alt={post.title}
            className="w-full h-full object-cover rounded-lg"
          />{" "}
        </div>

        <div className="lg:w-2/3 p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h2>
          <div className="text-lg text-gray-700  mb-6">
            {parse(post.content)}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Posted by:{" "}
              <span className="font-semibold text-gray-800">
                {" "}
                {post.userName}
              </span>
            </p>
            {isAuthor && (
              <div className="absolute right-[175px] top-[99px]">
                <Link to={`/edit-post/${post.$id}`}>
                  <MdModeEditOutline className="text-green-500 text-xl inline" />
                </Link>
                <TiDelete
                  className="text-red-500 text-3xl inline "
                  onClick={deletePost}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Post;
