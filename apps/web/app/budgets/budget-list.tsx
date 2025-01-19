'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import { BudgetSummary } from '@/lib/types'
import { getBudgets, getBudgetSummary } from '@/lib/api'
import { Button } from '@/components/ui/button'

export function BudgetList() {
  const [budgets, setBudgets] = useState<BudgetSummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const budgetsData = await getBudgets()
        const budgetsWithSummary = await Promise.all(
          budgetsData.map(async (budget: BudgetSummary) => {
            const summary = await getBudgetSummary(budget.id)
            return { ...budget, ...summary }
          })
        )
        setBudgets(budgetsWithSummary)
      } catch (error) {
        console.error('Failed to fetch budgets:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBudgets()
  }, [])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Budgets</h1>
        <Link href="/budgets/new">
          <Button>Create New Budget</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map(budget => (
          <Link href={`/budgets/${budget.id}`} key={budget.id}>
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>{budget.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Budget</p>
                    <p className="text-lg font-semibold">${budget.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="text-lg font-semibold">${budget.remainingBudget.toFixed(2)}</p>
                  </div>
                </div>
                <Progress 
                  value={(budget.remainingBudget / budget.amount) * 100} 
                  className="mb-4"
                />
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Spent', value: budget.totalExpenses },
                        { name: 'Income', value: budget.totalIncome },
                        { name: 'Remaining', value: budget.remainingBudget },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-sm text-muted-foreground mt-2">
                  {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

