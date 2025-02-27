import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import service from "../Appwrite/Config";
import Button from "./Button";
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
        {/* Left Content Section (Post) */}
        <div className="lg:w-full relative">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full h-full object-cover rounded-lg"
          />{" "}
          {/* Edit and Delete buttons in top-right corner */}
        </div>

        {/* Right Image Section */}
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

{
  /* <div className="w-full max-w-7xl mx-auto px-10">
      <div className="py-2">
        <div className="w-full  flex flex-col  justify-center mb-4 relative  rounded-xl p-2">
          <h1 className="text-lg font-semibold text-center mb-2">
            {post.userName}
          </h1>
          <img
            width={800}
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl mx-auto"
          />
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
              
                <Button bgColour="bg-green-500"> Edit</Button>
              </Link>
             
              <Button bgColour="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
          <div className="w-full   mb-6">
            <h1 className="text-2xl  text-center font-bold ">{post.title}</h1>
          </div>
          <div className="browser-css text-center">
           
            { parse(post.content)}</div>
        </div>
        
      </div>
    </div> */
}
