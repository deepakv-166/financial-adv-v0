"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, PieChart } from "lucide-react"

interface Holding {
  id: string
  name: string
  type: "equity" | "debt" | "gold" | "real-estate"
  amount: number
  currentValue: number
}

export function PortfolioAnalyzer() {
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [newHolding, setNewHolding] = useState({
    name: "",
    type: "equity" as const,
    amount: "",
    currentValue: "",
  })
  const [analysis, setAnalysis] = useState<any>(null)

  const addHolding = () => {
    if (newHolding.name && newHolding.amount && newHolding.currentValue) {
      const holding: Holding = {
        id: Date.now().toString(),
        name: newHolding.name,
        type: newHolding.type,
        amount: Number(newHolding.amount),
        currentValue: Number(newHolding.currentValue),
      }
      setHoldings([...holdings, holding])
      setNewHolding({ name: "", type: "equity", amount: "", currentValue: "" })
    }
  }

  const removeHolding = (id: string) => {
    setHoldings(holdings.filter((holding) => holding.id !== id))
  }

  const analyzePortfolio = () => {
    if (holdings.length === 0) return

    const totalInvested = holdings.reduce((sum, holding) => sum + holding.amount, 0)
    const totalCurrent = holdings.reduce((sum, holding) => sum + holding.currentValue, 0)
    const totalGainLoss = totalCurrent - totalInvested
    const totalReturn = ((totalGainLoss / totalInvested) * 100).toFixed(2)

    // Asset allocation
    const allocation = holdings.reduce(
      (acc, holding) => {
        acc[holding.type] = (acc[holding.type] || 0) + holding.currentValue
        return acc
      },
      {} as Record<string, number>,
    )

    const allocationPercentage = Object.entries(allocation).map(([type, value]) => ({
      type,
      value,
      percentage: ((value / totalCurrent) * 100).toFixed(1),
    }))

    // Risk analysis
    const equityPercentage = ((allocation.equity || 0) / totalCurrent) * 100
    let riskLevel = "Conservative"
    let riskColor = "secondary"

    if (equityPercentage >= 70) {
      riskLevel = "Aggressive"
      riskColor = "destructive"
    } else if (equityPercentage >= 40) {
      riskLevel = "Balanced"
      riskColor = "default"
    }

    // Diversification score (simplified)
    const diversificationScore = Math.min(100, holdings.length * 10 + (Object.keys(allocation).length - 1) * 20)

    // Recommendations
    const recommendations = generatePortfolioRecommendations(
      allocationPercentage,
      diversificationScore,
      equityPercentage,
    )

    setAnalysis({
      totalInvested,
      totalCurrent,
      totalGainLoss,
      totalReturn,
      allocationPercentage,
      riskLevel,
      riskColor,
      diversificationScore,
      recommendations,
    })
  }

  const generatePortfolioRecommendations = (
    allocation: any[],
    diversificationScore: number,
    equityPercentage: number,
  ) => {
    const recommendations = []

    if (diversificationScore < 60) {
      recommendations.push("Increase diversification by adding more asset classes or holdings")
    }

    if (equityPercentage > 80) {
      recommendations.push("Consider reducing equity exposure and adding debt instruments for stability")
    } else if (equityPercentage < 30) {
      recommendations.push("Consider increasing equity allocation for better long-term growth potential")
    }

    const hasGold = allocation.some((item) => item.type === "gold")
    if (!hasGold) {
      recommendations.push("Consider adding 5-10% gold allocation for portfolio diversification")
    }

    if (allocation.length < 3) {
      recommendations.push("Diversify across multiple asset classes (equity, debt, gold, real estate)")
    }

    return recommendations
  }

  const getTypeColor = (type: string) => {
    const colors = {
      equity: "bg-chart-1",
      debt: "bg-chart-2",
      gold: "bg-chart-3",
      "real-estate": "bg-chart-4",
    }
    return colors[type as keyof typeof colors] || "bg-secondary"
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      equity: "Equity",
      debt: "Debt",
      gold: "Gold",
      "real-estate": "Real Estate",
    }
    return labels[type as keyof typeof labels] || type
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <PieChart className="h-5 w-5 mr-2" />
            Portfolio Analyzer
          </CardTitle>
          <CardDescription>
            Add your investments to analyze asset allocation and get optimization suggestions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="holdingName">Investment Name</Label>
              <Input
                id="holdingName"
                placeholder="Nifty 50 Index Fund"
                value={newHolding.name}
                onChange={(e) => setNewHolding({ ...newHolding, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="holdingType">Asset Type</Label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={newHolding.type}
                onChange={(e) => setNewHolding({ ...newHolding, type: e.target.value as any })}
              >
                <option value="equity">Equity</option>
                <option value="debt">Debt</option>
                <option value="gold">Gold</option>
                <option value="real-estate">Real Estate</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="investedAmount">Invested Amount (₹)</Label>
              <Input
                id="investedAmount"
                type="number"
                placeholder="100000"
                value={newHolding.amount}
                onChange={(e) => setNewHolding({ ...newHolding, amount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentValue">Current Value (₹)</Label>
              <Input
                id="currentValue"
                type="number"
                placeholder="120000"
                value={newHolding.currentValue}
                onChange={(e) => setNewHolding({ ...newHolding, currentValue: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={addHolding} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Investment
          </Button>
        </CardContent>
      </Card>

      {holdings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Your Portfolio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {holdings.map((holding) => {
              const gainLoss = holding.currentValue - holding.amount
              const returnPercentage = ((gainLoss / holding.amount) * 100).toFixed(2)

              return (
                <div key={holding.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(holding.type)}`}></div>
                      <span className="font-medium">{holding.name}</span>
                      <Badge variant="outline">{getTypeLabel(holding.type)}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ₹{holding.amount.toLocaleString()} → ₹{holding.currentValue.toLocaleString()} (
                      <span className={gainLoss >= 0 ? "text-chart-2" : "text-destructive"}>
                        {gainLoss >= 0 ? "+" : ""}
                        {returnPercentage}%
                      </span>
                      )
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeHolding(holding.id)} className="h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )
            })}

            <Button onClick={analyzePortfolio} className="w-full">
              Analyze Portfolio
            </Button>
          </CardContent>
        </Card>
      )}

      {analysis && (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif flex items-center justify-between">
                  Portfolio Performance
                  <Badge variant="secondary">Demo Analysis</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">₹{analysis.totalInvested.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Invested</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-chart-2">₹{analysis.totalCurrent.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Current Value</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <div
                      className={`text-xl font-bold ${analysis.totalGainLoss >= 0 ? "text-chart-2" : "text-destructive"}`}
                    >
                      {analysis.totalGainLoss >= 0 ? "+" : ""}₹{analysis.totalGainLoss.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Gain/Loss</div>
                  </div>
                  <div className="text-center p-4 bg-chart-1/10 rounded-lg">
                    <div
                      className={`text-xl font-bold ${Number(analysis.totalReturn) >= 0 ? "text-chart-2" : "text-destructive"}`}
                    >
                      {Number(analysis.totalReturn) >= 0 ? "+" : ""}
                      {analysis.totalReturn}%
                    </div>
                    <div className="text-sm text-muted-foreground">Total Return</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-lg font-bold">
                      <Badge variant={analysis.riskColor as any}>{analysis.riskLevel}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">Risk Level</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-accent">{analysis.diversificationScore}/100</div>
                    <div className="text-sm text-muted-foreground">Diversification Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocation">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Asset Allocation Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.allocationPercentage.map((item: any) => (
                  <div key={item.type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getTypeColor(item.type)}`}></div>
                        <span>{getTypeLabel(item.type)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>{item.percentage}%</span>
                        <span className="text-muted-foreground">(₹{item.value.toLocaleString()})</span>
                      </div>
                    </div>
                    <Progress value={Number(item.percentage)} className="h-2" />
                  </div>
                ))}

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-serif font-semibold mb-2">Ideal Allocation Guidelines:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Conservative:</strong> 30% Equity, 60% Debt, 10% Gold
                    </div>
                    <div>
                      <strong>Balanced:</strong> 60% Equity, 30% Debt, 10% Gold
                    </div>
                    <div>
                      <strong>Aggressive:</strong> 80% Equity, 15% Debt, 5% Gold
                    </div>
                    <div>
                      <strong>Real Estate:</strong> 5-15% for diversification
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Portfolio Optimization Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm">{rec}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-serif font-semibold mb-2">General Portfolio Tips:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Rebalance your portfolio every 6-12 months</li>
                    <li>• Don't chase short-term market movements</li>
                    <li>• Maintain emergency fund before aggressive investing</li>
                    <li>• Consider tax implications when rebalancing</li>
                    <li>• Review and adjust based on life stage changes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
