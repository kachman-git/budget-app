'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { format } from 'date-fns'
import { Expense } from '@/lib/types'
import { getExpenses } from '@/lib/api'

interface ExpenseListProps {
  budgetId: string
}

export function ExpenseList({ budgetId }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses(budgetId)
        setExpenses(data)
        setFilteredExpenses(data)
      } catch (error) {
        console.error('Failed to fetch expenses:', error)
      }
    }
    fetchExpenses()
  }, [budgetId])

  useEffect(() => {
    const filtered = expenses.filter(expense =>
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const sorted = filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      } else {
        return sortOrder === 'asc' 
          ? a[sortBy as keyof Expense] > b[sortBy as keyof Expense] ? 1 : -1
          : b[sortBy as keyof Expense] > a[sortBy as keyof Expense] ? 1 : -1
      }
    })
    setFilteredExpenses(sorted)
  }, [expenses, searchTerm, sortBy, sortOrder])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center space-x-2">
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value)}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="description">Description</option>
          </Select>
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredExpenses.map(expense => (
            <TableRow key={expense.id}>
              <TableCell>{expense.description}</TableCell>
              <TableCell>${expense.amount.toFixed(2)}</TableCell>
              <TableCell>{format(new Date(expense.date), 'MM/dd/yyyy')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

