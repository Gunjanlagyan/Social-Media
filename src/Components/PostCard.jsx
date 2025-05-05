import React from "react";
import { Link } from "react-router-dom";
import service from "../Appwrite/Config";

const PostCard = ({ post }) => {
  return (
    <Link to={`/post/${post.$id}`}>
      <div className="flex justify-center items-center rounded-xl  bg-gray-100  hover:opacity-90 ease-out transition-transform duration-500  hover:scale-[1.03] hover:shadow-2xl">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={service.getFileView(post.featuredImage)}
              alt={post.title}
              className="w-full h-60 object-cover rounded-xl"
            />
            <h2 className="absolute bottom-2 left-4 text-white text-lg font-bold bg-black bg-opacity-50 px-2 py-1 rounded-md">
              {post.userName}
            </h2>
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              {post.title}{" "}
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
