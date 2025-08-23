"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function EmiCalculator() {
  const [emiData, setEmiData] = useState({
    loanAmount: "",
    interestRate: "",
    tenure: "",
    prepayment: "",
    prepaymentMonth: "",
  })

  const [results, setResults] = useState<any>(null)
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([])

  const calculateEMI = () => {
    const P = Number(emiData.loanAmount)
    const r = Number(emiData.interestRate) / 100 / 12
    const n = Number(emiData.tenure) * 12

    if (!P || !r || !n) return

    // EMI calculation
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalAmount = emi * n
    const totalInterest = totalAmount - P

    // Generate amortization schedule
    const schedule = []
    let balance = P
    let totalInterestPaid = 0

    for (let month = 1; month <= n; month++) {
      const interestPayment = balance * r
      const principalPayment = emi - interestPayment
      balance -= principalPayment
      totalInterestPaid += interestPayment

      // Handle prepayment
      if (emiData.prepayment && month === Number(emiData.prepaymentMonth)) {
        balance -= Number(emiData.prepayment)
      }

      schedule.push({
        month,
        emi: Math.round(emi),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(Math.max(0, balance)),
      })

      if (balance <= 0) break
    }

    // Calculate prepayment impact
    let prepaymentSavings = 0
    let newTenure = n
    if (emiData.prepayment && Number(emiData.prepayment) > 0) {
      newTenure = schedule.length
      prepaymentSavings = totalInterest - schedule.reduce((sum, row) => sum + row.interest, 0)
    }

    setResults({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      prepaymentSavings: Math.round(prepaymentSavings),
      newTenure: Math.round((newTenure / 12) * 10) / 10,
    })

    setAmortizationSchedule(schedule.slice(0, 12)) // Show first 12 months
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">EMI Calculator</CardTitle>
          <CardDescription>
            Calculate your loan EMI with detailed amortization schedule and prepayment impact
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
              <Input
                id="loanAmount"
                type="number"
                placeholder="2000000"
                value={emiData.loanAmount}
                onChange={(e) => setEmiData({ ...emiData, loanAmount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (% p.a.)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                placeholder="8.5"
                value={emiData.interestRate}
                onChange={(e) => setEmiData({ ...emiData, interestRate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tenure">Tenure (Years)</Label>
              <Input
                id="tenure"
                type="number"
                placeholder="20"
                value={emiData.tenure}
                onChange={(e) => setEmiData({ ...emiData, tenure: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prepayment">Prepayment Amount (₹)</Label>
              <Input
                id="prepayment"
                type="number"
                placeholder="200000"
                value={emiData.prepayment}
                onChange={(e) => setEmiData({ ...emiData, prepayment: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prepaymentMonth">Prepayment Month</Label>
              <Input
                id="prepaymentMonth"
                type="number"
                placeholder="12"
                value={emiData.prepaymentMonth}
                onChange={(e) => setEmiData({ ...emiData, prepaymentMonth: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={calculateEMI} className="w-full">
            Calculate EMI
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Tabs defaultValue="summary" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">EMI Summary</TabsTrigger>
            <TabsTrigger value="schedule">Amortization Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif flex items-center justify-between">
                  EMI Calculation Results
                  <Badge variant="secondary">Demo Calculation</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-chart-2">₹{results.emi.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Monthly EMI</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">₹{results.totalAmount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Amount</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <div className="text-xl font-bold text-accent">₹{results.totalInterest.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Interest</div>
                  </div>
                  {results.prepaymentSavings > 0 && (
                    <div className="text-center p-4 bg-chart-2/10 rounded-lg">
                      <div className="text-xl font-bold text-chart-2">
                        ₹{results.prepaymentSavings.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Interest Saved</div>
                    </div>
                  )}
                </div>

                {results.prepaymentSavings > 0 && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-serif font-semibold mb-2">Prepayment Impact:</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">New Tenure: </span>
                        <span className="font-semibold">{results.newTenure} years</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Interest Saved: </span>
                        <span className="font-semibold text-chart-2">
                          ₹{results.prepaymentSavings.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <h4 className="font-serif font-semibold">Key Insights:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>
                      • Interest forms {((results.totalInterest / results.totalAmount) * 100).toFixed(1)}% of total
                      payment
                    </li>
                    <li>• EMI is {((results.emi / Number(emiData.loanAmount)) * 100).toFixed(2)}% of loan amount</li>
                    {results.prepaymentSavings > 0 && (
                      <li>
                        • Prepayment reduces tenure by {(Number(emiData.tenure) - results.newTenure).toFixed(1)} years
                      </li>
                    )}
                    <li>• Consider prepayments to reduce overall interest burden</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Amortization Schedule (First 12 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>EMI</TableHead>
                        <TableHead>Principal</TableHead>
                        <TableHead>Interest</TableHead>
                        <TableHead>Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {amortizationSchedule.map((row) => (
                        <TableRow key={row.month}>
                          <TableCell>{row.month}</TableCell>
                          <TableCell>₹{row.emi.toLocaleString()}</TableCell>
                          <TableCell>₹{row.principal.toLocaleString()}</TableCell>
                          <TableCell>₹{row.interest.toLocaleString()}</TableCell>
                          <TableCell>₹{row.balance.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  * This shows the first 12 months. Principal component increases while interest decreases over time.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
