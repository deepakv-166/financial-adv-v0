"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, AlertCircle } from "lucide-react"

export function CreditScoreSimulator() {
  const [creditData, setCreditData] = useState({
    currentScore: "",
    paymentHistory: "",
    creditUtilization: "",
    creditAge: "",
    creditMix: "",
    newCredit: "",
  })

  const [improvements, setImprovements] = useState<any>(null)

  const simulateImprovements = () => {
    const currentScore = Number(creditData.currentScore)
    if (!currentScore) return

    // Credit score factors and their weights
    const factors = {
      paymentHistory: 35, // 35% weight
      creditUtilization: 30, // 30% weight
      creditAge: 15, // 15% weight
      creditMix: 10, // 10% weight
      newCredit: 10, // 10% weight
    }

    // Calculate current factor scores (0-100 scale)
    const currentFactors = {
      paymentHistory: getPaymentHistoryScore(creditData.paymentHistory),
      creditUtilization: getCreditUtilizationScore(Number(creditData.creditUtilization)),
      creditAge: getCreditAgeScore(Number(creditData.creditAge)),
      creditMix: getCreditMixScore(creditData.creditMix),
      newCredit: getNewCreditScore(creditData.newCredit),
    }

    // Simulate improvements
    const improvedFactors = {
      paymentHistory: Math.min(100, currentFactors.paymentHistory + 20),
      creditUtilization: getCreditUtilizationScore(10), // Optimal utilization
      creditAge: currentFactors.creditAge + 5, // Slight improvement over time
      creditMix: Math.min(100, currentFactors.creditMix + 15),
      newCredit: Math.min(100, currentFactors.newCredit + 10),
    }

    // Calculate weighted scores
    const currentWeightedScore = Object.entries(currentFactors).reduce(
      (sum, [key, value]) => sum + (value * factors[key as keyof typeof factors]) / 100,
      0,
    )

    const improvedWeightedScore = Object.entries(improvedFactors).reduce(
      (sum, [key, value]) => sum + (value * factors[key as keyof typeof factors]) / 100,
      0,
    )

    // Convert to credit score scale (300-850)
    const currentCalculatedScore = 300 + currentWeightedScore * 5.5
    const improvedCalculatedScore = 300 + improvedWeightedScore * 5.5

    const recommendations = generateRecommendations(currentFactors)

    setImprovements({
      current: Math.round(currentCalculatedScore),
      improved: Math.round(improvedCalculatedScore),
      increase: Math.round(improvedCalculatedScore - currentCalculatedScore),
      currentFactors,
      improvedFactors,
      recommendations,
    })
  }

  const getPaymentHistoryScore = (history: string) => {
    switch (history) {
      case "excellent":
        return 95
      case "good":
        return 80
      case "fair":
        return 60
      case "poor":
        return 30
      default:
        return 50
    }
  }

  const getCreditUtilizationScore = (utilization: number) => {
    if (utilization <= 10) return 100
    if (utilization <= 30) return 80
    if (utilization <= 50) return 60
    if (utilization <= 70) return 40
    return 20
  }

  const getCreditAgeScore = (age: number) => {
    if (age >= 10) return 100
    if (age >= 5) return 80
    if (age >= 2) return 60
    return 40
  }

  const getCreditMixScore = (mix: string) => {
    switch (mix) {
      case "excellent":
        return 90
      case "good":
        return 75
      case "fair":
        return 60
      case "poor":
        return 40
      default:
        return 50
    }
  }

  const getNewCreditScore = (newCredit: string) => {
    switch (newCredit) {
      case "none":
        return 100
      case "minimal":
        return 80
      case "moderate":
        return 60
      case "high":
        return 30
      default:
        return 50
    }
  }

  const generateRecommendations = (factors: any) => {
    const recommendations = []

    if (factors.paymentHistory < 80) {
      recommendations.push({
        factor: "Payment History",
        action: "Set up automatic payments to ensure all bills are paid on time",
        impact: "High",
        timeframe: "3-6 months",
      })
    }

    if (factors.creditUtilization < 80) {
      recommendations.push({
        factor: "Credit Utilization",
        action: "Keep credit card balances below 10% of credit limits",
        impact: "High",
        timeframe: "1-2 months",
      })
    }

    if (factors.creditMix < 70) {
      recommendations.push({
        factor: "Credit Mix",
        action: "Consider adding different types of credit (installment loans, etc.)",
        impact: "Medium",
        timeframe: "6-12 months",
      })
    }

    if (factors.newCredit < 70) {
      recommendations.push({
        factor: "New Credit",
        action: "Avoid applying for new credit cards or loans for 6-12 months",
        impact: "Medium",
        timeframe: "6-12 months",
      })
    }

    return recommendations
  }

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-chart-2"
    if (score >= 700) return "text-chart-3"
    if (score >= 650) return "text-chart-4"
    return "text-destructive"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 750) return "Excellent"
    if (score >= 700) return "Good"
    if (score >= 650) return "Fair"
    return "Poor"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Credit Score Simulator
          </CardTitle>
          <CardDescription>Analyze your credit profile and see how improvements can boost your score</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentScore">Current Credit Score</Label>
              <Input
                id="currentScore"
                type="number"
                placeholder="720"
                value={creditData.currentScore}
                onChange={(e) => setCreditData({ ...creditData, currentScore: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="creditUtilization">Credit Utilization (%)</Label>
              <Input
                id="creditUtilization"
                type="number"
                placeholder="25"
                value={creditData.creditUtilization}
                onChange={(e) => setCreditData({ ...creditData, creditUtilization: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentHistory">Payment History</Label>
              <Select
                value={creditData.paymentHistory}
                onValueChange={(value) => setCreditData({ ...creditData, paymentHistory: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment history" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent (No missed payments)</SelectItem>
                  <SelectItem value="good">Good (1-2 late payments)</SelectItem>
                  <SelectItem value="fair">Fair (3-5 late payments)</SelectItem>
                  <SelectItem value="poor">Poor (6+ late payments)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="creditAge">Average Credit Age (Years)</Label>
              <Input
                id="creditAge"
                type="number"
                placeholder="5"
                value={creditData.creditAge}
                onChange={(e) => setCreditData({ ...creditData, creditAge: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="creditMix">Credit Mix</Label>
              <Select
                value={creditData.creditMix}
                onValueChange={(value) => setCreditData({ ...creditData, creditMix: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select credit mix" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent (Cards + Loans)</SelectItem>
                  <SelectItem value="good">Good (Multiple types)</SelectItem>
                  <SelectItem value="fair">Fair (Limited types)</SelectItem>
                  <SelectItem value="poor">Poor (Only one type)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newCredit">Recent Credit Inquiries</Label>
              <Select
                value={creditData.newCredit}
                onValueChange={(value) => setCreditData({ ...creditData, newCredit: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select inquiry level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (0 inquiries)</SelectItem>
                  <SelectItem value="minimal">Minimal (1-2 inquiries)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-4 inquiries)</SelectItem>
                  <SelectItem value="high">High (5+ inquiries)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={simulateImprovements} className="w-full">
            Simulate Credit Score Improvements
          </Button>
        </CardContent>
      </Card>

      {improvements && (
        <Tabs defaultValue="simulation" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simulation">Score Simulation</TabsTrigger>
            <TabsTrigger value="recommendations">Improvement Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="simulation">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif flex items-center justify-between">
                  Credit Score Projection
                  <Badge variant="secondary">Demo Simulation</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className={`text-2xl font-bold ${getScoreColor(improvements.current)}`}>
                      {improvements.current}
                    </div>
                    <div className="text-sm text-muted-foreground">Current Score</div>
                    <Badge variant="outline" className="mt-1">
                      {getScoreLabel(improvements.current)}
                    </Badge>
                  </div>
                  <div className="p-4 bg-chart-2/10 rounded-lg">
                    <div className={`text-2xl font-bold ${getScoreColor(improvements.improved)}`}>
                      {improvements.improved}
                    </div>
                    <div className="text-sm text-muted-foreground">Potential Score</div>
                    <Badge variant="default" className="mt-1">
                      {getScoreLabel(improvements.improved)}
                    </Badge>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <div className="text-2xl font-bold text-accent flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 mr-1" />+{improvements.increase}
                    </div>
                    <div className="text-sm text-muted-foreground">Potential Increase</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-serif font-semibold">Factor Analysis:</h4>

                  {Object.entries(improvements.currentFactors).map(([factor, score]) => {
                    const improvedScore = improvements.improvedFactors[factor]
                    const factorNames = {
                      paymentHistory: "Payment History (35%)",
                      creditUtilization: "Credit Utilization (30%)",
                      creditAge: "Credit Age (15%)",
                      creditMix: "Credit Mix (10%)",
                      newCredit: "New Credit (10%)",
                    }

                    return (
                      <div key={factor} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{factorNames[factor as keyof typeof factorNames]}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">{Math.round(score as number)}</span>
                            <span>→</span>
                            <span className="font-semibold text-chart-2">{Math.round(improvedScore)}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Progress value={score as number} className="h-2 flex-1" />
                          <Progress value={improvedScore} className="h-2 flex-1" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Credit Improvement Action Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {improvements.recommendations.map((rec: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium">{rec.factor}</h5>
                        <div className="flex items-center space-x-2">
                          <Badge variant={rec.impact === "High" ? "default" : "secondary"}>{rec.impact} Impact</Badge>
                          <Badge variant="outline">{rec.timeframe}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.action}</p>
                    </CardContent>
                  </Card>
                ))}

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-accent mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">Important Notes:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Credit score improvements take time - be patient and consistent</li>
                        <li>• Focus on payment history and credit utilization for maximum impact</li>
                        <li>• Avoid closing old credit cards as it reduces average credit age</li>
                        <li>• Monitor your credit report regularly for errors and disputes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
