import { Author } from "./author";
import { LatestPost } from "./latestPost";
import { PostTemp } from "./postTemp";
import {Link} from "react-router-dom"

export const Post = () => {
  return (
    <div className="overflow-x-hidden overflow-y-hidden bg-gray-100 min-h-max ">
      <div className="px-6 py-8">
        <div className="container flex justify-between mx-auto">
            
          <PostTemp />
          <div className="w-4/12 -mx-8 lg:block">
            <div className="px-8">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-bold mb-4">Authors</h2>
                <Author />
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
                <LatestPost />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-4 right-4">
        <Link to={"/create"}>
        <button className="px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600">
            Add Post +
          </button>
        </Link>
         
        </div>
      </div>
    </div>
  );
};
