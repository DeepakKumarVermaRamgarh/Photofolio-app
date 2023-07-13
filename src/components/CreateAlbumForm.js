import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { collection_name, db } from "../FireBaseInIt";
import { toast } from "react-toastify";

const CreateAlbumForm = ({ setIsAddAlbum }) => {
  const [albumName, setAlbumName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add a new album to the Firestore collection
    const albumRef = await addDoc(collection(db, collection_name), {
      name: albumName,
      pictures: [],
      createdAt: new Date(Date.now()),
    });

    // Display success or error toast based on the result of adding the album
    if (albumRef) {
      toast.success("Album Added Successfully.");
    } else {
      toast.error("Something went wrong!!!");
    }

    // Reset form fields and perform necessary state updates
    setAlbumName("");
    setIsAddAlbum(false);
  };
  return (
    <form className="album-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>Create an album</h2>
      <div>
        {/* Input field for album name */}
        <input
          type="text"
          placeholder="Album Name"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />

        {/* Button to clear the input field */}
        <button type="reset" className="reset" onClick={() => setAlbumName("")}>
          Clear
        </button>

        {/* Button to submit the form and create the album */}
        <button type="submit" className="submit">
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateAlbumForm;
