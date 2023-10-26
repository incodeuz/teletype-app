import api from "../axios";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};
const usePostApi = () => {
  const getAllPosts = async () => api.get("/blog");
  const getPostById = async (id) => api.get(`/blog/${id}`);
  const deletePost = async (id) => api.delete(`/blog/${id}`);
  const createPost = async (data) => api.post(`/blog`, data, config);
  return { getAllPosts, getPostById, deletePost, createPost };
};

export default usePostApi;
