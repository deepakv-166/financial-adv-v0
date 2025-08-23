"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react"

export function MarketInsights() {
  const marketData = [
    {
      index: "NIFTY 50",
      value: "19,674.25",
      change: "+127.35",
      changePercent: "+0.65%",
      trend: "up",
    },
    {
      index: "SENSEX",
      value: "65,953.48",
      change: "+432.17",
      changePercent: "+0.66%",
      trend: "up",
    },
    {
      index: "NIFTY BANK",
      value: "44,127.80",
      change: "-89.45",
      changePercent: "-0.20%",
      trend: "down",
    },
    {
      index: "NIFTY IT",
      value: "31,245.60",
      change: "+156.25",
      changePercent: "+0.50%",
      trend: "up",
    },
  ]

  const insights = [
    {
      title: "Market Outlook",
      description: "Markets showing positive momentum with strong fundamentals",
      icon: Activity,
    },
    {
      title: "Sector Focus",
      description: "Technology and healthcare sectors outperforming",
      icon: TrendingUp,
    },
    {
      title: "Investment Tip",
      description: "Consider SIP investments during market volatility",
      icon: DollarSign,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Market Insights
          </CardTitle>
          <CardDescription>Real-time market data and investment insights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {marketData.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{item.index}</h4>
                  <Badge variant={item.trend === "up" ? "default" : "destructive"} className="text-xs">
                    {item.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {item.changePercent}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-bold">{item.value}</div>
                  <div className={`text-sm ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {item.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-serif font-medium">Today's Insights</h4>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                  <insight.icon className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <h5 className="font-medium text-sm">{insight.title}</h5>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Disclaimer:</strong> Market data shown is for demonstration purposes only and may not reflect
              real-time values. Please consult financial advisors and verify current market conditions before making
              investment decisions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
