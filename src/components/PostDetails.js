import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../apiService/useApi";
import Loading from "./Loading";
import LabelField from "./LabelField";

function PostDetails() {
  const { id } = useParams();
  const { callApi, loading } = useApi();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await callApi("get", `/posts/${id}`);
        setPost(response);
      } catch (err) {
        console.error(err.message || "Failed to fetch post");
      }
    };

    fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Loading />
      </div>
    );

  return (
    <div>
      {post && (
        <div>
          <LabelField variant="h6">{post.title}</LabelField>
          <LabelField variant="subtitle2">{post.subTitle}</LabelField>
          <LabelField>{post.content}</LabelField>
          {post.tags.map((o, i) => (
            <LabelField customClass="font-bold inline" key={i}>#{o} </LabelField>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostDetails;
