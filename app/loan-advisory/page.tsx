import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calculator, Home, MessageCircle } from "lucide-react"
import Link from "next/link"
import { LoanEligibilityChecker } from "@/components/loan/loan-eligibility-checker"
import { EmiCalculator } from "@/components/loan/emi-calculator"
import { LoanComparison } from "@/components/loan/loan-comparison"
import { DebtManagement } from "@/components/loan/debt-management"
import { CreditScoreSimulator } from "@/components/loan/credit-score-simulator"
import { ChatAssistant } from "@/components/ai-chat/chat-assistant"

export default function LoanAdvisoryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-2 text-white">
              <Calculator className="h-4 w-4" />
            </div>
            <span className="font-serif text-xl font-bold">Loan Advisory</span>
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
          <span className="text-foreground">Loan Advisory</span>
        </nav>
      </div>

      {/* Header Section */}
      <section className="py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-chart-2 to-chart-2/80 text-white">
                  <Calculator className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl font-bold">Loan Advisory Portal</h1>
                  <p className="text-muted-foreground">Loan eligibility, EMI calculations, and debt management tools</p>
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
          <Tabs defaultValue="eligibility" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
              <TabsTrigger value="eligibility" className="text-xs lg:text-sm">
                Eligibility
              </TabsTrigger>
              <TabsTrigger value="emi" className="text-xs lg:text-sm">
                EMI Calculator
              </TabsTrigger>
              <TabsTrigger value="comparison" className="text-xs lg:text-sm">
                Compare Loans
              </TabsTrigger>
              <TabsTrigger value="debt" className="text-xs lg:text-sm">
                Debt Management
              </TabsTrigger>
              <TabsTrigger value="credit" className="text-xs lg:text-sm">
                Credit Score
              </TabsTrigger>
            </TabsList>

            <TabsContent value="eligibility" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <LoanEligibilityChecker />
                </div>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-serif text-lg">Eligibility Factors</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <p>Key factors that determine your loan eligibility:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Debt-to-Income ratio (should be &lt;40%)</li>
                        <li>• Credit score (750+ for best rates)</li>
                        <li>• Employment stability</li>
                        <li>• Existing loan obligations</li>
                        <li>• Age and retirement timeline</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-serif text-lg flex items-center">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        AI Loan Advisor
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get personalized loan advice and recommendations
                      </p>
                      <Button size="sm" className="w-full">
                        Chat with Loan Expert
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="emi" className="space-y-6">
              <EmiCalculator />
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <LoanComparison />
            </TabsContent>

            <TabsContent value="debt" className="space-y-6">
              <DebtManagement />
            </TabsContent>

            <TabsContent value="credit" className="space-y-6">
              <CreditScoreSimulator />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ChatAssistant Component */}
      <ChatAssistant context="loan" />

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Loan Advisory Portal - All calculations use demo data for educational purposes only. Consult with lenders
              for actual loan terms and conditions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
