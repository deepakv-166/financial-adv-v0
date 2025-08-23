"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield } from "lucide-react"

export function RetirementPlanner() {
  const [retirementData, setRetirementData] = useState({
    currentAge: "",
    retirementAge: "",
    currentSalary: "",
    currentPF: "",
    expectedInflation: "",
    postRetirementExpenses: "",
  })

  const [results, setResults] = useState<any>(null)

  const calculateRetirement = () => {
    const currentAge = Number(retirementData.currentAge)
    const retirementAge = Number(retirementData.retirementAge)
    const yearsToRetirement = retirementAge - currentAge
    const currentSalary = Number(retirementData.currentSalary)
    const inflation = Number(retirementData.expectedInflation) / 100
    const expenseRatio = Number(retirementData.postRetirementExpenses) / 100

    if (!currentAge || !retirementAge || !currentSalary) return

    // EPF Calculation (12% of salary)
    const monthlyEPF = currentSalary * 0.12
    const annualEPF = monthlyEPF * 12
    const epfAtRetirement = annualEPF * ((Math.pow(1.08, yearsToRetirement) - 1) / 0.08) // Assuming 8% EPF return

    // PPF Calculation (assuming max 1.5L per year)
    const annualPPF = 150000
    const ppfAtRetirement = annualPPF * ((Math.pow(1.08, yearsToRetirement) - 1) / 0.08)

    // Required corpus calculation
    const futureExpenses = currentSalary * expenseRatio * Math.pow(1 + inflation, yearsToRetirement)
    const requiredCorpus = futureExpenses * 25 // 4% withdrawal rule

    // Additional investment needed
    const totalFromEPFPPF = epfAtRetirement + ppfAtRetirement
    const additionalNeeded = Math.max(0, requiredCorpus - totalFromEPFPPF)
    const monthlySIPNeeded =
      additionalNeeded > 0 ? (additionalNeeded * 0.12) / ((Math.pow(1.12, yearsToRetirement) - 1) * 12) : 0

    setResults({
      yearsToRetirement,
      epfAtRetirement: Math.round(epfAtRetirement),
      ppfAtRetirement: Math.round(ppfAtRetirement),
      totalFromEPFPPF: Math.round(totalFromEPFPPF),
      requiredCorpus: Math.round(requiredCorpus),
      additionalNeeded: Math.round(additionalNeeded),
      monthlySIPNeeded: Math.round(monthlySIPNeeded),
      futureExpenses: Math.round(futureExpenses),
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Retirement Planner
          </CardTitle>
          <CardDescription>Plan your retirement with EPF, PPF, NPS, and additional investments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentAge">Current Age</Label>
              <Input
                id="currentAge"
                type="number"
                placeholder="30"
                value={retirementData.currentAge}
                onChange={(e) => setRetirementData({ ...retirementData, currentAge: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retirementAge">Retirement Age</Label>
              <Input
                id="retirementAge"
                type="number"
                placeholder="60"
                value={retirementData.retirementAge}
                onChange={(e) => setRetirementData({ ...retirementData, retirementAge: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentSalary">Current Monthly Salary (₹)</Label>
              <Input
                id="currentSalary"
                type="number"
                placeholder="75000"
                value={retirementData.currentSalary}
                onChange={(e) => setRetirementData({ ...retirementData, currentSalary: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedInflation">Expected Inflation (%)</Label>
              <Input
                id="expectedInflation"
                type="number"
                placeholder="6"
                value={retirementData.expectedInflation}
                onChange={(e) => setRetirementData({ ...retirementData, expectedInflation: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="postRetirementExpenses">Post-Retirement Expenses (% of current salary)</Label>
            <Input
              id="postRetirementExpenses"
              type="number"
              placeholder="70"
              value={retirementData.postRetirementExpenses}
              onChange={(e) => setRetirementData({ ...retirementData, postRetirementExpenses: e.target.value })}
            />
          </div>

          <Button onClick={calculateRetirement} className="w-full">
            Calculate Retirement Plan
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Tabs defaultValue="summary" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif flex items-center justify-between">
                  Retirement Summary
                  <Badge variant="secondary">Demo Projection</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">{results.yearsToRetirement}</div>
                    <div className="text-sm text-muted-foreground">Years to Retirement</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-chart-2">₹{results.requiredCorpus.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Required Corpus</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <div className="text-xl font-bold text-accent">₹{results.totalFromEPFPPF.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">EPF + PPF Total</div>
                  </div>
                  <div className="text-center p-4 bg-chart-1/10 rounded-lg">
                    <div className="text-xl font-bold text-chart-1">₹{results.monthlySIPNeeded.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Additional Monthly SIP</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Retirement Corpus Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <span className="font-medium">EPF at Retirement</span>
                    <span className="font-bold">₹{results.epfAtRetirement.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <span className="font-medium">PPF at Retirement</span>
                    <span className="font-bold">₹{results.ppfAtRetirement.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-accent/10 rounded">
                    <span className="font-medium">Additional Investment Needed</span>
                    <span className="font-bold text-accent">₹{results.additionalNeeded.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-chart-2/10 rounded">
                    <span className="font-medium">Total Retirement Corpus</span>
                    <span className="font-bold text-chart-2">₹{results.requiredCorpus.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Retirement Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <h4 className="font-semibold">Recommended Action Plan:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      • <strong>EPF:</strong> Continue 12% contribution (₹
                      {(Number(retirementData.currentSalary) * 0.12).toLocaleString()}/month)
                    </li>
                    <li>
                      • <strong>PPF:</strong> Invest ₹1.5L annually for tax benefits and guaranteed returns
                    </li>
                    <li>
                      • <strong>Additional SIP:</strong> Start ₹{results.monthlySIPNeeded.toLocaleString()}/month in
                      equity mutual funds
                    </li>
                    <li>
                      • <strong>NPS:</strong> Consider additional tax benefits under 80CCD(1B)
                    </li>
                    <li>
                      • <strong>ELSS:</strong> Use for 80C tax saving with equity exposure
                    </li>
                  </ul>

                  <h4 className="font-semibold mt-4">Key Considerations:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Review and increase SIP amounts annually with salary hikes</li>
                    <li>• Consider healthcare inflation for medical expenses</li>
                    <li>• Plan for 25-30 years of post-retirement life</li>
                    <li>• Diversify across EPF, PPF, equity, and debt instruments</li>
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
