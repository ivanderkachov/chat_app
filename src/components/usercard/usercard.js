import React from "react";


import './usercard.css'
import importAll from "../../images/imageLoader";

const images = importAll(
  require.context("../../images", false, /\.(png|jpe?g|svg)$/)
);

const Usercard = ({ user, conversations }) => {
  const convExist = Object.values(conversations).find((c) => c.members.includes(user._id))

  return (
    <div className="userContainer">
      <img className="userImg" src={user.photo ? images[`${user.name}.jpeg`] : images['Nophoto.png']} alt="" />
      <span className="userName">
        {convExist ? (
          <>
            <span>{user.name}</span>
            <span className="action"> Continue conversation</span>
          </>
        ) : (
          <>
            <span>{user.name}</span>
            <span className="action"> Add to chat list</span>
          </>
        )}
      </span>
    </div>
  );
}

export default Usercard