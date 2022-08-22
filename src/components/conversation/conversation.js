import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";


import './conversation.css'
import importAll from "../../images/imageLoader";

const images = importAll(
  require.context("../../images", false, /\.(png|jpe?g|svg)$/)
);

const Conversation = ({conversation, user, toggle, setDivToggle }) => {

  const users = useSelector((store) => store.chat.users)
  const friendId = conversation.members.find((member) => member !== user._id)
  const friendName = users[friendId].name
  const friendPhoto = users[friendId].photo
  const lastMessage = conversation.messages[conversation.messages.length-1]

  return (
    <div className="conversationContainer" >
      <div className="conversationData">
        <img className="conversationImg" src={friendPhoto ? images[`${friendName}.jpeg`] : images['Nophoto.png']} alt="img" />
        <div className="conversationText">
          <span className="conversationName">{users[friendId].name}</span>
          <span className="conversationLastMessage">{lastMessage ? lastMessage.text : ""}</span>
        </div>
      </div>
      <div className="conversationLastMessageDate">
        {lastMessage ? dateFormat(lastMessage.createdAt, "mmm d, yyyy") : ""}
      </div>
    </div>
  );
}

export default Conversation