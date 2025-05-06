import { useSelector } from "react-redux";
import Allpost from "./AllPost/Allpost";

export const Home = () => {
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <div>
      {authStatus ? (
        <div className="w-full  ">
          <div className="flex flex-wrap ">
            <Allpost />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[450px]">
          <h1 className="text-2xl font-bold hover:text-gray-500">
            Login to read posts
          </h1>
        </div>
      )}
    </div>
  );
};

export default Home;
