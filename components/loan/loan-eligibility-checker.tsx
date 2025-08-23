"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"

export function LoanEligibilityChecker() {
  const [eligibilityData, setEligibilityData] = useState({
    monthlyIncome: "",
    existingEMIs: "",
    loanType: "",
    loanAmount: "",
    creditScore: "",
    age: "",
    employmentType: "",
  })

  const [results, setResults] = useState<any>(null)

  const checkEligibility = () => {
    const income = Number(eligibilityData.monthlyIncome)
    const existingEMIs = Number(eligibilityData.existingEMIs) || 0
    const loanAmount = Number(eligibilityData.loanAmount)
    const creditScore = Number(eligibilityData.creditScore)
    const age = Number(eligibilityData.age)

    if (!income || !loanAmount) return

    // Calculate DTI ratio
    const dtiRatio = (existingEMIs / income) * 100

    // Estimate new EMI (assuming 8.5% interest for 20 years for home loan)
    const interestRate = eligibilityData.loanType === "home" ? 8.5 : eligibilityData.loanType === "personal" ? 12 : 10
    const tenure = eligibilityData.loanType === "home" ? 20 : eligibilityData.loanType === "personal" ? 5 : 7
    const monthlyRate = interestRate / 100 / 12
    const totalMonths = tenure * 12
    const estimatedEMI =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)

    const newDTI = ((existingEMIs + estimatedEMI) / income) * 100

    // Eligibility scoring
    let eligibilityScore = 0
    let eligibilityStatus = "Not Eligible"
    let statusColor = "destructive"
    let statusIcon = XCircle

    // DTI check (40% max)
    if (newDTI <= 30) eligibilityScore += 40
    else if (newDTI <= 40) eligibilityScore += 25
    else eligibilityScore += 0

    // Credit score check
    if (creditScore >= 750) eligibilityScore += 30
    else if (creditScore >= 700) eligibilityScore += 20
    else if (creditScore >= 650) eligibilityScore += 10
    else eligibilityScore += 0

    // Age check
    if (age >= 25 && age <= 50) eligibilityScore += 20
    else if (age >= 21 && age <= 60) eligibilityScore += 15
    else eligibilityScore += 5

    // Employment type
    if (eligibilityData.employmentType === "salaried") eligibilityScore += 10
    else if (eligibilityData.employmentType === "self-employed") eligibilityScore += 5

    // Determine status
    if (eligibilityScore >= 80) {
      eligibilityStatus = "Highly Eligible"
      statusColor = "default"
      statusIcon = CheckCircle
    } else if (eligibilityScore >= 60) {
      eligibilityStatus = "Eligible"
      statusColor = "secondary"
      statusIcon = CheckCircle
    } else if (eligibilityScore >= 40) {
      eligibilityStatus = "Conditionally Eligible"
      statusColor = "default"
      statusIcon = AlertTriangle
    }

    // Calculate maximum eligible amount
    const maxEMI = income * 0.4 - existingEMIs
    const maxLoanAmount =
      (maxEMI * (Math.pow(1 + monthlyRate, totalMonths) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))

    setResults({
      eligibilityScore,
      eligibilityStatus,
      statusColor,
      statusIcon,
      dtiRatio: newDTI,
      estimatedEMI,
      maxLoanAmount: Math.max(0, maxLoanAmount),
      recommendations: generateRecommendations(newDTI, creditScore, eligibilityScore),
    })
  }

  const generateRecommendations = (dti: number, creditScore: number, score: number) => {
    const recommendations = []

    if (dti > 40) {
      recommendations.push("Reduce existing EMIs or increase income to improve DTI ratio")
    }
    if (creditScore < 750) {
      recommendations.push("Improve credit score by paying bills on time and reducing credit utilization")
    }
    if (score < 60) {
      recommendations.push("Consider a co-applicant to strengthen your loan application")
    }
    if (eligibilityData.loanType === "personal" && Number(eligibilityData.loanAmount) > 1000000) {
      recommendations.push("Consider secured loans like home or car loans for better interest rates")
    }

    return recommendations
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Loan Eligibility Checker</CardTitle>
        <CardDescription>
          Check your loan eligibility based on income, credit score, and debt-to-income ratio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
            <Input
              id="monthlyIncome"
              type="number"
              placeholder="75000"
              value={eligibilityData.monthlyIncome}
              onChange={(e) => setEligibilityData({ ...eligibilityData, monthlyIncome: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="existingEMIs">Existing EMIs (₹)</Label>
            <Input
              id="existingEMIs"
              type="number"
              placeholder="15000"
              value={eligibilityData.existingEMIs}
              onChange={(e) => setEligibilityData({ ...eligibilityData, existingEMIs: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="loanType">Loan Type</Label>
            <Select
              value={eligibilityData.loanType}
              onValueChange={(value) => setEligibilityData({ ...eligibilityData, loanType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select loan type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Home Loan</SelectItem>
                <SelectItem value="car">Car Loan</SelectItem>
                <SelectItem value="personal">Personal Loan</SelectItem>
                <SelectItem value="education">Education Loan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="loanAmount">Desired Loan Amount (₹)</Label>
            <Input
              id="loanAmount"
              type="number"
              placeholder="2000000"
              value={eligibilityData.loanAmount}
              onChange={(e) => setEligibilityData({ ...eligibilityData, loanAmount: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="creditScore">Credit Score</Label>
            <Input
              id="creditScore"
              type="number"
              placeholder="750"
              value={eligibilityData.creditScore}
              onChange={(e) => setEligibilityData({ ...eligibilityData, creditScore: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="30"
              value={eligibilityData.age}
              onChange={(e) => setEligibilityData({ ...eligibilityData, age: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employmentType">Employment</Label>
            <Select
              value={eligibilityData.employmentType}
              onValueChange={(value) => setEligibilityData({ ...eligibilityData, employmentType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salaried">Salaried</SelectItem>
                <SelectItem value="self-employed">Self Employed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={checkEligibility} className="w-full">
          Check Eligibility
        </Button>

        {results && (
          <div className="mt-6 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-serif flex items-center justify-between">
                  <div className="flex items-center">
                    <results.statusIcon
                      className={`h-5 w-5 mr-2 ${results.statusColor === "destructive" ? "text-destructive" : "text-chart-2"}`}
                    />
                    Eligibility Result
                  </div>
                  <Badge variant={results.statusColor as any}>{results.eligibilityStatus}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Eligibility Score</span>
                    <span>{results.eligibilityScore}/100</span>
                  </div>
                  <Progress value={results.eligibilityScore} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-foreground">{results.dtiRatio.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">DTI Ratio</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-chart-2">
                      ₹{Math.round(results.estimatedEMI).toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Est. EMI</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-accent">
                      ₹{Math.round(results.maxLoanAmount).toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Max Eligible</div>
                  </div>
                </div>

                {results.recommendations.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-serif font-semibold text-sm">Recommendations:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {results.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
