import { useState, useRef, useEffect, createContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 

export const PlayerContext = createContext();
export const url = import.meta.env.VITE_API_URL || 'http://localhost:4000';
export const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const [songsData, setSongsData] = useState([]);
  const [isLooping, setIsLooping] = useState(false);
  const [albumsData, setAlbumsData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [track, setTrack] = useState(songsData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });
  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    console.log("Pause button clicked");
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handlePlay = async (songId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
  try {
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    await axios.post(`${url}/api/auth/history`, 
      { userId, songId }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );

  } catch (err) {
    console.error("Failed to add to history:", err);
  }
  };
  const playwithId = async (id) => {
    await songsData.map((song) => {
      if (song._id === id) {
        setTrack(song);
      }
    });
    await audioRef.current.play();
    setIsPlaying(true);
    await handlePlay(id);
  };


  const previous = async () => {
    songsData.map(async (song, index) => {
      if (song._id === track._id) {
        if (isShuffling) {
          const randomIndex = Math.floor(Math.random() * songsData.length);
          await setTrack(songsData[randomIndex]);
          await audioRef.current.play();
          setIsPlaying(true);
          await handlePlay(songsData[randomIndex]._id);
        } else if (index > 0) {
          await setTrack(songsData[index - 1]);
          await audioRef.current.play();
          setIsPlaying(true);
          await handlePlay(songsData[index - 1]._id);
        }
      }
    });
  };

  const next = async () => {
    songsData.map(async (song, index) => {
      if (song._id === track._id) {
        if (isShuffling) {
          const randomIndex = Math.floor(Math.random() * songsData.length);
          await setTrack(songsData[randomIndex]);
          await audioRef.current.play();
          setIsPlaying(true);
          await handlePlay(songsData[randomIndex]._id);
        } else if (index < songsData.length) {
          await setTrack(songsData[index + 1]);
          await audioRef.current.play();
          setIsPlaying(true);
          await handlePlay(songsData[index + 1]._id);
        }
      }
    });
  };

  const seekSong = (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0]);
    } catch (error) {
      console.error("Error fetching songs data:", error);
    }
  };
  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.error("Error fetching album data:", error);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        if (seekBar.current && audioRef.current.duration) {
          seekBar.current.style.width = `${(audioRef.current.currentTime / audioRef.current.duration) * 100}%`;
        }

        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;

        setTime({
          currentTime: {
            minute: Math.floor(currentTime / 60),
            second: Math.floor(currentTime % 60),
          },
          totalTime: {
            minute: Math.floor(duration / 60),
            second: Math.floor(duration % 60),
          },
        });
      };
    }
  }, [audioRef, seekBar, seekBg, track, isPlaying]);



  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    isPlaying,
    setIsPlaying,
    time,
    setTime,
    play,
    pause,
    playwithId,
    next,
    previous,
    seekSong,
    handleVolumeChange,
    volume,
    songsData,
    setSongsData,
    albumsData,
    setAlbumsData,
    isLooping,
    setIsLooping,
    isShuffling,
    setIsShuffling,
    togglePlayPause,
    handlePlay,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;











