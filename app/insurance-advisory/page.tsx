"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, Heart, Car, Home, Calculator } from "lucide-react"
import Link from "next/link"
import { InsuranceNeedsAssessment } from "@/components/insurance/insurance-needs-assessment"
import { CoverageCalculator } from "@/components/insurance/coverage-calculator"
import { PremiumComparison } from "@/components/insurance/premium-comparison"
import { ClaimGuidance } from "@/components/insurance/claim-guidance"
import { InsuranceEducation } from "@/components/insurance/insurance-education"
import { ChatAssistant } from "@/components/ai-chat/chat-assistant"

export default function InsuranceAdvisoryPage() {
  const [activeTab, setActiveTab] = useState("assessment")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/features" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">Insurance Advisory</h1>
              <p className="text-muted-foreground">
                Protect your financial future with comprehensive insurance planning
              </p>
            </div>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Demo Portal
          </Badge>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="assessment" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Needs Assessment</span>
              <span className="sm:hidden">Assessment</span>
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Coverage Calculator</span>
              <span className="sm:hidden">Calculator</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Premium Comparison</span>
              <span className="sm:hidden">Compare</span>
            </TabsTrigger>
            <TabsTrigger value="claims" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Claim Guidance</span>
              <span className="sm:hidden">Claims</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center space-x-2">
              <Car className="h-4 w-4" />
              <span className="hidden sm:inline">Insurance Education</span>
              <span className="sm:hidden">Learn</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assessment" className="space-y-6">
            <InsuranceNeedsAssessment />
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <CoverageCalculator />
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <PremiumComparison />
          </TabsContent>

          <TabsContent value="claims" className="space-y-6">
            <ClaimGuidance />
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <InsuranceEducation />
          </TabsContent>
        </Tabs>

        {/* AI Chat Assistant */}
        <ChatAssistant context="insurance" />

        {/* Footer Disclaimer */}
        <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Important Disclaimer:</strong> This insurance advisory portal uses demo data and simplified
            calculations for educational purposes only. Actual insurance needs, premiums, and coverage may vary
            significantly based on individual circumstances, health conditions, and insurer policies. Please consult
            with licensed insurance agents and financial advisors for personalized insurance planning and product
            recommendations.
          </p>
        </div>
      </div>
    </div>
  )
}
