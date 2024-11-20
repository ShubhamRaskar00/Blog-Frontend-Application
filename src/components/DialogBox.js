import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import ButtonField from "./ButtonField";
import useFromValidation from "../hook/useFormValidation";
import InputField from "./InputField";
import useApi from "../apiService/useApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function DialogBox({ handleOpenClose, openBox, initialValues, isPost }) {
  const validationRule = {
      title: ["required", "title"],
      subTitle: ["required", "subTitle"],
      tags: ["required", "tags"],
      content: ["required", "content"],
    }
    
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
  } = useFromValidation(initialValues, validationRule);
  const { loading, callApi } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return toast.error("Field validation error");
    if (isPost) {
      // add here post
      try {
        const response = await callApi("post", "/posts", values);
        navigate(0);
        toast.success("Successfully created post", response.message);
        handleOpenClose();
        resetForm();
      } catch (error) {
        toast.error(`Error creating post ${error}`);
      }
    } else {
      // edit here post
      try {
        const response = await callApi(
          "put",
          `/posts/${initialValues.id}`,
          values
        );
        toast.success("Successfully updated post", response.message);
        handleOpenClose();
        resetForm();
      } catch (error) {
        toast.error(`Error editing post ${error}`);
      }
    }
  };

  return (
    <div>
      <Dialog open={openBox} onClose={handleOpenClose}>
        <DialogTitle>
          <Typography> {isPost ? "Create " : "Edit"} Post</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="space-y-5">
              <div className="mt-3">
                <InputField
                  name="title"
                  label="Title"
                  type="text"
                  variant="outlined"
                  customClass="w-full"
                  size="small"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && errors.title}
                  errorText={touched.title && errors.title ? errors.title : ""}
                />
              </div>

              <InputField
                name="subTitle"
                label="SubTitle"
                type="text"
                variant="outlined"
                customClass="w-full"
                size="small"
                value={values.subTitle}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.subTitle && errors.subTitle}
                errorText={
                  touched.subTitle && errors.subTitle ? errors.subTitle : ""
                }
              />
              <InputField
                name="tags"
                label="Tags"
                variant="outlined"
                customClass="w-full"
                size="small"
                type="text"
                value={values.tags}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.tags && errors.tags}
                errorText={touched.tags && errors.tags ? errors.tags : ""}
              />
              <InputField
                name="content"
                label="Content"
                variant="outlined"
                customClass="w-full"
                size="small"
                type="textbox"
                value={values.content}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.content && errors.content}
                errorText={
                  touched.content && errors.content ? errors.content : ""
                }
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonField
            variant="contained"
            sx={{ textTransform: "capitalize", backgroundColor: "#000" }}
            onClick={handleOpenClose}
          >
            Close
          </ButtonField>
          <ButtonField
            variant="contained"
            sx={{ textTransform: "capitalize", backgroundColor: "#000" }}
            onClick={handleSubmit}
            loading={loading}
          >
            {isPost ? "Post" : "Save"}
          </ButtonField>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogBox;
