import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import usePostApi from "../service/blog";
import useLoader from "../store";
import { useToast } from "@chakra-ui/react";
import Loader from "../components/UI/Loader";
import SubNavbar from "../components/SubNavbar";
import usePostStore from "../store/posts";

const Home = () => {
  const { getAllPosts } = usePostApi();
  const toast = useToast();
  const { startLoading, endLoading, isLoading } = useLoader();
  const { setPosts, posts } = usePostStore();

  useEffect(() => {
    if (posts.length == 0) {
      startLoading();
      getAllPosts()
        .then((res) => {
          setPosts(res.data);
          endLoading(true);
        })
        .catch((err) => {
          toast({
            title: err?.message,
            status: "error",
            position: "top",
          });
          console.log(err);
          endLoading(true);
        });
    } else {
      endLoading(true);
    }
    return () => {
      endLoading(true);
    };
  }, []);

  return (
    <div>
      <SubNavbar />
      {isLoading ? (
        <Loader />
      ) : (
        posts?.map((post, index) => <Card key={index} {...post} />)
      )}
    </div>
  );
};

export default Home;
