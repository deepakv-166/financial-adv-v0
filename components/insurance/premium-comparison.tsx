"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Star, CheckCircle, XCircle } from "lucide-react"

export function PremiumComparison() {
  const [comparisonData, setComparisonData] = useState({
    insuranceType: "",
    coverage: "",
    age: "",
    city: "",
  })

  const [comparisons, setComparisons] = useState<any>(null)

  const generateComparisons = () => {
    const coverage = Number(comparisonData.coverage)
    const age = Number(comparisonData.age)

    if (!coverage || !age || !comparisonData.insuranceType) return

    // Mock insurance providers with different pricing strategies
    const providers = [
      {
        name: "SecureLife Insurance",
        rating: 4.5,
        premium: calculatePremium(coverage, age, 1.0),
        features: ["No Medical Test up to 50L", "Quick Claim Settlement", "Online Policy Management"],
        exclusions: ["Pre-existing conditions (2 years)", "Adventure sports"],
        claimRatio: 98.2,
        settlementTime: "15 days",
      },
      {
        name: "TrustGuard Insurance",
        rating: 4.2,
        premium: calculatePremium(coverage, age, 0.85),
        features: ["Lifetime Renewability", "Free Health Checkup", "24/7 Customer Support"],
        exclusions: ["Cosmetic treatments", "Dental procedures"],
        claimRatio: 96.8,
        settlementTime: "21 days",
      },
      {
        name: "SafeHaven Insurance",
        rating: 4.7,
        premium: calculatePremium(coverage, age, 1.15),
        features: ["Comprehensive Coverage", "Global Coverage", "Premium Waiver Benefit"],
        exclusions: ["War and terrorism", "Nuclear risks"],
        claimRatio: 99.1,
        settlementTime: "12 days",
      },
      {
        name: "ValueProtect Insurance",
        rating: 4.0,
        premium: calculatePremium(coverage, age, 0.75),
        features: ["Affordable Premiums", "Basic Coverage", "Easy Application"],
        exclusions: ["Critical illness", "Maternity benefits"],
        claimRatio: 94.5,
        settlementTime: "30 days",
      },
    ]

    // Sort by premium (lowest first)
    providers.sort((a, b) => a.premium - b.premium)

    setComparisons({
      providers,
      bestValue: providers[0],
      bestFeatures: providers.reduce((best, current) => (current.rating > best.rating ? current : best)),
    })
  }

  const calculatePremium = (coverage: number, age: number, multiplier: number) => {
    let basePremium = 0

    if (comparisonData.insuranceType === "life") {
      basePremium = coverage * 0.001 * (age < 30 ? 0.8 : age < 40 ? 1.0 : 1.3)
    } else if (comparisonData.insuranceType === "health") {
      basePremium = coverage * 0.04 * (age < 30 ? 0.7 : age < 45 ? 1.0 : 1.5)
    } else if (comparisonData.insuranceType === "vehicle") {
      basePremium = coverage * 0.03
    }

    // City factor
    if (comparisonData.city === "metro") {
      basePremium *= 1.2
    }

    return Math.round(basePremium * multiplier)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Premium Comparison
          </CardTitle>
          <CardDescription>Compare insurance premiums and features across multiple providers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insuranceType">Insurance Type</Label>
              <Select
                value={comparisonData.insuranceType}
                onValueChange={(value) => setComparisonData({ ...comparisonData, insuranceType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select insurance type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="life">Life Insurance</SelectItem>
                  <SelectItem value="health">Health Insurance</SelectItem>
                  <SelectItem value="vehicle">Vehicle Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverage">Coverage Amount (₹)</Label>
              <Input
                id="coverage"
                type="number"
                placeholder="1000000"
                value={comparisonData.coverage}
                onChange={(e) => setComparisonData({ ...comparisonData, coverage: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="35"
                value={comparisonData.age}
                onChange={(e) => setComparisonData({ ...comparisonData, age: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City Type</Label>
              <Select
                value={comparisonData.city}
                onValueChange={(value) => setComparisonData({ ...comparisonData, city: value })}
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
          </div>

          <Button onClick={generateComparisons} className="w-full">
            Compare Premiums
          </Button>
        </CardContent>
      </Card>

      {comparisons && (
        <div className="space-y-6">
          {/* Best Options Summary */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-serif text-green-800">Best Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="font-bold text-green-900">{comparisons.bestValue.name}</div>
                  <div className="text-2xl font-bold text-green-700">
                    ₹{comparisons.bestValue.premium.toLocaleString()}/year
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{comparisons.bestValue.rating}/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-serif text-blue-800">Best Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="font-bold text-blue-900">{comparisons.bestFeatures.name}</div>
                  <div className="text-2xl font-bold text-blue-700">
                    ₹{comparisons.bestFeatures.premium.toLocaleString()}/year
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{comparisons.bestFeatures.rating}/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center justify-between">
                Detailed Comparison
                <Badge variant="secondary">Demo Data</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {comparisons.providers.map((provider: any, index: number) => (
                  <div key={provider.name} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-serif font-bold text-lg">{provider.name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{provider.rating}/5</span>
                          </div>
                          <Badge variant={index === 0 ? "default" : "secondary"}>
                            {index === 0 ? "Best Value" : `#${index + 1}`}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent">₹{provider.premium.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">per year</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="font-medium">Claim Ratio</div>
                        <div className="text-chart-2 font-bold">{provider.claimRatio}%</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium">Settlement Time</div>
                        <div className="text-chart-3 font-bold">{provider.settlementTime}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium">Coverage</div>
                        <div className="text-chart-4 font-bold">
                          ₹{Number(comparisonData.coverage).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-green-700">Key Features</h4>
                        <ul className="space-y-1">
                          {provider.features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-red-700">Exclusions</h4>
                        <ul className="space-y-1">
                          {provider.exclusions.map((exclusion: string, idx: number) => (
                            <li key={idx} className="flex items-center space-x-2 text-sm">
                              <XCircle className="h-3 w-3 text-red-500 flex-shrink-0" />
                              <span>{exclusion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-serif font-medium text-blue-900 mb-2">Comparison Tips:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Don't choose based on premium alone - consider claim ratio and settlement time</li>
                  <li>• Read policy documents carefully for exclusions and waiting periods</li>
                  <li>• Check network hospitals/garages for health/vehicle insurance</li>
                  <li>• Consider the insurer's financial strength and customer service ratings</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
