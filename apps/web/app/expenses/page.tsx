import { ExpenseList } from './expense-list'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ExpensesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Expenses</h1>
      <ExpenseList />
      <Link href="/expenses/new">
        <Button className="mt-4">Add New Expense</Button>
      </Link>
    </div>
  )
}

