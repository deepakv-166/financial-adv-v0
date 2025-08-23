"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star, TrendingUp, TrendingDown } from "lucide-react"

// Demo loan data
const demoLoans = [
  {
    id: 1,
    bank: "SBI Home Loans",
    type: "Home Loan",
    interestRate: 8.5,
    processingFee: 0.5,
    maxTenure: 30,
    minAmount: 100000,
    maxAmount: 10000000,
    rating: 4.2,
    features: ["No prepayment charges after 1 year", "Doorstep service", "Quick approval"],
  },
  {
    id: 2,
    bank: "HDFC Home Loans",
    type: "Home Loan",
    interestRate: 8.75,
    processingFee: 0.5,
    maxTenure: 30,
    minAmount: 100000,
    maxAmount: 15000000,
    rating: 4.5,
    features: ["Digital documentation", "Balance transfer facility", "Top-up loans available"],
  },
  {
    id: 3,
    bank: "ICICI Bank Personal Loan",
    type: "Personal Loan",
    interestRate: 11.5,
    processingFee: 2.5,
    maxTenure: 5,
    minAmount: 50000,
    maxAmount: 2000000,
    rating: 4.1,
    features: ["Instant approval", "No collateral", "Flexible repayment"],
  },
  {
    id: 4,
    bank: "Axis Bank Car Loan",
    type: "Car Loan",
    interestRate: 9.25,
    processingFee: 1.0,
    maxTenure: 7,
    minAmount: 100000,
    maxAmount: 5000000,
    rating: 4.3,
    features: ["Up to 90% financing", "Quick disbursement", "Competitive rates"],
  },
]

export function LoanComparison() {
  const [comparisonData, setComparisonData] = useState({
    loanAmount: "",
    tenure: "",
    loanType: "home",
  })

  const [comparisonResults, setComparisonResults] = useState<any[]>([])

  const compareLoans = () => {
    const amount = Number(comparisonData.loanAmount)
    const tenure = Number(comparisonData.tenure)

    if (!amount || !tenure) return

    const filteredLoans = demoLoans.filter(
      (loan) =>
        loan.type.toLowerCase().includes(comparisonData.loanType) &&
        amount >= loan.minAmount &&
        amount <= loan.maxAmount &&
        tenure <= loan.maxTenure,
    )

    const results = filteredLoans.map((loan) => {
      const monthlyRate = loan.interestRate / 100 / 12
      const totalMonths = tenure * 12
      const emi =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
      const totalAmount = emi * totalMonths
      const totalInterest = totalAmount - amount
      const processingFeeAmount = (amount * loan.processingFee) / 100
      const totalCost = totalAmount + processingFeeAmount

      return {
        ...loan,
        emi: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        processingFeeAmount: Math.round(processingFeeAmount),
        totalCost: Math.round(totalCost),
      }
    })

    // Sort by total cost (lowest first)
    results.sort((a, b) => a.totalCost - b.totalCost)

    setComparisonResults(results)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Loan Comparison Tool</CardTitle>
          <CardDescription>Compare loans from different banks and NBFCs to find the best deal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Loan Amount (₹)</label>
              <input
                type="number"
                placeholder="2000000"
                className="w-full px-3 py-2 border rounded-md"
                value={comparisonData.loanAmount}
                onChange={(e) => setComparisonData({ ...comparisonData, loanAmount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tenure (Years)</label>
              <input
                type="number"
                placeholder="20"
                className="w-full px-3 py-2 border rounded-md"
                value={comparisonData.tenure}
                onChange={(e) => setComparisonData({ ...comparisonData, tenure: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Loan Type</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={comparisonData.loanType}
                onChange={(e) => setComparisonData({ ...comparisonData, loanType: e.target.value })}
              >
                <option value="home">Home Loan</option>
                <option value="personal">Personal Loan</option>
                <option value="car">Car Loan</option>
              </select>
            </div>
          </div>

          <Button onClick={compareLoans} className="w-full">
            Compare Loans
          </Button>
        </CardContent>
      </Card>

      {comparisonResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif flex items-center justify-between">
              Loan Comparison Results
              <Badge variant="secondary">Demo Data</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lender</TableHead>
                    <TableHead>Interest Rate</TableHead>
                    <TableHead>EMI</TableHead>
                    <TableHead>Processing Fee</TableHead>
                    <TableHead>Total Interest</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonResults.map((loan, index) => (
                    <TableRow key={loan.id} className={index === 0 ? "bg-chart-2/10" : ""}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{loan.bank}</div>
                          {index === 0 && (
                            <Badge variant="default" className="text-xs">
                              Best Deal
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {loan.interestRate}%
                          {index === 0 ? (
                            <TrendingDown className="h-3 w-3 ml-1 text-chart-2" />
                          ) : (
                            <TrendingUp className="h-3 w-3 ml-1 text-destructive" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>₹{loan.emi.toLocaleString()}</TableCell>
                      <TableCell>₹{loan.processingFeeAmount.toLocaleString()}</TableCell>
                      <TableCell>₹{loan.totalInterest.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">₹{loan.totalCost.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          {loan.rating}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 space-y-4">
              <h4 className="font-serif font-semibold">Key Features Comparison:</h4>
              <div className="grid gap-4">
                {comparisonResults.map((loan, index) => (
                  <Card key={loan.id} className={index === 0 ? "border-chart-2" : ""}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{loan.bank}</h5>
                        {index === 0 && <Badge variant="default">Recommended</Badge>}
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {loan.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
