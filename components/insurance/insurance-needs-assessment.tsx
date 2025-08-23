"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Users, Heart } from "lucide-react"

export function InsuranceNeedsAssessment() {
  const [profile, setProfile] = useState({
    age: "",
    maritalStatus: "",
    dependents: "",
    annualIncome: "",
    existingLoans: "",
    healthConditions: [] as string[],
    lifestyle: "",
    riskTolerance: "",
  })

  const [assessment, setAssessment] = useState<any>(null)

  const healthConditions = ["Diabetes", "Hypertension", "Heart Disease", "Asthma", "Thyroid", "None"]

  const calculateInsuranceNeeds = () => {
    const income = Number(profile.annualIncome)
    const loans = Number(profile.existingLoans)
    const dependentsCount = Number(profile.dependents)
    const age = Number(profile.age)

    if (!income || !age) return

    // Life Insurance Calculation (10-15x annual income + loans)
    const lifeInsuranceMultiplier = age < 30 ? 15 : age < 40 ? 12 : 10
    const lifeInsurance = income * lifeInsuranceMultiplier + loans

    // Health Insurance (family floater based on dependents)
    const healthInsurance = dependentsCount > 2 ? 1000000 : dependentsCount > 0 ? 500000 : 300000

    // Term Insurance (pure protection)
    const termInsurance = income * 10

    // Disability Insurance (60-70% of income)
    const disabilityInsurance = income * 0.65

    // Critical Illness (3-5x annual income)
    const criticalIllness = income * 4

    setAssessment({
      lifeInsurance,
      healthInsurance,
      termInsurance,
      disabilityInsurance,
      criticalIllness,
      totalPremiumEstimate: Math.round(lifeInsurance * 0.008 + healthInsurance * 0.04 + income * 0.02),
      recommendations: generateRecommendations(age, dependentsCount, profile.healthConditions),
    })
  }

  const generateRecommendations = (age: number, dependents: number, healthConditions: string[]) => {
    const recommendations = []

    if (age < 30) {
      recommendations.push("Start with term insurance for maximum coverage at low cost")
      recommendations.push("Consider health insurance with lifetime renewability")
    } else if (age < 45) {
      recommendations.push("Increase life insurance coverage as responsibilities grow")
      recommendations.push("Add critical illness coverage for comprehensive protection")
    } else {
      recommendations.push("Focus on health insurance with higher coverage")
      recommendations.push("Consider retirement-focused insurance products")
    }

    if (dependents > 0) {
      recommendations.push("Prioritize family floater health insurance")
      recommendations.push("Ensure adequate life insurance for dependents' future")
    }

    if (healthConditions.some((condition) => condition !== "None")) {
      recommendations.push("Disclose all health conditions for proper coverage")
      recommendations.push("Consider specialized health insurance for pre-existing conditions")
    }

    return recommendations
  }

  const handleHealthConditionChange = (condition: string, checked: boolean) => {
    if (checked) {
      setProfile({ ...profile, healthConditions: [...profile.healthConditions, condition] })
    } else {
      setProfile({
        ...profile,
        healthConditions: profile.healthConditions.filter((c) => c !== condition),
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Insurance Needs Assessment
          </CardTitle>
          <CardDescription>
            Analyze your insurance requirements based on your personal and financial profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="30"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select
                value={profile.maritalStatus}
                onValueChange={(value) => setProfile({ ...profile, maritalStatus: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dependents">Number of Dependents</Label>
              <Input
                id="dependents"
                type="number"
                placeholder="2"
                value={profile.dependents}
                onChange={(e) => setProfile({ ...profile, dependents: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualIncome">Annual Income (₹)</Label>
              <Input
                id="annualIncome"
                type="number"
                placeholder="1200000"
                value={profile.annualIncome}
                onChange={(e) => setProfile({ ...profile, annualIncome: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="existingLoans">Existing Loans/Liabilities (₹)</Label>
            <Input
              id="existingLoans"
              type="number"
              placeholder="2500000"
              value={profile.existingLoans}
              onChange={(e) => setProfile({ ...profile, existingLoans: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <Label>Health Conditions (Select all that apply)</Label>
            <div className="grid grid-cols-3 gap-3">
              {healthConditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition}
                    checked={profile.healthConditions.includes(condition)}
                    onCheckedChange={(checked) => handleHealthConditionChange(condition, checked as boolean)}
                  />
                  <Label htmlFor={condition} className="text-sm">
                    {condition}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lifestyle">Lifestyle</Label>
              <Select value={profile.lifestyle} onValueChange={(value) => setProfile({ ...profile, lifestyle: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select lifestyle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="high-risk">High Risk (Adventure Sports)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="riskTolerance">Risk Tolerance</Label>
              <Select
                value={profile.riskTolerance}
                onValueChange={(value) => setProfile({ ...profile, riskTolerance: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tolerance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateInsuranceNeeds} className="w-full">
            Assess Insurance Needs
          </Button>
        </CardContent>
      </Card>

      {assessment && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center justify-between">
                Coverage Recommendations
                <Badge variant="secondary">Demo Analysis</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-chart-1" />
                    <span className="text-sm font-medium">Life Insurance</span>
                  </div>
                  <span className="font-bold">₹{assessment.lifeInsurance.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-chart-2" />
                    <span className="text-sm font-medium">Health Insurance</span>
                  </div>
                  <span className="font-bold">₹{assessment.healthInsurance.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-chart-3" />
                    <span className="text-sm font-medium">Term Insurance</span>
                  </div>
                  <span className="font-bold">₹{assessment.termInsurance.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-chart-4" />
                    <span className="text-sm font-medium">Critical Illness</span>
                  </div>
                  <span className="font-bold">₹{assessment.criticalIllness.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-lg font-bold text-accent">
                    ₹{assessment.totalPremiumEstimate.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Estimated Annual Premium</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assessment.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-foreground">{rec}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-serif font-medium text-blue-900 mb-2">Next Steps:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Compare quotes from multiple insurers</li>
                  <li>• Review policy terms and exclusions carefully</li>
                  <li>• Consider annual policy reviews and updates</li>
                  <li>• Maintain emergency fund alongside insurance</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
