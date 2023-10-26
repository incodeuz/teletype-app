import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import usePostApi from "../service/blog";
import UserImg from "../assets/user.png";
import useLoader from "../store";
import { Code, useToast } from "@chakra-ui/react";
import Loader from "../components/UI/Loader";
import { ViewIcon } from "@chakra-ui/icons";
import parse from "html-react-parser";

const Details = () => {
  const { getPostById } = usePostApi();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { isLoading, startLoading, endLoading } = useLoader();
  const toast = useToast();

  useEffect(() => {
    try {
      startLoading();
      getPostById(id).then((res) => {
        endLoading(true);
        setPost(res.data);
      });
    } catch (error) {
      endLoading(true);
      toast({
        title: "Something went wrong!",
        status: "error",
        position: "top",
      });
    }
  }, [id]);

  const index = post?.title?.indexOf("^*^");

  if (!localStorage.getItem("token")) {
    return <Navigate to="/sign-in" />;
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mb-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-[60px] h-[60px] rounded-full">
                <img
                  className="w-full h-full object-contain"
                  src={UserImg}
                  alt="Profile image"
                />
              </div>
              <div>
                <h2 className="font-semibold text-[20px]">
                  {post?.user?.full_name}
                </h2>
                {localStorage.getItem("my_id") === post?.user?.id ? (
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-500 text-[17px]">
                      {post?.user?.username}{" "}
                    </h3>{" "}
                    - you
                  </div>
                ) : (
                  <h3 className="font-bold text-gray-500 text-[17px]">
                    {post?.user?.username}
                  </h3>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 mt-7">
            <Code>{new Date(post?.createdAt).toDateString()}</Code>

            <div className="flex items-center gap-[2px]">
              <ViewIcon className="text-[20px]" />
              <p>{post?.views}</p>
            </div>
          </div>
          <div className="mt-9">
            {index > 0 && (
              <div className="flex items-center justify-center">
                <img
                  className="object-cover"
                  src={`https://nest-blog.up.railway.app/api/image/${post?.title?.slice(
                    0,
                    index
                  )}`}
                  alt="poster"
                />
              </div>
            )}
            <h2 className="nohover text-[27px] font-bold mb-4">
              {post?.title?.slice(index + 3, post.title.length)}
            </h2>

            <div className="det-body">{parse(`${post?.body}`)}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
