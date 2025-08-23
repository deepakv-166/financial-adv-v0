"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, TrendingDown } from "lucide-react"

interface Debt {
  id: string
  name: string
  balance: number
  interestRate: number
  minPayment: number
}

export function DebtManagement() {
  const [debts, setDebts] = useState<Debt[]>([])
  const [newDebt, setNewDebt] = useState({
    name: "",
    balance: "",
    interestRate: "",
    minPayment: "",
  })
  const [extraPayment, setExtraPayment] = useState("")
  const [payoffStrategy, setPayoffStrategy] = useState<any>(null)

  const addDebt = () => {
    if (newDebt.name && newDebt.balance && newDebt.interestRate && newDebt.minPayment) {
      const debt: Debt = {
        id: Date.now().toString(),
        name: newDebt.name,
        balance: Number(newDebt.balance),
        interestRate: Number(newDebt.interestRate),
        minPayment: Number(newDebt.minPayment),
      }
      setDebts([...debts, debt])
      setNewDebt({ name: "", balance: "", interestRate: "", minPayment: "" })
    }
  }

  const removeDebt = (id: string) => {
    setDebts(debts.filter((debt) => debt.id !== id))
  }

  const calculatePayoffStrategy = () => {
    if (debts.length === 0) return

    const extra = Number(extraPayment) || 0

    // Debt Avalanche (highest interest first)
    const avalancheDebts = [...debts].sort((a, b) => b.interestRate - a.interestRate)
    const avalancheResult = simulatePayoff(avalancheDebts, extra)

    // Debt Snowball (smallest balance first)
    const snowballDebts = [...debts].sort((a, b) => a.balance - b.balance)
    const snowballResult = simulatePayoff(snowballDebts, extra)

    setPayoffStrategy({
      avalanche: avalancheResult,
      snowball: snowballResult,
      totalDebt: debts.reduce((sum, debt) => sum + debt.balance, 0),
      totalMinPayment: debts.reduce((sum, debt) => sum + debt.minPayment, 0),
    })
  }

  const simulatePayoff = (sortedDebts: Debt[], extraPayment: number) => {
    let totalMonths = 0
    let totalInterest = 0
    const payoffOrder = []

    // Create working copy
    const workingDebts = sortedDebts.map((debt) => ({ ...debt }))
    let availableExtra = extraPayment

    while (workingDebts.some((debt) => debt.balance > 0)) {
      totalMonths++

      // Pay minimum on all debts
      workingDebts.forEach((debt) => {
        if (debt.balance > 0) {
          const monthlyInterest = (debt.balance * debt.interestRate) / 100 / 12
          const principalPayment = Math.min(debt.minPayment - monthlyInterest, debt.balance)
          debt.balance -= principalPayment
          totalInterest += monthlyInterest
        }
      })

      // Apply extra payment to first debt with balance
      const targetDebt = workingDebts.find((debt) => debt.balance > 0)
      if (targetDebt && availableExtra > 0) {
        const extraApplied = Math.min(availableExtra, targetDebt.balance)
        targetDebt.balance -= extraApplied

        if (targetDebt.balance <= 0) {
          payoffOrder.push({ name: targetDebt.name, month: totalMonths })
          availableExtra += targetDebt.minPayment // Snowball effect
        }
      }

      // Safety check to prevent infinite loop
      if (totalMonths > 600) break // 50 years max
    }

    return {
      months: totalMonths,
      years: Math.round((totalMonths / 12) * 10) / 10,
      totalInterest: Math.round(totalInterest),
      payoffOrder,
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <TrendingDown className="h-5 w-5 mr-2" />
            Debt Management Planner
          </CardTitle>
          <CardDescription>Track your debts and create an optimal payoff strategy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="debtName">Debt Name</Label>
              <Input
                id="debtName"
                placeholder="Credit Card"
                value={newDebt.name}
                onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="balance">Outstanding Balance (₹)</Label>
              <Input
                id="balance"
                type="number"
                placeholder="50000"
                value={newDebt.balance}
                onChange={(e) => setNewDebt({ ...newDebt, balance: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (% p.a.)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                placeholder="18"
                value={newDebt.interestRate}
                onChange={(e) => setNewDebt({ ...newDebt, interestRate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minPayment">Minimum Payment (₹)</Label>
              <Input
                id="minPayment"
                type="number"
                placeholder="2500"
                value={newDebt.minPayment}
                onChange={(e) => setNewDebt({ ...newDebt, minPayment: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={addDebt} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Debt
          </Button>
        </CardContent>
      </Card>

      {debts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Your Debts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {debts.map((debt) => (
              <div key={debt.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">{debt.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ₹{debt.balance.toLocaleString()} at {debt.interestRate}% • Min: ₹{debt.minPayment.toLocaleString()}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeDebt(debt.id)} className="h-8 w-8 p-0">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="extraPayment">Extra Monthly Payment (₹)</Label>
              <Input
                id="extraPayment"
                type="number"
                placeholder="5000"
                value={extraPayment}
                onChange={(e) => setExtraPayment(e.target.value)}
              />
            </div>

            <Button onClick={calculatePayoffStrategy} className="w-full">
              Calculate Payoff Strategy
            </Button>
          </CardContent>
        </Card>
      )}

      {payoffStrategy && (
        <Tabs defaultValue="comparison" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comparison">Strategy Comparison</TabsTrigger>
            <TabsTrigger value="avalanche">Debt Avalanche</TabsTrigger>
            <TabsTrigger value="snowball">Debt Snowball</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif flex items-center justify-between">
                  Payoff Strategy Comparison
                  <Badge variant="secondary">Demo Analysis</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">
                      ₹{payoffStrategy.totalDebt.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Debt</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-chart-2">
                      ₹{payoffStrategy.totalMinPayment.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Min Payments</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-accent">₹{Number(extraPayment || 0).toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Extra Payment</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Debt Avalanche</CardTitle>
                      <CardDescription>Pay highest interest rate first</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <div className="text-xl font-bold text-chart-1">{payoffStrategy.avalanche.years} years</div>
                        <div className="text-sm text-muted-foreground">Payoff Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">
                          ₹{payoffStrategy.avalanche.totalInterest.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Interest</div>
                      </div>
                      <Badge variant="default" className="w-full justify-center">
                        Saves More Money
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Debt Snowball</CardTitle>
                      <CardDescription>Pay smallest balance first</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <div className="text-xl font-bold text-chart-4">{payoffStrategy.snowball.years} years</div>
                        <div className="text-sm text-muted-foreground">Payoff Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">
                          ₹{payoffStrategy.snowball.totalInterest.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Interest</div>
                      </div>
                      <Badge variant="secondary" className="w-full justify-center">
                        Better Motivation
                      </Badge>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-2 text-sm">
                  <h4 className="font-serif font-semibold">Recommendation:</h4>
                  <p className="text-muted-foreground">
                    {payoffStrategy.avalanche.totalInterest < payoffStrategy.snowball.totalInterest
                      ? "Debt Avalanche saves more money in interest payments. Choose this if you're disciplined with payments."
                      : "Both strategies are similar in cost. Choose Debt Snowball for better psychological motivation."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="avalanche">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Debt Avalanche Strategy</CardTitle>
                <CardDescription>Focus on highest interest rate debts first</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Payoff Order:</h4>
                  {payoffStrategy.avalanche.payoffOrder.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded">
                      <span>{item.name}</span>
                      <Badge variant="outline">Month {item.month}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="snowball">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Debt Snowball Strategy</CardTitle>
                <CardDescription>Focus on smallest balances first for quick wins</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Payoff Order:</h4>
                  {payoffStrategy.snowball.payoffOrder.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded">
                      <span>{item.name}</span>
                      <Badge variant="outline">Month {item.month}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
