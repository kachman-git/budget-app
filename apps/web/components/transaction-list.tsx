'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { format } from 'date-fns'
import { Transaction } from '@/lib/types'
import { getTransactions } from '@/lib/api'

interface TransactionListProps {
  budgetId: string
}

export function TransactionList({ budgetId }: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(budgetId)
        setTransactions(data)
      } catch (error) {
        console.error('Failed to fetch transactions:', error)
      }
    }
    fetchTransactions()
  }, [budgetId])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map(transaction => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>${transaction.amount.toFixed(2)}</TableCell>
            <TableCell>{transaction.type}</TableCell>
            <TableCell>{format(new Date(transaction.date), 'MM/dd/yyyy')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

