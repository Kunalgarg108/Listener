import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { MdOutlineHome } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { PlayerContext } from '../context/PlayerContext';
import { useContext } from 'react';
import { useState } from 'react';


function Header() {
    const navigate = useNavigate();
    const { songsData, playwithId,isLoggedIn,setIsLoggedIn } = useContext(PlayerContext);
    const [query, setQuery] = useState("");
    const [filteredSongs, setFilteredSongs] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (!value.trim() || songsData.length === 0) {
            setFilteredSongs([]);
            return;
        }

        const suggestions = songsData.filter((song) =>
            song.name?.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSongs(suggestions.slice(0, 5));
    };
    const startPlay = () => {
        if (!query.trim()) return;

        const matched = songsData.find((song) =>
            song.name?.toLowerCase().includes(query.toLowerCase())
        );

        if (matched) {
            playwithId(matched._id);
        }
    };
    return (
        <div className="w-full bg-[#101010] text-white flex justify-between items-center px-4 py-1 mb-0.5">
            {/* Left section */}
            <div className="flex items-center gap-6">
                <img src="/logo.png" alt="Logo" className='w-8 bg-white rounded-full' />
                <div
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 rounded-lg"
                    onClick={() => navigate("/")}
                >
                    <MdOutlineHome className="text-3xl" />
                </div>
                <div className="relative w-full max-w-md">
                    <div className="flex items-center gap-3 px-4 bg-gray-700 rounded-lg">
                        <input
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Search for songs..."
                            className="bg-transparent outline-none text-white text-lg w-full placeholder-gray-300"
                        />
                        <FaSearch className="text-2xl text-white cursor-pointer" onClick={() => startPlay()} />
                    </div>

                    {filteredSongs.length > 0 && (
                        <div className="absolute mt-1 bg-gray-800 rounded-lg shadow-lg w-full z-50">
                            {filteredSongs.map((song, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-700 text-white cursor-pointer"
                                    onClick={() => {
                                        setQuery(song.name);
                                        setFilteredSongs([]);
                                    }}
                                >
                                    {song.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4 ml-auto">
                <p
                    onClick={() => navigate("/premium")}
                    className="text-black bg-white px-4 py-1 hidden rounded-2xl text-[16px] md:block cursor-pointer"
                >
                    Explore Premium
                </p>
                <p className="text-black bg-white px-4 py-1 hidden rounded-2xl text-[16px] md:block cursor-pointer">
                    Install App
                </p>
                <CgProfile className="text-3xl cursor-pointer" onClick={() => navigate("/profile")} />
                <p onClick={() => { setIsLoggedIn(false); localStorage.removeItem("token"); }} className="text-black bg-white px-2 py-1 hidden rounded-2xl text-[16px] md:block cursor-pointer">
                    Logout
                </p>
            </div>
        </div>
    );
}

export default Header;
