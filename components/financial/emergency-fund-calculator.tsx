"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"

export function EmergencyFundCalculator() {
  const [fundData, setFundData] = useState({
    monthlyExpenses: "",
    jobStability: "",
    dependents: "",
    currentEmergencyFund: "",
    monthlyContribution: "",
  })

  const [results, setResults] = useState<any>(null)

  const calculateEmergencyFund = () => {
    const expenses = Number(fundData.monthlyExpenses)
    const current = Number(fundData.currentEmergencyFund) || 0
    const monthly = Number(fundData.monthlyContribution) || 0

    if (!expenses) return

    // Determine months needed based on job stability and dependents
    let monthsNeeded = 6 // Base recommendation

    if (fundData.jobStability === "Low") monthsNeeded = 12
    else if (fundData.jobStability === "Medium") monthsNeeded = 8
    else if (fundData.jobStability === "High") monthsNeeded = 6

    if (Number(fundData.dependents) > 2) monthsNeeded += 2

    const targetAmount = expenses * monthsNeeded
    const shortfall = Math.max(0, targetAmount - current)
    const monthsToTarget = monthly > 0 ? Math.ceil(shortfall / monthly) : 0
    const currentCoverage = current / expenses

    setResults({
      targetAmount,
      shortfall,
      monthsToTarget,
      currentCoverage,
      monthsNeeded,
      progressPercentage: (current / targetAmount) * 100,
    })
  }

  const getStatusIcon = () => {
    if (!results) return null

    if (results.progressPercentage >= 100) {
      return <CheckCircle className="h-5 w-5 text-chart-2" />
    } else if (results.progressPercentage >= 50) {
      return <Shield className="h-5 w-5 text-chart-3" />
    } else {
      return <AlertTriangle className="h-5 w-5 text-destructive" />
    }
  }

  const getStatusMessage = () => {
    if (!results) return ""

    if (results.progressPercentage >= 100) {
      return "Excellent! Your emergency fund is fully funded."
    } else if (results.progressPercentage >= 50) {
      return "Good progress! You're halfway to your emergency fund goal."
    } else {
      return "Priority: Build your emergency fund before other investments."
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Emergency Fund Calculator
          </CardTitle>
          <CardDescription>Calculate your ideal emergency fund size based on your financial situation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyExpenses">Monthly Expenses (₹)</Label>
              <Input
                id="monthlyExpenses"
                type="number"
                placeholder="45000"
                value={fundData.monthlyExpenses}
                onChange={(e) => setFundData({ ...fundData, monthlyExpenses: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentEmergencyFund">Current Emergency Fund (₹)</Label>
              <Input
                id="currentEmergencyFund"
                type="number"
                placeholder="100000"
                value={fundData.currentEmergencyFund}
                onChange={(e) => setFundData({ ...fundData, currentEmergencyFund: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobStability">Job Stability</Label>
              <Select
                value={fundData.jobStability}
                onValueChange={(value) => setFundData({ ...fundData, jobStability: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select job stability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High (Government/Stable Corporate)</SelectItem>
                  <SelectItem value="Medium">Medium (Private Sector)</SelectItem>
                  <SelectItem value="Low">Low (Freelance/Startup)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dependents">Number of Dependents</Label>
              <Select
                value={fundData.dependents}
                onValueChange={(value) => setFundData({ ...fundData, dependents: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select dependents" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyContribution">Monthly Contribution to Emergency Fund (₹)</Label>
            <Input
              id="monthlyContribution"
              type="number"
              placeholder="10000"
              value={fundData.monthlyContribution}
              onChange={(e) => setFundData({ ...fundData, monthlyContribution: e.target.value })}
            />
          </div>

          <Button onClick={calculateEmergencyFund} className="w-full">
            Calculate Emergency Fund
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif flex items-center justify-between">
              <div className="flex items-center">
                {getStatusIcon()}
                <span className="ml-2">Emergency Fund Analysis</span>
              </div>
              <Badge variant="secondary">Demo Analysis</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-xl font-bold text-foreground">₹{results.targetAmount.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Target Amount</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-xl font-bold text-chart-2">
                  ₹{Number(fundData.currentEmergencyFund || 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Current Fund</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-xl font-bold text-accent">₹{results.shortfall.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Shortfall</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Emergency Fund Progress</span>
                <span>{results.progressPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(100, results.progressPercentage)} className="h-3" />
              <div className="text-sm text-muted-foreground">
                Current coverage: {results.currentCoverage.toFixed(1)} months of expenses
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-start space-x-2">
                {getStatusIcon()}
                <div>
                  <p className="font-medium text-sm">{getStatusMessage()}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Recommended: {results.monthsNeeded} months of expenses based on your job stability and dependents.
                  </p>
                </div>
              </div>
            </div>

            {results.monthsToTarget > 0 && (
              <div className="space-y-3">
                <h4 className="font-serif font-semibold">Action Plan:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-3 bg-accent/10 rounded">
                    <span>Monthly Contribution</span>
                    <span className="font-bold">₹{Number(fundData.monthlyContribution).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-chart-1/10 rounded">
                    <span>Time to Target</span>
                    <span className="font-bold">{results.monthsToTarget} months</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Tip:</strong> Keep emergency funds in liquid instruments like savings accounts, liquid mutual
                  funds, or short-term FDs for easy access during emergencies.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
