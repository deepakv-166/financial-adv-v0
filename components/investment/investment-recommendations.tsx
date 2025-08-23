"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Shield, Zap } from "lucide-react"

// Demo investment data
const demoInvestments = {
  conservative: [
    {
      name: "SBI Debt Fund",
      type: "Debt Mutual Fund",
      expectedReturn: "7-9%",
      riskLevel: "Low",
      expenseRatio: "0.45%",
      rating: 4.2,
      features: ["Capital protection", "Regular income", "Tax efficient"],
      minInvestment: 1000,
    },
    {
      name: "HDFC Liquid Fund",
      type: "Liquid Fund",
      expectedReturn: "6-8%",
      riskLevel: "Very Low",
      expenseRatio: "0.25%",
      rating: 4.5,
      features: ["High liquidity", "No exit load", "Emergency fund suitable"],
      minInvestment: 5000,
    },
    {
      name: "PPF",
      type: "Government Scheme",
      expectedReturn: "7.1%",
      riskLevel: "None",
      expenseRatio: "0%",
      rating: 5.0,
      features: ["Tax free returns", "15 year lock-in", "Government backed"],
      minInvestment: 500,
    },
  ],
  balanced: [
    {
      name: "HDFC Balanced Advantage Fund",
      type: "Hybrid Fund",
      expectedReturn: "10-12%",
      riskLevel: "Medium",
      expenseRatio: "0.75%",
      rating: 4.3,
      features: ["Dynamic allocation", "Lower volatility", "Professional management"],
      minInvestment: 5000,
    },
    {
      name: "Nifty 50 Index Fund",
      type: "Index Fund",
      expectedReturn: "11-13%",
      riskLevel: "Medium",
      expenseRatio: "0.10%",
      rating: 4.4,
      features: ["Low cost", "Broad diversification", "Passive investing"],
      minInvestment: 1000,
    },
    {
      name: "Gold ETF",
      type: "Commodity ETF",
      expectedReturn: "8-10%",
      riskLevel: "Medium",
      expenseRatio: "0.50%",
      rating: 4.0,
      features: ["Inflation hedge", "Portfolio diversifier", "High liquidity"],
      minInvestment: 1000,
    },
  ],
  aggressive: [
    {
      name: "Parag Parikh Flexi Cap Fund",
      type: "Flexi Cap Fund",
      expectedReturn: "13-16%",
      riskLevel: "High",
      expenseRatio: "0.80%",
      rating: 4.6,
      features: ["International exposure", "Quality stocks", "Long term wealth"],
      minInvestment: 1000,
    },
    {
      name: "Axis Small Cap Fund",
      type: "Small Cap Fund",
      expectedReturn: "15-18%",
      riskLevel: "Very High",
      expenseRatio: "1.25%",
      rating: 4.1,
      features: ["High growth potential", "Small company exposure", "Higher volatility"],
      minInvestment: 5000,
    },
    {
      name: "Nasdaq 100 Index Fund",
      type: "International Fund",
      expectedReturn: "12-15%",
      riskLevel: "High",
      expenseRatio: "0.95%",
      rating: 4.2,
      features: ["US tech exposure", "Currency diversification", "Global growth"],
      minInvestment: 5000,
    },
  ],
}

export function InvestmentRecommendations() {
  const [selectedProfile, setSelectedProfile] = useState<"conservative" | "balanced" | "aggressive">("balanced")
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null)

  const getProfileIcon = (profile: string) => {
    switch (profile) {
      case "conservative":
        return Shield
      case "balanced":
        return TrendingUp
      case "aggressive":
        return Zap
      default:
        return TrendingUp
    }
  }

  const getProfileColor = (profile: string) => {
    switch (profile) {
      case "conservative":
        return "secondary"
      case "balanced":
        return "default"
      case "aggressive":
        return "destructive"
      default:
        return "default"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "none":
      case "very low":
        return "text-chart-2"
      case "low":
        return "text-chart-3"
      case "medium":
        return "text-chart-4"
      case "high":
      case "very high":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Investment Recommendations</CardTitle>
          <CardDescription>
            Get personalized investment suggestions based on your risk profile and financial goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-6">
            {(["conservative", "balanced", "aggressive"] as const).map((profile) => {
              const Icon = getProfileIcon(profile)
              return (
                <Button
                  key={profile}
                  variant={selectedProfile === profile ? "default" : "outline"}
                  onClick={() => setSelectedProfile(profile)}
                  className="flex-1"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {profile.charAt(0).toUpperCase() + profile.slice(1)}
                </Button>
              )
            })}
          </div>

          <div className="grid gap-4">
            {demoInvestments[selectedProfile].map((investment, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all hover:shadow-md ${selectedInvestment?.name === investment.name ? "ring-2 ring-accent" : ""}`}
                onClick={() => setSelectedInvestment(investment)}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-serif font-semibold">{investment.name}</h4>
                      <p className="text-sm text-muted-foreground">{investment.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm">{investment.rating}</span>
                      </div>
                      <Badge variant={getProfileColor(selectedProfile) as any} className="mt-1">
                        {investment.expectedReturn}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">Risk: </span>
                      <span className={getRiskColor(investment.riskLevel)}>{investment.riskLevel}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expense: </span>
                      <span>{investment.expenseRatio}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Min: </span>
                      <span>₹{investment.minInvestment.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {investment.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedInvestment && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif flex items-center justify-between">
              Investment Details: {selectedInvestment.name}
              <Badge variant="secondary">Demo Data</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-serif font-semibold">Key Metrics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Return:</span>
                    <span className="font-medium">{selectedInvestment.expectedReturn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <span className={`font-medium ${getRiskColor(selectedInvestment.riskLevel)}`}>
                      {selectedInvestment.riskLevel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expense Ratio:</span>
                    <span className="font-medium">{selectedInvestment.expenseRatio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Minimum Investment:</span>
                    <span className="font-medium">₹{selectedInvestment.minInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{selectedInvestment.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-semibold">Key Features</h4>
                <ul className="space-y-1 text-sm">
                  {selectedInvestment.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-serif font-semibold mb-2">Investment Strategy</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                {selectedProfile === "conservative" && (
                  <>
                    <p>• Focus on capital preservation with steady returns</p>
                    <p>• Suitable for short to medium-term goals (1-5 years)</p>
                    <p>• Lower volatility helps maintain peace of mind</p>
                  </>
                )}
                {selectedProfile === "balanced" && (
                  <>
                    <p>• Balance between growth and stability</p>
                    <p>• Ideal for medium to long-term goals (3-10 years)</p>
                    <p>• Moderate risk with potential for good returns</p>
                  </>
                )}
                {selectedProfile === "aggressive" && (
                  <>
                    <p>• Focus on maximum growth potential</p>
                    <p>• Best for long-term goals (7+ years)</p>
                    <p>• Higher volatility but potential for superior returns</p>
                  </>
                )}
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button className="flex-1">Start SIP</Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
