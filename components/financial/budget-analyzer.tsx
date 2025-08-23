"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function BudgetAnalyzer() {
  const [budget, setBudget] = useState({
    income: "",
    housing: "",
    food: "",
    transportation: "",
    utilities: "",
    entertainment: "",
    healthcare: "",
    other: "",
  })

  const [showAnalysis, setShowAnalysis] = useState(false)

  const handleAnalyze = () => {
    setShowAnalysis(true)
  }

  const totalExpenses = Object.entries(budget)
    .filter(([key]) => key !== "income")
    .reduce((sum, [, value]) => sum + (Number(value) || 0), 0)

  const income = Number(budget.income) || 0
  const savingsAmount = income - totalExpenses
  const savingsRate = income > 0 ? (savingsAmount / income) * 100 : 0

  const categories = [
    { name: "Housing", value: Number(budget.housing) || 0, recommended: 30, color: "bg-chart-1" },
    { name: "Food", value: Number(budget.food) || 0, recommended: 15, color: "bg-chart-2" },
    { name: "Transportation", value: Number(budget.transportation) || 0, recommended: 15, color: "bg-chart-3" },
    { name: "Utilities", value: Number(budget.utilities) || 0, recommended: 10, color: "bg-chart-4" },
    { name: "Entertainment", value: Number(budget.entertainment) || 0, recommended: 5, color: "bg-chart-5" },
    { name: "Healthcare", value: Number(budget.healthcare) || 0, recommended: 5, color: "bg-accent" },
    { name: "Other", value: Number(budget.other) || 0, recommended: 10, color: "bg-secondary" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Budget Analyzer</CardTitle>
          <CardDescription>Track your spending patterns and get personalized budgeting recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="income">Monthly Income (₹)</Label>
              <Input
                id="income"
                type="number"
                placeholder="75000"
                value={budget.income}
                onChange={(e) => setBudget({ ...budget, income: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="housing">Housing & Rent (₹)</Label>
              <Input
                id="housing"
                type="number"
                placeholder="25000"
                value={budget.housing}
                onChange={(e) => setBudget({ ...budget, housing: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="food">Food & Groceries (₹)</Label>
              <Input
                id="food"
                type="number"
                placeholder="8000"
                value={budget.food}
                onChange={(e) => setBudget({ ...budget, food: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transportation">Transportation (₹)</Label>
              <Input
                id="transportation"
                type="number"
                placeholder="5000"
                value={budget.transportation}
                onChange={(e) => setBudget({ ...budget, transportation: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="utilities">Utilities (₹)</Label>
              <Input
                id="utilities"
                type="number"
                placeholder="3000"
                value={budget.utilities}
                onChange={(e) => setBudget({ ...budget, utilities: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entertainment">Entertainment (₹)</Label>
              <Input
                id="entertainment"
                type="number"
                placeholder="4000"
                value={budget.entertainment}
                onChange={(e) => setBudget({ ...budget, entertainment: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="healthcare">Healthcare (₹)</Label>
              <Input
                id="healthcare"
                type="number"
                placeholder="2000"
                value={budget.healthcare}
                onChange={(e) => setBudget({ ...budget, healthcare: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="other">Other Expenses (₹)</Label>
              <Input
                id="other"
                type="number"
                placeholder="3000"
                value={budget.other}
                onChange={(e) => setBudget({ ...budget, other: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={handleAnalyze} className="w-full">
            Analyze My Budget
          </Button>
        </CardContent>
      </Card>

      {showAnalysis && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center justify-between">
                Budget Summary
                <Badge variant="secondary">Demo Analysis</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-foreground">₹{income.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Income</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-destructive">₹{totalExpenses.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Expenses</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className={`text-lg font-bold ${savingsAmount >= 0 ? "text-chart-2" : "text-destructive"}`}>
                    ₹{savingsAmount.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Savings</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Savings Rate</span>
                  <span
                    className={
                      savingsRate >= 20 ? "text-chart-2" : savingsRate >= 10 ? "text-chart-3" : "text-destructive"
                    }
                  >
                    {savingsRate.toFixed(1)}%
                  </span>
                </div>
                <Progress value={Math.max(0, Math.min(100, savingsRate))} className="h-2" />
                <div className="text-xs text-muted-foreground">Recommended: 20%+ for healthy financial growth</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Category Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categories.map((category) => {
                const percentage = income > 0 ? (category.value / income) * 100 : 0
                const isOverBudget = percentage > category.recommended

                return (
                  <div key={category.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{category.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className={isOverBudget ? "text-destructive" : "text-muted-foreground"}>
                          {percentage.toFixed(1)}%
                        </span>
                        <span className="text-xs text-muted-foreground">(Rec: {category.recommended}%)</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={Math.min(100, percentage)} className="h-1 flex-1" />
                      {isOverBudget && (
                        <Badge variant="destructive" className="text-xs">
                          Over
                        </Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
