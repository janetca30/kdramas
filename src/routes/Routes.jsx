import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home.jsx";
import NewVideo from "../pages/newVideo/NewVideo.jsx";
import NotFound from "../pages/notFound/NotFound.jsx";
import Layout from "../layouts/Layout.jsx";
import { VideoProvider } from "../contexts/VideoContext.jsx";


function AppRoutes() {
  return (
  <VideoProvider>  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} ></Route>
          <Route path="/newvideo" element={<NewVideo />} ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </VideoProvider>
  )
}

export default AppRoutes