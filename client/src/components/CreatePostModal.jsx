import { useState } from "react";
import { Modal, Box, Avatar, IconButton, Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import {useDispatch} from 'react-redux';
import { createPost } from "../state/Post/post.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: ".6rem",
  outline: "none",
};

function CreatePostModal({ open, handleClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
        caption: "",
        image: "",
        video: "",
    },
    onSubmit: (values) => {
        console.log("Formik Values: ", values);
        dispatch(createPost({data:values}));
    },
  });

  const user = useSelector((state) => state.auth.user);

  async function handleSelectImage(e) {
    setIsLoading(true);
    const imageUrl = await uploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imageUrl);
    setIsLoading(false);
    formik.setFieldValue("image", imageUrl);
  }

  async function handleSelectVideo(e) {
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(e.target.files[0], "video");
    setSelectedVideo(videoUrl);
    setIsLoading(false);
    formik.setFieldValue("video", videoUrl);    
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="flex space-x-4 items-center">
              <Avatar />
              <div>
                <p className="font-bold text-lg">
                  {user.fname + " " + user.lname}
                </p>
                <p className="text-sm">
                  @{user.fname.toLowerCase() + "_" + user.lname.toLowerCase()}
                </p>
              </div>
            </div>
            <textarea
              className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounded-sm"
              placeholder="write caption"
              name="caption"
              id=""
              onChange={formik.handleChange}
              value={formik.values.caption}
              rows="4"
            ></textarea>

            <div className="flex space-x-5 items-center mt-5">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSelectImage}
                  style={{ display: "none" }}
                  id="image-input"
                />
                <label htmlFor="image-input">
                  <IconButton color="primary" component="span">
                    <ImageIcon />
                  </IconButton>
                </label>
                <span>Image</span>
              </div>

              <div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleSelectVideo}
                  style={{ display: "none" }}
                  id="video-input"
                />
                <label htmlFor="video-input">
                  <IconButton color="primary" component="span">
                    <VideocamIcon />
                  </IconButton>
                </label>
                <span>Video</span>
              </div>
            </div>

            {selectedImage && (
              <div>
                <img className="h-[10rem]" src={selectedImage} alt="" />
              </div>
            )}
            {selectedVideo && (
              <div>
                <video
                  controls
                  className="h-[10rem]"
                  src={selectedVideo}
                  alt=""
                />
              </div>
            )}

            <div className="flex w-full justify-end">
              <Button
                variant="contained"
                type="submit"
                sx={{ borderRadius: "1.5rem" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                  formik.handleSubmit();
                }}
              >
                Post
              </Button>
            </div>
          </div>
        </form>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
}

CreatePostModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CreatePostModal;
