"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export function UserProfileForm() {
  const [profile, setProfile] = useState({
    age: "",
    city: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    dependents: "",
    riskTolerance: "",
    financialGoals: "",
    currentSavings: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    const savingsRate =
      profile.monthlyIncome && profile.monthlyExpenses
        ? Math.round(
            ((Number(profile.monthlyIncome) - Number(profile.monthlyExpenses)) / Number(profile.monthlyIncome)) * 100,
          )
        : 0

    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center justify-between">
            Profile Analysis
            <Badge variant="secondary">Demo Results</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-accent">{savingsRate}%</div>
              <div className="text-sm text-muted-foreground">Savings Rate</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-chart-2">{profile.riskTolerance || "Moderate"}</div>
              <div className="text-sm text-muted-foreground">Risk Profile</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-semibold">Personalized Recommendations</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <div>
                  <strong>Emergency Fund:</strong> Aim for {Number(profile.monthlyExpenses) * 6 || 0} (6 months
                  expenses)
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <div>
                  <strong>Investment Allocation:</strong>{" "}
                  {profile.riskTolerance === "Conservative"
                    ? "60% Debt, 40% Equity"
                    : profile.riskTolerance === "Aggressive"
                      ? "30% Debt, 70% Equity"
                      : "50% Debt, 50% Equity"}
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <div>
                  <strong>Tax Saving:</strong> Consider ELSS, PPF, and NPS for tax benefits under 80C
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Financial Profile Setup</CardTitle>
        <CardDescription>
          Help us understand your financial situation to provide personalized recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Mumbai"
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="income">Monthly Income (₹)</Label>
              <Input
                id="income"
                type="number"
                placeholder="75000"
                value={profile.monthlyIncome}
                onChange={(e) => setProfile({ ...profile, monthlyIncome: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expenses">Monthly Expenses (₹)</Label>
              <Input
                id="expenses"
                type="number"
                placeholder="45000"
                value={profile.monthlyExpenses}
                onChange={(e) => setProfile({ ...profile, monthlyExpenses: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dependents">Number of Dependents</Label>
              <Select
                value={profile.dependents}
                onValueChange={(value) => setProfile({ ...profile, dependents: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select dependents" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4+">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="risk">Risk Tolerance</Label>
              <Select
                value={profile.riskTolerance}
                onValueChange={(value) => setProfile({ ...profile, riskTolerance: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conservative">Conservative</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="savings">Current Savings (₹)</Label>
            <Input
              id="savings"
              type="number"
              placeholder="200000"
              value={profile.currentSavings}
              onChange={(e) => setProfile({ ...profile, currentSavings: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">Financial Goals</Label>
            <Textarea
              id="goals"
              placeholder="e.g., Buy a house in 5 years, children's education, retirement planning..."
              value={profile.financialGoals}
              onChange={(e) => setProfile({ ...profile, financialGoals: e.target.value })}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Analyze My Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
