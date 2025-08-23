"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Calendar, Target } from "lucide-react"

export function SipPlanner() {
  const [sipData, setSipData] = useState({
    monthlyAmount: "",
    expectedReturn: "",
    timePeriod: "",
    goalAmount: "",
    stepUpEnabled: false,
    stepUpPercentage: "",
    investmentType: "equity",
  })

  const [results, setResults] = useState<any>(null)
  const [planningMode, setPlanningMode] = useState<"amount" | "goal">("amount")

  const calculateSIP = () => {
    if (planningMode === "amount") {
      calculateFromAmount()
    } else {
      calculateFromGoal()
    }
  }

  const calculateFromAmount = () => {
    const P = Number(sipData.monthlyAmount)
    const r = Number(sipData.expectedReturn) / 100 / 12
    const n = Number(sipData.timePeriod) * 12
    const stepUp = sipData.stepUpEnabled ? Number(sipData.stepUpPercentage) / 100 : 0

    if (!P || !r || !n) return

    let totalInvestment = 0
    let futureValue = 0
    let currentSIP = P

    for (let year = 1; year <= Number(sipData.timePeriod); year++) {
      for (let month = 1; month <= 12; month++) {
        totalInvestment += currentSIP
        futureValue = (futureValue + currentSIP) * (1 + r)
      }
      if (sipData.stepUpEnabled && year < Number(sipData.timePeriod)) {
        currentSIP = currentSIP * (1 + stepUp)
      }
    }

    const gains = futureValue - totalInvestment

    setResults({
      type: "amount",
      totalInvestment: Math.round(totalInvestment),
      futureValue: Math.round(futureValue),
      gains: Math.round(gains),
      finalSIP: Math.round(currentSIP),
      monthlyAmount: P,
    })
  }

  const calculateFromGoal = () => {
    const goalAmount = Number(sipData.goalAmount)
    const r = Number(sipData.expectedReturn) / 100 / 12
    const n = Number(sipData.timePeriod) * 12

    if (!goalAmount || !r || !n) return

    // Simple SIP calculation for goal-based planning
    const requiredSIP = (goalAmount * r) / (Math.pow(1 + r, n) - 1)
    const totalInvestment = requiredSIP * n
    const gains = goalAmount - totalInvestment

    setResults({
      type: "goal",
      requiredSIP: Math.round(requiredSIP),
      totalInvestment: Math.round(totalInvestment),
      futureValue: goalAmount,
      gains: Math.round(gains),
      goalAmount,
    })
  }

  const getInvestmentTypeRecommendation = (type: string) => {
    const recommendations = {
      equity: {
        return: "12-15%",
        risk: "High",
        horizon: "7+ years",
        description: "Best for long-term wealth creation",
      },
      debt: {
        return: "7-9%",
        risk: "Low",
        horizon: "1-5 years",
        description: "Stable returns with lower risk",
      },
      hybrid: {
        return: "9-12%",
        risk: "Medium",
        horizon: "3-7 years",
        description: "Balanced approach with moderate risk",
      },
    }
    return recommendations[type as keyof typeof recommendations]
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            SIP Planner
          </CardTitle>
          <CardDescription>
            Plan your systematic investments with step-up options and goal-based calculations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={planningMode} onValueChange={(value) => setPlanningMode(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="amount" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Amount Based
              </TabsTrigger>
              <TabsTrigger value="goal" className="flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Goal Based
              </TabsTrigger>
            </TabsList>

            <TabsContent value="amount" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyAmount">Monthly SIP Amount (₹)</Label>
                  <Input
                    id="monthlyAmount"
                    type="number"
                    placeholder="10000"
                    value={sipData.monthlyAmount}
                    onChange={(e) => setSipData({ ...sipData, monthlyAmount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timePeriod">Investment Period (Years)</Label>
                  <Input
                    id="timePeriod"
                    type="number"
                    placeholder="15"
                    value={sipData.timePeriod}
                    onChange={(e) => setSipData({ ...sipData, timePeriod: e.target.value })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="goal" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goalAmount">Target Goal Amount (₹)</Label>
                  <Input
                    id="goalAmount"
                    type="number"
                    placeholder="5000000"
                    value={sipData.goalAmount}
                    onChange={(e) => setSipData({ ...sipData, goalAmount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timePeriodGoal">Time to Achieve Goal (Years)</Label>
                  <Input
                    id="timePeriodGoal"
                    type="number"
                    placeholder="15"
                    value={sipData.timePeriod}
                    onChange={(e) => setSipData({ ...sipData, timePeriod: e.target.value })}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="investmentType">Investment Type</Label>
              <Select
                value={sipData.investmentType}
                onValueChange={(value) => setSipData({ ...sipData, investmentType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select investment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equity">Equity Funds</SelectItem>
                  <SelectItem value="debt">Debt Funds</SelectItem>
                  <SelectItem value="hybrid">Hybrid Funds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
              <Input
                id="expectedReturn"
                type="number"
                placeholder="12"
                value={sipData.expectedReturn}
                onChange={(e) => setSipData({ ...sipData, expectedReturn: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="stepUp">Enable Step-up SIP</Label>
              <p className="text-sm text-muted-foreground">Increase SIP amount annually to beat inflation</p>
            </div>
            <Switch
              id="stepUp"
              checked={sipData.stepUpEnabled}
              onCheckedChange={(checked) => setSipData({ ...sipData, stepUpEnabled: checked })}
            />
          </div>

          {sipData.stepUpEnabled && (
            <div className="space-y-2">
              <Label htmlFor="stepUpPercentage">Annual Step-up Percentage (%)</Label>
              <Input
                id="stepUpPercentage"
                type="number"
                placeholder="10"
                value={sipData.stepUpPercentage}
                onChange={(e) => setSipData({ ...sipData, stepUpPercentage: e.target.value })}
              />
            </div>
          )}

          <Button onClick={calculateSIP} className="w-full">
            Calculate SIP Plan
          </Button>
        </CardContent>
      </Card>

      {sipData.investmentType && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg">Investment Type Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const rec = getInvestmentTypeRecommendation(sipData.investmentType)
              return (
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-chart-2">{rec?.return}</div>
                    <div className="text-xs text-muted-foreground">Expected Return</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-chart-4">{rec?.risk}</div>
                    <div className="text-xs text-muted-foreground">Risk Level</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-accent">{rec?.horizon}</div>
                    <div className="text-xs text-muted-foreground">Time Horizon</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium text-foreground">{rec?.description}</div>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif flex items-center justify-between">
              SIP Projection Results
              <Badge variant="secondary">Demo Calculation</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {results.type === "amount" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">
                      ₹{results.totalInvestment.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Investment</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-chart-2">₹{results.futureValue.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Future Value</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <div className="text-xl font-bold text-accent">₹{results.gains.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Gains</div>
                  </div>
                  {sipData.stepUpEnabled && (
                    <div className="text-center p-4 bg-chart-1/10 rounded-lg">
                      <div className="text-xl font-bold text-chart-1">₹{results.finalSIP.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Final SIP Amount</div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-chart-2">₹{results.requiredSIP.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Required Monthly SIP</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">₹{results.goalAmount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Target Goal</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <div className="text-xl font-bold text-accent">₹{results.totalInvestment.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Investment</div>
                  </div>
                  <div className="text-center p-4 bg-chart-2/10 rounded-lg">
                    <div className="text-xl font-bold text-chart-2">₹{results.gains.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Expected Gains</div>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-3 text-sm">
              <h4 className="font-serif font-medium">Key Insights:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• SIP helps average out market volatility through rupee cost averaging</li>
                <li>• Step-up SIPs help beat inflation and accelerate wealth creation</li>
                <li>• Longer investment periods significantly boost returns due to compounding</li>
                <li>• Regular review and rebalancing can optimize your portfolio performance</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Disclaimer:</strong> These calculations are based on assumed returns and are for educational
                purposes only. Actual returns may vary based on market conditions. Please consult a financial advisor
                for personalized advice.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
