"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, PiggyBank, Home, MessageCircle } from "lucide-react"
import Link from "next/link"
import { UserProfileForm } from "@/components/financial/user-profile-form"
import { BudgetAnalyzer } from "@/components/financial/budget-analyzer"
import { GoalPlanner } from "@/components/financial/goal-planner"
import { SipCalculator } from "@/components/financial/sip-calculator"
import { RetirementPlanner } from "@/components/financial/retirement-planner"
import { EmergencyFundCalculator } from "@/components/financial/emergency-fund-calculator"
import { ChatAssistant } from "@/components/ai-chat/chat-assistant"

export default function FinancialAdvisoryPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <PiggyBank className="h-4 w-4" />
            </div>
            <span className="font-serif text-xl font-bold">Financial Advisory</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/features">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Features
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/features" className="hover:text-foreground transition-colors">
            Features
          </Link>
          <span>/</span>
          <span className="text-foreground">Financial Advisory</span>
        </nav>
      </div>

      {/* Header Section */}
      <section className="py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/80 text-accent-foreground">
                  <PiggyBank className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl font-bold">Financial Advisory Portal</h1>
                  <p className="text-muted-foreground">Comprehensive financial planning and budgeting tools</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              Demo Data Only
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="container">
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6">
              <TabsTrigger value="profile" className="text-xs lg:text-sm">
                Profile
              </TabsTrigger>
              <TabsTrigger value="budget" className="text-xs lg:text-sm">
                Budget
              </TabsTrigger>
              <TabsTrigger value="goals" className="text-xs lg:text-sm">
                Goals
              </TabsTrigger>
              <TabsTrigger value="sip" className="text-xs lg:text-sm">
                SIP
              </TabsTrigger>
              <TabsTrigger value="retirement" className="text-xs lg:text-sm">
                Retirement
              </TabsTrigger>
              <TabsTrigger value="emergency" className="text-xs lg:text-sm">
                Emergency
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <UserProfileForm />
                </div>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-serif text-lg">Why Profile Matters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <p>Your financial profile helps us provide personalized recommendations for:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Optimal savings rate based on your income</li>
                        <li>• Risk-appropriate investment strategies</li>
                        <li>• Goal-specific financial planning</li>
                        <li>• Tax-efficient savings options</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-serif text-lg flex items-center">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        AI Assistant
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get personalized advice based on your profile
                      </p>
                      <Button size="sm" className="w-full" onClick={() => setIsChatOpen(true)}>
                        Chat with AI Advisor
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="budget" className="space-y-6">
              <BudgetAnalyzer />
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <GoalPlanner />
            </TabsContent>

            <TabsContent value="sip" className="space-y-6">
              <SipCalculator />
            </TabsContent>

            <TabsContent value="retirement" className="space-y-6">
              <RetirementPlanner />
            </TabsContent>

            <TabsContent value="emergency" className="space-y-6">
              <EmergencyFundCalculator />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <ChatAssistant context="financial" isOpen={isChatOpen} onOpenChange={setIsChatOpen} />

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Financial Advisory Portal - All calculations use demo data for educational purposes only. Consult a
              certified financial advisor for personalized advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
