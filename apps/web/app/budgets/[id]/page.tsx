"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseList } from "@/components/expense-list";
import { TransactionList } from "@/components/transaction-list";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { BudgetSummary, Transaction } from "@/lib/types";
import { getBudgetSummary, getTransactions } from "@/lib/api";

export default function BudgetDetailPage() {
  const [budget, setBudget] = useState<BudgetSummary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchBudgetAndTransactions = async () => {
      try {
        const [budgetData, transactionsData] = await Promise.all([
          getBudgetSummary(id),
          getTransactions(id),
        ]);
        setBudget(budgetData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Failed to fetch budget data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBudgetAndTransactions();
  }, [id]);

  const chartData = transactions.reduce(
    (acc, transaction) => {
      const date = format(new Date(transaction.date), "MM/dd");
      const existingEntry = acc.find((entry) => entry.date === date);
      if (existingEntry) {
        if (transaction.type === "INCOME") {
          existingEntry.income += transaction.amount;
        } else if (transaction.type === "EXPENSE") {
          existingEntry.expense += transaction.amount;
        }
      } else {
        acc.push({
          date,
          income: transaction.type === "INCOME" ? transaction.amount : 0,
          expense: transaction.type === "EXPENSE" ? transaction.amount : 0,
        });
      }
      return acc;
    },
    [] as { date: string; income: number; expense: number }[]
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!budget) {
    return <div>Budget not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{budget.name}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Budget Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Total Budget</p>
              <p className="text-2xl font-semibold">
                ${budget.amount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="text-2xl font-semibold text-red-500">
                ${budget.totalExpenses.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Remaining</p>
              <p className="text-2xl font-semibold text-green-500">
                ${budget.remainingBudget.toFixed(2)}
              </p>
            </div>
          </div>
          <Progress
            value={(budget.remainingBudget / budget.amount) * 100}
            className="mb-2"
          />
          <p className="text-sm text-gray-500">
            {new Date(budget.startDate).toLocaleDateString()} -{" "}
            {new Date(budget.endDate).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#4CAF50" />
              <Bar dataKey="expense" fill="#F44336" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Tabs defaultValue="expenses">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="expenses">
          <ExpenseList budgetId={id} />
        </TabsContent>
        <TabsContent value="transactions">
          <TransactionList budgetId={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
