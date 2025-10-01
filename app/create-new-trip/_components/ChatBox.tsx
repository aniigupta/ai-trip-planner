"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { Send } from "lucide-react"
import { useState } from "react"
import BudgetUi from "./BudgetUi"
import EmptyBoxState from "./EmptyBoxState"
import GroupSizeUi from "./GroupSizeUi"

type Message = {
  role: string
  content: string
  ui?: string
}

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const onSend = async (input?: string) => {
    const content = input ?? userInput
    if (!content.trim() || loading) return

    const newMsg: Message = { role: "user", content }
    const thinkingMsg: Message = { role: "assistant", content: "Thinking..." }

    setMessages((prev) => [...prev, newMsg, thinkingMsg])
    setUserInput("")
    setLoading(true)

    try {
      const res = await axios.post("/api/aimodel", {
        messages: [...messages, newMsg],
      })

      const aiContent = res.data?.text || res.data?.resp || "No response"

      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: "assistant", content: aiContent }
        return updated
      })
    } catch (err) {
      console.error(err)
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  const RenderGenerativeUi = (ui: string) => {
    if (ui == 'budget') {
      return <BudgetUi onSelectedOption={(v: string) => { setUserInput(v); onSend(v) }} />
    } else if (ui == 'groupSize') {
      return <GroupSizeUi onSelectedOption={(v: string) => { setUserInput(v); onSend(v) }} />
    }
    return null
  }

  return (
    <div className="h-[85vh] flex flex-col">
      {messages.length === 0 && (
        <EmptyBoxState onSelectOption={(v: string) => onSend(v)} />
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
              {RenderGenerativeUi(msg.ui ?? '')}

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
  )
}

export default ChatBox
