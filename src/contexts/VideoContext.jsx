import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types"

export const VideoContext = createContext();

export const useVideoContext = () => useContext(VideoContext); 

export const VideoProvider = ({children}) => {
  const [ videos, setVideos ] = useState([]);

const fetchingVideos = async () => {
    try {
      const res = await fetch("https://my-json-server.typicode.com/janetca30/kdramas-api/videos");
      const data = await res.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchingVideos();
  }, []);  

  const addVideo = (video) => {
    setVideos((prevVideos)=> [...prevVideos, {...video, id: prevVideos.length +1}]);
  };

  const updateVideo = (updatedVideo)=> {
    setVideos((prevVideos) =>
      prevVideos.map((video) => (video.id === updatedVideo.id ? updatedVideo : video)))
  };

  const deleteVideo = (videoId) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
  };

  return(
    <VideoContext.Provider value={{videos, addVideo, updateVideo, deleteVideo}}>
      {children}
    </VideoContext.Provider>
  );
};

VideoProvider.propTypes = {
  children: PropTypes.node.isRequired,
  
};


