import React from "react";
import { FaTrash } from "react-icons/fa6";

const Album = ({
  album,
  setIsAlbumOpen,
  setOpenedAlbum,
  deleteAlbumHandler,
}) => {
  const handleClick = () => {
    // Set the album as open and pass it to the parent component
    setIsAlbumOpen(true);
    setOpenedAlbum(album);
  };

  return (
    <div className="album">
      {/* Display the album image */}
      <img src="./assets/gallery.png" alt="gallery" onClick={handleClick} />
      {/* Display the album name */}
      <p> {album.name} </p>
      <div className="circle" onClick={() => deleteAlbumHandler(album.id)}>
        <FaTrash />
      </div>
    </div>
  );
};

export default Album;
