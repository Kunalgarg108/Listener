import React, { useState, useEffect } from 'react'
import { FaRegClock } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { url } from '../context/PlayerContext';
import { PlayerContext } from '../context/PlayerContext';
import { useContext } from 'react';
import axios from 'axios';

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const {playwithId} = useContext(PlayerContext);
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const response = await axios.get(`${url}/api/auth/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch history:', error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, [loading,]);

  if (loading) return <div className='grid place-items-center min-h-[80vh]'>
    <div className='w-16 h-16 place-self-center border-4 border-gray-500 border-t-blue-700 rounded-full animate-spin'>
    </div>
  </div>;
  

  return (
    <div className="p-4 text-white">

      {history.length === 0 ? (
        <div>
          <p>No history available.</p>
        </div>
      ) : (
        <>
          <h1 className='font-bold my-5 text-2xl'>History</h1>
          <p className='text-gray-400 text-xl mb-4'>Your recently played songs</p>

          <div className='grid grid-cols-3 sm:grid-col-4 mt-10 mb-4 pl-2 text-color-[#a7a7a7]'>
            <p className='mr-4'># Title</p>
            <p className='hidden sm:block'>Date Added</p>
            <FaRegClock className='text-xl' />
          </div>
          <hr />
          {history.map((item, index) => {
            return (
              <div key={index} onClick={() => playwithId(item.songId._id)} className='grid grid-cols-3 sm:grid-col-4 mt-2 mb-4 pl-2 hover:scale-[1.02] transition-transform duration-200 ease-in-out cursor-pointer'>
                <p className='mr-4 flex gap-3'>
                  <b>{index + 1}</b>
                  <img src={item.songId.image} className='w-10 h-10 rounded-full' alt="" />
                  {item.songId.name}
                </p>
                <p className='hidden sm:block'>{new Date(item.playedAt).toLocaleString()}</p>
                <p>{item.songId.duration}</p>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

export default History;
