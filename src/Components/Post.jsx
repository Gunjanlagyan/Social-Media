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
    <div className="  flex justify-center py-10 px-4 bg-gray-50">
      <div className="max-w-4xl  w-full h-full bg-white rounded-lg shadow-lg flex sm:flex-row flex-col">
        <div className="sm:w-full ">
          <img
            src={service.getFileView(post.featuredImage)}
            alt={post.title}
            className="w-full h-full object-cover rounded-lg"
          />{" "}
        </div>

        <div className="sm:w-2/3 p-6">
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
          </div>
          {isAuthor && (
            <div className="mt-2">
              <Link to={`/edit-post/${post.$id}`}>
                <button className="mr-2 inline-block px-4 py-1 rounded-full bg-green-400 text-white text-sm font-semibold shadow-md hover:bg-green-500 hover:shadow-lg hover:scale-105 active:scale-100 transition-transform duration-300 ease-in-out">
                  Edit
                </button>
              </Link>
              <button
                className="mr-2 inline-block px-4 py-1 rounded-full bg-red-400 text-white text-sm font-semibold shadow-md hover:bg-red-500 hover:shadow-lg hover:scale-105 active:scale-100 transition-transform duration-300 ease-in-out"
                onClick={deletePost}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Post;
