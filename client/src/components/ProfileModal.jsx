import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { updateUserProfile } from "../state/Auth/authActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  outline: "none",
  overFlow: "scroll-y",
  borderRadius: 3,
};

function ProfileModal({ open, handleClose }) {
  const dispatch = useDispatch();

  function handleSubmit(values) {
    console.log("Values: ", values);

  }

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
    },
    onSubmit: (values) => {
      console.log("Values: ", values);
      dispatch(updateUserProfile(values));
      handleClose();
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <p>Edit Profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>

            <div>
              <div className="h-[15rem]">
                <img
                  className="w-full h-full rounded-t-md"
                  src="https://plus.unsplash.com/premium_photo-1669359806362-6bd0218a4fd2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="cover"
                />
              </div>
              <div className="pl-5">
                <Avatar
                  className="transform -translate-y-24"
                  sx={{ width: "10rem", height: "10rem" }}
                  src="https://lh3.googleusercontent.com/a/ACg8ocKF23OVLBBGwqEictwf0SKXAqnfS0rb7RKKSImkXILWoT0=s288-c-no"
                />
              </div>
            </div>

            <div className="space-y-3">
              <TextField
                fullWidth
                id="fname"
                name="fname"
                label="First Name"
                value={formik.values.fname}
                onChange={formik.handleChange}
              />

              <TextField
                fullWidth
                id="lname"
                name="lname"
                label="Last Name"
                value={formik.values.lname}
                onChange={formik.handleChange}
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

ProfileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ProfileModal;
