import { Button } from "@mui/material";
import React from "react";
import Modal from "react-modal";

const DeleteProduct = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Delete Product"
    >
      <h2>Confirm Delete Product</h2>
      <p>Are you sure you want to delete this product?</p>
      <div className="group_button">
        <Button variant="contained" onClick={onDelete}>
          Delete
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteProduct;
