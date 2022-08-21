import React from "react";
import dateFormat from "dateformat";
import { useSelector } from "react-redux";


import './message.css'
import importAll from "../../images/imageLoader";

const images = importAll(
  require.context("../../images", false, /\.(png|jpe?g|svg)$/)
);

const Message = ({ message, sender, time, own }) => {
  const users = useSelector((store) => store.chat.users)
  const userPhoto = users[sender].photo
  const userName = users[sender].name
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={userPhoto ? images[`${userName}.jpeg`] : images['Nophoto.png']} alt=""/>
        <p className="messageText">{message}</p>
      </div>
      <div className="messageBottom">{dateFormat(time, "m/d/yy, h:MM TT")}</div>
    </div>
  )
}

export default Message