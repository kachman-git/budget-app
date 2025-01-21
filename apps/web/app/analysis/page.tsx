"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subMonths, eachDayOfInterval } from "date-fns";
import { getTransactions } from "@/lib/api";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  type: "INCOME" | "EXPENSE";
}

export default function AnalysisPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [timeRange, setTimeRange] = useState("1M");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setError("Failed to fetch transactions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const getChartData = () => {
    const endDate = new Date();
    const startDate = subMonths(
      endDate,
      timeRange === "1M" ? 1 : timeRange === "3M" ? 3 : 6
    );

    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    const chartData = dateRange.map((date) => {
      const formattedDate = format(date, "MM/dd");
      const dayTransactions = transactions.filter(
        (t) => new Date(t.date).toDateString() === date.toDateString()
      );

      const income = dayTransactions
        .filter((t) => t.type === "INCOME")
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = dayTransactions
        .filter((t) => t.type === "EXPENSE")
        .reduce((sum, t) => sum + t.amount, 0);

      return { date: formattedDate, income, expense };
    });

    return chartData;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financial Analysis</h1>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Income vs Expenses Over Time</CardTitle>
            <Select
              value={timeRange}
              onValueChange={(value) => setTimeRange(value)}
            >
              <option value="1M">Last Month</option>
              <option value="3M">Last 3 Months</option>
              <option value="6M">Last 6 Months</option>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#4CAF50" />
                <Line type="monotone" dataKey="expense" stroke="#F44336" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
