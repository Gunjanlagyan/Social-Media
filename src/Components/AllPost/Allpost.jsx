import React, { useEffect } from "react";
import PostCard from "../PostCard";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../Store/PostSlice";

const Allpost = () => {
  const dispatch = useDispatch();
  const { isLoading, posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="w-full py-8">
      <div className="flex flex-wrap">
        {isLoading ? (
          <Loader />
        ) : posts ? (
          posts.map((post) => (
            <div key={post.$id} className="p-2  w-1/4">
              {" "}
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <div className="w-full text-2xl font-bold hover:text-gray-500 text-center">
            There are no posts
          </div>
        )}
      </div>
    </div>
  );
};

export default Allpost;
