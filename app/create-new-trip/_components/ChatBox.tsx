"use client";

import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UserDetail {
  _id: string;
  name?: string;
  email?: string;
}

const ChatBox = ({ userDetail }: { userDetail: UserDetail }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetail, setTripDetail] = useState<any>(null);

  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);


  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      const result = await axios.post("/api/ai", {
        message: input,
      });

      const content = result?.data?.resp;
      const isFinalResponse = result?.data?.isFinal || false;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content,
        },
      ]);

      // When final trip plan is generated
      if (isFinalResponse) {
        const tripData = result?.data?.trip_plan;
        const tripId = uuidv4();

        setTripDetail(tripData);
        setIsFinal(true);
        setLoading(false);

        // Save to Convex
        await SaveTripDetail({
          tripId,
          uid: userDetail?._id as Id<"UserTable">,
          tripDetail: tripData,
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error generating trip:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto bg-white shadow-md rounded-xl p-4 mt-6">
      <div className="flex flex-col gap-3 h-[400px] overflow-y-auto border-b pb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl ${
              msg.role === "user"
                ? "bg-primary text-white self-end"
                : "bg-gray-100 text-gray-800 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="text-gray-500 italic text-sm animate-pulse">
            AI is thinking...
          </div>
        )}
      </div>

      {!isFinal && (
        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ask about your dream trip..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} disabled={loading}>
            Send
          </Button>
        </div>
      )}

      {isFinal && tripDetail && (
        <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow-inner">
          <h2 className="text-lg font-semibold text-primary mb-2">
            🎯 Your Trip Plan
          </h2>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">
            {JSON.stringify(tripDetail, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
