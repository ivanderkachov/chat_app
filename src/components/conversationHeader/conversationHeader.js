import React from "react";
import { useSelector } from "react-redux";


import './conversationHeader.css'
import importAll from "../../images/imageLoader";

const images = importAll(
  require.context("../../images", false, /\.(png|jpe?g|svg)$/)
);

const ConversationHeader = ({ conversation, user }) => {
  const users = useSelector((store) => store.chat.users);
  const friendId = conversation.members.find((member) => member !== user._id);
  const friendName = users[friendId].name;
  const friendPhoto = users[friendId].photo;

  return (
    <div className="headerData">
      <img className="headerDataImg" src={friendPhoto ? images[`${friendName}.jpeg`] : images['Nophoto.png']} alt=""/>
      <span className="headerDataName">{users[friendId].name}</span>
    </div>
  )
}

export default ConversationHeader