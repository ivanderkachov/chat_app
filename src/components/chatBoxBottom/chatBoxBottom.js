import React from "react";
import './chatBoxBottom.css'

const ChatBoxBottom = ({ setMessage, handleSubmit, message}) => {
  return (
    <div className="chatBoxBottom">
      <div className="chatBoxTextArea">
        <textarea
          type="text"
          rows="3"
          className="chatMessageInput"
          value={message}
          placeholder="Type your message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          type="button"
          className="chatSubmitButton"
          onClick={handleSubmit}
        >
          <svg
            className="chatButtonPaint"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatBoxBottom