import React from "react";
import ChatBox from "./_components/ChatBox";
import Itinerary from "./_components/Itinerary";

function CreateNewTrip() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Chatbox */}
      
      <div>
        <ChatBox/>
      </div>
    
      <div>
        <h2><Itinerary/></h2>
      </div>
    </div>
  );
}

export default CreateNewTrip;
