"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { TrendingUp } from "lucide-react"

export function SipCalculator() {
  const [sipData, setSipData] = useState({
    monthlyAmount: "",
    expectedReturn: "",
    timePeriod: "",
    stepUpEnabled: false,
    stepUpPercentage: "",
  })

  const [results, setResults] = useState<any>(null)

  const calculateSIP = () => {
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
      totalInvestment: Math.round(totalInvestment),
      futureValue: Math.round(futureValue),
      gains: Math.round(gains),
      finalSIP: Math.round(currentSIP),
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            SIP Calculator
          </CardTitle>
          <CardDescription>Calculate returns on your Systematic Investment Plan with step-up options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
            Calculate SIP Returns
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif flex items-center justify-between">
              SIP Projection Results
              <Badge variant="secondary">Demo Calculation</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-foreground">₹{results.totalInvestment.toLocaleString()}</div>
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

            <div className="space-y-3 text-sm">
              <h4 className="font-serif font-semibold">Key Insights:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  • Your investment will grow by {((results.gains / results.totalInvestment) * 100).toFixed(1)}% over{" "}
                  {sipData.timePeriod} years
                </li>
                <li>
                  • Monthly SIP of ₹{Number(sipData.monthlyAmount).toLocaleString()} can create wealth of ₹
                  {results.futureValue.toLocaleString()}
                </li>
                {sipData.stepUpEnabled && <li>• Step-up SIP helps beat inflation and accelerates wealth creation</li>}
                <li>• Start early to maximize the power of compounding</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
