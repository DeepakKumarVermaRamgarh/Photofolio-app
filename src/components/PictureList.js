import React, { useEffect, useState } from "react";
import Picture from "./Picture";
import { FaArrowLeftLong, FaX } from "react-icons/fa6";
import Carasoul from "./Carasoul";
import AddPictureForm from "./AddPictureForm";
import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { collection_name, db } from "../FireBaseInIt";
import { toast } from "react-toastify";

const PictureList = ({ openedAlbum, setOpenedAlbum, setIsAlbumOpen }) => {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [openedImage, setOpenedImage] = useState(null);
  const [isAddPic, setIsAddPic] = useState(false);
  const [isEditPic, setIsEditPic] = useState(false);
  const [EditPic, setEditPic] = useState(null);
  const [EditPicIdx, setEditPicIdx] = useState(-1);
  const [searchText, setSearchText] = useState("");
  const [pictures, setPictures] = useState([]);
  const [prevSearchText, setPrevSearchText] = useState(null);

  const handleBackBtnClick = () => {
    // Close the picture view and go back to the album view
    setIsAlbumOpen(false);
    setOpenedAlbum(null);
  };

  const handleDelete = async (picture) => {
    // Delete the picture from the album
    const albumRef = doc(collection(db, collection_name), openedAlbum.id);

    await updateDoc(albumRef, {
      pictures: arrayRemove(picture),
    });

    toast.success("Picture removed successfully.");
  };

  const handleEdit = async (picture) => {
    // Edit the picture
    const albumRef = doc(collection(db, collection_name), openedAlbum.id);

    const document = await getDoc(albumRef);
    const res = document.data();

    const pic = res.pictures.find((p) => p.pictureUrl === picture.pictureUrl);
    setEditPicIdx(res.pictures.indexOf(pic));

    setEditPic(pic);
    setIsEditPic(true);
  };

  const handleCancel = () => {
    // Cancel the add/edit picture operation
    setIsAddPic(false);
    setIsEditPic(false);
    setEditPic(null);
    setEditPicIdx(-1);
  };

  const getImages = async () => {
    // Fetch the images of the album based on the search text
    const albumRef = doc(collection(db, collection_name), openedAlbum.id);
    const res = await getDoc(albumRef);
    const data = res.data();
    const imagesList = data.pictures;
    const newImageList = imagesList.filter((image) =>
      image.pictureName.toLowerCase().includes(searchText.toLowerCase())
    );
    setPictures(newImageList);
  };

  useEffect(() => {
    // Fetch the images when the album or search text changes
    if (searchText !== prevSearchText) getImages();
    setPrevSearchText(searchText);
  }, [openedAlbum, searchText]);

  useEffect(() => {
    // Fetch the images on mount and when a picture is deleted or edited
    getImages();
  }, [handleDelete, handleEdit]);

  return isImageOpen ? (
    // Render the carasoul view for displaying individual images
    <Carasoul
      images={openedAlbum.pictures}
      openedImage={openedImage}
      setOpenedImage={setOpenedImage}
      setIsImageOpen={setIsImageOpen}
    />
  ) : (
    // Render the album view with pictures
    <>
      {(isAddPic || isEditPic) && (
        // Render the add/edit picture form
        <AddPictureForm
          album={openedAlbum}
          setIsAddPic={setIsAddPic}
          setEditPic={setEditPic}
          isEditPic={isEditPic}
          setIsEditPic={setIsEditPic}
          EditPic={EditPic}
          EditPicIdx={EditPicIdx}
        />
      )}

      <div className="row">
        {/* Back button */}
        <FaArrowLeftLong
          className="back-btn"
          onClick={handleBackBtnClick}
          style={{ cursor: "pointer" }}
        />

        {/* Search box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="icon" onClick={() => setSearchText("")}>
            <FaX />
          </div>
        </div>

        {/* Add or cancel button */}
        {isAddPic || isEditPic ? (
          <button className="outlined cancel" onClick={handleCancel}>
            Cancel
          </button>
        ) : (
          <button className="outlined add" onClick={() => setIsAddPic(true)}>
            Add Picture
          </button>
        )}
      </div>
      <div className="pictures-container">
        {pictures.length > 0 ? (
          pictures.map((pic, i) => (
            <Picture
              key={i}
              id={i}
              picture={pic}
              setIsImageOpen={setIsImageOpen}
              setOpenedImage={setOpenedImage}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
        ) : (
          // No pictures found message
          <h3>No Picture Found</h3>
        )}
      </div>
    </>
  );
};

export default PictureList;
