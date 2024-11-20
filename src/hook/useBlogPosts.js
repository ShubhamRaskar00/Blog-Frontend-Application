import { useCallback, useState } from "react";
import useApi from "../apiService/useApi";

const useBlogPosts = () => {
  const { callApi, loading, error } = useApi();
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await callApi("get", "/posts");
      setPosts(response);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  }, [callApi]);
  return {
    posts,
    fetchPosts,
    loading,
    error,
  };
}

export default useBlogPosts;
