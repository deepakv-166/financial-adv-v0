import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, TrendingUp, Calculator, Shield, PiggyBank, Home } from "lucide-react"
import Link from "next/link"
import { ChatAssistant } from "@/components/ai-chat/chat-assistant"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
            </div>
            <span className="font-serif text-xl font-bold">Smart Financial Advisor</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              Contact
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
          <span className="text-foreground">Features</span>
        </nav>
      </div>

      {/* Header Section */}
      <section className="py-12">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              AI-Powered Financial Tools
            </Badge>
            <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              Comprehensive Financial <span className="text-accent">Advisory Platform</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Choose from our specialized advisory services. Each portal provides tailored tools, calculators, and
              AI-powered guidance for your specific financial needs.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 max-w-6xl mx-auto">
            {/* Financial Advisory Card */}
            <Card className="group relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-lg cursor-pointer">
              <Link href="/financial-advisory" className="block">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-lg">
                      <PiggyBank className="h-8 w-8" />
                    </div>
                    <Badge variant="secondary">Demo Data</Badge>
                  </div>
                  <CardTitle className="font-serif text-2xl mt-4">Financial Advisory</CardTitle>
                  <CardDescription className="text-base">
                    Personal budgeting, savings strategies, goal planning, and comprehensive financial planning tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                        Budget Optimization
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                        Emergency Fund Planning
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                        Goal-Based Savings
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                        SIP Planning
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                        Retirement Planning
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                        Tax Optimization
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm font-medium text-accent">Explore Financial Tools</span>
                    <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            {/* Loan Advisory Card */}
            <Card className="group relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-lg cursor-pointer">
              <Link href="/loan-advisory" className="block">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-chart-2 to-chart-2/80 text-white shadow-lg">
                      <Calculator className="h-8 w-8" />
                    </div>
                    <Badge variant="secondary">Demo Data</Badge>
                  </div>
                  <CardTitle className="font-serif text-2xl mt-4">Loan Advisory</CardTitle>
                  <CardDescription className="text-base">
                    Loan eligibility assessment, EMI calculations, debt management, and loan comparison tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-2 rounded-full mr-2"></div>
                        Eligibility Assessment
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-2 rounded-full mr-2"></div>
                        EMI Calculators
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-2 rounded-full mr-2"></div>
                        Loan Comparisons
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-2 rounded-full mr-2"></div>
                        Debt Optimization
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-2 rounded-full mr-2"></div>
                        Credit Score Tips
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-2 rounded-full mr-2"></div>
                        Refinancing Advice
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm font-medium text-chart-2">Explore Loan Tools</span>
                    <ArrowRight className="h-4 w-4 text-chart-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            {/* Investment Advisory Card */}
            <Card className="group relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-lg cursor-pointer">
              <Link href="/investment-advisory" className="block">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-chart-1 to-chart-1/80 text-white shadow-lg">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                    <Badge variant="secondary">Demo Data</Badge>
                  </div>
                  <CardTitle className="font-serif text-2xl mt-4">Investment Advisory</CardTitle>
                  <CardDescription className="text-base">
                    Stock analysis, mutual fund guidance, portfolio optimization, and investment strategy planning
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-1 rounded-full mr-2"></div>
                        Risk Profiling
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-1 rounded-full mr-2"></div>
                        Portfolio Analysis
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-1 rounded-full mr-2"></div>
                        SIP Calculators
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-1 rounded-full mr-2"></div>
                        Market Insights
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-1 rounded-full mr-2"></div>
                        ETF Recommendations
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-1 rounded-full mr-2"></div>
                        Diversification Tips
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm font-medium text-chart-1">Explore Investment Tools</span>
                    <ArrowRight className="h-4 w-4 text-chart-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            {/* Insurance Advisory Card */}
            <Card className="group relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-lg cursor-pointer">
              <Link href="/insurance-advisory" className="block">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-chart-4 to-chart-4/80 text-white shadow-lg">
                      <Shield className="h-8 w-8" />
                    </div>
                    <Badge variant="secondary">Demo Data</Badge>
                  </div>
                  <CardTitle className="font-serif text-2xl mt-4">Insurance Advisory</CardTitle>
                  <CardDescription className="text-base">
                    Life, health, and vehicle insurance planning, coverage assessment, and policy comparison
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-4 rounded-full mr-2"></div>
                        Coverage Assessment
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-4 rounded-full mr-2"></div>
                        Policy Comparisons
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-4 rounded-full mr-2"></div>
                        Premium Optimization
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-4 rounded-full mr-2"></div>
                        Claim Guidance
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-4 rounded-full mr-2"></div>
                        Life Cover Calculator
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-chart-4 rounded-full mr-2"></div>
                        Health Insurance Guide
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm font-medium text-chart-4">Explore Insurance Tools</span>
                    <ArrowRight className="h-4 w-4 text-chart-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Assistant Preview */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight">AI-Powered Guidance</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every portal includes our intelligent AI assistant powered by Google Gemini, ready to answer your
              questions and provide personalized recommendations.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button variant="outline" size="lg">
                Learn About AI Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12">
        <div className="container">
          <div className="text-center">
            <Button variant="ghost" size="lg" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © 2024 Smart Financial Advisor. All rights reserved. This platform uses demo data for educational purposes
              only.
            </p>
          </div>
        </div>
      </footer>

      <ChatAssistant context="general" />
    </div>
  )
}
