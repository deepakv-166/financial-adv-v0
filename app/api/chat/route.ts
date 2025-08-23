import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

async function getUserProfile(userId: string) {
  try {
    const supabase = await createClient()
    const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

    return profile
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

async function saveToHistory(userId: string, message: string, response: string, context: string) {
  try {
    const supabase = await createClient()
    await supabase.from("chat_history").insert({
      user_id: userId,
      message,
      response,
      context,
    })
  } catch (error) {
    console.error("Error saving chat history:", error)
  }
}

function buildContextualPrompt(message: string, context: string, userProfile: any, history: any[]) {
  let systemPrompt = `You are a professional AI Financial Advisor powered by Google Gemini. You provide helpful, accurate, and personalized financial guidance.

IMPORTANT GUIDELINES:
- Always provide educational, informative responses
- Never give specific investment recommendations for individual stocks
- Always suggest consulting with qualified financial professionals for major decisions
- Use Indian financial context (INR, Indian financial products, regulations)
- Be conversational but professional
- Keep responses concise but comprehensive

CONTEXT: You are currently in the ${context} advisory portal.`

  // Add user profile context if available
  if (userProfile) {
    systemPrompt += `

USER PROFILE:
- Age: ${userProfile.age || "Not specified"}
- Monthly Income: ₹${userProfile.monthly_income || "Not specified"}
- Monthly Expenses: ₹${userProfile.monthly_expenses || "Not specified"}
- Current Savings: ₹${userProfile.current_savings || "Not specified"}
- Dependents: ${userProfile.dependents || 0}
- Risk Tolerance: ${userProfile.risk_tolerance || "Not specified"}
- Investment Experience: ${userProfile.investment_experience || "Not specified"}

Please personalize your advice based on this profile when relevant.`
  }

  // Add context-specific guidance
  const contextGuidance = {
    financial:
      "Focus on budgeting, savings strategies, emergency funds, retirement planning, and general financial wellness.",
    loan: "Focus on loan eligibility, EMI calculations, debt management, credit scores, and loan comparisons.",
    investment:
      "Focus on investment strategies, portfolio allocation, SIP planning, mutual funds, and risk management.",
    insurance: "Focus on insurance needs assessment, coverage calculations, policy comparisons, and claim guidance.",
    general: "Provide comprehensive financial guidance across all areas.",
  }

  systemPrompt += `\n\nSPECIALIZATION: ${contextGuidance[context as keyof typeof contextGuidance] || contextGuidance.general}`

  // Add conversation history context
  if (history && history.length > 0) {
    systemPrompt += `\n\nRECENT CONVERSATION CONTEXT:\n`
    history.slice(-3).forEach((msg: any, index: number) => {
      systemPrompt += `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}\n`
    })
  }

  systemPrompt += `\n\nUser's current question: ${message}`

  return systemPrompt
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Chat API called")

    const { message, context, history } = await request.json()
    console.log("[v0] Received message:", message, "context:", context)

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    console.log("[v0] User authenticated:", !!user)

    let userProfile = null
    if (user) {
      userProfile = await getUserProfile(user.id)
      console.log("[v0] User profile loaded:", !!userProfile)
    }

    const prompt = buildContextualPrompt(message, context || "general", userProfile, history)
    console.log("[v0] Calling Gemini API...")

    const GEMINI_API_KEY = "AIzaSyAQQR9QuaypbfPmhwFM5NNGMMd_BDcnKxQ"
    const GEMINI_API_URL =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent"

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    })

    console.log("[v0] Gemini API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Gemini API error:", errorText)
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I apologize, but I'm having trouble generating a response right now. Please try rephrasing your question."

    console.log("[v0] AI response generated successfully")

    if (user) {
      await saveToHistory(user.id, message, aiResponse, context || "general")
    }

    return NextResponse.json({
      response: aiResponse,
      context: context,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)

    const fallbackResponse =
      "I apologize, but I'm experiencing technical difficulties connecting to the AI service. Please try again in a moment, or consider consulting with a qualified financial advisor for immediate assistance."

    const context = "general" // Declare the context variable here

    return NextResponse.json({
      response: fallbackResponse,
      context: context,
      timestamp: new Date().toISOString(),
    })
  }
}
