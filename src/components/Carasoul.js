import { FaLeftLong, FaRightLong, FaX } from "react-icons/fa6";

const Carasoul = ({ images, openedImage, setOpenedImage, setIsImageOpen }) => {
  const handleNext = () => {
    // Get the total length of images array
    const totalLenght = images.length;

    // Find the index of the currently opened image in the images array
    const imageIndex = images.findIndex(
      (image) => image.pictureUrl === openedImage.pictureUrl
    );

    // Calculate the next index, ensuring it wraps around to the start if it exceeds the total length
    let nextIndex = (imageIndex + 1) % totalLenght;

    // Set the opened image to the next image in the array
    setOpenedImage(images[nextIndex]);
  };

  const handlePrev = () => {
    // Get the total length of images array
    const totalLenght = images.length;

    // Find the index of the currently opened image in the images array
    const imageIndex = images.findIndex(
      (image) => image.pictureUrl === openedImage.pictureUrl
    );

    // Calculate the previous index, ensuring it wraps around to the end if it goes below 0
    let prevIndex = imageIndex - 1;
    if (prevIndex < 0) prevIndex = totalLenght - 1;

    // Set the opened image to the previous image in the array
    setOpenedImage(images[prevIndex]);
  };

  return (
    <div className="carasoule">
      {/* Previous button */}
      <div className="icon-btn" onClick={handlePrev}>
        <FaLeftLong />
      </div>

      {/* Image container */}
      <div className="image-container">
        <img src={openedImage?.pictureUrl} alt={openedImage?.pictureName} />
      </div>

      {/* Next button */}
      <div className="icon-btn" onClick={handleNext}>
        <FaRightLong />
      </div>

      {/* Close button */}
      <div className="icon-btn close" onClick={() => setIsImageOpen(false)}>
        <FaX />
      </div>
    </div>
  );
};

export default Carasoul;
