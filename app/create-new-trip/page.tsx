import React from "react";
import ChatBox from "./_components/ChatBox";

function CreateNewTrip() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Chatbox */}
      
      <div>
        <ChatBox/>
      </div>
    
      <div>
        <h2>Map and Trip Plan</h2>
      </div>
    </div>
  );
}

export default CreateNewTrip;
