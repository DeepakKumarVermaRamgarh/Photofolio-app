import React, { useState } from "react";
import CreateAlbumForm from "./CreateAlbumForm";
import AlbumList from "./AlbumList";

import PictureList from "./PictureList";

const DisplayArea = () => {
  const [isAddAlbum, setIsAddAlbum] = useState(false);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [openedAlbum, setOpenedAlbum] = useState(null);

  const addAlbumHandler = () => {
    // Toggle the state of isAddAlbum when add album button is clicked
    setIsAddAlbum(!isAddAlbum);
  };

  return (
    <main>
      {/* Render CreateAlbumForm if isAddAlbum state is true */}
      {isAddAlbum && <CreateAlbumForm setIsAddAlbum={setIsAddAlbum} />}

      {/* Render PictureList if isAlbumOpen state is true, otherwise render AlbumList */}
      {isAlbumOpen ? (
        <PictureList
          openedAlbum={openedAlbum}
          setOpenedAlbum={setOpenedAlbum}
          setIsAlbumOpen={setIsAlbumOpen}
        />
      ) : (
        <AlbumList
          addAlbumHandler={addAlbumHandler}
          isAddAlbum={isAddAlbum}
          setIsAlbumOpen={setIsAlbumOpen}
          setOpenedAlbum={setOpenedAlbum}
        />
      )}
    </main>
  );
};

export default DisplayArea;
