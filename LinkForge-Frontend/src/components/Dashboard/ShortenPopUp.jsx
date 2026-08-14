import React from "react";
import Modal from "@mui/material/Modal";
import CreateNewShorten from "./CreateNewShorten";

const ShortenPopUp = ({ open, setOpen, refetch }) => {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-short-url-modal"
      aria-describedby="create-short-url-description"
      sx={{
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(15, 23, 42, 0.25)",
      }}
    >
      <div className="flex justify-center items-center min-h-screen w-full px-4">

        <CreateNewShorten
          setOpen={setOpen}
          refetch={refetch}
        />

      </div>
    </Modal>
  );
};

export default ShortenPopUp;