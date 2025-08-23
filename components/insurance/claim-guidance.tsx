"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Phone, Clock, CheckCircle, AlertTriangle, Shield, Heart, Car } from "lucide-react"

export function ClaimGuidance() {
  const claimSteps = {
    life: [
      {
        step: 1,
        title: "Immediate Notification",
        description: "Inform the insurance company within 30 days of the incident",
        documents: ["Death certificate", "Policy document", "Claim form"],
        timeline: "Within 30 days",
      },
      {
        step: 2,
        title: "Document Submission",
        description: "Submit all required documents to the insurance company",
        documents: ["Medical records", "Hospital bills", "Police report (if applicable)", "Identity proof"],
        timeline: "Within 90 days",
      },
      {
        step: 3,
        title: "Claim Investigation",
        description: "Insurance company investigates the claim",
        documents: ["Additional documents may be requested"],
        timeline: "30-60 days",
      },
      {
        step: 4,
        title: "Claim Settlement",
        description: "Claim amount is disbursed to beneficiaries",
        documents: ["Settlement letter", "Payment advice"],
        timeline: "15-30 days after approval",
      },
    ],
    health: [
      {
        step: 1,
        title: "Pre-Authorization (if required)",
        description: "Get approval before planned treatments",
        documents: ["Treatment estimate", "Doctor's recommendation", "Policy details"],
        timeline: "24-48 hours before treatment",
      },
      {
        step: 2,
        title: "Cashless Treatment",
        description: "Show insurance card at network hospital",
        documents: ["Insurance card", "Identity proof", "Policy document"],
        timeline: "At the time of admission",
      },
      {
        step: 3,
        title: "Reimbursement Claim",
        description: "Submit bills for non-network hospitals",
        documents: ["Original bills", "Discharge summary", "Diagnostic reports", "Claim form"],
        timeline: "Within 30 days of discharge",
      },
      {
        step: 4,
        title: "Claim Processing",
        description: "Insurance company processes the claim",
        documents: ["Additional documents if requested"],
        timeline: "15-30 days",
      },
    ],
    vehicle: [
      {
        step: 1,
        title: "Immediate Actions",
        description: "Secure the accident site and inform authorities",
        documents: ["FIR (for theft/third-party)", "Photos of damage", "Police report"],
        timeline: "Immediately after incident",
      },
      {
        step: 2,
        title: "Notify Insurer",
        description: "Inform insurance company about the incident",
        documents: ["Policy document", "Driving license", "Registration certificate"],
        timeline: "Within 24-48 hours",
      },
      {
        step: 3,
        title: "Survey and Assessment",
        description: "Insurance surveyor assesses the damage",
        documents: ["Survey report", "Repair estimates", "Original bills"],
        timeline: "3-7 days",
      },
      {
        step: 4,
        title: "Repair and Settlement",
        description: "Vehicle repair or claim settlement",
        documents: ["Final bills", "Repair completion certificate"],
        timeline: "7-15 days after approval",
      },
    ],
  }

  const commonMistakes = [
    {
      mistake: "Delayed Notification",
      impact: "Claim rejection or delayed processing",
      solution: "Inform insurer immediately after incident",
    },
    {
      mistake: "Incomplete Documentation",
      impact: "Claim rejection or multiple follow-ups",
      solution: "Maintain complete records and submit all required documents",
    },
    {
      mistake: "Non-disclosure of Information",
      impact: "Policy cancellation or claim rejection",
      solution: "Always provide accurate and complete information",
    },
    {
      mistake: "Not Understanding Policy Terms",
      impact: "Unexpected claim rejections",
      solution: "Read and understand policy terms and exclusions",
    },
  ]

  const claimTips = [
    "Keep all policy documents and receipts in a safe place",
    "Maintain a claim diary with dates and communication records",
    "Take photos/videos of incidents for evidence",
    "Follow up regularly but professionally with the insurance company",
    "Understand your policy's waiting periods and exclusions",
    "Keep emergency contact numbers of your insurance company handy",
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Claim Process Guidance
          </CardTitle>
          <CardDescription>
            Step-by-step guidance for filing insurance claims across different insurance types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="life" className="w-full">
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

            {Object.entries(claimSteps).map(([type, steps]) => (
              <TabsContent key={type} value={type} className="space-y-4 mt-6">
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.step} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-sm">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="font-serif font-bold text-lg">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium text-sm">Required Documents:</h4>
                              <ul className="space-y-1">
                                {step.documents.map((doc, idx) => (
                                  <li key={idx} className="flex items-center space-x-2 text-sm">
                                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                                    <span>{doc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium text-sm">Timeline:</h4>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-blue-500" />
                                <span className="text-sm font-medium text-blue-700">{step.timeline}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              Common Claim Mistakes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {commonMistakes.map((item, index) => (
              <div key={index} className="border-l-4 border-amber-500 pl-4 space-y-2">
                <h4 className="font-medium text-amber-800">{item.mistake}</h4>
                <p className="text-sm text-red-600">Impact: {item.impact}</p>
                <p className="text-sm text-green-700">Solution: {item.solution}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              Claim Success Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {claimTips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="font-serif text-blue-900 flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            Emergency Contacts & Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">Insurance Ombudsman</h4>
              <p className="text-sm text-blue-700">For unresolved claim disputes</p>
              <p className="text-sm font-mono">1800-4200-1800</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">IRDAI Helpline</h4>
              <p className="text-sm text-blue-700">Insurance regulatory queries</p>
              <p className="text-sm font-mono">155255</p>
            </div>
          </div>

          <div className="p-4 bg-white border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Online Resources:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• IRDAI website for complaint registration</li>
              <li>• Insurance company's mobile app for claim tracking</li>
              <li>• Consumer forums for dispute resolution</li>
              <li>• Legal aid services for complex cases</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>Disclaimer:</strong> This guidance is for educational purposes only and based on general industry
          practices. Actual claim processes may vary by insurer and policy type. Always refer to your specific policy
          documents and consult with your insurance provider for accurate claim procedures.
        </p>
      </div>
    </div>
  )
}
