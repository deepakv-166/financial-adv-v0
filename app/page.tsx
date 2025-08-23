import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, TrendingUp, Calculator, Users } from "lucide-react"
import Link from "next/link"
import { ChatAssistant } from "@/components/ai-chat/chat-assistant"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
            </div>
            <span className="font-serif text-xl font-bold">Smart Financial Advisor</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="#services"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Button variant="outline" size="sm">
              Contact
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              AI-Powered Financial Advisory
            </Badge>
            <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Your Smart Path to <span className="text-accent">Financial Success</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Navigate your financial journey with confidence. Our AI-powered platform provides personalized advice for
              investments, loans, insurance, and comprehensive financial planning.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link href="/features">
                  Explore Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">About Smart Financial Advisor</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We combine cutting-edge AI technology with proven financial expertise to deliver personalized,
              transparent, and educational financial guidance. Our platform demystifies complex financial decisions and
              empowers you to make informed choices about your financial future.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">Secure & Trusted</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Bank-level security with transparent, educational guidance you can trust.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">AI-Powered</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Advanced algorithms provide personalized recommendations for your unique situation.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Calculator className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">Comprehensive Tools</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Complete suite of calculators and planning tools for all your financial needs.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">Expert Guidance</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Professional financial expertise accessible to everyone, anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section id="services" className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">Core Services</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive financial guidance across all aspects of your financial life
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="relative overflow-hidden border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <CardTitle className="font-serif">Financial Advisory</CardTitle>
                <CardDescription>
                  Personal budgeting, savings strategies, and comprehensive financial planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Budget optimization</li>
                  <li>• Emergency fund planning</li>
                  <li>• Goal-based savings</li>
                  <li>• Retirement planning</li>
                </ul>
              </CardContent>
              <Badge className="absolute top-4 right-4" variant="secondary">
                Demo Data
              </Badge>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Calculator className="h-6 w-6" />
                </div>
                <CardTitle className="font-serif">Loan Advisory</CardTitle>
                <CardDescription>Loan eligibility, EMI calculations, and debt management strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Eligibility assessment</li>
                  <li>• EMI calculators</li>
                  <li>• Loan comparisons</li>
                  <li>• Debt optimization</li>
                </ul>
              </CardContent>
              <Badge className="absolute top-4 right-4" variant="secondary">
                Demo Data
              </Badge>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <CardTitle className="font-serif">Investment Advisory</CardTitle>
                <CardDescription>Stock analysis, mutual funds, and portfolio optimization guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Risk profiling</li>
                  <li>• Portfolio analysis</li>
                  <li>• SIP planning</li>
                  <li>• Market insights</li>
                </ul>
              </CardContent>
              <Badge className="absolute top-4 right-4" variant="secondary">
                Demo Data
              </Badge>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle className="font-serif">Insurance Advisory</CardTitle>
                <CardDescription>Life, health, and vehicle insurance planning and comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Coverage assessment</li>
                  <li>• Policy comparisons</li>
                  <li>• Premium optimization</li>
                  <li>• Claim guidance</li>
                </ul>
              </CardContent>
              <Badge className="absolute top-4 right-4" variant="secondary">
                Demo Data
              </Badge>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="mt-4 text-lg opacity-90">
              Join thousands of users who trust our AI-powered platform for their financial decisions.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link href="/features">
                  Let's Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chat Assistant */}
      <ChatAssistant context="general" />

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
                  <TrendingUp className="h-3 w-3" />
                </div>
                <span className="font-serif font-bold">Smart Financial Advisor</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                AI-powered financial guidance for a smarter financial future.
              </p>
            </div>
            <div>
              <h3 className="font-serif font-semibold">Services</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Financial Planning</li>
                <li>Loan Advisory</li>
                <li>Investment Guidance</li>
                <li>Insurance Planning</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif font-semibold">Resources</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Financial Calculators</li>
                <li>Educational Content</li>
                <li>Market Insights</li>
                <li>Planning Tools</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Disclaimers</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>
              © 2024 Smart Financial Advisor. All rights reserved. This platform uses demo data for educational purposes
              only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
