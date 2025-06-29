import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { url } from '../context/PlayerContext';
import axios from 'axios';
import { PlayerContext } from '../context/PlayerContext';

import {
  FaUserEdit,
  FaRedo,
  FaMapMarkerAlt,
  FaMoneyCheckAlt,
  FaCreditCard,
  FaGift,
  FaClock,
  FaThLarge,
  FaBell,
  FaUserShield,
  FaSignInAlt,
  FaKey,
  FaSignOutAlt,

} from "react-icons/fa";
import { useEffect } from 'react';


function Profile() {
  const {isLoggedIn, setIsLoggedIn} = useContext(PlayerContext);
  const linkClasses =
    "flex items-center justify-between p-3 bg-gray-800 rounded-md hover:bg-gray-700 transition";

  const innerContentClasses = "flex items-center gap-3 text-sm font-medium";
  const arrowClasses = "text-gray-400";
  const links = [
    {
      to: "/in-en/account/apps/",
      icon: <FaThLarge className="text-gray-400" />,
      label: "Manage apps",
    },
    {
      to: "/in-en/account/notifications/",
      icon: <FaBell className="text-gray-400" />,
      label: "Notification settings",
    },
    {
      to: "/in-en/account/privacy/",
      icon: <FaUserShield className="text-gray-400" />,
      label: "Account privacy",
    },
    {
      to: "/in-en/account/login-methods/",
      icon: <FaSignInAlt className="text-gray-400" />,
      label: "Edit login methods",
    },
    {
      to: "/in-en/account/set-device-password/",
      icon: <FaKey className="text-gray-400" />,
      label: "Set device password",
    },
    {
      to: "/in-en/account/sign-out-everywhere/",
      icon: <FaSignOutAlt className="text-gray-400" />,
      label: "Sign out everywhere",
    },
  ];
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.get(`${url}/api/auth/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUsername(response.data.user.name);
      setEmail(response.data.user.email);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <p
        onClick={() => {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        }}
        className="text-black bg-white px-2 py-1 block rounded-2xl text-[16px] md:hidden cursor-pointer m-4"
      >
        Logout
      </p>
      <div
        className="p-4 bg-transparent hover:bg-gray-800 rounded-md focus:outline-none cursor-pointer transition-all m-4 duration-300"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base text-white font-medium mb-1">Your Subscription</h2>
            <span className="text-5xl font-semibold text-white">Free Plan</span>
          </div>
          <img src='/logo.png' alt="" className='bg-white w-16 rounded-full' />
        </div>
      </div>
      <div
        className="p-4  bg-gray-800 rounded-md focus:outline-none cursor-pointer m-4 "
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-5xl font-semibold text-white">{username}</span>
            <h2 className=" text-white text-xl font-medium">{email}</h2>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-10"></div>
      <div className="p-4 space-y-10">
        {/* Account Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Account</h2>
          <ul className="space-y-3">
            <li>
              <Link to="" className={linkClasses}>
                <div className={innerContentClasses}>
                  <FaMoneyCheckAlt className="text-gray-400" />
                  <span>Manage your subscription</span>
                </div>
                <span className={arrowClasses}>&rarr;</span>
              </Link>
            </li>
            <li>
              <Link to="/in-en/account/profile/" className={linkClasses}>
                <div className={innerContentClasses}>
                  <FaUserEdit className="text-gray-400" />
                  <span>Edit personal info</span>
                </div>
                <span className={arrowClasses}>&rarr;</span>
              </Link>
            </li>
            <li>
              <Link to="/in-en/account/recover-playlists/" className={linkClasses}>
                <div className={innerContentClasses}>
                  <FaRedo className="text-gray-400" />
                  <span>Recover playlists</span>
                </div>
                <span className={arrowClasses}>&rarr;</span>
              </Link>
            </li>
            <li>
              <Link to="/in-en/account/address/" className={linkClasses}>
                <div className={innerContentClasses}>
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span>Address</span>
                </div>
                <span className={arrowClasses}>&rarr;</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Payment Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Payment</h2>
          <ul className="space-y-3">
            <li>
              <Link to="/in-en/account/order-history/" className={linkClasses}>
                <div className={innerContentClasses}>
                  <FaClock className="text-gray-400" />
                  <span>Order history</span>
                </div>
                <span className={arrowClasses}>&rarr;</span>
              </Link>
            </li>
            <li>
              <Link to="/in-en/account/saved-payment-cards/" className={linkClasses}>
                <div className={innerContentClasses}>
                  <FaCreditCard className="text-gray-400" />
                  <span>Saved payment cards</span>
                </div>
                <span className={arrowClasses}>&rarr;</span>
              </Link>
            </li>
            <li>
              <Link to="/in-en/account/redeem/" className={linkClasses}>
                <div className={innerContentClasses}>
                  <FaGift className="text-gray-400" />
                  <span>Redeem</span>
                </div>
                <span className={arrowClasses}>&rarr;</span>
              </Link>
            </li>
          </ul>
        </div>
        <div >
          <h2 className="text-2xl font-semibold mb-4">Security and privacy</h2>
          <ul className="space-y-3">
            {links.map(({ to, icon, label }, index) => (
              <li key={index}>
                <Link
                  to={to}
                  className={linkClasses}
                >
                  <div className={innerContentClasses}>
                    {icon}
                    <span>{label}</span>
                  </div>
                  <span className={arrowClasses}>&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Profile;
