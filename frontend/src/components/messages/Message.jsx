import React from "react";

function Message() {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://api.lorem.space/image/face?hash=33791"
            alt="chat bubble component"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-400`}>Hello how are you</div>
      <div className="chat-footer opacity-50">10:30</div>
    </div>
  );
}

export default Message;
