"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Heart, Car, Shield } from "lucide-react"

export function CoverageCalculator() {
  const [activeCalculator, setActiveCalculator] = useState("life")
  const [lifeData, setLifeData] = useState({
    age: "",
    income: "",
    dependents: "",
    loans: "",
    expenses: "",
    goals: "",
  })
  const [healthData, setHealthData] = useState({
    age: "",
    familySize: "",
    city: "",
    preExisting: "",
    roomType: "",
  })
  const [vehicleData, setVehicleData] = useState({
    vehicleValue: "",
    vehicleAge: "",
    city: "",
    previousClaims: "",
    voluntaryDeductible: "",
  })

  const [results, setResults] = useState<any>(null)

  const calculateLifeCoverage = () => {
    const income = Number(lifeData.income)
    const loans = Number(lifeData.loans)
    const expenses = Number(lifeData.expenses)
    const goals = Number(lifeData.goals)
    const dependents = Number(lifeData.dependents)
    const age = Number(lifeData.age)

    if (!income || !age) return

    // Human Life Value Method
    const workingYears = 60 - age
    const futureIncome = income * workingYears * 0.7 // 70% of income for family

    // Needs Analysis Method
    const immediateNeeds = loans + expenses * 2 // 2 years of expenses
    const futureNeeds = expenses * 12 * workingYears + goals
    const needsBasedCoverage = immediateNeeds + futureNeeds

    // Income Replacement Method
    const incomeReplacement = income * (dependents > 0 ? 15 : 10)

    // Recommended coverage (highest of the three methods)
    const recommendedCoverage = Math.max(futureIncome, needsBasedCoverage, incomeReplacement)

    // Premium estimation (term insurance)
    const premiumRate = age < 30 ? 0.0008 : age < 40 ? 0.0012 : 0.0018
    const estimatedPremium = recommendedCoverage * premiumRate

    setResults({
      type: "life",
      recommendedCoverage,
      estimatedPremium,
      methods: {
        humanLifeValue: futureIncome,
        needsAnalysis: needsBasedCoverage,
        incomeReplacement: incomeReplacement,
      },
    })
  }

  const calculateHealthCoverage = () => {
    const age = Number(healthData.age)
    const familySize = Number(healthData.familySize)
    const city = healthData.city
    const preExisting = healthData.preExisting === "yes"

    if (!age || !familySize) return

    // Base coverage calculation
    let baseCoverage = 300000 // Minimum coverage

    // Age factor
    if (age > 45) baseCoverage *= 2
    else if (age > 35) baseCoverage *= 1.5

    // Family size factor
    if (familySize > 4) baseCoverage *= 2
    else if (familySize > 2) baseCoverage *= 1.5

    // City factor (metro vs non-metro)
    if (city === "metro") baseCoverage *= 1.5

    // Pre-existing condition factor
    if (preExisting) baseCoverage *= 1.3

    const recommendedCoverage = Math.min(baseCoverage, 2000000) // Cap at 20L

    // Premium estimation
    let premiumRate = 0.04 // 4% of sum insured
    if (age > 45) premiumRate *= 1.5
    if (preExisting) premiumRate *= 1.4
    if (city === "metro") premiumRate *= 1.2

    const estimatedPremium = recommendedCoverage * premiumRate

    setResults({
      type: "health",
      recommendedCoverage,
      estimatedPremium,
      factors: {
        ageMultiplier: age > 45 ? 2 : age > 35 ? 1.5 : 1,
        familyMultiplier: familySize > 4 ? 2 : familySize > 2 ? 1.5 : 1,
        cityMultiplier: city === "metro" ? 1.5 : 1,
        preExistingMultiplier: preExisting ? 1.3 : 1,
      },
    })
  }

  const calculateVehicleCoverage = () => {
    const vehicleValue = Number(vehicleData.vehicleValue)
    const vehicleAge = Number(vehicleData.vehicleAge)
    const previousClaims = Number(vehicleData.previousClaims)
    const voluntaryDeductible = Number(vehicleData.voluntaryDeductible)

    if (!vehicleValue) return

    // IDV calculation (Insured Declared Value)
    let idv = vehicleValue
    const depreciationRate = Math.min(vehicleAge * 0.05, 0.5) // Max 50% depreciation
    idv = vehicleValue * (1 - depreciationRate)

    // Premium calculation
    let premiumRate = 0.03 // 3% base rate

    // Age factor
    if (vehicleAge > 5) premiumRate *= 1.2

    // Claims factor
    if (previousClaims > 0) premiumRate *= 1 + previousClaims * 0.1

    // City factor
    if (vehicleData.city === "metro") premiumRate *= 1.15

    // Voluntary deductible discount
    if (voluntaryDeductible > 0) {
      const discount = Math.min((voluntaryDeductible / 10000) * 0.1, 0.15) // Max 15% discount
      premiumRate *= 1 - discount
    }

    const estimatedPremium = idv * premiumRate

    setResults({
      type: "vehicle",
      idv,
      estimatedPremium,
      factors: {
        depreciationRate,
        ageMultiplier: vehicleAge > 5 ? 1.2 : 1,
        claimsMultiplier: 1 + previousClaims * 0.1,
        cityMultiplier: vehicleData.city === "metro" ? 1.15 : 1,
        deductibleDiscount: voluntaryDeductible > 0 ? Math.min((voluntaryDeductible / 10000) * 0.1, 0.15) : 0,
      },
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Coverage Calculator
          </CardTitle>
          <CardDescription>Calculate optimal insurance coverage for different insurance types</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeCalculator} onValueChange={setActiveCalculator} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="life" className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Life Insurance
              </TabsTrigger>
              <TabsTrigger value="health" className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Health Insurance
              </TabsTrigger>
              <TabsTrigger value="vehicle" className="flex items-center">
                <Car className="h-4 w-4 mr-2" />
                Vehicle Insurance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="life" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lifeAge">Age</Label>
                  <Input
                    id="lifeAge"
                    type="number"
                    placeholder="35"
                    value={lifeData.age}
                    onChange={(e) => setLifeData({ ...lifeData, age: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lifeIncome">Annual Income (₹)</Label>
                  <Input
                    id="lifeIncome"
                    type="number"
                    placeholder="1200000"
                    value={lifeData.income}
                    onChange={(e) => setLifeData({ ...lifeData, income: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lifeDependents">Number of Dependents</Label>
                  <Input
                    id="lifeDependents"
                    type="number"
                    placeholder="2"
                    value={lifeData.dependents}
                    onChange={(e) => setLifeData({ ...lifeData, dependents: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lifeLoans">Outstanding Loans (₹)</Label>
                  <Input
                    id="lifeLoans"
                    type="number"
                    placeholder="2500000"
                    value={lifeData.loans}
                    onChange={(e) => setLifeData({ ...lifeData, loans: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lifeExpenses">Annual Expenses (₹)</Label>
                  <Input
                    id="lifeExpenses"
                    type="number"
                    placeholder="800000"
                    value={lifeData.expenses}
                    onChange={(e) => setLifeData({ ...lifeData, expenses: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lifeGoals">Future Goals (₹)</Label>
                  <Input
                    id="lifeGoals"
                    type="number"
                    placeholder="5000000"
                    value={lifeData.goals}
                    onChange={(e) => setLifeData({ ...lifeData, goals: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={calculateLifeCoverage} className="w-full">
                Calculate Life Coverage
              </Button>
            </TabsContent>

            <TabsContent value="health" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="healthAge">Age</Label>
                  <Input
                    id="healthAge"
                    type="number"
                    placeholder="35"
                    value={healthData.age}
                    onChange={(e) => setHealthData({ ...healthData, age: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="familySize">Family Size</Label>
                  <Input
                    id="familySize"
                    type="number"
                    placeholder="4"
                    value={healthData.familySize}
                    onChange={(e) => setHealthData({ ...healthData, familySize: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City Type</Label>
                  <Select
                    value={healthData.city}
                    onValueChange={(value) => setHealthData({ ...healthData, city: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select city type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metro">Metro City</SelectItem>
                      <SelectItem value="non-metro">Non-Metro City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preExisting">Pre-existing Conditions</Label>
                  <Select
                    value={healthData.preExisting}
                    onValueChange={(value) => setHealthData({ ...healthData, preExisting: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any pre-existing conditions?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomType">Preferred Room Type</Label>
                <Select
                  value={healthData.roomType}
                  onValueChange={(value) => setHealthData({ ...healthData, roomType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select room preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Ward</SelectItem>
                    <SelectItem value="semi-private">Semi-Private Room</SelectItem>
                    <SelectItem value="private">Private Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateHealthCoverage} className="w-full">
                Calculate Health Coverage
              </Button>
            </TabsContent>

            <TabsContent value="vehicle" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleValue">Vehicle Value (₹)</Label>
                  <Input
                    id="vehicleValue"
                    type="number"
                    placeholder="800000"
                    value={vehicleData.vehicleValue}
                    onChange={(e) => setVehicleData({ ...vehicleData, vehicleValue: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleAge">Vehicle Age (Years)</Label>
                  <Input
                    id="vehicleAge"
                    type="number"
                    placeholder="3"
                    value={vehicleData.vehicleAge}
                    onChange={(e) => setVehicleData({ ...vehicleData, vehicleAge: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleCity">City Type</Label>
                  <Select
                    value={vehicleData.city}
                    onValueChange={(value) => setVehicleData({ ...vehicleData, city: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select city type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metro">Metro City</SelectItem>
                      <SelectItem value="non-metro">Non-Metro City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="previousClaims">Previous Claims (Last 3 Years)</Label>
                  <Input
                    id="previousClaims"
                    type="number"
                    placeholder="0"
                    value={vehicleData.previousClaims}
                    onChange={(e) => setVehicleData({ ...vehicleData, previousClaims: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="voluntaryDeductible">Voluntary Deductible (₹)</Label>
                <Select
                  value={vehicleData.voluntaryDeductible}
                  onValueChange={(value) => setVehicleData({ ...vehicleData, voluntaryDeductible: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select deductible amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No Deductible</SelectItem>
                    <SelectItem value="2500">₹2,500</SelectItem>
                    <SelectItem value="5000">₹5,000</SelectItem>
                    <SelectItem value="7500">₹7,500</SelectItem>
                    <SelectItem value="15000">₹15,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateVehicleCoverage} className="w-full">
                Calculate Vehicle Coverage
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif flex items-center justify-between">
              Coverage Calculation Results
              <Badge variant="secondary">Demo Calculation</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {results.type === "life" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-chart-1">
                      ₹{results.recommendedCoverage.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Recommended Coverage</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-accent">
                      ₹{Math.round(results.estimatedPremium).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Annual Premium (Est.)</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-serif font-medium">Calculation Methods:</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-chart-1/10 rounded-lg text-center">
                      <div className="font-bold text-chart-1">₹{results.methods.humanLifeValue.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Human Life Value</div>
                    </div>
                    <div className="p-3 bg-chart-2/10 rounded-lg text-center">
                      <div className="font-bold text-chart-2">₹{results.methods.needsAnalysis.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Needs Analysis</div>
                    </div>
                    <div className="p-3 bg-chart-3/10 rounded-lg text-center">
                      <div className="font-bold text-chart-3">
                        ₹{results.methods.incomeReplacement.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Income Replacement</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {results.type === "health" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-chart-2">
                      ₹{results.recommendedCoverage.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Recommended Coverage</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-accent">
                      ₹{Math.round(results.estimatedPremium).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Annual Premium (Est.)</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-serif font-medium">Coverage Factors:</h4>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <div className="font-bold">{results.factors.ageMultiplier}x</div>
                      <div className="text-xs text-muted-foreground">Age Factor</div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <div className="font-bold">{results.factors.familyMultiplier}x</div>
                      <div className="text-xs text-muted-foreground">Family Size</div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <div className="font-bold">{results.factors.cityMultiplier}x</div>
                      <div className="text-xs text-muted-foreground">City Factor</div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <div className="font-bold">{results.factors.preExistingMultiplier}x</div>
                      <div className="text-xs text-muted-foreground">Health Factor</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {results.type === "vehicle" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-chart-4">₹{Math.round(results.idv).toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Insured Declared Value</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-accent">
                      ₹{Math.round(results.estimatedPremium).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Annual Premium (Est.)</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-serif font-medium">Premium Factors:</h4>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <div className="font-bold">{(results.factors.depreciationRate * 100).toFixed(0)}%</div>
                      <div className="text-xs text-muted-foreground">Depreciation</div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <div className="font-bold">{results.factors.ageMultiplier}x</div>
                      <div className="text-xs text-muted-foreground">Age Factor</div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <div className="font-bold">{results.factors.claimsMultiplier.toFixed(1)}x</div>
                      <div className="text-xs text-muted-foreground">Claims History</div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <div className="font-bold">{(results.factors.deductibleDiscount * 100).toFixed(0)}%</div>
                      <div className="text-xs text-muted-foreground">Deductible Discount</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> These calculations are estimates based on general industry practices. Actual
                coverage requirements and premiums may vary based on insurer policies, medical examinations, and
                specific terms and conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
