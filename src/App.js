import DisplayArea from "./components/DisplayArea";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* ToastContainer component for displaying toast notifications */}
      <ToastContainer />
      {/* Navbar component */}
      <Navbar />
      {/* DisplayArea component */}
      <DisplayArea />
    </>
  );
}

export default App;
