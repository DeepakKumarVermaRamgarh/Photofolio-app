import React, { useEffect, useState } from "react";
import Album from "./Album";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { collection_name, db } from "../FireBaseInIt";
import { toast } from "react-toastify";

const AlbumList = ({
  isAddAlbum,
  addAlbumHandler,
  setIsAlbumOpen,
  setOpenedAlbum,
}) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Fetch albums from the Firestore collection on component mount
    onSnapshot(collection(db, collection_name), (data) => {
      // Extract the album data from the query snapshot
      const albums = data.docs.map((album) => ({
        id: album.id,
        ...album.data(),
      }));
      setAlbums(albums);
    });
  }, []);

  const deleteAlbumHandler = async (id) => {
    const albumRef = doc(collection(db, collection_name), id);
    await deleteDoc(albumRef);

    toast.success("Album removed successfully.");
  };

  return (
    <div>
      <div className="row">
        <h2>Your Albums</h2>
        {isAddAlbum ? (
          <button
            className="outlined cancel"
            size="sm"
            outlined="true"
            bgcolor="#FFCAC6"
            color="#FF6155"
            onClick={addAlbumHandler}
          >
            Cancel
          </button>
        ) : (
          <button
            className="outlined add"
            size="sm"
            outlined="true"
            bgcolor="#E5F1FF"
            color="#0077FF"
            onClick={addAlbumHandler}
          >
            Add Album
          </button>
        )}
      </div>
      <div className="album-container">
        {/* Check if albums array is not empty */}
        {albums.length > 0 ? (
          // Render each album component
          albums?.map((album) => (
            <Album
              key={album.id}
              album={album}
              setIsAlbumOpen={setIsAlbumOpen}
              setOpenedAlbum={setOpenedAlbum}
              deleteAlbumHandler={deleteAlbumHandler}
            />
          ))
        ) : (
          // Render message when no albums found
          <h3>No Album Found</h3>
        )}
      </div>
    </div>
  );
};

export default AlbumList;
