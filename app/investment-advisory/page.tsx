import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, Home, MessageCircle } from "lucide-react"
import Link from "next/link"
import { RiskProfiler } from "@/components/investment/risk-profiler"
import { PortfolioAnalyzer } from "@/components/investment/portfolio-analyzer"
import { InvestmentRecommendations } from "@/components/investment/investment-recommendations"
import { SipPlanner } from "@/components/investment/sip-planner"
import { MarketInsights } from "@/components/investment/market-insights"
import { ChatAssistant } from "@/components/ai-chat/chat-assistant"

export default function InvestmentAdvisoryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-1 text-white">
              <TrendingUp className="h-4 w-4" />
            </div>
            <span className="font-serif text-xl font-bold">Investment Advisory</span>
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
          <span className="text-foreground">Investment Advisory</span>
        </nav>
      </div>

      {/* Header Section */}
      <section className="py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-chart-1 to-chart-1/80 text-white">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl font-bold">Investment Advisory Portal</h1>
                  <p className="text-muted-foreground">
                    Stock analysis, portfolio optimization, and investment planning
                  </p>
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
          <Tabs defaultValue="risk" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
              <TabsTrigger value="risk" className="text-xs lg:text-sm">
                Risk Profile
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="text-xs lg:text-sm">
                Portfolio
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="text-xs lg:text-sm">
                Recommendations
              </TabsTrigger>
              <TabsTrigger value="sip" className="text-xs lg:text-sm">
                SIP Planner
              </TabsTrigger>
              <TabsTrigger value="insights" className="text-xs lg:text-sm">
                Market Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="risk" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <RiskProfiler />
                </div>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-serif text-lg">Risk vs Return</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <p>Understanding your risk tolerance is crucial for:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Optimal asset allocation</li>
                        <li>• Expected return projections</li>
                        <li>• Investment time horizon planning</li>
                        <li>• Stress-free investing experience</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-serif text-lg flex items-center">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        AI Investment Advisor
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">Get personalized investment recommendations</p>
                      <Button size="sm" className="w-full">
                        Chat with Investment Expert
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6">
              <PortfolioAnalyzer />
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <InvestmentRecommendations />
            </TabsContent>

            <TabsContent value="sip" className="space-y-6">
              <SipPlanner />
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <MarketInsights />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <ChatAssistant context="investment" />

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Investment Advisory Portal - All data is for educational purposes only. Past performance does not
              guarantee future results. Consult a certified financial advisor for personalized advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
