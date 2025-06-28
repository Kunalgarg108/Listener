import { use, useContext, useState } from 'react';
import Sidebar from './componenets/Sidebar';
import Player from './componenets/Player';
import Display from './componenets/Display';
import { PlayerContext } from './context/PlayerContext';
import Header from './componenets/Header';
import Login from './componenets/Login';
import { useEffect } from 'react';
import { setupAxios } from './utils/axiosSetup';
function App() {
  const { audioRef, track, songsData, isLooping, isLoggedIn,setIsLoggedIn } = useContext(PlayerContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    setupAxios(() => setIsLoggedIn(false));
  }, []);
  return (
    <div className="h-screen bg-gray-900">
      {!isLoggedIn ? (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <div className="h-screen flex flex-col bg-gray-900 relative overflow-hidden">
            {songsData.length !== 0 && (
              <>
                <Header />
                <div className="flex flex-grow overflow-hidden">
                  <Sidebar />
                  <Display />
                </div>
                <Player />
              </>
            )}
            <audio
              preload="auto"
              src={track ? track.file : null}
              ref={audioRef}
              loop={isLooping}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
