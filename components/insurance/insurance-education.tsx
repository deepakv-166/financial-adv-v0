"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Shield, Heart, Car, AlertCircle } from "lucide-react"

export function InsuranceEducation() {
  const insuranceTypes = {
    life: {
      icon: Shield,
      title: "Life Insurance",
      description: "Financial protection for your family's future",
      types: [
        {
          name: "Term Life Insurance",
          description: "Pure protection with high coverage at low cost",
          bestFor: "Young professionals with dependents",
          pros: ["Low premiums", "High coverage", "Simple structure"],
          cons: ["No maturity benefit", "Temporary coverage"],
        },
        {
          name: "Whole Life Insurance",
          description: "Lifelong coverage with investment component",
          bestFor: "Long-term financial planning",
          pros: ["Lifelong coverage", "Cash value buildup", "Loan facility"],
          cons: ["Higher premiums", "Lower returns"],
        },
        {
          name: "ULIP (Unit Linked)",
          description: "Insurance + investment in market-linked funds",
          bestFor: "Risk-tolerant investors",
          pros: ["Market-linked returns", "Flexibility", "Tax benefits"],
          cons: ["Market risk", "High charges", "Complex structure"],
        },
      ],
    },
    health: {
      icon: Heart,
      title: "Health Insurance",
      description: "Coverage for medical expenses and healthcare costs",
      types: [
        {
          name: "Individual Health Insurance",
          description: "Coverage for single person",
          bestFor: "Singles or specific individual coverage",
          pros: ["Personalized coverage", "No sharing of sum insured", "Specific needs"],
          cons: ["Higher cost per person", "Limited family benefits"],
        },
        {
          name: "Family Floater",
          description: "Shared coverage for entire family",
          bestFor: "Families with 2-6 members",
          pros: ["Cost-effective", "Shared sum insured", "Convenience"],
          cons: ["Risk of exhaustion", "Age-based pricing"],
        },
        {
          name: "Critical Illness Insurance",
          description: "Lump sum payout for specified critical illnesses",
          bestFor: "Additional protection against major diseases",
          pros: ["Lump sum benefit", "Income replacement", "Specific coverage"],
          cons: ["Limited conditions", "Waiting periods", "Higher premiums"],
        },
      ],
    },
    vehicle: {
      icon: Car,
      title: "Vehicle Insurance",
      description: "Protection for your vehicle and third-party liabilities",
      types: [
        {
          name: "Third-Party Insurance",
          description: "Mandatory coverage for third-party damages",
          bestFor: "Legal compliance (minimum requirement)",
          pros: ["Legal compliance", "Low cost", "Unlimited third-party coverage"],
          cons: ["No own damage coverage", "Limited benefits"],
        },
        {
          name: "Comprehensive Insurance",
          description: "Complete coverage including own damage and third-party",
          bestFor: "Complete vehicle protection",
          pros: ["Complete coverage", "Own damage protection", "Additional benefits"],
          cons: ["Higher premiums", "Depreciation impact"],
        },
        {
          name: "Zero Depreciation",
          description: "No depreciation deduction on claims",
          bestFor: "New vehicles (up to 5 years)",
          pros: ["Full claim amount", "No depreciation", "Better coverage"],
          cons: ["Higher premiums", "Age restrictions", "Limited claims"],
        },
      ],
    },
  }

  const keyTerms = [
    {
      term: "Premium",
      definition: "Amount paid to insurance company for coverage",
      example: "₹12,000 annual premium for ₹10L health insurance",
    },
    {
      term: "Sum Insured",
      definition: "Maximum amount insurer will pay for claims",
      example: "₹5L sum insured means max ₹5L coverage per year",
    },
    {
      term: "Deductible",
      definition: "Amount you pay before insurance coverage begins",
      example: "₹5,000 deductible means you pay first ₹5,000 of claim",
    },
    {
      term: "Waiting Period",
      definition: "Time before certain benefits become available",
      example: "2-year waiting period for pre-existing conditions",
    },
    {
      term: "No Claim Bonus",
      definition: "Discount for not making claims in previous year",
      example: "20% premium discount for claim-free year",
    },
    {
      term: "Exclusions",
      definition: "Conditions or situations not covered by policy",
      example: "Cosmetic surgery excluded from health insurance",
    },
  ]

  const buyingTips = [
    {
      category: "Research",
      tips: [
        "Compare multiple insurers and their claim settlement ratios",
        "Read policy documents carefully, especially exclusions",
        "Check network hospitals/garages for health/vehicle insurance",
        "Understand waiting periods and pre-existing condition clauses",
      ],
    },
    {
      category: "Coverage",
      tips: [
        "Buy adequate coverage based on your needs, not just affordability",
        "Consider inflation when determining coverage amounts",
        "Don't over-insure or under-insure your assets",
        "Review and update coverage regularly as life changes",
      ],
    },
    {
      category: "Claims",
      tips: [
        "Understand the claim process before you need it",
        "Keep all policy documents and receipts organized",
        "Notify insurers promptly about incidents",
        "Maintain honest communication with your insurer",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Insurance Education Center
          </CardTitle>
          <CardDescription>Learn about different types of insurance and make informed decisions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="types" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="types">Insurance Types</TabsTrigger>
              <TabsTrigger value="terms">Key Terms</TabsTrigger>
              <TabsTrigger value="tips">Buying Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="types" className="space-y-6 mt-6">
              {Object.entries(insuranceTypes).map(([key, category]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="font-serif flex items-center">
                      <category.icon className="h-5 w-5 mr-2" />
                      {category.title}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.types.map((type, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif font-bold">{type.name}</h4>
                          <Badge variant="outline">{type.bestFor}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{type.description}</p>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h5 className="font-medium text-green-700 text-sm">Advantages:</h5>
                            <ul className="space-y-1">
                              {type.pros.map((pro, idx) => (
                                <li key={idx} className="flex items-center space-x-2 text-sm">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h5 className="font-medium text-red-700 text-sm">Disadvantages:</h5>
                            <ul className="space-y-1">
                              {type.cons.map((con, idx) => (
                                <li key={idx} className="flex items-center space-x-2 text-sm">
                                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="terms" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keyTerms.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 space-y-2">
                      <h4 className="font-serif font-bold text-accent">{item.term}</h4>
                      <p className="text-sm text-foreground">{item.definition}</p>
                      <div className="p-2 bg-muted rounded text-xs text-muted-foreground">
                        <strong>Example:</strong> {item.example}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tips" className="space-y-6 mt-6">
              {buyingTips.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">{section.category} Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="font-serif text-blue-900 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Important Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">Before Buying:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Assess your actual insurance needs</li>
                <li>• Compare at least 3-4 insurance providers</li>
                <li>• Check insurer's claim settlement ratio</li>
                <li>• Understand all terms and conditions</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">After Buying:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Keep policy documents safe and accessible</li>
                <li>• Pay premiums on time to avoid lapses</li>
                <li>• Review coverage annually</li>
                <li>• Update nominee and beneficiary details</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>Educational Disclaimer:</strong> This information is for educational purposes only and should not be
          considered as financial or insurance advice. Insurance needs vary by individual circumstances. Please consult
          with licensed insurance professionals and read policy documents carefully before making insurance decisions.
        </p>
      </div>
    </div>
  )
}
