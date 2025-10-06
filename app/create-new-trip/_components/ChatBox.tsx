"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import BudgetUi from "./BudgetUi";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import SelectDaysUi from "./SelectDaysUi";
import FinalUi from "./FinalUi";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

export type TripInfo={
  budget:string,
  destination:string,
  duration:string,
  group_size:string,
  origin:string,
  hotels:any,
  itinerary:any
}

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetail, setTripDetail] = useState<TripInfo>();

  const onSend = async (input?: string) => {
    const content = input ?? userInput;
    if (!content.trim() || loading) return;

    const newMsg: Message = { role: "user", content };
    const thinkingMsg: Message = { role: "assistant", content: "Thinking..." };

    // If it's not the final step, continue showing normal message flow
    if (!isFinal) {
      setMessages((prev) => [...prev, newMsg, thinkingMsg]);
    }

    setUserInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/aimodel", {
        messages: [...messages, newMsg],
        isFinal: isFinal,
      });

      const result = res.data;
      const aiContent = result?.text || result?.resp || "No response";

      if (!isFinal) {
        // 🧠 Update the last assistant message with AI content
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: aiContent,
            ui: result?.ui, // optional: AI decides next UI step
          };
          return updated;
        });
      } else {
        // ✅ When the trip is finalized
        setTripDetail(result?.trip_plan);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Your trip has been planned successfully!" },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  // 🌟 Render dynamic UI components depending on AI's next step
  const RenderGenerativeUi = (ui: string) => {
    switch (ui) {
      case "budget":
        return <BudgetUi onSelectedOption={(v: string) => onSend(v)} />;
      case "groupSize":
        return <GroupSizeUi onSelectedOption={(v: string) => onSend(v)} />;
      case "selectDays":
        return <SelectDaysUi onSelectedOption={(v: string) => onSend(v)} />;
      case "final":
        return <FinalUi viewTrip={() => console.log("Viewing trip...")}
          disable={!tripDetail} />;
      default:
        return null;
    }
  };

  //  When UI = 'final', automatically trigger final trip generation
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui === "final") {
      setIsFinal(true);
      setUserInput("ok great");
      onSend("ok great");
    }
  }, [messages]);

  return (
    <div className="h-[85vh] flex flex-col">
      {/* Empty chat state */}
      {messages.length === 0 && (
        <EmptyBoxState onSelectOption={(v) => onSend(v)} />
      )}

      {/* Messages Section */}
      <section className="flex-1 overflow-auto p-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
              } mt-2`}
          >
            <div
              className={`max-w-lg px-4 py-2 rounded-lg ${msg.role === "user"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black"
                }`}
            >
              {msg.content}
              {RenderGenerativeUi(msg.ui ?? "")}
            </div>
          </div>
        ))}
      </section>

      {/* Input Section */}
      <section>
        <div className="border rounded-2xl p-4 mt-4 flex w-full max-w-2xl shadow-lg bg-white">
          <Textarea
            placeholder="Create a trip for Paris from New Delhi"
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          />
          <Button
            size="icon"
            className="self-end ml-2"
            onClick={() => onSend()}
            disabled={loading}
          >
            <Send />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ChatBox;
