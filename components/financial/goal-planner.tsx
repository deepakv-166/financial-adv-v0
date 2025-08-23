"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Plus, Trash2 } from "lucide-react"

interface Goal {
  id: string
  name: string
  targetAmount: number
  timeframe: number
  priority: string
  currentSavings: number
}

export function GoalPlanner() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    timeframe: "",
    priority: "",
    currentSavings: "",
  })

  const addGoal = () => {
    if (newGoal.name && newGoal.targetAmount && newGoal.timeframe) {
      const goal: Goal = {
        id: Date.now().toString(),
        name: newGoal.name,
        targetAmount: Number(newGoal.targetAmount),
        timeframe: Number(newGoal.timeframe),
        priority: newGoal.priority,
        currentSavings: Number(newGoal.currentSavings) || 0,
      }
      setGoals([...goals, goal])
      setNewGoal({
        name: "",
        targetAmount: "",
        timeframe: "",
        priority: "",
        currentSavings: "",
      })
    }
  }

  const removeGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const calculateMonthlyRequired = (goal: Goal) => {
    const remaining = goal.targetAmount - goal.currentSavings
    const months = goal.timeframe * 12
    return remaining / months
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Goal Planner
          </CardTitle>
          <CardDescription>Set and track your financial goals with personalized savings strategies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goalName">Goal Name</Label>
              <Input
                id="goalName"
                placeholder="e.g., House Down Payment"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount (₹)</Label>
              <Input
                id="targetAmount"
                type="number"
                placeholder="2000000"
                value={newGoal.targetAmount}
                onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe (Years)</Label>
              <Input
                id="timeframe"
                type="number"
                placeholder="5"
                value={newGoal.timeframe}
                onChange={(e) => setNewGoal({ ...newGoal, timeframe: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={newGoal.priority} onValueChange={(value) => setNewGoal({ ...newGoal, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentSavings">Current Savings (₹)</Label>
              <Input
                id="currentSavings"
                type="number"
                placeholder="100000"
                value={newGoal.currentSavings}
                onChange={(e) => setNewGoal({ ...newGoal, currentSavings: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={addGoal} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </CardContent>
      </Card>

      {goals.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-semibold">Your Financial Goals</h3>
          <div className="grid gap-4">
            {goals.map((goal) => {
              const progress = (goal.currentSavings / goal.targetAmount) * 100
              const monthlyRequired = calculateMonthlyRequired(goal)
              const priorityColor =
                goal.priority === "High" ? "destructive" : goal.priority === "Medium" ? "default" : "secondary"

              return (
                <Card key={goal.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-serif text-lg">{goal.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant={priorityColor as any}>{goal.priority} Priority</Badge>
                        <Button variant="ghost" size="sm" onClick={() => removeGoal(goal.id)} className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div className="p-2 bg-muted rounded">
                        <div className="text-sm font-semibold">₹{goal.targetAmount.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Target</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-sm font-semibold">₹{goal.currentSavings.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Current</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-sm font-semibold">{goal.timeframe} years</div>
                        <div className="text-xs text-muted-foreground">Timeline</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-sm font-semibold text-accent">₹{monthlyRequired.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Monthly</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <strong>Strategy:</strong> Save ₹{monthlyRequired.toLocaleString()} monthly to reach your goal in{" "}
                      {goal.timeframe} years.
                      {monthlyRequired > 50000 &&
                        " Consider increasing timeline or reducing target for more manageable monthly savings."}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
