import { useEffect, useState } from "react";
import { collection_name, db } from "../FireBaseInIt";
import { toast } from "react-toastify";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const AddPictureForm = ({
  album,
  setIsAddPic,
  setEditPic,
  isEditPic,
  setIsEditPic,
  EditPic,
  EditPicIdx,
}) => {
  const [pictureName, setPictureName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  useEffect(() => {
    if (isEditPic) {
      // Set pictureName and pictureUrl when in edit mode
      setPictureName(EditPic.pictureName);
      setPictureUrl(EditPic.pictureUrl);
    }
  }, [EditPic]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const albumRef = doc(collection(db, collection_name), album.id);

    if (isEditPic) {
      const albumSnapshot = await getDoc(albumRef);

      if (albumSnapshot.exists()) {
        const albumData = albumSnapshot.data();
        const pictures = albumData.pictures || [];

        if (EditPicIdx !== -1) {
          // Create a new array with the updated picture data
          const updatedPictures = [
            ...pictures.slice(0, EditPicIdx),
            { pictureName, pictureUrl },
            ...pictures.slice(EditPicIdx + 1),
          ];

          // Update the album document with the new array of pictures
          await updateDoc(albumRef, { pictures: updatedPictures });

          setEditPic(null);
          setIsEditPic(false);

          toast.success("Picture updated successfully.");
        } else {
          toast.error("Picture not found.");
        }
      }
    } else {
      // Add new picture using arrayUnion
      await updateDoc(albumRef, {
        pictures: arrayUnion({ pictureName, pictureUrl }),
      });
      // Reset form fields and perform necessary state updates
      setPictureName("");
      setPictureUrl("");
      setIsAddPic(false);
      toast.success("Picture Added successfully.");
    }
  };

  return (
    <form className="album-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>Add New Picture</h2>
      <div>
        <input
          type="text"
          placeholder="Picture Name"
          inputMode="text"
          value={pictureName}
          onChange={(e) => setPictureName(e.target.value)}
        />
        <input
          type="url"
          placeholder="Picture Url"
          inputMode="url"
          value={pictureUrl}
          onChange={(e) => setPictureUrl(e.target.value)}
        />
        {isEditPic ? (
          <button type="submit" className="submit">
            Update
          </button>
        ) : (
          <button type="submit" className="submit">
            Add
          </button>
        )}
      </div>
    </form>
  );
};

export default AddPictureForm;
