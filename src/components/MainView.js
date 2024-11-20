import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import useApi from "../apiService/useApi";
import BoxField from "./BoxField";
import LabelField from "./LabelField";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import DialogBox from "./DialogBox";
import useBlogPosts from "../hook/useBlogPosts";
import toast from "react-hot-toast";
import Loading from "./Loading";

function MainView() {
  const { callApi } = useApi();
  const { posts, loading, data, fetchPosts } = useBlogPosts();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPost, setIsPost] = useState(true);
  const [isDialog, setIsDialog] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    subTitle: "",
    tags: "",
    content: "",
  });
  const menus = [
    {
      label: "Edit",
      icon: CreateIcon,
      actions: () => {
        handleOpenDiaLogBox();
      },
    },
    {
      label: "Delete",
      icon: DeleteIcon,
      color: "error",
      actions: () => {
        handleDeletePost();
      },
    },
  ];

  const handleOpenDiaLogBox = () => {
    fetchPosts();
    setIsPost(false);
    setIsDialog(!isDialog);
    setInitialValues({
      title: selectedPost.title || "",
      subTitle: selectedPost.subTitle || "",
      tags: selectedPost.tags[0] || "",
      content: selectedPost.content || "",
      id: selectedPost._id,
    });
  };

  const handleDeletePost = async () => {
    try {
      const response = await callApi("delete", `/posts/${selectedPost._id}`);
      fetchPosts();
      toast.success("Successfully deleted post", response);
    } catch (error) {
      toast.error("Error while deleting post", error);
    }
  };

  const handleMenuToggle = (event, data) => {
    if (anchorElNav) {
      setAnchorElNav(null);
      setSelectedPost({
        title: "",
        subTitle: "",
        tags: "",
        content: "",
      });
    } else {
      setAnchorElNav(event.currentTarget);
      setSelectedPost(data);
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchPosts();
  }, [data]);
 
  if (loading)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Loading />
      </div>
    );

    if(posts.length === 0) 
      return (
        <LabelField variant="h3" customClass="flex justify-center items-center">Post not found</LabelField>
      )

  return (
    <div>
      <div className="flex flex-col space-y-5 max-w-lg mx-auto w-full">
        {posts &&
          posts.map((post, index) => (
            <BoxField customClass="w-full" key={index}>
              <div className="text-end">
                <IconButton
                  size="small"
                  onClick={(event) => handleMenuToggle(event, post)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  anchorEl={anchorElNav}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(isOpen)}
                  onClose={() => handleMenuToggle()}
                >
                  {menus.map((menu, i) => (
                    <MenuItem
                      key={i}
                      onClick={(event) => {
                        menu.actions();
                        handleMenuToggle(event);
                      }}
                    >
                      <menu.icon color={menu.color} className="mr-2" />
                      <Typography sx={{ textAlign: "center" }}>
                        {menu.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </div>

              <Link to={`/home/post/${post._id}`} className="w-full">
                <LabelField variant="h6">{post.title}</LabelField>
                <LabelField variant="subtitle2">{post.subTitle}</LabelField>
                <LabelField>{post.content}</LabelField>
                {post.tags.map((o, i) => (
                  <LabelField customClass="font-bold inline" key={i}>
                    #{o}{" "}
                  </LabelField>
                ))}
              </Link>
            </BoxField>
          ))}
      </div>
      <DialogBox
        handleOpenClose={handleOpenDiaLogBox}
        openBox={isDialog}
        initialValues={initialValues}
        isPost={isPost}
      />
    </div>
  );
}

export default MainView;
