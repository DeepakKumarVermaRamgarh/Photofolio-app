import React from "react";
import { FaDownload, FaPencil, FaShare, FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";

const Picture = ({
  picture,
  setIsImageOpen,
  setOpenedImage,
  handleDelete,
  handleEdit,
}) => {
  const handleClick = () => {
    // Set the state to open the image
    setIsImageOpen(true);
    setOpenedImage(picture);
  };

  const downloadImage = () => {
    // Download the image by creating a temporary link and triggering a click event
    const url = picture?.pictureUrl;
    const name = picture?.pictureName;
    const options = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    fetch(url, options).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
      });
    });
  };

  const shareImage = () => {
    // Share the image URL by copying it to the clipboard
    const url = picture?.pictureUrl;
    const options = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    fetch(url, options).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        navigator.clipboard.writeText(url);
        toast.info("Url copied into clipboard.");
      });
    });
  };

  return (
    <div className="picture">
      {/* Image box */}
      <div className="image-box">
        <img
          src={picture?.pictureUrl}
          alt={picture?.pictureName}
          onClick={handleClick}
        />
        {/* Buttons for download and share */}
        <div className="image-btn-row">
          <div className="image-btn">
            <FaDownload onClick={downloadImage} />
          </div>
          <div className="image-btn">
            <FaShare onClick={shareImage} />
          </div>
        </div>
      </div>

      {/* Picture name */}
      <p> {picture?.pictureName} </p>

      {/* Delete button */}
      <div className="circle delete" onClick={() => handleDelete(picture)}>
        <FaTrash />
      </div>

      {/* Edit button */}
      <div className="circle edit" onClick={() => handleEdit(picture)}>
        <FaPencil />
      </div>
    </div>
  );
};

export default Picture;
