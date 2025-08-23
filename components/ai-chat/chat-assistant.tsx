"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User, Minimize2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatAssistantProps {
  context: "financial" | "loan" | "investment" | "insurance" | "general"
  className?: string
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ChatAssistant({ context, className = "", isOpen, onOpenChange }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [internalMinimized, setInternalMinimized] = useState(true)
  const [user, setUser] = useState<any>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isMinimized = isOpen !== undefined ? !isOpen : internalMinimized
  const setIsMinimized = onOpenChange ? (minimized: boolean) => onOpenChange(!minimized) : setInternalMinimized

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()

    const welcomeMessage: Message = {
      id: "welcome",
      role: "assistant",
      content: getWelcomeMessage(context),
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [context])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const getWelcomeMessage = (context: string) => {
    const messages = {
      financial:
        "Hello! I'm your AI Financial Advisor powered by Google Gemini. I can help you with budgeting, savings strategies, retirement planning, and general financial guidance. What would you like to discuss?",
      loan: "Hi! I'm here to assist you with loan-related queries using advanced AI. I can help you understand different loan types, EMI calculations, eligibility criteria, and debt management strategies. How can I help?",
      investment:
        "Welcome! I'm your AI Investment Advisor powered by Google Gemini. I can guide you through investment options, portfolio planning, risk assessment, and market insights. What investment topic interests you?",
      insurance:
        "Hello! I'm your AI Insurance Advisor using Google Gemini. I can help you understand insurance types, coverage needs, premium calculations, and claim processes. What insurance question do you have?",
      general:
        "Hi! I'm your Smart Financial Advisor AI powered by Google Gemini. I can assist you with financial planning, loans, investments, and insurance queries. How can I help you today?",
    }
    return messages[context] || messages.general
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) {
      console.log("[v0] Message sending blocked - input:", input.trim(), "isLoading:", isLoading)
      return
    }

    console.log("[v0] Sending message:", input.trim())

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => {
      console.log("[v0] Adding user message to state:", userMessage)
      return [...prev, userMessage]
    })

    const messageToSend = input.trim()
    setInput("")
    setIsLoading(true)

    try {
      console.log("[v0] Making API call to /api/chat")
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageToSend,
          context,
          history: messages.slice(-5),
        }),
      })

      console.log("[v0] API response status:", response.status)

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      console.log("[v0] API response data:", data)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      console.log("[v0] Adding assistant message to state:", assistantMessage)
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I apologize, but I'm having trouble connecting right now. Please try again in a moment. For immediate assistance, consider consulting with a qualified financial advisor.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      console.log("[v0] Message sending completed, isLoading set to false")
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 100)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (isMinimized) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-14 h-14 shadow-lg bg-accent hover:bg-accent/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <Card className="w-full h-[500px] shadow-xl border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif text-lg flex items-center">
              <Bot className="h-5 w-5 mr-2 text-accent" />
              AI Financial Advisor
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                Google Gemini
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => setIsMinimized(true)} className="h-8 w-8 p-0">
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-[420px]">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div
                    className={`max-w-[280px] p-3 rounded-lg text-sm ${
                      message.role === "user" ? "bg-accent text-accent-foreground ml-auto" : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted text-foreground p-3 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  console.log("[v0] Input changed:", e.target.value)
                  setInput(e.target.value)
                }}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about financial planning..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button onClick={sendMessage} disabled={isLoading || !input.trim()} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Powered by Google Gemini. AI responses are for educational purposes only. Consult professionals for
              personalized advice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
