"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Shield, Zap } from "lucide-react"

const riskQuestions = [
  {
    id: "age",
    question: "What is your age group?",
    options: [
      { value: "under-30", label: "Under 30", score: 4 },
      { value: "30-40", label: "30-40", score: 3 },
      { value: "40-50", label: "40-50", score: 2 },
      { value: "over-50", label: "Over 50", score: 1 },
    ],
  },
  {
    id: "investment-horizon",
    question: "What is your investment time horizon?",
    options: [
      { value: "less-than-2", label: "Less than 2 years", score: 1 },
      { value: "2-5", label: "2-5 years", score: 2 },
      { value: "5-10", label: "5-10 years", score: 3 },
      { value: "more-than-10", label: "More than 10 years", score: 4 },
    ],
  },
  {
    id: "market-volatility",
    question: "How would you react to a 20% drop in your portfolio value?",
    options: [
      { value: "panic-sell", label: "Panic and sell immediately", score: 1 },
      { value: "concerned-wait", label: "Be concerned but wait", score: 2 },
      { value: "stay-calm", label: "Stay calm and hold", score: 3 },
      { value: "buy-more", label: "Buy more at lower prices", score: 4 },
    ],
  },
  {
    id: "income-stability",
    question: "How stable is your income?",
    options: [
      { value: "very-stable", label: "Very stable (Government/Large Corp)", score: 4 },
      { value: "stable", label: "Stable (Regular salary)", score: 3 },
      { value: "variable", label: "Variable (Commission/Business)", score: 2 },
      { value: "uncertain", label: "Uncertain (Freelance/Startup)", score: 1 },
    ],
  },
  {
    id: "investment-experience",
    question: "What is your investment experience?",
    options: [
      { value: "beginner", label: "Beginner (FD/Savings only)", score: 1 },
      { value: "basic", label: "Basic (Some mutual funds)", score: 2 },
      { value: "intermediate", label: "Intermediate (Stocks + MFs)", score: 3 },
      { value: "advanced", label: "Advanced (Options/Derivatives)", score: 4 },
    ],
  },
]

export function RiskProfiler() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [riskProfile, setRiskProfile] = useState<any>(null)

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const calculateRiskProfile = () => {
    let totalScore = 0
    let maxScore = 0

    riskQuestions.forEach((question) => {
      const answer = answers[question.id]
      if (answer) {
        const option = question.options.find((opt) => opt.value === answer)
        if (option) {
          totalScore += option.score
        }
      }
      maxScore += 4 // Maximum score per question
    })

    const scorePercentage = (totalScore / maxScore) * 100

    let profile = "Conservative"
    let profileColor = "secondary"
    let profileIcon = Shield
    let allocation = { equity: 30, debt: 60, gold: 10 }
    let expectedReturn = "8-10%"

    if (scorePercentage >= 75) {
      profile = "Aggressive"
      profileColor = "destructive"
      profileIcon = Zap
      allocation = { equity: 80, debt: 15, gold: 5 }
      expectedReturn = "12-15%"
    } else if (scorePercentage >= 50) {
      profile = "Balanced"
      profileColor = "default"
      profileIcon = TrendingUp
      allocation = { equity: 60, debt: 30, gold: 10 }
      expectedReturn = "10-12%"
    }

    setRiskProfile({
      profile,
      profileColor,
      profileIcon,
      score: totalScore,
      maxScore,
      scorePercentage,
      allocation,
      expectedReturn,
      recommendations: generateRecommendations(profile),
    })
  }

  const generateRecommendations = (profile: string) => {
    const recommendations = {
      Conservative: [
        "Focus on debt mutual funds and FDs for stability",
        "Consider hybrid funds for moderate growth",
        "Maintain 6-month emergency fund before investing",
        "Review portfolio quarterly, rebalance annually",
      ],
      Balanced: [
        "Mix of equity and debt funds for balanced growth",
        "Consider index funds for low-cost equity exposure",
        "SIP in diversified equity funds for long-term wealth",
        "Rebalance portfolio every 6 months",
      ],
      Aggressive: [
        "Focus on equity mutual funds and direct stocks",
        "Consider small-cap and mid-cap funds for higher returns",
        "Use market volatility to your advantage with SIPs",
        "Review and rebalance portfolio monthly",
      ],
    }

    return recommendations[profile as keyof typeof recommendations] || []
  }

  const isComplete = riskQuestions.every((q) => answers[q.id])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Investment Risk Profiler</CardTitle>
        <CardDescription>
          Answer these questions to determine your investment risk tolerance and get personalized recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {riskQuestions.map((question, index) => (
          <div key={question.id} className="space-y-3">
            <Label className="text-base font-medium">
              {index + 1}. {question.question}
            </Label>
            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              className="space-y-2"
            >
              {question.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                  <Label htmlFor={`${question.id}-${option.value}`} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}

        <Button onClick={calculateRiskProfile} disabled={!isComplete} className="w-full">
          Calculate Risk Profile
        </Button>

        {riskProfile && (
          <div className="mt-6 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-serif flex items-center justify-between">
                  <div className="flex items-center">
                    <riskProfile.profileIcon className="h-5 w-5 mr-2" />
                    Your Risk Profile
                  </div>
                  <Badge variant={riskProfile.profileColor as any}>{riskProfile.profile}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Risk Score</span>
                    <span>
                      {riskProfile.score}/{riskProfile.maxScore}
                    </span>
                  </div>
                  <Progress value={riskProfile.scorePercentage} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-chart-1">{riskProfile.allocation.equity}%</div>
                    <div className="text-xs text-muted-foreground">Equity</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-chart-2">{riskProfile.allocation.debt}%</div>
                    <div className="text-xs text-muted-foreground">Debt</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-chart-3">{riskProfile.allocation.gold}%</div>
                    <div className="text-xs text-muted-foreground">Gold</div>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm">
                    <strong>Expected Annual Return:</strong> {riskProfile.expectedReturn}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif font-semibold text-sm">Personalized Recommendations:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {riskProfile.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
